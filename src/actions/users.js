import { _saveUser } from '../utils/_DATA'

export const RECEIVE_USERS = 'RECEIVE_USERS'
export const ADD_USER = 'ADD_USER'

export function receiveUsers(users) {
    return {
        type: RECEIVE_USERS,
        users
    }
}

function addUser(user) {
    return {
        type: ADD_USER,
        user
    }
}

export function handleAddUser(login, name, avatarURL) {
    return (dispatch) => {
        let user = { login, name, avatarURL }
        return _saveUser(user)
            .then(returnedUser => {
                dispatch(addUser(returnedUser))
            })
    }
}