import React, { Component } from 'react';
import './assets/App.css';
import { Switch, Route } from 'react-router-dom'

import Header from './components/Header';
// import SignInWith from './components/SignInWith';
import Editor from './components/Editor'
import QuestionView from './components/QuestionView'
import Feed from './components/Feed';
import requireAuthentication from './utils/requireAuth'

class App extends Component {
 render() {
  const pathname = window.location.pathname
  return (
   <div className="App">
    <header className="App-header">
     <h1 className="App-title">Welcome to StackOverFlow Lite</h1>
    </header>
    { !pathname.includes('editor') ? <Header /> : '' }
            {/* <SignInWith /> */}
            <Switch>                
                    <Route exact path="/" component={Feed} />
                    <Route path="/questions/:id" component={QuestionView} />
                    <Route path="**" component={Feed} />
                    <Route path="/editor" component={requireAuthentication(Editor)} />
            </Switch>
   </div>
  );
 }
}

export default App;