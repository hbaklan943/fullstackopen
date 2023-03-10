import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, refs) => {
  const [visibility, setVisibility] = useState(false)

  const hiddenWhenVisible = { display: visibility ? 'none' : '' }
  const shownWhenVisible = { display: visibility ? '' : 'none' }

  const toggleVisibility = () => {
    setVisibility(!visibility)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hiddenWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={shownWhenVisible} className='togglableContent' >
        {props.children}
        < button onClick={toggleVisibility}>cancel</button>
      </div>
    </div >
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}


export default Togglable
