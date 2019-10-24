import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { handleAddQuestion } from '../actions/shared'

class NewQuestion extends Component {
    state = {
        options: {0: '', 1: ''}
    }

    handleOptions = (e,option) => {
        const value = e.target.value
        const theOtherOption = option === 1 ? 0 : 1
        this.setState((currentState) => ({
            options: {[option]: value, [theOtherOption]: currentState.options[theOtherOption]}
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
        return (
            <div className='question flexbox-container full-question'>
                <h3>New Question</h3>
                <form className='flexbox-container question-body'
                    onSubmit={this.addQuestion}>
                    <label className='italic-label'>Complete the question:</label>
                    <label className='big-label'>Would you rather...</label>
                    <input 
                        type="text" 
                        placeholder='Enter option one text here'
                        value={this.state.options[0]}
                        onChange={(e) => this.handleOptions(e,0)}
                        />
                    <label className='big-label'>OR</label>
                    <input 
                        type="text" 
                        placeholder='Enter option two text here'
                        value={this.state.options[1]}
                        onChange={(e) => this.handleOptions(e,1)}
                        />
                    <button disabled={this.state.options[0] === '' || this.state.options[1] === ''}>Submit</button>
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