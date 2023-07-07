import { AgGridReact, AgGridReactProps } from 'ag-grid-react'
import { forwardRef } from 'react'
import ClassNames from 'classnames'

import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'

interface GridProps extends AgGridReactProps {
  className?: string
  ref?: React.LegacyRef<AgGridReact> | null
}

export const Grid = forwardRef(
  ({ className, ...props }: GridProps, ref: React.LegacyRef<AgGridReact>) => {
    return (
      <div
        className={ClassNames('ag-theme-alpine', className)}
        style={{ width: '100%', height: '90%' }}>
        <AgGridReact ref={ref} {...props} />
      </div>
    )
  },
)
