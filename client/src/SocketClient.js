import React, { useEffect ,useContext} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NOTIFY_TYPES } from './actions/notify'
import { AuthContext } from "./components/Context";




const SocketClient = () => {
    const {  socket, notify } = useSelector(state => state)
    const dispatch = useDispatch()
    const {user} = useContext(AuthContext)
    useEffect(() => {

        socket?.emit("newUser",user?.id)
         
    }, [socket,user])

 
  

   
    // Notification
    useEffect(() => {
       
        socket.on("createNotifyToClient",(msg)=>{
            dispatch({type: NOTIFY_TYPES.CREATE_NOTIFY, payload: msg})
          })

        return () => socket.off('createNotifyToClient')
    },[socket, dispatch, notify])

    useEffect(() => {
        socket.on('removeNotifyToClient', msg =>{
            dispatch({type: NOTIFY_TYPES.REMOVE_NOTIFY, payload: msg})
        })

        return () => socket.off('removeNotifyToClient')
    },[socket, dispatch])




    return (
        <>
          <div></div>
        </>
    )
}

export default SocketClient