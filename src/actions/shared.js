import { _getQuestions, _getUsers, _saveQuestionAnswer } from '../utils/_DATA'
import { receiveQuestions } from './questions'
import { receiveUsers } from './users'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export const ANSWER_QUESTION = 'ANSWER_QUESTION'

function answerQuestion(userId, questionId, answer) {
    return {
        type: ANSWER_QUESTION,
        userId,
        questionId,
        answer
    }
}

export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading())
        return Promise.all([_getQuestions(), _getUsers()])
            .then(([questions, users]) => {
                dispatch(receiveQuestions(questions))
                dispatch(receiveUsers(users))
                dispatch(hideLoading())
            })
    }
}

export function handleAnswerQuestion(userId, questionId, answer) {
    return (dispatch) => {
        return _saveQuestionAnswer({authedUser: userId, qid: questionId, answer})
            .then(() => {
                return dispatch(answerQuestion(userId, questionId, answer))
            })
    }
}