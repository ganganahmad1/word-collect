import React, { Component } from 'react'
import {
  Animated,
  TouchableWithoutFeedback,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

class Animation extends Component {
  constructor() {
    super()

    this.state = {
      value: '',
      word: ['ABC', 'BCA', 'BAC'],
      answer: [false, false, false],
      isSelected: [true, false, false],
      borderPosition: {},
    }

    this.moveBtnA = new Animated.ValueXY({ x: 5, y: 150 })
    this.moveBtnB = new Animated.ValueXY({ x: 5, y: 150 })
    this.moveBtnC = new Animated.ValueXY({ x: 5, y: 150 })
  }

  moveBtn = alphabet => {
    if(alphabet == 'A'){
      this.setState({value: this.state.value + alphabet})
      Animated.spring(this.moveBtnA, {
        toValue: {x: 5, y: 5},
        useNativeDriver: true
      }).start()
    } else if(alphabet == 'B'){
      this.setState({value: this.state.value + alphabet})
      Animated.spring(this.moveBtnB, {
        toValue: {x: -44, y: 6},
        useNativeDriver: true
      }).start()
    } else if (alphabet == 'C'){
      this.setState({value: this.state.value + alphabet})
      Animated.spring(this.moveBtnC, {
        toValue: {x: -95, y: 5},
        useNativeDriver: true
      }).start()
    }
  }

  componentDidUpdate(){
    this.measure()
  }

  measure = () => {
    this.refs['view' + this.state.isSelected.indexOf(true)].measure((fx, fy, width, height, px, py)=>{
      console.log(fx, fy, width, height, px, py)
    })
  }

  setIsSelected = (id) => {
    this.setState({ isSelected: this.state.isSelected.map((item, key) => id === key ? true : false ) })
  }

  renderBox = (word, key) => {
    return (
      <TouchableOpacity 
        key={key}
        ref={'view' + key}
        onPress={() => this.setIsSelected(key)} 
        style={[
          { 
            flexDirection: 'row',
          }, 
          this.state.isSelected[key] ? {borderWidth: 1} : {borderWidth: 0}
        ]}
      >
        {word.split("").map((item, key)=>(
          <View 
            style={[
              styles.border, 
              {marginTop: 5} 
            ]} 
            key={key}
          >
            <Text> {item} </Text>
          </View>
        ))}
      </TouchableOpacity>
    )
  }

  render() {
    
    return (
        <View style={styles.container}>
            { this.state.word.map((item, key)=>(
                this.state.answer[key]  
                ? <Text key={key} style={styles.TextStyle} >
                  {item}
                </Text>
                : this.renderBox(item, key)
            ))}
            <View style={{ flexDirection: 'row', position: 'absolute' }}>
              <Animated.View 
                ref={'btnA'}
                style={[
                  styles.btnAdd,
                  {
                    transform: [
                      {
                        translateX: this.moveBtnA.x
                      },
                      {
                        translateY: this.moveBtnA.y
                      }
                    ]
                  }
                ]}
              >
                  <TouchableOpacity onPress={() => this.moveBtn('A')}>
                    <Text style={styles.buttonText}>A</Text>
                  </TouchableOpacity>        
              </Animated.View>
              <Animated.View
                ref={'btnB'}
                style={[
                  styles.btnAdd,
                  {
                    transform: [
                      {
                        translateX: this.moveBtnB.x
                      },
                      {
                        translateY: this.moveBtnB.y
                      }
                    ]
                  }
                ]}
              >
                  <TouchableOpacity onPress={() => this.moveBtn('B')}>
                    <Text style={styles.buttonText}>B</Text>
                  </TouchableOpacity>        
              </Animated.View>
              <Animated.View 
                ref={'btnC'}
                style={[
                  styles.btnAdd,
                  {
                    transform: [
                      {
                        translateX: this.moveBtnC.x
                      },
                      {
                        translateY: this.moveBtnC.y
                      }
                    ]
                  }
                ]}
              >
                  <TouchableOpacity onPress={() => this.moveBtn('C')}>
                    <Text style={styles.buttonText}>C</Text>
                  </TouchableOpacity>        
              </Animated.View>
            </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5
  },
  btnAdd:{
    // position: 'absolute',
    marginRight: 10,
    backgroundColor: 'blue',
    elevation: 3,
    width: 40,
    height: 40,
    borderRadius: 6,
    justifyContent: 'center',
  },
  border: {
    height: 40,
    width: 40,
    borderRadius: 6,
    borderWidth: 1,
    margin: 5
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold'
  }
})

export default Animation