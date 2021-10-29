import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import { Route,BrowserRouter as Router, Switch } from 'react-router-dom';
import Register from './components/Register';
import Home from './components/Home';
import Test from './components/Test';
import Chat from './components/Chat';
import List from './components/Qr/List';

function App() {
  return (
    <div className="App">
      
      <Router>
        <Switch>
          <Route exact path="/" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
          <Route path="/home" component={Home}></Route>
          <Route path="/test" component={Test}></Route>
          <Route path="/chat" component={Chat}></Route>
          <Route path="/qr-list" component={List}></Route>


        </Switch>
      </Router>
    </div>
  );
}

export default App;
