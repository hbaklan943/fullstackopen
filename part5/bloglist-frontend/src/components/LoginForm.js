const LoginForm = ({
  handleLogin,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return (
    <form onSubmit={handleLogin}>
      <div>
        Username:
        <input type='text' name='Username' value={username} onChange={handleUsernameChange}></input>
      </div>
      <div>
        Password:
        <input type='password' name='Password' value={password} onChange={handlePasswordChange}></input>
      </div>
      <button type='submit'>Login</button>
    </form>
  )
}

export default LoginForm