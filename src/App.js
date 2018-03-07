/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';
import beep from './beep.mp3';

const Sound = require('react-native-sound');

type Props = {};
export default class App extends Component<Props> {
  constructor(props){
    super(props)
    this.state=({
      minute: '25',
      second: '00',
      showMsg: false
    })
  }

  componentDidMount(){
    
  }

  componentWillUnmount() {
    clearInterval(timer); 
  }

  showMsg() {
    
    const s = new Sound(beep, (error) => { // works
      if (error) {
        alert(JSON.stringify(error));
        return;
      }
      
      s.play(() => {
        s.release()
      });
    });
  }

  start(){
     ttt = setInterval(() => {
      sec = this.state.second;
      min = this.state.minute;
      if(this.state.second=='00' && this.state.minute=='00'){
        clearInterval(ttt); 
        this.showMsg()
      }else{
        if(sec == '00'){
          sec = '60'
          resetMinute = Number(min)-1
          if(resetMinute<10) strMinute = '0'+String(resetMinute)
          else strMinute = String(resetMinute)
          this.setState({
            minute: strMinute
          })
        }

        resetSecond = Number(sec)-1
        if(resetSecond<10) strSecond = '0'+String(resetSecond)
        else strSecond = String(resetSecond)
        this.setState({
          second: strSecond
        })
      }
    }, 1000);

  }

  stop(){
     clearInterval(ttt); 
  }

  reset(){
     clearInterval(ttt); 
     this.setState({
      minute :'25',
      second: '00'
     })
  }

  render() {
   
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 20, fontWeight: '700', textAlign:'center'}}> Timer</Text>
        <View style={styles.rowView1}>
          <TextInput onChangeText={(text)=>this.setState({ minute: text})} keyboardType="number-pad" returnKeyType='done' style={styles.textinput} value={this.state.minute}/>
          <Text style={{fontSize: 30, marginBottom: 10}}>:</Text>
          <TextInput onChangeText={(text)=>this.setState({ second: text})} keyboardType="number-pad" returnKeyType='done' style={styles.textinput} value={this.state.second}/>
        </View>
        <View style={styles.rowView}>
          <TouchableOpacity onPress={this.start.bind(this)} style={styles.button}>
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.stop.bind(this)} style={styles.button}>
            <Text style={styles.buttonText}>Stop</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.reset.bind(this)} style={styles.button}>
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
        </View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  rowView:{
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginTop: 20,
    marginHorizontal: 40,
  },
  rowView1:{
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginTop: 20,
    marginHorizontal: 80,
  },
  textinput:{
    height: 40,
    backgroundColor: '#43ba8f',
    width: 100,
    textAlign:'center',
    color: 'white',
    fontSize: 20
  },
  button:{
    width: 80,
    height: 30,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: '#76aba5'
  },
  buttonText:{
    color: 'white',
    fontSize: 15
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
