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
import LeaderBoard from './LeaderBoard'
import NewUser from './NewUser'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    const { loading, authedUser } = this.props
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          {loading === false && (
            <Route path='/' render={() => 
              (authedUser === null 
                ? <Switch>
                    <Route path='/newUser' component={NewUser} />
                    <Route component={SignIn} />
                  </Switch> 
                : <Fragment>
                    <Nav />
                    <Switch>
                      <Route exact path='/' component={QuestionDashboard} />
                      <Route path='/add' component={NewQuestion} />
                      <Route path='/leaderboard' component={LeaderBoard} />
                      <Route path='/questions/:id' component={Question} />
                      <Route component={NotFound} />
                    </Switch>
                  </Fragment>
              )
            }/>
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
