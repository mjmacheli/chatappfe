import  { useState } from 'react'

import { Link, useHistory} from 'react-router-dom'

import './Login.scss'

import { Input, Button, Form, Container } from 'semantic-ui-react'

const Login = () => {

  const history = useHistory()
  
  const handleSubmit = (event) => {
    event.preventDefault()
    sendData()
  }

  const nextPage = (user) => {
    history.push({
      pathname:'/home',
      state: {user}
    })
  }
  
  const [ username, setUsername ] = useState('')

  const [ password, setPassword] = useState('')

   const [incorrect, setError] = useState(false)

  const url = 'http://localhost:3001/login'
  
  const validateForm = () => username.length > 0 && password.length > 0

  const sendData = async () => {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          "accept": "*/*",
          "Content-Type": "application/json"
        },body: JSON.stringify({ 
          username,
          password
        })
      })
    if (response.status === 200) {
      const { user } = await response.json()
      if (user) {
        localStorage.setItem('user', JSON.stringify(user)) 
        nextPage()
      } else {
        setError(true)
      }
    }
  }

  return (
   
    <Container as='fieldset' className='loginContainer'>
       <legend><h1>Login</h1></legend>
      <Form onSubmit={handleSubmit} >

        <Form.Field required >
          <label>Email</label>
          <Input placeholder='email'
            icon='user' iconPosition='left' 
            onChange={ e => setUsername(e.target.value)} />
        </Form.Field>
        
        <Form.Field required>
          <label>Password</label>
          <Input 
            icon='lock' 
            iconPosition='left' 
            placeholder=' password'
            type='password'
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Field>
        <Button 
          className='loginBtn' toggle fluid type='submit' 
          disabled={!validateForm()}>Login</Button>
          {incorrect && <p style={{color: 'red'}}>username or password incorrect</p>}
          Don't have an account? <Link to='/register'>Register</Link>
      </Form>
    </Container>
  )
}

export default Login