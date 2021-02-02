import {useState,useEffect} from 'react'
import { useHistory} from 'react-router-dom'

import { List, Image, Button } from 'semantic-ui-react'

const FriendsList = () => {

    const history = useHistory()

    const [users,setUsers] = useState([])
    const [user] = useState(JSON.parse(localStorage.getItem('user')))

    useEffect(async () => {
        const response = await fetch('http://localhost:3001', {
            method: 'get',
            headers: {
              "accept": "*/*",
              "Content-Type": "application/json"
            }
          })
        if (response.status === 200) {
          const results = await response.json()
          setUsers(results)
        }
    },[])

    const gotochat = (sendee) => (
        history.push({
            pathname:'/chat',
            state: {
                sender: user,
                sendee: sendee
            }
        })
    )
        


    return (
        <List divided relaxed selection>
        {
            users && users.map(n => 
            <List.Item 
                key={n._id}
                onClick={() => gotochat(n)}    
            >
                <List.Content floated='right'>
                    <Button>Chat</Button>
                </List.Content>
                <Image avatar src='https://static.toiimg.com/thumb/msid-76729750,width-640,resizemode-4/76729750.jpg' />
                <List.Content>{n.username}</List.Content>

            </List.Item>)
        }
    
    </List>
    )
}

export default FriendsList