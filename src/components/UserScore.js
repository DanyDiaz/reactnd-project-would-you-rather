import React, { Component } from 'react'
import { connect } from 'react-redux'

class UserScore extends Component {
    render() {
        const { user } = this.props
        let avatar = new Image()
        avatar.src = user.avatarURL
        return (
            <div className='user flexbox-container'>
                <div className='big-avatar flexbox-container'>
                    <img src={avatar.src} alt={`Avatar of the user ${user.name}`} />
                </div>
                <div className='user-score flexbox-container'>
                    <h3 className='big-label'>{user.name}</h3>
                    <table>
                        <thead />
                        <tbody>
                            <tr>
                                <td>Answered questions</td>
                                <td>{user.answeredQuestions}</td>
                            </tr>
                            <tr>
                                <td>Created questions</td>
                                <td>{user.createdQuestions}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className='score flexbox-container'>
                        <h4>Score</h4>
                        <label>{user.answeredQuestions + user.createdQuestions}</label>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({users}, {id}) {
    const user = users[id]
    return {
        user: {
            id,
            avatarURL: user.avatarURL,
            name: user.name,
            answeredQuestions: Object.values(user.answers).length,
            createdQuestions: user.questions.length
        }
    }
}

export default connect(mapStateToProps)(UserScore)