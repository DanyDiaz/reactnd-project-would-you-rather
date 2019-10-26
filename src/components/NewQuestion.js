import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { handleAddQuestion } from '../actions/shared'

class NewQuestion extends Component {
    state = {
        options: ['', '']
    }

    handleOptions = (e,option) => {
        const value = e.target.value
        const newOptions = option === 0 ? [value, this.state.options[1]] : [this.state.options[0], value]
        this.setState(() => ({
            options: newOptions
        }))
    }

    addQuestion = (e) => {
        const { dispatch, authedUser, history } = this.props
        const optionOneText = this.state.options[0]
        const optionTwoText = this.state.options[1]
        e.preventDefault()
        dispatch(handleAddQuestion(authedUser, optionOneText, optionTwoText))
        history.push('/')
    }

    render() {
        const labels = ['Would you rather...', 'OR']
        const placeholders = ['Enter option one text here', 'Enter option two text here']
        return (
            <div className='question flexbox-container full-question'>
                <h3>New Question</h3>
                <form className='flexbox-container question-body'
                    onSubmit={this.addQuestion}>
                    <label className='italic-label'>Complete the question:</label>
                    {this.state.options.map((option, index) => (
                        <Fragment key={index} >
                            <label className='big-label'>{labels[index]}</label>
                            <input 
                                type="text" 
                                placeholder={placeholders[index]}
                                value={option}
                                onChange={(e) => this.handleOptions(e,index)}
                                />
                        </Fragment>
                    ))}
                    <button 
                        disabled={this.state.options.map(option => option.trim()).includes('')
                                || this.state.options[0].trim().toLowerCase() === this.state.options[1].trim().toLowerCase()
                            }
                        >
                        Submit
                    </button>
                </form>
            </div>
        )
    }
}

function mapStateToProps({ authedUser }) {
    return {
        authedUser
    }
}

export default withRouter(connect(mapStateToProps)(NewQuestion))