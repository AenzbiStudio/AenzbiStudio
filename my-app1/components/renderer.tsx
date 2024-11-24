import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from '../shared/AuthContext';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import EditorPage from './pages/EditorPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route path="/dashboard" component={DashboardPage} />
          <Route path="/editor" component={EditorPage} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

