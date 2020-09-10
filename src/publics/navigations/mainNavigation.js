import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer } from "@react-navigation/native"

import WordCollect from "../../components/fixWordCollect"
import Dnd from "../../components/panResponder"

const Stack = createStackNavigator()

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dnd">
        <Stack.Screen
          name="Dnd"
          component={Dnd}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="WordCollect"
          component={WordCollect}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainNavigation
