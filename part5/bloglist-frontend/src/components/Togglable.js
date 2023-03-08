import { useState } from 'react'
import PropTypes from 'prop-types'

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

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable
