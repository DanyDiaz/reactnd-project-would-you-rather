import { RECEIVE_USERS, ADD_USER } from '../actions/users'
import { ANSWER_QUESTION } from '../actions/shared'
import { ADD_QUESTION } from '../actions/questions'

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
        case ADD_QUESTION:
            return {
                ...state,
                [action.question.author]: {
                    ...state[action.question.author],
                    questions: state[action.question.author].questions.concat([action.question.id])
                }
            }
        case ADD_USER:
            return {
                ...state,
                [action.user.id]: action.user
            }
        default:
            return state
    }
}