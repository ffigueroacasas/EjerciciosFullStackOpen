import { useState, forwardRef, useImperativeHandle } from 'react'

const Togglable = forwardRef((props, refs) => {
  const [isVisible, setIsVisible] = useState(false)

  const showWhenVisible = { display: isVisible ? '' : 'none' }
  const hideWhenVisible = { display: isVisible ? 'none': '' }

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>Close</button>
      </div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.message}</button>
      </div>
    </>
  )
})

export default Togglable