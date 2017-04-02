import React from 'react';
import {
	StyleSheet,
} from 'react-native';
import {
	Container,
	Spinner,
	View,
} from 'native-base';

const Splash = () => (
	<Container>
		<View style={{
			paddingTop: 20,
			flex: 1
		}}>
			<Spinner size="small" color="#000000" />
		</View>
	</Container>
);

export default Splash;
