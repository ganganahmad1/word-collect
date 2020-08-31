import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'

const Home = () => {

    const [value, setValue] = useState('')

    const word = ['abc', 'bca', 'baca']
    
    const [answer, setAnswer] = useState([false, false, false])

    const addCharcacter = value => { 
        setValue(prepState => prepState + value)
    }

    const submit = () => {
        setValue([])
    }

    useEffect(_ =>{
        word.map((item, key)=>{
            if(item == value){
                answer[key] = true
                setAnswer(answer)
            }
    })
    }, [value])

    console.log(answer)

    return(
        <View style={ styles.container }>
            { word.map((item, key)=>(
                <Text key={key} style={styles.TextStyle} >
                    {answer[key] ?  key+1 + '. ' + item  : key+1 + '. ' + item.replace(/\w/gim,"_ ") }
                </Text>)
            )}
            <Text style={{ marginTop: 20 }}>{value}</Text>
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
                style={ styles.btnSubmit }
                onPress={() => submit()}
            >
                <Text style={{ color: '#fff', alignSelf: 'center', textAlign: 'center' }}>Submit</Text>
            </TouchableOpacity>
        </View>
    )
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
    btnSubmit:{
        backgroundColor: 'green',
        elevation: 3,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 6,
        justifyContent: 'center',
        alignSelf: 'flex-start',
    }
    
})

export default Home;
