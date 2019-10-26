import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class QuestionPreview extends Component {
    goToQuestionDetails = (e) => {
        const { history, question } = this.props
        e.preventDefault()
        history.push(`/questions/${question.id}`)
    }

    render() {
        const { author, question } = this.props
        let avatar = new Image()
        avatar.src = author.avatarURL
        return (
            <div className='question flexbox-container'>
                <h3>{author.name} asks</h3>
                <form 
                    className='flexbox-container question-body'
                    onSubmit={this.goToQuestionDetails}>
                    <div className='flexbox-container avatar'>
                        <img src={avatar.src} alt={`Avatar of the user ${author.name}`} />
                    </div>
                    <div className='flexbox-container question-text'>
                        <label className='creation-date'>Created on: {formatDate(question.timestamp)}</label>
                        <h4>Would you rather?</h4>
                        <label className='question-label'>...{question.optionOneText}...</label>
                        <button>View full question</button>
                    </div>
                </form>
            </div>
        )
    }
}

function formatDate (timestamp) {
    const d = new Date(timestamp)
    const time = d.toLocaleTimeString('en-US')
    const onlyHourAndMinute = time.substr(4,1) === ':' ? time.substr(0, 4) : time.substr(0, 5)
    return d.toLocaleDateString() +' ' + onlyHourAndMinute +' ' + time.slice(-2)
}

function mapStateToProps({questions,users}, { id }) {
    const question = questions[id]
    return {
        author: {
            id: question.author,
            name: users[question.author].name,
            avatarURL: users[question.author].avatarURL
        },
        question: {
            id,
            timestamp: question.timestamp,
            optionOneText: question.optionOne.text
        }
    }
}

export default withRouter(connect(mapStateToProps)(QuestionPreview))