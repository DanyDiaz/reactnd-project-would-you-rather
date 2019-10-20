import React, { Component } from 'react'
import { connect } from 'react-redux'
import SignIn from './SignIn'
import { handleInitialData } from '../actions/shared'
import LoadingBar from 'react-redux-loading-bar'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    const { loading, authedUser } = this.props
    return (
      <div>
        <LoadingBar />
        {loading === false && authedUser === null && <SignIn />}
        {loading === false && authedUser !== null && (
          null
        )}
      </div>
    )
  }
}

function mapStateToProps({users, authedUser}) {
  return {
    loading: users === null || Object.keys(users).length < 1,
    authedUser
  }
}

export default connect(mapStateToProps)(App)
