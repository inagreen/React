import Product from './Components/Product/Product';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/product">
            <Product dataUrl="http://localhost:8000/product"/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
