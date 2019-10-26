import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import ImageInput from './ImageInput'
import { handleAddUser } from '../actions/users'

class NewUser extends Component {
    state = {
        login: '',
        name: '',
        imageValue: ''
    }

    handleImageValue = (newImageValue) => {
        this.setState(() => ({
            imageValue: newImageValue
        }))
    }

    handleLogin = (e) => {
        const login = e.target.value
        this.setState(() => ({
            login: login.trim()
        }))
    }

    handleName = (e) => {
        const name = e.target.value
        this.setState(() => ({
            name: name
        }))
    }

    cancel = () => {
        this.props.history.push('/')
    }

    createNewUser = (e) => {
        e.preventDefault()
        const { login, name, imageValue } = this.state
        const { dispatch, history } = this.props

        dispatch(handleAddUser(login, name, imageValue))
        history.push('/')
    }

    render() {
        return (
            <div className='new-user-container flexbox-container'>
                <h2>New user</h2>
                <form className='flexbox-container' onSubmit={this.createNewUser}>
                    <input 
                        type="text" 
                        placeholder='Please enter the user login'
                        value={this.state.login}
                        onChange={this.handleLogin} />
                    <label className={this.props.users.includes(this.state.login)
                        ? 'error-message'
                        : 'hidden-message'}>
                        This login already exists in the system, please try another one
                    </label>
                    <input 
                        type="text" 
                        placeholder='Please enter the user name'
                        value={this.state.name}
                        onChange={this.handleName} />
                    <label className='italic-label'>Click on the icon and choose a picture for your avatar</label>
                    <ImageInput
                        className='new-user-image-input'
                        name='avatarURL'
                        maxHeight={125}
                        onChangeImageValue={this.handleImageValue}
                        />
                    <button
                        disabled={this.state.login === '' || this.state.name === '' || this.state.imageValue === ''
                            || this.props.users.includes(this.state.login)} >
                        Create
                    </button>
                </form>
                <div className='flexbox-container'>
                    <button onClick={this.cancel}>Cancel</button>
                </div>
            </div>
        )
    }
}

function mapStateToProps({users}) {
    return {
        users: Object.keys(users)
    }
}

export default withRouter(connect(mapStateToProps)(NewUser))