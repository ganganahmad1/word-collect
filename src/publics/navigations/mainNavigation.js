import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

import Home from '../../components/home'
import WordCollect from '../../components/wordCollect'
import Dnd from '../../components/dragAndDrop'
import Animation from '../../components/animation'
import LearnMeasure from '../../components/measure'


const Stack = createStackNavigator()

const MainNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Animation">
                <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                <Stack.Screen name="Dnd" component={Dnd} options={{ headerShown: false }} />
                <Stack.Screen name="LearnMeasure" component={LearnMeasure} options={{ headerShown: false }} />
                <Stack.Screen name="Animation" component={Animation} options={{ headerShown: false }} />
                <Stack.Screen name="WordCollect" component={WordCollect} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainNavigation