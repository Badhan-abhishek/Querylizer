import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Visualizer from "./components/Visualizer/Visualizer"
import Home from "./components/Home/Home"

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/visualizer" component={Visualizer} />
      </Switch>
    </Router>
  );
}

export default App;
