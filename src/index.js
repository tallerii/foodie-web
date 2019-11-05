import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import App from './components/App';
import Login from './components/Login';
import Contact from './components/Contact'
import Dashboard from './components/Dashboard'
import { Provider as ReduxProvider } from "react-redux";
import ls from 'local-storage'
import configureStore from './modules/store'

const store = configureStore({ isLogged: ls.get('isLogged') || false, token: ls.get('token') || undefined });

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#8bf6ff',
            main: '#4fc3f7',
            dark: '#0093c4',
            contrastText: '#000000',
        },
        secondary: {
            light: '#5e92f3',
            main: '#1565c0',
            dark: '#003c8f',
            contrastText: '#ffffff',
        },
    },
});

const routing = (
    <ReduxProvider store={store}>
        <ThemeProvider theme={theme}>
            <Router>
            <div>
                <Route path="/" component={App} />
                <Route path="/login" component={Login} />
                <Route path="/app" component={Dashboard} />
                <Route path="/contact" component={Contact} />
            </div>
            </Router>
        </ThemeProvider>
    </ReduxProvider>
  )

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
