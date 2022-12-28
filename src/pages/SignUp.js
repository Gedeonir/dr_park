import React from 'react'
import {
   AppRegistry,
   StyleSheet,
   Text,
   View,
   Alert,
   TouchableOpacity,  
 } from 'react-native';
 import { Styles } from '../utils/Styles';
 import BottomBar from '../components/BottomBar/BottomBar';


const SignUp = ({ navigation, route }) => {
   return( 
      <View style={Styles.container}>
         <Text>This is profile</Text>
         <TouchableOpacity style={Styles.exploreBtn} title='Explore' onPress={()=> navigation.navigate('parkingDetails')}>
            <Text style={Styles.exploreText}>Explore</Text>
         </TouchableOpacity>
         <BottomBar/>
      </View>
   )
   
}
export default SignUp