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
        const avatar = require('../' + author.avatarURL)
        return (
            <div className='question flexbox-container'>
                <h3>{author.name} asks</h3>
                <form 
                    className='flexbox-container question-body'
                    onSubmit={this.goToQuestionDetails}>
                    <div className='flexbox-container avatar'>
                        <img src={avatar} alt={`Avatar of the user ${author.name}`} />
                    </div>
                    <div className='flexbox-container question-text'>
                        <h4>Would you rather?</h4>
                        <label className='question-label'>...{question.optionOneText}...</label>
                        <button>View full question</button>
                    </div>
                </form>
            </div>
        )
    }
}

function mapStateToProps({questions,users}, { id }) {
    return {
        author: {
            id: questions[id].author,
            name: users[questions[id].author].name,
            avatarURL: users[questions[id].author].avatarURL
        },
        question: {
            id,
            optionOneText: questions[id].optionOne.text
        }
    }
}

export default withRouter(connect(mapStateToProps)(QuestionPreview))