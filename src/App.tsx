import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { Header } from './components/header/Header';
import { MainLoader } from "./components/mainLoader/MainLoader";
import { initThirdPartyProviders } from "./providers/providers";
import { routes } from "./routes";
import { store } from "./store/index";
import { updateUi } from "./store/ui/ui.actions";


export class App extends React.Component {
    public componentDidMount() {
        this.setLoading(true);
        this.initProviders();
    }

    public render() {
        return <Provider store={store}>
            <Router>
                <div className="main">
                    <MainLoader/>
                    <Header />
                    {routes()}
                </div>
            </Router>
        </Provider>
    }

    private setLoading(loading: boolean = true) {
        store.dispatch(updateUi({key: 'loading', value: loading}));
    }

    /**
     * Third party providers
     */
    private initProviders() {
        initThirdPartyProviders();
    }
}
