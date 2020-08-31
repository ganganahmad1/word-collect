import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';

class WordCollect extends Component {
    constructor() {
        super()
        this.state = {
            value: '',
            answer: [false, false, false],
            word: ['abc', 'bca', 'baca'],
        }
    }

    render() {
        const addCharcacter = alphabet => { 
            this.setState({value: this.state.value + alphabet}, ()=>{
                this.state.word.map((item, key)=>{
                    if(item == this.state.value){
                        let newAnswer = [...this.state.answer]
                        newAnswer[key] = true
                        this.setState({ answer: newAnswer })
                    }
                })
            })
        }

        console.log(this.state.answer)

        const deleteValue = () => {
            this.setState({ value: '' })
        }

        return (
            <> 
                <View style={ styles.container }>
                    { this.state.word.map((item, key)=>(
                        <Text key={key} style={styles.TextStyle} >
                            {this.state.answer[key] ?  key+1 + '. ' + item  : key+1 + '. ' + item.replace(/\w/gim,"_ ") }
                        </Text>)
                    )}
                    <Text style={{ marginTop: 20 }}>{this.state.value}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity
                            style={ styles.btnAdd }
                            onPress={() => addCharcacter('a') }
                        >
                            <Text style={{ color: '#fff', alignSelf: 'center', textAlign: 'center' }}>A</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={ styles.btnAdd }
                            onPress={() => addCharcacter('b') }
                        >
                            <Text style={{ color: '#fff', alignSelf: 'center', textAlign: 'center' }}>B</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={ styles.btnAdd }
                            onPress={() => addCharcacter('c') }
                        >
                            <Text style={{ color: '#fff', alignSelf: 'center', textAlign: 'center' }}>C</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={ styles.btnDelete }
                        onPress={() => deleteValue()}
                    >
                        <Text style={{ color: '#fff', alignSelf: 'center', textAlign: 'center' }}>Delete</Text>
                    </TouchableOpacity>
                </View>
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10
    },
    btnAdd:{
        backgroundColor: 'blue',
        elevation: 3,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 6,
        justifyContent: 'center',
        alignSelf: 'flex-start',
        marginRight: 10,
        marginBottom: 10
    },
    btnDelete:{
        backgroundColor: 'red',
        elevation: 3,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 6,
        justifyContent: 'center',
        alignSelf: 'flex-start',
        marginRight: 10,
        marginBottom: 10
    },
})

export default WordCollect;