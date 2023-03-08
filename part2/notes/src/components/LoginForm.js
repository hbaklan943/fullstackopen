const LoginForm = ({
  handleLogin,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => (
  <form onSubmit={handleLogin}>
    <div>
      username
      <input
        type='text'
        value={username}
        name='Username'
        onChange={handleUsernameChange}
      ></input>
    </div>
    <div>
      password
      <input
        type='password'
        value={password}
        name='Password'
        onChange={handlePasswordChange}
      ></input>
    </div>
    <button type='submit'>Login</button>
  </form>
)

export default LoginForm