import { FC, ReactNode } from 'react'
import './background-box.css'

interface BackgroundBoxProps {
  children: ReactNode
}

const BackgroundBox: FC<BackgroundBoxProps> = ({ children }) => {
  const spans = []
  for (let i = 0; i < 20; i++) {
    spans.push(<span key={i} style={{ zIndex: '-1' }}></span>)
  }

  return (
    <div className='background-box'>
      {children}
      {spans}
    </div>
  )
}

export default BackgroundBox
