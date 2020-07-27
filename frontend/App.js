
import IntroSlide from './src/introSlide.js'
import Login from './src/login';
import ChatList from './src/chatList';
import ChatPage from './src/chatPage';
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Login} />
        <Stack.Screen title="دانشکده فنی سمنان" name="chatList" component={ChatList} />
        <Stack.Screen name="chatPage" component={ChatPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
// const appContainer=createAppContainer(introStack);
// export default appContainer;
