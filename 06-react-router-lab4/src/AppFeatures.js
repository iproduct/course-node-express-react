import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  withRouter
} from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/topics">Topics</Link>
          </li>
        </ul>

        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/topics">
            <Topics />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Topics() {
  let match = useRouteMatch();

  return (
    <div>
      <h2>Topics</h2>

      <ul>
        <li>
          <Link to={`${match.url}/tutorials/topics/components`}>
            Components
          </Link>
        </li>
        <li>
          <Link to={`${match.url}/tutorials/topics/props-v-state`}>
            Props v. State
          </Link>
        </li>
        <li>
          <Link to={`${match.url}/docs/topics/routing`}>Routing Docs</Link>
        </li>
      </ul>

      {/* The Topics page has its own <Switch> with more routes
          that build on the /topics URL path. You can think of the
          2nd <Route> here as an "index" page for all topics, or
          the page that is shown when no topic is selected */}
      <Switch>
        <Route path={`${match.url}/:sectionId/topics/:topicId`}>
          <RoutedTopic />
        </Route>
        <Route exact path={match.url} 
          render={(location) => <h3>Please select a topic.: {JSON.stringify(location)}</h3>} />
      </Switch>
    </div>
  );
}

class Topic extends React.Component {
  goHome = () => {
    this.props.history.push('/');
  }

  render() {
    const { match, location, history } = this.props;
    let { sectionId, topicId } = match.params;
    console.log(location);
    console.log(history);
    
    return (
      <React.Fragment>
        <h3>Requested Section ID: {sectionId}</h3>
        <h4>Requested Topic ID: {topicId}</h4>
        <button onClick={this.goHome}>Go Home</button>
      </React.Fragment>
    );
  }
}

const RoutedTopic = withRouter(Topic);
