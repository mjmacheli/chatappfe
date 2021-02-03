import {useState} from 'react'
import { Container,Menu,Input } from 'semantic-ui-react'
import {BrowserRouter as Router ,Switch,Route, useHistory } from 'react-router-dom'

import FriendsList from './components/FriendsList/FriendsList'
import Chats from './components/Chat/Chat'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Group from './components/Group/Group'

const App = () => {

  const history = useHistory()
  
  const [activeItem,setActiveItem] = useState('Friends')

  const handleItemClick = (name) => setActiveItem(name)

  return (
    <Router>
    <Container>
        <Menu secondary>
          <Menu.Item
            name='Chats'
            active={activeItem === 'Chats'}
            onClick={() => handleItemClick('Chats')}
          />
          <Menu.Item
            name='Groups'
            active={activeItem === 'Groups'}
            onClick={() => handleItemClick('Groups')}
          />
          <Menu.Item
            name='Friends'
            active={activeItem === 'Friends'}
            onClick={() => handleItemClick('Friends')}
          />
          <Menu.Menu position='right'>
            <Menu.Item>
              <Input icon='search' placeholder='Find Friends...' />
            </Menu.Item>
            <Menu.Item
              name='Logout'
              active={activeItem === 'Logout'}
              onClick={() => handleItemClick('Logout')}
            />
          </Menu.Menu>
        </Menu>
        <Switch>
          <Route path='/' component={Group} exact/>
          <Route path='/register' component={Register} exact /> 
          <Route path='/home' component={FriendsList} exact/>
          <Route path='/chat' component={Chats} exact/>
          <Route path='/group' component={Group} exact/>
        </Switch>
    </Container>
    </Router>
  )
}

export default App;
