import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading-bar'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import SignIn from './SignIn'
import { handleInitialData } from '../actions/shared'
import Nav from './Nav'
import QuestionDashboard from './QuestionDashboard'
import Question from './Question'
import NewQuestion from './NewQuestion'
import NotFound from './NotFound'
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
        <Fragment>
          <LoadingBar />
          {loading === false && (
            <Fragment>
              <Route path='/' render={() => 
                (authedUser === null 
                  ? <SignIn />
                  : <Fragment>
                      <Nav />
                      <Switch>
                        <Route exact path='/' component={QuestionDashboard} />
                        <Route path='/add' component={NewQuestion} />
                        <Route path='/questions/:id' component={Question} />
                        <Route component={NotFound} />
                      </Switch>
                    </Fragment>
                )
              }/>
            </Fragment>
          )}
        </Fragment>
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
