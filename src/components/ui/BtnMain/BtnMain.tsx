import { FC } from 'react'
import './btn-main.css'

interface BtnMainProps {
  id?: string
  onClick?: React.ReactEventHandler
  type?: 'button' | 'submit' | 'reset'
  className?: string
  disabled?: boolean
  children?: React.ReactNode
}

const BtnMain: FC<BtnMainProps> = ({ id, onClick, type, className, disabled, children }) => {
  return (
    <button id={id} onClick={onClick} type={type} className={`${className} btn-main`} disabled={disabled}>
      {children}
    </button>
  )
}

export default BtnMain
