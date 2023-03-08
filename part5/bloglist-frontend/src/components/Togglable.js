import React, { useState } from 'react'

const Togglable = (props) => {
  const [visibility, setVisibility] = useState(false)
  const styleHiddenWhenVisible = { display: visibility ? 'none' : '' }
  const styleShownWhenVisible = { display: visibility ? '' : 'none' }

  const toggleVisibility = () => {
    setVisibility(!visibility)
  }


  return (
    <div>
      <div style={styleHiddenWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={styleShownWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>Cancel</button>
      </div>
    </div>
  )
}

export default Togglable
