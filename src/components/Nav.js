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
        let { username } = this.props
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
                        <label className='nav-link'>Hi, {username}</label>
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
        username: users[authedUser].name
    }
}

export default connect(mapStateToProps)(Nav)