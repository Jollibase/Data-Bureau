import { useEffect, useRef, useState } from 'react'
import { CellClickedEvent, ICellRendererParams } from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'
import { useNavigate } from 'react-router-dom'

import { Grid, Button, Checkbox, Modal } from '@Home/components'
import { useAppDispatch, useAppSelector } from '@Home/lib/hooks/redux'
import { dashboard as dLT } from '@Home/lib/processor/dashboardProcessor'

import {
  getAllDashboards,
  deleteDashboards,
  createDashboard,
} from '../redux/actions'

import styles from './Dashboard.styl'
import { Onboarding } from './Onboarding'
import { Placeholder } from '@Home/components/Placeholder'

export const Dashboard = () => {
  const [selectedDashboards, setSelectedDashboards] = useState<string[]>([])
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState<boolean>(
    localStorage.getItem('doneOnboarding') !== 'true',
  )
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false)
  const gridRef = useRef<AgGridReact>(null)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const {
    dashboards: { all: dashboardList, loading },
    createdDashboard: { createLoading, newDb },
  } = useAppSelector(state => state.dashboard)

  useEffect(() => {
    dispatch(getAllDashboards())
  }, [])

  useEffect(() => {
    if (newDb) {
      navigate(`/dashboards/${newDb?.id}`)
    }
  }, [newDb])

  const onCheckboxClick = (id: string) => {
    setSelectedDashboards(prevState => {
      if (prevState.includes(id)) {
        return prevState.filter(item => item !== id)
      }
      return [...prevState, id]
    })
  }
  const onSelectCancel = () => {
    setSelectedDashboards([])
    setShowDeleteModal(false)
  }

  const createNewDashboard = () => {
    dispatch(
      createDashboard({
        name: 'Untitled Dashboard',
      }),
    )
    setShowCreateModal(false)
  }

  const StrongTextRenderer = (params: ICellRendererParams<dLT>) => {
    return <strong style={{ cursor: 'pointer' }}>{params.data?.name}</strong>
  }

  const CheckboxRenderer = (params: ICellRendererParams<dLT>) => {
    return (
      <Checkbox
        checked={!!selectedDashboards.find(id => params.data?.id === id)}
        onChange={() => params.data && onCheckboxClick(params.data.id)}
      />
    )
  }

  const gridRowData = () => {
    return dashboardList?.map(item => ({
      id: item.id,
      name: item.name,
      source: item.owner,
      created: item.created,
      updated: item.updated,
    }))
  }
  const onCellClick = (event: CellClickedEvent<dLT>) => {
    if (event.column.getColId() === 'name') {
      navigate(`/dashboards/${event.data?.id}`)
    }
  }
  const deleteDashboard = () => {
    dispatch(deleteDashboards(selectedDashboards))
    gridRef.current?.api.setRowData(dashboardList)
    setSelectedDashboards([])
    setShowDeleteModal(false)
  }

  return (
    <div className={styles.Dashboard}>
      <div className="dash">
        <div className="dash__header">
          <div className="title">All Dashboards</div>
          <div className="btns">
            <Button
              classname="create-btn"
              text="Create dashboard"
              primary
              onclick={() => setShowCreateModal(true)}
            />
            <Button
              classname="delete-btn"
              disabled={!selectedDashboards.length}
              text="Delete dashboard(s)"
              onclick={() => setShowDeleteModal(true)}
            />
          </div>
        </div>
        {shouldShowOnboarding && (
          <Onboarding setShouldShowOnboarding={setShouldShowOnboarding} />
        )}
        {!shouldShowOnboarding && loading && (
          <div className="dash__loader_grid">
            {Array(12)
              .fill(0)
              .map((_, ind) => (
                <Placeholder key={ind} width="100%" height="32px" />
              ))}
          </div>
        )}
        {!shouldShowOnboarding && !loading && (
          <Grid
            ref={gridRef}
            className="grid"
            columnDefs={[
              {
                headerName: '',
                field: 'checkbox',
                suppressSizeToFit: true,
                width: 90,
                cellRenderer: CheckboxRenderer,
              },
              {
                headerName: 'Name',
                field: 'name',
                suppressSizeToFit: true,
                minWidth: 300,
                flex: 1,
                cellRenderer: StrongTextRenderer,
              },
              {
                headerName: 'Source',
                field: 'source',
                width: 90,
              },
              {
                headerName: 'Type',
                field: 'type',
                width: 90,
              },
              {
                headerName: 'Added on',
                field: 'created',
              },
              {
                headerName: 'Last updated',
                field: 'updated',
              },
            ]}
            rowData={gridRowData()}
            defaultColDef={{
              sortable: true,
            }}
            onCellClicked={onCellClick}
          />
        )}
      </div>
      <Modal
        shouldShow={showDeleteModal}
        className={styles.DeleteModal}
        onClose={() => setShowDeleteModal(false)}>
        <div className="modal-question">
          Do you want to delete these Dashboard(s)?
        </div>
        <div className="modal-btns">
          <Button
            text="Cancel"
            classname="cancel-btn"
            onclick={onSelectCancel}
          />

          <Button
            text="Delete"
            classname="delete-btn"
            onclick={deleteDashboard}
          />
        </div>
      </Modal>
      <Modal
        shouldShow={showCreateModal}
        className={styles.CreateModal}
        onClose={() => setShowCreateModal(false)}>
        <div className="modal-question">Upcoming templates</div>
        <div className="modal-btns">
          <Button
            text="Create new"
            loading={createLoading}
            onclick={createNewDashboard}
          />
        </div>
      </Modal>
    </div>
  )
}
