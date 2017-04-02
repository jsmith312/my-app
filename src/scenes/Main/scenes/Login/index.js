import React, { Component, PropTypes } from 'react';
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';
import {
	TouchableWithoutFeedback,
	StyleSheet,
} from 'react-native';
import {
	Container,
	Header,
	Title,
	InputGroup,
	Input,
	Button,
	Icon,
	Text,
	View,
	Spinner,
	Left,
	Body,
	Right
} from 'native-base';

import FormMessage from '../../../../components/FormMessage';
import * as session from '../../../../services/session';
import * as api from '../../../../services/api';

const styles = StyleSheet.create({
	error: {
		color: 'red',
		marginBottom: 20,
	},
});

class Login extends Component {
	static propTypes = {
		navigator: PropTypes.shape({
			getCurrentRoutes: PropTypes.func,
			jumpTo: PropTypes.func,
		}),
	}

	constructor(props) {
		super(props);

		this.initialState = {
			isLoading: false,
			error: null,
			email: 'user1@facebook.com',
			password: '12345678',
		};
		this.state = this.initialState;
	}

	onPressLogin() {
		this.setState({
			isLoading: true,
			error: '',
		});
		dismissKeyboard();

		session.authenticate(this.state.email, this.state.password)
		.then(() => {
			this.setState(this.initialState);
			const routeStack = this.props.navigator.getCurrentRoutes();
			this.props.navigator.jumpTo(routeStack[3]);
		})
		.catch((exception) => {
			// Displays only the first error message
			const error = api.exceptionExtractError(exception);
			this.setState({
				isLoading: false,
				...(error ? { error } : {}),
			});

			if (!error) {
				throw exception;
			}
		});
	}

	onPressBack() {
		const routeStack = this.props.navigator.getCurrentRoutes();
		this.props.navigator.jumpTo(routeStack[0]);
	}

	renderError() {
		if (this.state.error) {
			return (
				<Text
					style={{
						color: 'red',
						marginBottom: 20
					}}
				>
					{this.state.error}
				</Text>
			);
		}
	}

	render() {
		return (
			<Container>
				<View style={{
					position: 'absolute',
					top: 0,
					bottom: 0,
					left: 0,
					right: 0,
				}}>
					<Header>
						<Left>
							<Button
								onPress={() => this.onPressBack()}
								transparent>
								<Icon name="ios-arrow-back" />
							</Button>
						</Left>
						<Body>
							<Title>Login</Title>
						</Body>
						<Right></Right>
					</Header>
					<TouchableWithoutFeedback
						onPress={dismissKeyboard}
					>
						<View
							style={{
								padding: 30,
								flex: 1
							}}
						>
							{this.state.error ? (
								<FormMessage message={this.state.error} />
							) : null}
							<InputGroup style={{marginBottom: 20}}>
								<Icon style={{width: 30}} name="ios-person" />
								<Input
									placeholder="Email"
									keyboardType="email-address"
									autoCorrect={false}
									autoCapitalize="none"
									onChangeText={email => this.setState({ email })}
									value={this.state.email}
								/>
							</InputGroup>
							<InputGroup style={{marginBottom: 20}}>
								<Icon style={{width: 30}} name="ios-unlock" />
								<Input
									placeholder="Password"
									onChangeText={password => this.setState({ password })}
									value={this.state.password}
									secureTextEntry
								/>
							</InputGroup>
							{this.state.isLoading ? (
								<Spinner size="small" color="#000000" />
							) : (
								<Button
									style={{
										marginTop: 20,
										alignSelf: 'center',
										width: 150
									}}
									onPress={() => this.onPressLogin()}
								>
									<Text>Login</Text>
								</Button>
							)}
						</View>
					</TouchableWithoutFeedback>
				</View>
			</Container>
		);
	}
}

export default Login;
