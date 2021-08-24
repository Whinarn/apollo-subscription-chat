import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import RoomPage from './pages/RoomPage';
import JoinPage from './pages/JoinPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/:roomId">
          <RoomPage />
        </Route>
        <Route path="/">
          <JoinPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
