import React, {useEffect} from 'react'
import './App.css';
import Messages from './Components/Messages'
import Login from './Components/Login'
import { useSelector, useDispatch } from 'react-redux'
import { LoginToAccount } from './actions'
import Chat from './Components/Chat'
import { Route } from 'react-router-dom';
function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(LoginToAccount(localStorage.getItem('username')))
  }, [])
  const auth = useSelector(state => state.user.auth)
  const current_person_that_you_messaging = useSelector(state => state.user.current_person)
  
  return (
    <>
    { current_person_that_you_messaging !== null && auth ? <Route path={`/messages/${localStorage.getItem('current')}`} component={Chat} exact /> : null}
    { auth ? <Route path="/" component={Messages} exact /> : <Route path="/" component={Login} exact />}
    </>
  )
}

export default App;
