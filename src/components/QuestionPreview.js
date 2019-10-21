import React, { Component } from 'react'
import { connect } from 'react-redux'

class QuestionPreview extends Component {
    render() {
        const { author, question } = this.props
        const avatar = require('../' + author.avatarURL)
        return (
            <div className='question-preview flexbox-container'>
                <h3>{author.name} asks</h3>
                <div className='flexbox-container question-preview-body'>
                    <div className='flexbox-container avatar'>
                        <img src={avatar} alt={`Avatar of the user ${author.name}`} />
                    </div>
                    <div className='flexbox-container question-preview-text'>
                        <h4>Would you rather?</h4>
                        <label>...{question.optionOneText}...</label>
                        <button>View question details</button>
                    </div>
                </div>
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

export default connect(mapStateToProps)(QuestionPreview)