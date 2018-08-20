import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import classNames from 'class-names';
import store from './store/index';
import { APP_ID } from './config';
import { STATUSES } from './utils/fb/login';
import { loggedInOut, updateMe, setActive } from './actions/index';
import Welcome from './components/welcome/Welcome';
import Timetube from './components/timetube/Timetube';
import Login from './components/login/Login';
import Header from './components/header/Header';
import backgroundImage from './utils/random-backgrounds/random-backgrounds';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { checking: true, loading: false };
    this.statusChange = this.statusChange.bind(this);
    store.subscribe(() => {
      this.setLoading(store.getState().ui.loading);
    });
  }

  setLoading(loading) {
    this.setState({ loading });
  }

  statusChange(response) {
    if (response.status === STATUSES.CONNECTED) {
      window.FB.api(`${response.authResponse.userID}?fields=name,picture,permissions`, (defaultProfile) => {
        const update = { ...defaultProfile, ...response.authResponse };
        store.dispatch(updateMe(update));
        store.dispatch(setActive(update.userID));
        store.dispatch(loggedInOut(true));
      });
    } else {
      store.dispatch(loggedInOut(false));
    }
    this.setState({ checking: false });
  }

  componentDidMount() {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: APP_ID,
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v3.0'
      });

      window.FB.Event.subscribe('auth.statusChange', this.statusChange.bind(this));
      window.FB.getLoginStatus(this.statusChange.bind(this));
    }.bind(this);

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      if (fjs) {
        fjs.parentNode.insertBefore(js, fjs);
      }
    }(document, 'script', 'facebook-jssdk'));

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
    }
    return <Provider store={store} >
      <Router>
        <div className={mainClass} style={style}>
          <div className="Loader"><span className="spinner">Loading</span></div>
          <Header checking={this.state.checking} />
          {routes()}
        </div>
      </Router>
    </Provider>
  }
}

export default App;