import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading-bar'
import { BrowserRouter as Router } from 'react-router-dom'
import SignIn from './SignIn'
import { handleInitialData } from '../actions/shared'
import Nav from './Nav'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
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
