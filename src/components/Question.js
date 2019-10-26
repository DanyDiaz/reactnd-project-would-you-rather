import React, { Component } from 'react'
import { connect } from 'react-redux'
import NotFound from './NotFound'
import QuestionDetails from './QuestionDetails'
import AnswerQuestion from './AnswerQuestion'

class Question extends Component {
    render() {
        const { question } = this.props

        if(question === null) {
            return <NotFound />
        }

        return (
            question.isAnsweredByCurrentUser
            ? <QuestionDetails id={question.id} />
            : <AnswerQuestion id={question.id} />
        )
    }
}

function mapStateToProps({questions, authedUser}, { match }) {
    const { id } = match.params
    const question = questions[id]
    if(question === undefined) {
        return { question: null }
    }

    return {
        question: {
            id,
            isAnsweredByCurrentUser: question.optionOne.votes
                .concat(question.optionTwo.votes).includes(authedUser)
        }
    }
}

export default connect(mapStateToProps)(Question)