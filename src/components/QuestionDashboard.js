import React, { Component } from 'react'
import { connect } from 'react-redux'
import QuestionPreview from './QuestionPreview'

class QuestionDashboard extends Component {
    state = {
        unansweredChosen: true
    }

    setUnasweredActive = () => {
        if(this.state.unansweredChosen === false) {
            this.setState(() => ({
                unansweredChosen: true 
            }))
        }
    }

    setAnsweredActive = () => {
        if(this.state.unansweredChosen === true) {
            this.setState(() => ({
                unansweredChosen: false
            }))
        }
    }

    render() {
        const { questions, authedUser } = this.props
        let filteredQuestions = questions
            .filter(question => !question.votes.includes(authedUser) === this.state.unansweredChosen)
            .sort((a,b) => b.timestamp - a.timestamp)
        
        return (
            <div className='flexbox-container question-dashboard'>
                <button 
                    className={this.state.unansweredChosen === true ? 'active-question-category' : 'question-category'} 
                    onClick={this.setUnasweredActive}>
                    Unanswered questions
                </button>
                <button 
                    className={this.state.unansweredChosen === true ? 'question-category' : 'active-question-category'} 
                    onClick={this.setAnsweredActive}>
                    Answered questions
                </button>
                {filteredQuestions.length > 0
                ? <ul>
                    {filteredQuestions.map(question => (
                        <li key={question.id}>
                            <QuestionPreview id={question.id} />
                        </li>
                    ))}
                </ul>
                : <label className='big-label'>
                    You have not answered any question yet.
                </label>
                }
            </div>
        )
    }
}

function mapStateToProps({questions, authedUser}) {
    return {
        questions: Object.values(questions)
            .map(question => ({
                id: question.id, 
                votes: question.optionOne.votes.concat(question.optionTwo.votes),
                timestamp: question.timestamp
            }))
            .sort((a,b) => b.timestamp - a.timestamp),
        authedUser
    }
}

export default connect(mapStateToProps)(QuestionDashboard)