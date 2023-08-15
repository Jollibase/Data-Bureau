import { useState } from 'react'

import { Card } from '../Card'

import { ReactComponent as Edit } from '@Images/edit.svg'
import { ReactComponent as Info } from '@Images/info.svg'
import { ReactComponent as Duplicate } from '@Images/duplicate.svg'
import { ReactComponent as Remove } from '@Images/remove.svg'
import style from './WidgetContainer.styl'

interface WidgetContainerProps {
  children: React.ReactNode
  headerComponent?: React.ReactNode
}

export const WidgetContainer = ({
  children,
  headerComponent,
}: WidgetContainerProps) => {
  const [showSettings, setShowSettings] = useState<boolean>(false)
  return (
    <div
      className={style.WidgetContainer}
      onMouseEnter={() => setShowSettings(true)}
      onMouseLeave={() => setShowSettings(false)}>
      <Card classname="widget__content" headerContent={headerComponent}>
        {children}
      </Card>
      {showSettings && (
        <div className="widget__settings">
          <div className="edit">
            <Edit />
          </div>
          <div className="info">
            <Info />
          </div>
          <div className="duplicate">
            <Duplicate />
          </div>
          <div className="remove">
            <Remove />
          </div>
        </div>
      )}
    </div>
  )
}
