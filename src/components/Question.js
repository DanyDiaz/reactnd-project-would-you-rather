import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { handleAnswerQuestion } from '../actions/shared'

class Question extends Component {
    state = {
        answer: '-1'
    }

    handleChange = (e) => {
        const value = e.target.value
        this.setState(() => ({
            answer: value
        }))    
    }

    submitQuestion = (e) => {
        const { authedUser, question, dispatch } = this.props
        const { answer } = this.state
        e.preventDefault()
        dispatch(handleAnswerQuestion(authedUser, question.id, answer))
    }

    render() {
        const { author, question } = this.props
        const avatar = require('../' + author.avatarURL)
        const votesTotal = question.options[0].numVotes + question.options[1].numVotes
        return (
            <div className='question flexbox-container full-question'>
                {!question.isAnsweredByCurrentUser
                ? <Fragment>
                    <h3>{author.name} asks</h3>
                    <form 
                        className='flexbox-container question-body'
                        onSubmit={this.submitQuestion}>
                        <div className='flexbox-container big-avatar'>
                            <img src={avatar} alt={`Avatar of the user ${author.name}`} />
                        </div>
                        <div className='flexbox-container question-text'>
                            <h4>Would you rather...</h4>
                            {question.options.map(option => (
                                <Fragment key={option.id}>
                                    <input 
                                        type='radio' 
                                        name='Answer' 
                                        id={`${option.id}`} 
                                        value={option.id} 
                                        onClick={this.handleChange}/>
                                    <label 
                                        className='question-label' 
                                        htmlFor={`${option.id}`}>
                                        {`${option.text}?`}
                                    </label>    
                                </Fragment>
                            ))}
                            <button disabled={this.state.answer === '-1'}>Submit</button>
                        </div>
                    </form>
                </Fragment>
                : <Fragment>
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
                </Fragment>
                }
            </div>
        )
    }
}

function mapStateToProps({questions,users, authedUser}, { match }) {
    const { id } = match.params
    return {
        author: {
            id: questions[id].author,
            name: users[questions[id].author].name,
            avatarURL: users[questions[id].author].avatarURL
        },
        question: {
            id,
            isAnsweredByCurrentUser: questions[id].optionOne.votes
                .concat(questions[id].optionTwo.votes).includes(authedUser),
            timestamp: questions[id].timestamp,
            options: [
                {
                    id: 'optionOne', 
                    ...questions[id].optionOne, 
                    numVotes: questions[id].optionOne.votes.length,
                    isSelected: questions[id].optionOne.votes.includes(authedUser)
                }, 
                {
                    id: 'optionTwo', 
                    ...questions[id].optionTwo, 
                    numVotes: questions[id].optionTwo.votes.length,
                    isSelected: questions[id].optionTwo.votes.includes(authedUser)
                }
            ]
        },
        authedUser
    }
}

export default connect(mapStateToProps)(Question)