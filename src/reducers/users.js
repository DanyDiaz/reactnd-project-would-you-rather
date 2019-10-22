import { RECEIVE_USERS } from '../actions/users'
import { ANSWER_QUESTION } from '../actions/shared'

export default function users(state = {}, action) {
    switch(action.type) {
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users
            }
        case ANSWER_QUESTION:
            return {
                ...state,
                [action.userId]: {
                    ...state[action.userId],
                    answers: {
                        ...state[action.userId].answers,
                        [action.questionId]: action.answer
                    }
                }
            }
        default:
            return state
    }
}