import {getNotify,postDataAPI } from './../api/notify'
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