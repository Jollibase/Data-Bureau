import ClassNames from 'classnames'

import { Portal } from '../Portal'

import style from './Toast.styl'
import { useEffect, useState } from 'react'

interface ToastProps {
  message: string | undefined
  level: 'alert' | 'success' | 'error'
}

export const Toast = ({ message, level }: ToastProps) => {
  const [ownMessage, setOwnMessage] = useState(message)

  useEffect(() => {
    setOwnMessage(message)
  }, [message])

  useEffect(() => {
    const interval = setInterval(deleteToast, 2000)
    return () => clearInterval(interval)
  }, [ownMessage])

  const deleteToast = () => {
    setOwnMessage('')
  }

  return (
    <Portal>
      {!!ownMessage && (
        <div className={ClassNames(style.Toast)}>
          <div className={ClassNames('toast', level)}>
            <div className="toast-message">{message}</div>
            <div className="cancel-btn" onClick={deleteToast}>
              X
            </div>
          </div>
        </div>
      )}
    </Portal>
  )
}
