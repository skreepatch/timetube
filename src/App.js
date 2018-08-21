import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import classNames from 'class-names';
import {store} from "./store/index";
import {Header} from './components/header/Header';
import {backgroundImage} from './utils/random-backgrounds/random-backgrounds';
import './App.css';
import {initializeFacebookSDK} from "./providers/facebookProvider";
import {routes} from "./routes";

export class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {checking: true, loading: false};

        store.subscribe(() => {
            const state = store.getState();
            this.setLoading(state.ui.loading);
            if (state.me) {
                this.setState({checking: false});
            }
        });
    }

    setLoading(loading) {
        this.setState({loading});
    }

    componentDidMount() {
        this.setLoading(true);
        initializeFacebookSDK();
    }

    render() {
        const style = {backgroundImage: `url(${backgroundImage})`};
        const mainClass = classNames('main', {
            loading: this.state.loading
        });
        return <Provider store={store}>
            <Router>
                <div className={mainClass} style={style}>
                    <div className="Loader"><span className="spinner">Loading</span></div>
                    <Header checking={this.state.checking}/>
                    {routes()}
                </div>
            </Router>
        </Provider>
    }
}
