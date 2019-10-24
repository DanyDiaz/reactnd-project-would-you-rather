import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { _getQuestions, _getUsers, _saveQuestionAnswer, _saveQuestion } from '../utils/_DATA'
import { receiveQuestions, addQuestion } from './questions'
import { receiveUsers } from './users'

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

export function handleAddQuestion(author, optionOneText, optionTwoText) {
    return (dispatch) => {
        return _saveQuestion({
            author, optionOneText, optionTwoText
        })
        .then(question => {
            dispatch(addQuestion(question))
        })
    }
}