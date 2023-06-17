import { createPortal } from 'react-dom'

interface PortalProps {
  node?: Element
  children: React.ReactNode
}

const DEFAULT_NODE = document.getElementById('portal')

export const Portal = ({ node, children }: PortalProps) => {
  return createPortal(children, node || DEFAULT_NODE)
}
