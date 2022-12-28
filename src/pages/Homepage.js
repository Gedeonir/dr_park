import React from 'react'
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
 import tw from 'tailwind-react-native-classnames';
 import { Styles } from '../utils/Styles';
 import MapView from 'react-native-maps'
 import BottomBar from '../components/BottomBar/BottomBar';
 import { Ionicons,Entypo,Octicons,EvilIcons,FontAwesome5,AntDesign} from '@expo/vector-icons';

const Home = ({ navigation}) => {
   return (
      <View style={Styles.container}>
         <View style={{backgroundColor:"#13728F",paddingBottom:10,paddingStart:10,paddingEnd:10}}>
            <View style={Styles.topBar}>
               <Image style={Styles.logo} source={require('../../assets/images/logo.png')}/>
               <View style={Styles.topBarBtn1}>
                  <TouchableOpacity style={Styles.signIn} title='Sign in' onPress={()=> navigation.navigate('signUp')}>
                     <Text style={Styles.signInText}>Sign in</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={Styles.signIn} title='Notification' onPress={()=> navigation.navigate('signUp')}>
                     <Ionicons name="notifications" size={20} color="#CCF5FE" />
                     <Entypo name="dot-single" size={24} color="#E4A77A" style={Styles.dot}/>
                  </TouchableOpacity>
                  <TouchableOpacity style={Styles.signIn} title='Profile' onPress={()=> navigation.navigate('signUp')}>
                     <Octicons name="person" size={20} color="#CCF5FE" />
                  </TouchableOpacity>
               </View>
            </View>
            <SafeAreaView style={Styles.searchBox}>
               <TextInput
                  placeholder='Search any nearby parking'
                  style={Styles.searchInput}
                  />
                  <Ionicons name="filter" size={44} color="#CCF5FE" />
            </SafeAreaView>
         </View>
         <MapView style={{flex: 1}} region={{latitude: 42.882004,longitude: 74.582748,latitudeDelta: 0.0922,longitudeDelta: 0.0421}} showsUserLocation={true}/>
         <View style={Styles.parkingNear}>
            <View>
               <Text style={Styles.parkingNearTitle}>Recent parkings</Text>
               <ScrollView horizontal={true} style={Styles.cardsView}>
                  <View style={Styles.card}>
                     <View style={Styles.cardHeader}>
                        <Text style={Styles.cardHeaderText}>Parking name</Text>
                        <AntDesign name="staro" size={20} style={Styles.star} />
                     </View>
                     <View style={Styles.cardBody}>
                        <View>
                           <View style={Styles.cardElement}>
                              <EvilIcons name="location" size={20} style={Styles.cardIcons} />
                              <Text>Parking location</Text>
                           </View>
                           <View style={Styles.cardElement}>
                              <Ionicons name="md-car-sport-outline" size={20} style={Styles.cardIcons}/>
                              <Text>Parking capacity</Text>
                           </View>
                           <View style={Styles.cardElement}>
                              <Ionicons name="cash-outline" size={20} style={Styles.cardIcons} />
                              <Text>Parking prices</Text>
                           </View>
                        </View>
                        <View>
                           <Text style={Styles.slotTitle}>Slots Available</Text>
                           <Text style={Styles.slotNumber}>12</Text>
                           <TouchableOpacity style={Styles.exploreBtn} title='Explore' onPress={()=> navigation.navigate('signUp',{name:'Jane'})}>
                              <Text style={Styles.exploreText}>Explore</Text>
                           </TouchableOpacity>
                        </View>
                     </View>
                  </View>

                  <View style={Styles.card}>
                     <View style={Styles.cardHeader}>
                        <Text style={Styles.cardHeaderText}>Parking name</Text>
                        <AntDesign name="staro" size={20} style={Styles.star} />
                     </View>
                     <View style={Styles.cardBody}>
                        <View>
                           <View style={Styles.cardElement}>
                              <EvilIcons name="location" size={20} style={Styles.cardIcons} />
                              <Text>Parking location</Text>
                           </View>
                           <View style={Styles.cardElement}>
                              <Ionicons name="md-car-sport-outline" size={20} style={Styles.cardIcons}/>
                              <Text>Parking capacity</Text>
                           </View>
                           <View style={Styles.cardElement}>
                              <Ionicons name="cash-outline" size={20} style={Styles.cardIcons} />
                              <Text>Parking prices</Text>
                           </View>
                        </View>
                        <View>
                           <Text style={Styles.slotTitle}>Slots Available</Text>
                           <Text style={Styles.slotNumber}>12</Text>
                           <TouchableOpacity style={Styles.exploreBtn} title='Explore' onPress={()=> navigation.navigate('signUp',{name:'Jane'})}>
                              <Text style={Styles.exploreText}>Explore</Text>
                           </TouchableOpacity>
                        </View>
                     </View>
                  </View>

                  <View style={Styles.card}>
                     <View style={Styles.cardHeader}>
                        <Text style={Styles.cardHeaderText}>Parking name</Text>
                        <AntDesign name="staro" size={20} style={Styles.star} />
                     </View>
                     <View style={Styles.cardBody}>
                        <View>
                           <View style={Styles.cardElement}>
                              <EvilIcons name="location" size={20} style={Styles.cardIcons} />
                              <Text>Parking location</Text>
                           </View>
                           <View style={Styles.cardElement}>
                              <Ionicons name="md-car-sport-outline" size={20} style={Styles.cardIcons}/>
                              <Text>Parking capacity</Text>
                           </View>
                           <View style={Styles.cardElement}>
                              <Ionicons name="cash-outline" size={20} style={Styles.cardIcons} />
                              <Text>Parking prices</Text>
                           </View>
                        </View>
                        <View>
                           <Text style={Styles.slotTitle}>Slots Available</Text>
                           <Text style={Styles.slotNumber}>12</Text>
                           <TouchableOpacity style={Styles.exploreBtn} title='Explore' onPress={()=> navigation.navigate('parkingDetails')}>
                              <Text style={Styles.exploreText}>Explore</Text>
                           </TouchableOpacity>
                        </View>
                     </View>
                  </View>
               </ScrollView>
            </View>

         </View>
         <BottomBar/>
      </View>
   )
}
export default Home