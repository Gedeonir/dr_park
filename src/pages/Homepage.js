import React from 'react'
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
   AppRegistry,
   StyleSheet,
   Text,
   View,
   Alert,
   Image,
   Button,
   SafeAreaView,
   TouchableOpacity,
   TextInput,
   ScrollView
 } from 'react-native';
 import { useDispatch, useSelector } from "react-redux";
 import { Styles } from '../utils/Styles';
 import MapView from 'react-native-maps'
 import BottomBar from '../components/BottomBar/BottomBar';
 import { Ionicons,Entypo,Octicons,EvilIcons,FontAwesome5,AntDesign,MaterialIcons} from '@expo/vector-icons';
 import { getAllParkings } from '../redux/actions/fetchAllParkingsAction';
 import * as SecureStore from 'expo-secure-store';


const Home = ({ navigation}) => {
   const [loading,setLoading]= React.useState(true)
   const dispatch = useDispatch();
   const parkingData = useSelector(
      (state) => state.getAllParkingsReducer?.getParkings
    );
   useEffect(() => {
      async function handleGetParkings() {
         await dispatch(getAllParkings());
      };

      async function getValueFor() {
         let result = await SecureStore.getItemAsync("token");
       }
       getValueFor()
      handleGetParkings()
   },[parkingData]);

   return (
      <View style={Styles.container}>
         <View style={{backgroundColor:"#13728F",paddingBottom:10,paddingStart:10,paddingEnd:10}}>
            <View style={Styles.topBar}>
               <Image style={Styles.logo} source={require('../../assets/images/logo.png')}/>
               <View style={Styles.topBarBtn1}>
                  <TouchableOpacity style={Styles.signIn} title='Notification' onPress={() => navigation.navigate('search')}>
                     <AntDesign name="search1" size={20} color="#CCF5FE" />
                  </TouchableOpacity>
                  <TouchableOpacity style={Styles.signIn} title='Notification' onPress={() => navigation.navigate('signUp')}>
                     <Ionicons name="notifications" size={20} color="#CCF5FE" />
                     <Entypo name="dot-single" size={24} color="#E4A77A" style={Styles.dot} />
                  </TouchableOpacity>
                  <TouchableOpacity style={Styles.signIn} title='Profile' onPress={() => navigation.navigate('signUp')}>
                     <Octicons name="person" size={20} color="#CCF5FE" />
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={Styles.signIn} title='Sign in' onPress={()=> navigation.navigate('signIn')}>
                     <Text style={Styles.signInText}>Sign in</Text>
                  </TouchableOpacity>

               </View>
            </View>
         </View>
         <MapView style={{flex: 1}} region={{latitude: 42.882004,longitude: 74.582748,latitudeDelta: 0.0922,longitudeDelta: 0.0421}} showsUserLocation={true}/>
         <View style={Styles.parkingNear}>
            <View>
               <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
               <Text style={Styles.parkingNearTitle}>Recent parkings</Text>
               <TouchableOpacity style={Styles.signIn} title='Sign in' onPress={()=> navigation.navigate('parkingsList')}>
                  <Text style={{color:'#13728F'}}>View all</Text>
               </TouchableOpacity>
               </View>
               {parkingData.loading?(
                  <View style={{padding:12}}>
                     <Image style={[Styles.profilePhoto,{marginLeft:'auto',marginRight:'auto',marginTop:20}]} source={require('../../assets/images/loading.gif')}/>
                     <Text style={{textAlign:'center'}}>Loading...</Text>
                  </View>
               ):(
                  parkingData.success?(
                     <ScrollView horizontal={true} style={Styles.cardsView}>
                        {parkingData?.parkings.map((parking)=>{
                           return(
                              <View style={Styles.card} key={parking._id}>
                                 <View style={Styles.cardHeader}>
                                    <Text style={Styles.cardHeaderText}>{parking.parkingName}</Text>
                                    <AntDesign name="staro" size={20} style={Styles.star} />
                                 </View>
                                 <View style={Styles.cardElement}>
                                    <EvilIcons name="location" size={20} style={Styles.cardIcons} />
                                    <Text>{parking.province},{parking.district},{parking.sector},{parking.location}</Text>
                                 </View>
                                 <View style={Styles.cardBody}>
                                    <View>
                                       <View style={Styles.cardElement}>
                                          <Ionicons name="md-car-sport-outline" size={20} style={Styles.cardIcons}/>
                                          <Text>Capacity:{parking.capacity}</Text>
                                       </View>
                                       <View style={Styles.cardElement}>
                                          <Ionicons name="cash-outline" size={20} style={Styles.cardIcons} />
                                       <Text>{parking.prices} Rwf/h</Text>
                                       </View>
                                    </View>
                                    <View>
                                       <Text style={Styles.slotTitle}>Slots Available</Text>
                                       <Text style={Styles.slotNumber}>{parking.slotAvailable}</Text>
                                    </View>
                                 </View>
                                 <TouchableOpacity style={Styles.exploreBtn} title='Explore' onPress={()=> navigation.navigate('parkingDetails',{ID:parking._id})}>
                                    <FontAwesome5 name="directions" size={20} style={Styles.exploreText} />
                                    <Text style={Styles.exploreText}>Explore</Text>
                                 </TouchableOpacity>
                              </View>
                           )
                        })}
                     </ScrollView>
                  ):(
                     <View style={{padding:10}}>
                        <MaterialIcons style={{textAlign:'center'}} name="error" size={60} color="#13728F" />
                        <Text style={{textAlign:'center',fontSize:20,padding:5}}>{parkingData.error}</Text>
                        <TouchableOpacity style={Styles.exploreBtn} title='Explore' onPress={()=> navigation.navigate('parkingDetails',{ID:parking._id})}>
                           <Text style={Styles.exploreText}>Reload</Text>
                        </TouchableOpacity>
                     </View>
                  )
                  )}
            </View>

         </View>
         <BottomBar/>
      </View>
   )
}

 
export default Home