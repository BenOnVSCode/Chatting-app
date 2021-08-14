import React, {useState} from 'react'
import { Input, Typography, Button } from 'antd'
import { useDispatch } from 'react-redux'
import { LoginToAccount } from '../actions'
const Login = () => {
    const { Text } =  Typography
    const dispatch = useDispatch()
    const [username, setusername] = useState('')
    
    return (
        <div className="login-container">
            <div className="input-container_">
                <Input
                    onChange={(e) => setusername(e.target.value)}
                placeholder="Your username!" style={{width: '300px', marginTop: '2rem'}}  />
                <Button type="primary" 
                    onClick={() => dispatch(LoginToAccount(username))}
                >
                    Login
                </Button>
            </div>
            <Text type="warning">Enter any username you want it's just for tssting purposes:(</Text>
        </div>
    )
}

export default Login
