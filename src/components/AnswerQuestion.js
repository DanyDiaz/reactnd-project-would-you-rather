import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { handleAnswerQuestion } from '../actions/shared'

class AnswerQuestion extends Component {
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
        let avatar = new Image()
        avatar.src = author.avatarURL
        return (
            <div className='question flexbox-container full-question'>
                <h3>{author.name} asks</h3>
                <form 
                    className='flexbox-container question-body'
                    onSubmit={this.submitQuestion}>
                    <div className='flexbox-container big-avatar'>
                        <img src={avatar.src} alt={`Avatar of the user ${author.name}`} />
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
                    text: question.optionOne.text
                }, 
                {
                    id: 'optionTwo', 
                    text: question.optionTwo.text
                }
            ]
        },
        authedUser
    }
}

export default connect(mapStateToProps)(AnswerQuestion)