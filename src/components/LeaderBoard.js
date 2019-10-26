import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserScore from './UserScore'

class LeaderBoard extends Component {
    render() {
        const { userIds } = this.props
        return (
            <div className='flexbox-container question-dashboard'>
                <h3>Leader Board</h3>
                {userIds.map(id => (
                    <UserScore key={id} id={id} />
                ))}
            </div>
        )
    }
}

function mapStateToProps({users}) {
    return {
        userIds: Object.values(users)
            .sort((a,b) => {
                //First order by highest score to the lowest
                if((Object.values(b.answers).length + b.questions.length) - (Object.values(a.answers).length + a.questions.length) !== 0)
                    return (Object.values(b.answers).length + b.questions.length) - (Object.values(a.answers).length + a.questions.length)
                //If two users have the same score, order by name alphabetically
                return a.name.localeCompare(b.name)
            })
            .map(user => user.id)
    }
}

export default connect(mapStateToProps)(LeaderBoard)