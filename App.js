
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import Home from './src/pages/Homepage';
import SignIn from './src/pages/SignIn';
import SignUp from './src/pages/SignUp';
import ViewParkingDetails from './src/pages/ViewParkingDetails';
import ParkingSlots from './src/pages/ParkingSlots';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store} >
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen
            name="Home"
            component={Home}
          />
          <Stack.Screen name="signIn" component={SignIn} />
          <Stack.Screen name="signUp" component={SignUp} />
          <Stack.Screen name="parkingDetails" component={ViewParkingDetails}/>
          <Stack.Screen name="parkingSlots" component={ParkingSlots}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

AppRegistry.registerComponent('dr-park', () => App);