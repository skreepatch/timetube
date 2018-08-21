import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import classNames from 'class-names';
import { store } from './store/index';
import { Welcome } from './components/welcome/Welcome';
import { Timetube } from './components/timetube/Timetube';
import { Login } from './components/login/Login';
import { Header } from './components/header/Header';
import { backgroundImage } from './utils/random-backgrounds/random-backgrounds';
import './App.css';
import {FacebookProvider} from "./providers/facebook";

export class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { checking: true, loading: false };

    store.subscribe(() => {
      const state = store.getState();
      this.setLoading(state.ui.loading);
      if(state.me) {
        this.setState({checking: false});
      }
    });
  }

  setLoading(loading) {
    this.setState({ loading });
  }

  componentDidMount() {
    this.setLoading(store.getState());
  }

  render() {
    const style = { backgroundImage: `url(${backgroundImage})` };
    const mainClass = classNames('main', {
      loading: this.state.loading
    });
    const routes = () => {
      return <div className="main-wrapper">
        <Route path="/login" exact={true} component={Login} />
        <Route path="/" exact={true} component={Welcome} />
        <Route path="/channel/:timetubeId" exact={true} component={Timetube} />
      </div>
    };
    return <Provider store={store} >
      <FacebookProvider>
        <Router>
          <div className={mainClass} style={style}>
            <div className="Loader"><span className="spinner">Loading</span></div>
            <Header checking={this.state.checking} />
            {routes()}
          </div>
        </Router>
      </FacebookProvider>
    </Provider>
  }
}
