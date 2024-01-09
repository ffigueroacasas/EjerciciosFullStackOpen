import { useState } from "react";

const Togglable = (props) => {
  const [isVisible, setIsVisible] = useState(false)

  const showWhenVisible = {display: isVisible ? '' : 'none'}
  const hideWhenVisible = {display: isVisible ? 'none': ''}
  
  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  return (
    <>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>Close</button>
      </div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>New Blog</button>
      </div>
    </>
  )
}

export default Togglable