import React, { Component } from 'react';
import './assets/App.css';
import { Switch, Route } from 'react-router-dom'

import QuestionView from './components/QuestionView'
import Feed from './components/Feed';
import QuestionsList from './components/QuestionList'
import DefaultLayout from './containers/DefaultLayout'

class App extends Component {
 render() {
  return (
   <div className="App">
   <DefaultLayout />
            <Switch>                
                    <Route exact path="/" component={QuestionsList} />
                    <Route path="/questions/:id" component={QuestionView} />
                    <Route path="/feed" component={Feed} />
            </Switch>
            <Feed />
   </div>
  );
 }
}

export default App;