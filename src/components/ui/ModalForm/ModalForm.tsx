import { FC, FormEventHandler, MouseEventHandler } from 'react'

import BtnMain from '../BtnMain/BtnMain'

interface ModalFormProps {
  modalTitle: string
  btnTitle: string
  onClose: MouseEventHandler<HTMLDivElement>
  onSubmit: FormEventHandler<HTMLFormElement>
  className?: string
  required?: boolean
  readOnly?: boolean
  value?: string
}

const ModalForm: FC<ModalFormProps> = ({
  onSubmit,
  onClose,
  className,
  modalTitle,
  btnTitle,
  required,
  readOnly,
  value
}) => {
  return (
    <form className={`chat-aside__modal-form ${className}`} onSubmit={onSubmit}>
      <div className='chat-aside__modal-close' onClick={onClose}>
        &#9587;
      </div>
      <label htmlFor='modal-form__input' className='modal-form__label'>
        <span>{modalTitle}</span>
        <input
          type='text'
          id='modal-form__input'
          name='chatName'
          className='modal-form__input'
          required={required}
          readOnly={readOnly}
          value={value}
        />
      </label>
      <BtnMain type='submit'>{btnTitle}</BtnMain>
    </form>
  )
}

export default ModalForm
