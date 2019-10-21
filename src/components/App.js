import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading-bar'
import { BrowserRouter as Router } from 'react-router-dom'
import SignIn from './SignIn'
import { handleInitialData } from '../actions/shared'
import Nav from './Nav'
import QuestionDashboard from './QuestionDashboard'
/****Remove this *****/ import { setAuthedUser } from '../actions/authedUser'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
    /****Remove this *****/ this.props.dispatch(setAuthedUser('tylermcginnis'))
  }

  render() {
    const { loading, authedUser } = this.props
    return (
      <Router>
        <LoadingBar />
        {loading === false && (
          <Fragment>
            {authedUser === null 
              ? <SignIn />
              : <Fragment>
                  <Nav />
                  <QuestionDashboard />
                </Fragment>
            }
          </Fragment>
        )}
      </Router>
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
