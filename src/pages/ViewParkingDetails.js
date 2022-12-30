import React from 'react'
import {
   AppRegistry,
   StyleSheet,
   Text,
   View,
   Alert,
   SafeAreaView,
   TextInput,
   TouchableOpacity,
   Image,
 } from 'react-native';
 import { Styles } from '../utils/Styles';
 import BottomBar from '../components/BottomBar/BottomBar';
 import MapView from 'react-native-maps'
 import { Ionicons,Entypo,Octicons,EvilIcons,FontAwesome5,AntDesign} from '@expo/vector-icons';

const ViewParkingDetails= ({ navigation, route }) => {
    return(
        <View style={Styles.container}>
            <View style={{backgroundColor:"#13728F",paddingStart:10,paddingEnd:10}}>
                <View style={Styles.topBar}>
                    <Ionicons name="arrow-back-outline" size={26} style={{paddingTop:5}} color="#CCF5FE" onPress={()=> navigation.goBack()}/>
                    <Image style={Styles.logo} source={require('../../assets/images/profile.jpeg')}/>
                    <View style={Styles.parkingTop}>
                        <Text style={{fontSize:18,color:"#CCF5FE",fontWeight:'bold'}}>Parking Name</Text>
                        <View style={Styles.parkingTopLocation}>
                            <Text style={{color:"#CCF5FE"}}>Location</Text>
                        </View>
                    </View>
                </View>
            </View>
            <MapView style={{flex: 1}} region={{latitude: 42.882004,longitude: 74.582748,latitudeDelta: 0.0922,longitudeDelta: 0.0421}} showsUserLocation={true}/>
            <View style={[Styles.card,{position: 'absolute',left:50,bottom:100,backgroundColor:'white'}]}>
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
                    <TouchableOpacity style={Styles.exploreBtn} title='Explore' onPress={()=> navigation.navigate('parkingSlots')}>
                        <Text style={Styles.exploreText}>View slots</Text>
                    </TouchableOpacity>
                </View>
                </View>
            </View>
            <BottomBar/>
        </View>
    )
   
}
export default ViewParkingDetails