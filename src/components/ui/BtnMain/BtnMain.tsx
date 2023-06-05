import './btn-main.css'

interface BtnMainProps {
  id?: string
  onClick?: React.ReactEventHandler
  type?: 'button' | 'submit' | 'reset'
  className?: string
  disabled?: boolean
  children?: React.ReactNode
}

const BtnMain = ({ id, onClick, type, className, disabled, children }: BtnMainProps) => {
  return (
    <button id={id} onClick={onClick} type={type} className={`${className} btn-main`} disabled={disabled}>
      {children}
    </button>
  )
}

export default BtnMain
