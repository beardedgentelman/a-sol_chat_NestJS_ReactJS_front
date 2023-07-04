interface ITextarea {
  forwardedRef?: React.Ref<HTMLTextAreaElement>
  id: string
  className?: string
  placeholder: string
  onChange?: any
}

const Textarea: React.FC<ITextarea> = ({ forwardedRef, id, className, placeholder, onChange }) => {
  return (
    <textarea ref={forwardedRef} id={id} className={className} placeholder={placeholder} onChange={onChange}></textarea>
  )
}

export default Textarea
