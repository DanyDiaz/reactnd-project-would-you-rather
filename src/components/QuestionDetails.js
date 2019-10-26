import React, { Component } from 'react'
import { connect } from 'react-redux'

class QuestionDetails extends Component {
    render() {
        const { author, question } = this.props
        const avatar = require('../' + author.avatarURL)
        const votesTotal = question.options[0].numVotes + question.options[1].numVotes
        return (
            <div className='question flexbox-container full-question'>
                <h3>Asked by {author.name}</h3>
                <div className='flexbox-container question-body'>
                    <div className='flexbox-container big-avatar'>
                        <img src={avatar} alt={`Avatar of the user ${author.name}`} />
                    </div>
                    <div className='flexbox-container question-text'>
                        <label className='question-text-result'>Results: </label>
                        {question.options.map(option => {
                            const percentage = (option.numVotes / votesTotal) * 100
                            return <div 
                                key={option.id} 
                                className={`question-result flexbox-container ${option.isSelected === true
                                    ? 'question-result-selected'
                                    : ''}`}>
                                {option.isSelected && <label className='select-comment'>Your vote</label>}
                                <label>Would you rather {option.text}?</label>
                                <div className='progressbar-border'>
                                    <div 
                                        className='progressbar-result'
                                        style={{width: `${percentage}%`}} />
                                </div>
                                <label>{option.numVotes} out of {votesTotal} votes</label>
                            </div>
                        })}
                        </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({questions,users, authedUser}, { id }) {
    const question = questions[id]
    const user = users[question.author]
    return {
        author: {
            id: question.author,
            name: user.name,
            avatarURL: user.avatarURL
        },
        question: {
            id,
            options: [
                {
                    id: 'optionOne', 
                    text: question.optionOne.text, 
                    numVotes: question.optionOne.votes.length,
                    isSelected: question.optionOne.votes.includes(authedUser)
                }, 
                {
                    id: 'optionTwo', 
                    text: question.optionTwo.text, 
                    numVotes: question.optionTwo.votes.length,
                    isSelected: question.optionTwo.votes.includes(authedUser)
                }
            ]
        }
    }
}

export default connect(mapStateToProps)(QuestionDetails)