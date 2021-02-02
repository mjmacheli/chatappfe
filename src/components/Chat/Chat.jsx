import {useState,useEffect} from 'react'
import { Button, Comment, Form, Header } from 'semantic-ui-react'

const Chats = ({location}) => {

    const [chats,setChats] = useState()
    const [conv, setConv] = useState([])
    const [msg, setMsg] = useState('')
    const [sent,setSent] = useState(true)

    useEffect(() => {
        const chat = location.state
        setChats(chat)
        getchat(chat)
    },[sent])

    const getchat = async (chat) => {
        const url = 'http://localhost:3001/chats/convo'
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            "accept": "*/*",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ 
            id: chat.sender._id,
          })
        })
        if (response.status === 200) {
            const res = await response.json()
            setConv(res)
        }
    }

    const addchat = async () => {
        setSent(!sent)
        const url = 'http://localhost:3001/chats/add'
        await fetch(url, {
          method: 'POST',
          headers: {
            "accept": "*/*",
            "Content-Type": "application/json"
          },body: JSON.stringify({ 
            senderId: chats.sender._id,
            sendeeId: chats.sendee._id,
            message: msg
          })
        })
    }

    return (
        <Comment.Group>
            <Header as='h3' dividing>
            Chat
            </Header>
           
            {
                conv && conv.map(c => 
                <Comment key={c._id}>
                    <Comment.Avatar src='https://www.w3schools.com/howto/img_avatar.png' />
                    <Comment.Content>
                        <Comment.Author as='a'>{c.senderId === chats.sender._id ? chats.sender.username : chats.sendee.username}</Comment.Author>
                        <Comment.Text>{c.message}</Comment.Text>
                    </Comment.Content>
                </Comment>)
            }

            <Form reply>
            <Form.TextArea 
                onChange={e => setMsg(e.target.value)}
            />
            <Button 
                content='Add Reply' 
                labelPosition='left' 
                icon='edit' 
                primary 
                onClick={ () => addchat()}
                />
            </Form>
        </Comment.Group>
    )
}

export default Chats