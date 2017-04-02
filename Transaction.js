import React from 'react';
import { View, Text, StyleSheet, Image, MapView, TouchableHighlight, InteractionManager, ActivityIndicator } from 'react-native';

const SCREEN_WIDTH = require('Dimensions').get('window').width;
const SCREEN_HEIGHT = require('Dimensions').get('window').height;

export default class Transaction extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.goBack = this.goBack.bind(this);
    this.data = props.transaction;
    this.state = {renderPlaceholderOnly: true};
  }
  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({renderPlaceholderOnly: false});
    });
  }

  goBack() {
      this.props.navigator.pop();
  }

  render() {
      if (this.state.renderPlaceholderOnly) {
        return this._renderPlaceholderView();
      }
      var content;
      if (this.data.meta.location.coordinates &&
        this.data.meta.location.coordinates.lon &&
        this.data.meta.location.coordinates.lat) {
        var markers = [
          {
            latitude: this.data.meta.location.coordinates.lat,
            longitude: this.data.meta.location.coordinates.lon,
            title: this.data.name,
            subtitle: this.data.meta.location.address,
          }
        ];
        return (
            <View style={styles.container}>
              <MapView
              style={styles.map}
              annotations={markers}
              region={{
                  latitude: this.data.meta.location.coordinates.lat,
                  longitude: this.data.meta.location.coordinates.lon,
                  latitudeDelta: 0.007,
                  longitudeDelta: 0.005,
              }}>
              </MapView>
              <Text style={styles.text}>
                 Amount spent: ${this.data.amount} on {this.data.data}
              </Text>
              <TouchableHighlight onPress={this.goBack}>
                    <Text>Click to go back</Text>
                </TouchableHighlight>
            </View>
        );
      } else {
        return (
          <View style={styles.container}>
            <Text style={styles.text}>
               Amount spent: ${this.data.amount}
            </Text>
            <TouchableHighlight onPress={this.goBack}>
                    <Text>Click to go back</Text>
            </TouchableHighlight>
          </View>
        );
      }
  }
  _renderPlaceholderView() {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          animating={true}
          color={'#fff'}
          size={'small'}
          style={{margin: 15}} />
          <Text style={{color: '#fff'}}>Loading</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#5a6b77',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT
  },
  text: {
    marginLeft: 12,
    fontSize: 16
  },
  map: {
    height: 300,
    width: SCREEN_WIDTH
  },
  loadingContainer: {
	  flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5a6b77',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT
  },
});
