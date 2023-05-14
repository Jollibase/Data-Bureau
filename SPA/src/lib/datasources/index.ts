import { AxiosRequestConfig } from 'axios'

import { AuthenticatedAPI } from '../api'

const TASK_STATUSES_FAILURE = ['FAILURE', 'RETRY']
const TASK_STATUSES_SUCCESS = ['SUCCESS']

interface BaseDatasourceType {
  _fetch: (url: string, config?: AxiosRequestConfig) => void
  load: VoidFunction
}

interface TaskMetaDataType {
  background: boolean
  task_id: string
}

interface TaskStatus<Result> {
  status: (typeof TASK_STATUSES_FAILURE)[number] &
    (typeof TASK_STATUSES_SUCCESS)[number]
  result?: Result
}

export class BaseDatasource<Result> implements BaseDatasourceType {
  onSuccess: (response: Result) => void
  onFailure: (error: Error) => void

  constructor(onSuccess, onFailure) {
    this.onSuccess = onSuccess
    this.onFailure = onFailure
  }

  load() {
    throw new Error('Not implemented')
  }

  _fetch(url: string, config?: AxiosRequestConfig) {
    return AuthenticatedAPI(url, config)
      .then(response => {
        if (response.statusText.toLowerCase() === 'ok') {
          return response.data
        } else {
          throw new Error('Network issues')
        }
      })
      .then(data => data)
  }
}

export class BaseBackgroundDatasource<Result> extends BaseDatasource<Result> {
  taskDone = false
  taskMetaData: TaskMetaDataType | null = null
  timeoutTask: number | null = null
  // Implement timeout for all requests (In cases of timeout from web)

  onFetchSuccess(data: TaskStatus<Result>) {
    let taskDone = true
    if (!data || TASK_STATUSES_FAILURE.includes(data.status)) {
      this.onFailure(new Error('Internal Server Error'))
    } else if (TASK_STATUSES_SUCCESS.includes(data.status)) {
      this.onSuccess(data.result)
    } else {
      taskDone = false
      this.scheduleNextTask()
    }
    this.taskDone = taskDone
  }

  clearTimeoutTask = () => {
    this.clearTimeoutTask()
    if (this.timeoutTask) {
      window.clearTimeout(this.timeoutTask)
      this.timeoutTask = null
    }
  }

  checkStatus() {
    if (this.taskMetaData && !this.taskDone) {
      const url = `task/task_staus/${this.taskMetaData?.task_id}`

      this._fetch(url).then(this.onFetchSuccess).catch(this.onFetchFailure)
    }
  }

  scheduleNextTask() {
    this.timeoutTask = window.setTimeout(this.checkStatus, 2000)
  }

  onFetchFailure(error: Error) {
    this.onFailure(error)
  }

  onLoadBackgroundSuccess(data: any) {
    this.taskMetaData = data
    this.scheduleNextTask()
  }

  loadBackground(input, init) {
    this._fetch(input, init)!
      .then(this.onLoadBackgroundSuccess)
      .catch(this.onFetchFailure)
  }
}
