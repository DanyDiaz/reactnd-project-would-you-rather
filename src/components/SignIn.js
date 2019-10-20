import React, { Component } from 'react'
import { IoIosLogIn } from 'react-icons/io'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'

class SignIn extends Component {
    state = {
        userId: '-1'
    }

    handleChange = (event) => {
        let value = event.target.value
        this.setState((currentState) => ({
            userId: value
        }))
    }

    setAuthedUser = () => {
        const { dispatch } = this.props
        dispatch(setAuthedUser(this.state.userId))
    }

    render() {
        const { users } = this.props
        return (
            <div className='signin-container'>
                <h1>Welcome to the Would you rather app!</h1>
                <IoIosLogIn className= 'sign-in-image' size={96} />
                <h2>Sign in</h2>
                <select className='userlist-dropdown' defaultValue='-1' onChange={this.handleChange}>
                    <option value='-1'>Select a user</option>
                    {users.map(user => (
                        <option key={user.id} value={user.id}>{user.name}</option>
                    ))}
                </select>
                <button disabled={this.state.userId === '-1'} onClick={this.setAuthedUser}>Sign in</button>
            </div>
        )
    }
}

function mapStateToProps({users}) {
    return {
        users: Object.values(users)
    }
}

export default connect(mapStateToProps)(SignIn)