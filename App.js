/* global XMLHttpRequest */

import React, { Component } from 'react';
import {
	StyleSheet,
	Navigator,
	View,
} from 'react-native';
import { Provider } from 'react-redux';

import store from './src/store';
import * as session from './src/services/session';
import * as routeHistoryActions from './src/services/routeHistory/actions';
import Splash from './src/scenes/Splash';
import Main from './src/scenes/Main';
import Login from './src/scenes/Main/scenes/Login';
import Register from './src/scenes/Main/scenes/Register';
import Users from './src/scenes/Main/scenes/Users';

// This is used in order to see requests on the Chrome DevTools
XMLHttpRequest = GLOBAL.originalXMLHttpRequest ?
	GLOBAL.originalXMLHttpRequest :
	GLOBAL.XMLHttpRequest;

const transition = Navigator.SceneConfigs.HorizontalSwipeJump;
transition.gestures = null;

const routeStack = [
	{ name: 'Main', component: Main },
	{ name: 'Login', component: Login },
	{ name: 'Register', component: Register },
	{ name: 'Users', component: Users },
];

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			initialRoute: null,
		};
	}

	componentDidMount() {
		// Waits for the redux store to be populated with the previously saved state,
		// then it will try to auto-login the user.
		const unsubscribe = store.subscribe(() => {
			if (store.getState().services.persist.isHydrated) {
				unsubscribe();
				this.autoLogin();
			}
		});
	}

	autoLogin() {
		session.refreshToken().then(() => {
			this.setState({ initialRoute: routeStack[3] });
		}).catch(() => {
			this.setState({ initialRoute: routeStack[0] });
		});
	}

	renderContent() {
		if (!this.state.initialRoute) {
			return <Splash />;
		}

		return (
			<Navigator
				initialRoute={this.state.initialRoute}
				initialRouteStack={routeStack}
				configureScene={() => Navigator.SceneConfigs.HorizontalSwipeJump}
				onWillFocus={route => store.dispatch(routeHistoryActions.push(route))}
				renderScene={(route, navigator) =>
					<route.component route={route} navigator={navigator} {...route.passProps} />
				}
			/>
		);
	}

	render() {
		return (
			<View style={{
				flex: 1,
				backgroundColor: '#eee',
			}}>
				<Provider store={store}>
					{this.renderContent()}
				</Provider>
			</View>
		);
	}
}

export default App;
