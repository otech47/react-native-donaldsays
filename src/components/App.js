import React, { PropTypes, Component } from 'react';
import { StyleSheet } from 'react-native';
import { Router, Scene, Actions, Modal, ActionConst } from 'react-native-router-flux';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import Icon from 'react-native-vector-icons/Ionicons';

// connects react router to redux to pass scene info
const ReduxRouter = connect()(Router);
import reducers from '../reducers';
import { variables, colors } from '../styles';

// redux store setup
const logger = createLogger({
    level: 'info',
    collapsed: true
});

// const middleware = [thunk, logger];
const middleware = [thunk];

const store = compose(
    applyMiddleware(...middleware)
)(createStore)(reducers);

// actions
// import { initAuth } from '../actions/auth';
// import { fetchBtcPrice } from '../actions/wallet';
import { checkFirstPlay } from '../actions/environment';

// components
import Base from './Base';
import ArGameDisplay from './ArGameDisplay';
import LandingPage from './LandingPage';
import GameOver from './GameOver';

const styles = StyleSheet.create({
    root: {
        flex: 1
    },
    navBar: {
        backgroundColor: colors.transparent
    }
});

console.disableYellowBox = true;

class App extends Base {
    static childContextTypes = {
        loggedIn: PropTypes.bool,
        user: PropTypes.object
    }
    constructor(props, context) {
        super(props, context);
        // this.autoBind('');
    }
    componentWillMount() {
        this.props.checkFirstPlay();
    }
    getChildContext() {
        return {
            loggedIn: this.props.user ? true : false,
            user: this.props.user
        };
    }
    render() {
        return (
            <ReduxRouter>
                <Scene 
                    key='root'
                    sceneStyle={styles.root}
                    hideNavBar
                >
                    <Scene
                        key='LandingPage'
                        component={LandingPage}
                        initial
                    />
                    <Scene
                        key='ArGameDisplay'
                        component={ArGameDisplay}
                        
                    />
                    <Scene
                        key='GameOver'
                        component={GameOver}
                    />
                </Scene>
            </ReduxRouter>
        );
    }
}

// injects global props at root level
function mapStateToProps() {
    return {
    };
}

function mapDispatchToProps(dispatch) {
    return {
        checkFirstPlay: () => dispatch(checkFirstPlay()),
    };
}

const ReduxApp = connect(mapStateToProps, mapDispatchToProps)(App);

// wraps App in redux provider
export default function AppWrapper() {
    return (
        <Provider store={store}>
            <ReduxApp />
        </Provider>
    );
}