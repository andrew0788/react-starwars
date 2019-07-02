import React from 'react';
import StarshipPage from './pages/StarshipPage/StarshipPage'
import { Link, Switch, Route } from 'react-router-dom'
import { fetchAllStarships } from './services/sw-api'
import './App.css';

class App extends React.Component {

  state ={
    starships: []
  }

  getStarship = (idx) => {
    return this.state.starships[idx];
  }

  async componentDidMount(){
    let foundStarships = await fetchAllStarships();
    this.setState({
      starships: foundStarships.results
    });
  }

  render(){
    let listOfShips = this.state.starships.map((ship, index) =>
      <Link to={`/starship/${index}`} className="App-button">
        { ship.name }
      </Link>
    );


    return(
      <div className="App">
        <header className="App-header">
          <h1>Starwars Starship Wiki</h1>
        </header>
        {this.state.starships.length ?
          <Switch>
            <Route exact path='/' render={() => <div>{listOfShips}</div>} />
            <Route path='/starship/:id' render={props => <StarshipPage {...props}
              ship={this.state.starships[props.match.params.id]}/>}
            />
          </Switch>
          :
          <h1>Loading ...</h1>
        }
    </div>
    )
  };
}

export default App;
