import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'

class Nav extends Component {
    logOut = () => {
        const { dispatch } = this.props
        dispatch(setAuthedUser(null))
    }

    render() {
        let { username, avatarURL } = this.props
        let avatar = new Image()
        avatar.src = avatarURL
        return (
            <nav>
                <ul>
                    <li>
                        <NavLink to='/' exact activeClassName='nav-active'>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to='/add' activeClassName='nav-active'>New Question</NavLink>
                    </li>
                    <li>
                        <NavLink to='/leaderboard' activeClassName='nav-active'>Leader Board</NavLink>
                    </li>
                    <li>
                        <label className='nav-link'>
                            <img src={avatar.src} alt={`Avatar of the user ${username}`} />
                            Hi, {username}
                        </label>
                    </li>
                    <li>
                        <button className='nav-link' onClick={this.logOut}>Logout</button>
                    </li>
                </ul>
                <hr/>
            </nav>
        )
    }
}

function mapStateToProps({authedUser, users}) {
    return {
        username: users[authedUser].name,
        avatarURL: users[authedUser].avatarURL
    }
}

export default connect(mapStateToProps)(Nav)