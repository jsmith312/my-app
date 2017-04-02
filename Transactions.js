import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  ListView,
  Text,
  View,
  ActivityIndicator,
  TouchableHighlight,
  TextInput
} from 'react-native';

import Transaction from './Transaction';

const API_DEV = 'http://localhost:3001'
const SCREEN_HEIGHT = require('Dimensions').get('window').height;

export default class Transactions extends Component {
  state = {
    startDate: '2016-10-12',
    endDate: '2016-10-15',
    transactions: [],
    isLoading: true
  };

  constructor(props) {
    super(props)
    this.onSubmitEdit = this.onSubmitEdit.bind(this)
    this.getPlaidDataAsync = this.getPlaidDataAsync.bind(this)
  }

  dataSource = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2
  });

  componentDidMount() {
    this.getPlaidDataAsync()
  }

  onDetails(data) {
    this.props.navigator.push({
            component: Transaction,
            passProps: {
                transaction: data
            }
        });
  }

  onSubmitEdit() {
    console.log(this.state)
  }

  _renderRow(data) {
    return (
      <TouchableHighlight
        onPress={this.onDetails.bind(this, data)}>
        <View style={style.row}>
          <Text style={{ marginLeft: 5, marginRight: 5 }}>{data.name}</Text>
        </View>
     </TouchableHighlight>
      );
  }

  renderResults() {
    var {transactions, isLoading} = this.state;
    const rows = this.dataSource.cloneWithRows(transactions || [])
    return (
      <View style={{flex:1}}>
      <ListView
        style={style.listView}
        dataSource={rows}
        renderRow={ this._renderRow.bind(this) }
      />
      </View>
    );
  }
  getPlaidDataAsync() {
    this.setState({isLoading: true})
    const options = {
      startdate: this.state.startDate,
      enddate: this.state.endDate
    }
    return fetch(`${API_DEV}`, {
      method: 'put',
      body: JSON.stringify(options),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(jsonData => {
      console.log(jsonData)
      this.setState({
        transactions: jsonData.transactions,
        isLoading: false
      });
    })
    .catch( error => console.log("Fetch error" + error) );
  }

  renderLoadingMessage() {
    return (
      <View style={style.loadingContainer}>
        <ActivityIndicator
          animating={true}
          color={'#fff'}
          size={'small'}
          style={{margin: 15}} />
          <Text style={{color: '#fff'}}>Contacting Unsplash</Text>
      </View>
    );
  }
  render() {
    var {isLoading} = this.state;
    if(isLoading) {
        return this.renderLoadingMessage();
    } else {
        return this.renderResults();
    }
  }
}

var style = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#F6F6F6',
  },
  thumb: {
    width: 64,
    height: 64,
  },
  loadingContainer: {
	  flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000'
  },
  separator: {
    //flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
    flex: 1,
  },
  container: {
    flex: 1
  },
});
