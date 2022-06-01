import {getNotify,postDataAPI,patchDataAPI,deleteDataAPI } from './../api/notify'
export const NOTIFY_TYPES = {
    GET_NOTIFIES: 'GET_NOTIFIES',
    CREATE_NOTIFY: 'CREATE_NOTIFY',
    REMOVE_NOTIFY: 'REMOVE_NOTIFY',
    UPDATE_NOTIFY: 'UPDATE_NOTIFY',
    UPDATE_SOUND: 'UPDATE_SOUND',
    DELETE_ALL_NOTIFIES: 'DELETE_ALL_NOTIFIES'
}






export const getNotifies = () => async (dispatch) => {
    try {
        const res = await getNotify()
        
        dispatch({ type: NOTIFY_TYPES.GET_NOTIFIES, payload: res.data.notifies })
    } catch (err) {
       console.log(err.response)
    }
}


export const createNotify = ({msg,socket,user}) => async (dispatch) => {
    try {
       
        const res = await postDataAPI(msg)

        socket.emit('createNotify', {
            ...res.data.notify,
            user: {
                username: user.name,
                avatar: user.avatar
            }
        })
    } catch (err) {
     
       console.log(err)
    }
}



export const isReadNotify = ({msg}) => async (dispatch) => {
   
    dispatch({type: NOTIFY_TYPES.UPDATE_NOTIFY, payload: {...msg, isRead: true}})
    try {
       
        await patchDataAPI(msg._id,null)

      
    } catch (err) {
     
       console.log(err)
    }
}



export const removeNotify = ({msg, socket}) => async (dispatch) => {
    try {
        await deleteDataAPI(msg)
        
        socket.emit('removeNotify', msg)
    } catch (err) {
       console.log(err)
    }
}
