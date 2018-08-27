import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import {store} from "./store/index";
import {Header} from './components/header/Header';
import './App.css';
import {routes} from "./routes";
import {MainLoader} from "./components/mainLoader/MainLoader";
import {updateUi} from "./store/ui/ui.actions";
import {initThirdPartyProviders} from "./providers/providers";

export class App extends React.Component {
    setLoading(loading) {
        store.dispatch(updateUi({key: 'loading', value: true}));
    }

    componentDidMount() {
        this.setLoading(true);
        this.initProviders();
    }

    /**
     * Third party providers
     */
    initProviders() {
        initThirdPartyProviders()
            .then( () => {
                console.log('providers ready');
            });
    }

    render() {
        return <Provider store={store}>
            <Router>
                <div className="main">
                    <MainLoader />
                    <Header />
                    {routes()}
                </div>
            </Router>
        </Provider>
    }
}
