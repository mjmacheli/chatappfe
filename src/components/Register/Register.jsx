import {useState} from 'react'

import { useHistory, Link } from 'react-router-dom'

import { Input, Button, Form, Container } from 'semantic-ui-react'

import './Register.scss'

const Register = () => {

    const [email,setEmail] = useState('')

    const [ password, setPassword] = useState('')

    const [ confirm, setConfirm ] = useState('')

    const history = useHistory()

    const url = `http://localhost:3001/register`
    
    const validateForm = () => password.length > 0 && (confirm === password)

    const handleSubmit = (event) => {
      event.preventDefault()
      sendData()
    }

    const nextPage = () => {
      history.push({
        pathname:'/',
        state: {}
      })
    }

    const sendData = async () => {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            "accept": "*/*",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ 
            username: email,
            password: password
          })
        })
        if (response.status === 200) {
          nextPage()
        }
    }

    return (
    <Container as='fieldset' className='regContainer'>
       <legend><h1>Register</h1></legend>
      <Form  onSubmit={handleSubmit}>

      <Form.Field required >
          <label>Email</label>
          <Input placeholder='email'
            icon='user' iconPosition='left' 
            onChange={ e => setEmail(e.target.value)} />
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

        <Form.Field required>
          <label>Confirm Password</label>
          <Input 
            icon='lock' 
            iconPosition='left' 
            placeholder='Confirm Password'
            type='password'
            onChange={e => setConfirm(e.target.value)}
          />
        </Form.Field>
        { ((password.length > 2) && (confirm !== password)) && <p style={{color: 'red'}}>passwords do not match</p>}
        <Button 
          className='loginBtn' 
          toggle 
          fluid 
          type='submit'
          disabled={!validateForm()}
          size='big'>Register</Button>
        
        Have an account? <Link to='/'>Login</Link>
      </Form>
    </Container>
    )}

export default Register