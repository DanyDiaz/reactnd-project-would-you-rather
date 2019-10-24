import { RECEIVE_QUESTIONS, ADD_QUESTION } from '../actions/questions'
import { ANSWER_QUESTION } from '../actions/shared'

export default function questions(state = {}, action) {
    switch(action.type) {
        case RECEIVE_QUESTIONS:
            return {
                ...state,
                ...action.questions
            }
        case ANSWER_QUESTION:
            return {
                ...state,
                [action.questionId]: {
                    ...state[action.questionId],
                    [action.answer]: {
                        ...state[action.questionId][action.answer],
                        votes: state[action.questionId][action.answer].votes.concat([action.userId])
                    }
                }
            }
        case ADD_QUESTION:
            return {
                ...state,
                [action.question.id]: action.question
            }
        default:
            return state
    }
}