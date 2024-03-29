import React from 'react'
import {
   AppRegistry,
   StyleSheet,
   Text,
   View,
   Image,
   ImageBackground,
   ToastAndroid,
   TextInput,
   TouchableOpacity,  
 } from 'react-native';
 import { Styles } from '../utils/Styles';
 import axios from 'axios';
 import BottomBar from '../components/BottomBar/BottomBar';
 import { Ionicons,Entypo,Octicons,EvilIcons,FontAwesome5,AntDesign} from '@expo/vector-icons';
 import {BACKEND_URL} from '@env'
 import * as SecureStore from 'expo-secure-store';

const SignIn = ({ navigation, route }) => {
   const [values,setValues] = React.useState({
      email:"",
      password:""
   })
   const [showPassword,setShowPassword] = React.useState(false)

   const handleShowPassword=()=>{
      setShowPassword(!showPassword);
   }

   const handleSignIn=()=>{
      const input={
         email:values.email,
         password:values.password
      }

      fetch(`${BACKEND_URL}/users/login`,{
         method:"POST",

         headers:{
            "Content-Type":'application/json',
         },
         body:JSON.stringify(input)
      })
      .then((response)=>{
         if(response.status !==200){
            response.json().then((data)=>{
               ToastAndroid.show(`${data.message}`, ToastAndroid.LONG,ToastAndroid.TOP,25,50);
            })
            return;
         }
         response.json().then(async function (data) {
            ToastAndroid.show(`${data.message}`, ToastAndroid.LONG,ToastAndroid.TOP,25,50);
            await SecureStore.setItemAsync("token", data.token);
            navigation.navigate('Home')
          });
      })
   }
   return( 
      <View style={Styles.container}>
            <ImageBackground style={{width:'100%',height:'100%',paddingTop:34}} resizeMode="cover" source={require('../../assets/images/accounts-bg.jpg')}>
               <Image style={{width:100,height:100,marginLeft:'auto',marginRight:'auto',marginTop:12,borderRadius:20}} source={require('../../assets/images/logo.png')}/>
               <View style={Styles.userAccount}>
                  <View style={{display:'flex',flexDirection:'row'}}>
                     <TouchableOpacity style={{marginRight:6}}>
                        <Ionicons name="arrow-back-outline" size={26} style={{paddingTop:5}} color="#13728F" onPress={()=> navigation.goBack()}/>
                     </TouchableOpacity>
                     <Text style={Styles.parkingNearTitle}>Log into your account</Text>
                  </View>
                  <View style={Styles.inputGroup}>
                     <Text style={Styles.label}>Email</Text>
                     <TextInput
                        style={Styles.input}
                        defaultValue={values.email}
                        placeholder="Enter your email"
                        onChangeText={(e)=>{
                           setValues({
                              ...values,
                              email:e
                           })
                        }}
                     />
                  </View>
                  <View style={Styles.inputGroup}>
                     <Text style={Styles.label}>Password</Text>
                     <TextInput
                        secureTextEntry={!showPassword?true:false}
                        style={Styles.input}
                        placeholder="Enter your password"
                        onChangeText={(password)=>{
                           setValues({
                              ...values,
                              password:password
                           })
                        }}
                     />
                     <TouchableOpacity style={{width:30,position: 'absolute',right: 10,bottom:11}} onPress={()=>handleShowPassword()}>
                        <Entypo name={!showPassword?"eye-with-line":"eye"} size={24} color="#13728F" />
                     </TouchableOpacity>
                  </View>
                  <TouchableOpacity title='Notification'>
                     <Text>Forgot password?</Text>
                  </TouchableOpacity>
                  <View style={Styles.inputGroup}>
                     <TouchableOpacity style={{backgroundColor:'#13728F',height:40,borderRadius:10}} onPress={()=>handleSignIn()}>
                        <Text style={{textAlign:'center',fontSize:20,color:'white',padding:6}}>Login</Text>
                     </TouchableOpacity>
                  </View>

                  <View style={Styles.inputGroup}>
                     <TouchableOpacity onPress={()=> navigation.navigate('signUp')}>
                        <Text style={{textAlign:'center',fontSize:18,color:'#13728F',padding:6}}>New user?Register</Text>
                     </TouchableOpacity>
                  </View>
               </View>
            </ImageBackground>
         <BottomBar/>
      </View>
   )
   
}
export default SignIn