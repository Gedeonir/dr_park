import React from 'react'
import {
   AppRegistry,
   StyleSheet,
   Text,
   View,
   Alert  
 } from 'react-native';

const SignUp = ({ navigation, route }) => {
   return <Text>This is {route.params.name}'s profile</Text>;
   
}
export default SignUp