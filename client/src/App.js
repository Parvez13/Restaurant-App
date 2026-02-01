import {Switch, Route, Redirect} from 'react-router-dom'
import Home from './components/Home'
import Menu from './components/Menu'
import Orders from './components/Orders'
import NotFound from './components/NotFound'
import './App.css';

const App = () =>(
  <Switch>
    <Route exact path="/" component={Home}/>
    <Route exact path="/menu" component={Menu}/>
    <Route exact path="/orders" component={Orders}/>
    <Route path="/not-found" component={NotFound}/>
    <Redirect to="/not-found"/>
  </Switch>

)

export default App;
