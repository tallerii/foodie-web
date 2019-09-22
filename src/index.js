import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import App from './components/App';
import Login from './components/Login';
import Users from './components/Users'
import Contact from './components/Contact'

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#9cff57',
            main: '#64dd17',
            dark: '#1faa00',
            contrastText: '#000000',
        },
        secondary: {
            light: '#33691e',
            main: '#629749',
            dark: '#003d00',
            contrastText: '#ffffff',
        },
    },
});

const routing = (
    <ThemeProvider theme={theme}>
        <Router>
        <div>
            <Route path="/" component={App} />
            <Route path="/login" component={Login} />
            <Route path="/users" component={Users} />
            <Route path="/contact" component={Contact} />
        </div>
        </Router>
    </ThemeProvider>
  )

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
