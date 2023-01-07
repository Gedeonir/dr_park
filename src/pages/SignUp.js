import React from 'react'
import {
   AppRegistry,
   StyleSheet,
   Text,
   View,
   Image,
   ImageBackground,
   Alert,
   TextInput,
   TouchableOpacity,  
 } from 'react-native';
 import { Styles } from '../utils/Styles';
 import BottomBar from '../components/BottomBar/BottomBar';
 import { Ionicons,Entypo,Octicons,EvilIcons,FontAwesome5,AntDesign} from '@expo/vector-icons';


const SignUp = ({ navigation, route }) => {
   return( 
      <View style={Styles.container}>
            <ImageBackground style={{width:'100%',height:'100%',paddingTop:34}} resizeMode="cover" source={require('../../assets/images/accounts-bg.jpg')}>
               <Image style={{width:100,height:100,marginLeft:'auto',marginRight:'auto',marginTop:12,borderRadius:20}} source={require('../../assets/images/logo.png')}/>
               <View style={Styles.userAccount}>
                  <View style={{display:'flex',flexDirection:'row'}}>
                     <TouchableOpacity style={{marginRight:6}}>
                        <Ionicons name="arrow-back-outline" size={26} style={{paddingTop:5}} color="#13728F" onPress={()=> navigation.goBack()}/>
                     </TouchableOpacity>
                     <Text style={Styles.parkingNearTitle}>Create new account</Text>
                  </View>
                  <View style={Styles.inputGroup}>
                     <Text style={Styles.label}>Email</Text>
                     <TextInput
                        style={Styles.input}
                        placeholder="Enter your email"
                     />
                  </View>
                  <View style={Styles.inputGroup}>
                     <Text style={Styles.label}>FirstName</Text>
                     <TextInput
                        style={Styles.input}
                        placeholder="Enter your firstName"
                     />
                  </View>
                  <View style={Styles.inputGroup}>
                     <Text style={Styles.label}>LastName</Text>
                     <TextInput
                        style={Styles.input}
                        placeholder="Enter your LastName"
                     />
                  </View>
                  <View style={Styles.inputGroup}>
                     <Text style={Styles.label}>Password</Text>
                     <TextInput
                        secureTextEntry={true}
                        style={Styles.input}
                        placeholder="Enter your password"
                     />
                     <TouchableOpacity style={{width:30,position: 'absolute',right: 10,bottom:15}}>
                        <Entypo name="eye-with-line" size={24} color="#13728F" />
                     </TouchableOpacity>
                  </View>
                  <View style={Styles.inputGroup}>
                     <TouchableOpacity style={{backgroundColor:'#13728F',height:40,borderRadius:10}}>
                        <Text style={{textAlign:'center',fontSize:20,color:'white',padding:6}}>Register</Text>
                     </TouchableOpacity>
                  </View>

                  <View style={Styles.inputGroup}>
                     <TouchableOpacity>
                        <Text style={{textAlign:'center',fontSize:18,color:'#13728F',padding:6}}>Already user?Login</Text>
                     </TouchableOpacity>
                  </View>
               </View>
            </ImageBackground>
         <BottomBar/>
      </View>
   )
   
}
export default SignUp