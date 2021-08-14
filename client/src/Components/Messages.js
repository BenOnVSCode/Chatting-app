import React, {useState} from 'react'
import { List, Input, Button, Tooltip, Modal } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { SendMessage} from '../actions'
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';

import './Messages.css'
const Messages = () => {  
  const [modal, contextHolder] = Modal.useModal();
  localStorage.removeItem('current')
  const dispatch = useDispatch()
    let users = []
    const messages = useSelector(state => state.user.user.user.messages)
    const [username, setusername] = useState('')
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [newMessage, setnewMessage] = useState('')
    const ReachableContext = React.createContext();
    const UnreachableContext = React.createContext();
    const config = {
      title: 'No user with this username  !',
      content: (
        null
      ),
    };
    const showModal = () => {
      setVisible(true);
    };
  
    const handleOk = () => {
      if(newMessage.trim().length > 0) {
        dispatch(SendMessage(username, newMessage))
        setConfirmLoading(true);
        setTimeout(() => {
          setVisible(false);
          setConfirmLoading(false);
          window.location.reload()
        }, 3000);
        }
        
     };
  
    const handleCancel = () => {
      setVisible(false);
    };
    for(let i = 0 ; i < messages.length ; i++) {
      if(messages[i].member1 !== localStorage.getItem('username')) {
        let index = messages[i].chat.length - 1
        users = [...users, {
          username: messages[i].member1,
          latest: messages[i].chat[index]
        }]
      }
      if(messages[i].member2 !== localStorage.getItem('username')) {
        let index = messages[i].chat.length - 1
        users = [...users, {
          username: messages[i].member2,
          latest: messages[i].chat[index]
        }]
      }
    }

    const searchnew = (username) => {
      axios.get(`/newfriend/${username}`)
        .then(res => {
          if(res.data) showModal()
          else {
            modal.error(config)
          }
        })
    }


      
    
    return (
        <>
            
                <div className="search-container">
                  <Input onChange={(e) => setusername(e.target.value)} style={{borderRadius: '5px', marginRight: "0.3rem" }} placeholder="Message new person ?"/>
                  <Tooltip title="search">
                    <Button onClick={() => searchnew(username)} shape="circle" icon={<SearchOutlined />} />
                  </Tooltip>
                </div>
                <List
                itemLayout="horizontal"
                dataSource={users}
                renderItem={item => (
                <List.Item> 
                      <List.Item.Meta
                          style={{paddingLeft: '1rem'}}
                      title={<a onClick={() => localStorage.setItem('current', item.username)} href={`/messages/${item.username}`}>{item.username}</a>}
                      description={item.latest.him || item.latest.me}
                      />
                </List.Item>
                )}
            />
             
             <Modal
                  title={username}
                  visible={visible}
                  onOk={handleOk}
                  confirmLoading={confirmLoading}
                  onCancel={handleCancel}
                >
                  <Input onChange={(e) => setnewMessage(e.target.value)} placeholder="First message" />
              </Modal>

              <ReachableContext.Provider value="Light">
                {contextHolder}
                <UnreachableContext.Provider value="Bamboo" />
              </ReachableContext.Provider>
              
      
        </>
    )
}

export default Messages
