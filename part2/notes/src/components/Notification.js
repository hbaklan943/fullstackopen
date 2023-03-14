const Notification = ({ errorMessage, successfulMessage }) => {

  const error = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  const message = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }



  if (successfulMessage === null && errorMessage === null) {
    return null
  }
  else if (successfulMessage !== null) {
    return (
      <div style={message}>
        {successfulMessage}
      </div>
    )
  }
  else {
    return (
      <div className='error' style={error}>
        {errorMessage}
      </div>
    )
  }
}

export default Notification