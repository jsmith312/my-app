import React, { PropTypes } from 'react';
import {
	StyleSheet,
	StatusBar,
	View
} from 'react-native';
import {
	Container,
	Header,
	Title,
	Button,
	Text
} from 'native-base';

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	button: {
		marginTop: 20,
		alignSelf: 'center',
		width: 150,
	},
});

const Main = (props) => {
	const routeStack = props.navigator.getCurrentRoutes();
	return (
			<View style={{
				flex: 1
			}}>
			<StatusBar
	 			backgroundColor="red"
	 			barStyle="light-content"
				hidden={false}
				networkActivityIndicatorVisible={false}
 				/>
				<View>
					<Button
						style={{
							marginTop: 20,
							alignSelf: 'center',
						}}
						onPress={() => props.navigator.jumpTo(routeStack[1])
					}
					>
						<Text>Login</Text>
					</Button>
					<Button
						style={{
							marginTop: 20,
							alignSelf: 'center',
						}}
						onPress={() => props.navigator.jumpTo(routeStack[2])
					}
					>
						<Text>Register</Text>
					</Button>
				</View>
			</View>
	);
};

Main.propTypes = {
	navigator: PropTypes.shape({
		getCurrentRoutes: PropTypes.func,
		jumpTo: PropTypes.func,
	}),
};

export default Main;
