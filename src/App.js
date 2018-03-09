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
  TouchableOpacity,
  Dimensions
} from 'react-native';
import beep from './beep.mp3';
import 'expo'
//import {default as Sound} from 'react-native-sound'
const Sound = new Expo.Audio.Sound();
var {height, width} = Dimensions.get('window');
var ttt = 0;
var ttt1 = 0;
type Props = {};
export default class App extends Component<Props> {
  constructor(props){
    super(props)
    this.state=({
      minute: '25',
      second: '00',
      minute1: '5',
      second1: '00',
      showMsg: false,
      isrun: false
    })
  }

  componentDidMount(){
    
  }

  componentWillUnmount() {
    clearInterval(timer); 
  }

  async showMsg() {
    
    // const s = new Sound(beep, (error) => { // works
    //   if (error) {
    //     alert(JSON.stringify(error));
    //     return;
    //   }
      
    //   s.play(() => {
    //     s.release()
    //   });
    // });
    
    try {
        await Sound.loadAsync(require('./beep.mp3'));
        await Sound.playAsync();
        // Your sound is playing!
      } catch (error) {
        // An error occurred!
      }
  }

  start(){
     //this.setState({ isrun: true})
     ttt = setInterval(() => {
      sec = this.state.second;
      min = this.state.minute;
      if(this.state.second=='00' && this.state.minute=='00'){
        clearInterval(ttt); 
        this.showMsg()
        this.start1()
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

  start1(){
     //this.setState({ isrun: true})
     ttt = setInterval(() => {
      sec1 = this.state.second1;
      min1 = this.state.minute1;
      if(this.state.second1=='00' && this.state.minute1=='00'){
        clearInterval(ttt); 
        this.showMsg()
      }else{
        if(sec1 == '00'){
          sec1 = '60'
          resetMinute1 = Number(min1)-1
          if(resetMinute1<10) strMinute1 = '0'+String(resetMinute1)
          else strMinute1 = String(resetMinute1)
          this.setState({
            minute1: strMinute1
          })
        }

        resetSecond1 = Number(sec1)-1
        if(resetSecond1<10) strSecond1 = '0'+String(resetSecond1)
        else strSecond1 = String(resetSecond1)
        this.setState({
          second1: strSecond1
        })
      }
    }, 1000);

  }

  stop(){
     clearInterval(ttt); 
     clearInterval(ttt1); 
  }

  reset(){
     clearInterval(ttt); 
     clearInterval(ttt1); 
     this.setState({
      minute :'25',
      second: '00',
      minute1 :'5',
      second1: '00'
     })
  }

  changeSet(text,item){
    // if(Number(text)<10) realText = '0'+text;
    // else realText = text
    if(item=='min'){
      this.setState({ minute: text})
    }else if(item=='sec'){
      this.setState({ second: text})
    }else if(item=='min1'){
      this.setState({ minute1: text})
    }else if(item=='sec1'){
      this.setState({ second1: text})
    }
  }

  render() {
   
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 20, fontWeight: '700', textAlign:'center'}}>Pomodoro Timer</Text>
        <Text style={{ textAlign:'center',marginTop: 10,}}>Work Time</Text>
        <View style={styles.rowView1}>
          <TextInput underlineColorAndroid='transparent' onChangeText={(text)=>this.changeSet(text,'min')} keyboardType="number-pad" returnKeyType='done' style={styles.textinput} value={this.state.minute}/>
          <Text style={{fontSize: 30, marginBottom: 10}}>:</Text>
          <TextInput underlineColorAndroid='transparent' onChangeText={(text)=>this.changeSet(text,'sec')} keyboardType="number-pad" returnKeyType='done' style={styles.textinput} value={this.state.second}/>
        </View>
        <Text style={{ textAlign:'center',marginTop: 10,}}>Break Time</Text>
        <View style={styles.rowView1}>
          <TextInput underlineColorAndroid='transparent' onChangeText={(text)=>this.changeSet(text,'min1')} keyboardType="number-pad" returnKeyType='done' style={styles.textinput} value={this.state.minute1}/>
          <Text style={{fontSize: 30, marginBottom: 10}}>:</Text>
          <TextInput underlineColorAndroid='transparent' onChangeText={(text)=>this.changeSet(text,'sec1')} keyboardType="number-pad" returnKeyType='done' style={styles.textinput} value={this.state.second1}/>
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
    
    marginHorizontal: 80,
  },
  textinput:{
    height: height/20,
    backgroundColor: '#43ba8f',
    width: width/4,
    textAlign:'center',
    color: 'white',
    fontSize: 20
  },
  button:{
    width: width/4,
    height: height/20,
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
