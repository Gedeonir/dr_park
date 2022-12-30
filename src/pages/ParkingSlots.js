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
import { ScrollView } from 'react-native-web';

const ParkingSlots= ({ navigation, route }) => {
    return(
        <View style={Styles.container}>
            <View style={{backgroundColor:"#13728F",paddingStart:10,paddingEnd:10}}>
                <View style={Styles.topBar}>
                    <Ionicons name="arrow-back-outline" size={26} style={{paddingTop:5}} color="#CCF5FE" onPress={()=> navigation.goBack()}/>
                    <Image style={Styles.logo} source={require('../../assets/images/profile.jpeg')}/>
                    <View style={Styles.parkingTop}>
                        <Text style={{fontSize:18,color:"#CCF5FE",fontWeight:'bold'}}>Parking Name</Text>
                        <View style={Styles.parkingTopLocation}>
                            <Text style={{color:"#CCF5FE"}}>Slots</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{padding:8}}>
                <View  style={Styles.slotsHeader}>
                    <View style={{display:'flex',flexDirection:'row'}}>
                        <View style={{width:50,borderColor:'#13728F',borderWidth:1,marginRight:14,borderRadius:10}}/>
                        <Text>Free</Text>
                    </View>
                    <View style={{display:'flex',flexDirection:'row'}}>
                        <View style={{width:50,backgroundColor:'#13728F',marginRight:14,borderRadius:10}}/>
                        <Text>Occupied</Text>
                    </View>
                </View>
                <View style={Styles.slotBody}>
                    <View style={[Styles.freeSlot,Styles.leftSlot]}>
                        <Text style={{textAlign:'center',padding:12,fontSize:20}}>S1</Text>
                    </View>
                    <View style={[Styles.freeSlot,Styles.rightSlot]}>
                        <Text style={{textAlign:'center',padding:12,fontSize:20}}>S2</Text>
                    </View>
                    <View style={[Styles.freeSlot,Styles.leftSlot]}>
                        <Text style={{textAlign:'center',padding:12,fontSize:20}}>S1</Text>
                    </View>
                    <View style={[Styles.freeSlot,Styles.rightSlot]}>
                        <Text style={{textAlign:'center',padding:12,fontSize:20}}>S2</Text>
                    </View>
                    <View style={[Styles.freeSlot,Styles.leftSlot]}>
                        <Text style={{textAlign:'center',padding:12,fontSize:20}}>S1</Text>
                    </View>
                    <View style={[Styles.freeSlot,Styles.rightSlot]}>
                        <Text style={{textAlign:'center',padding:12,fontSize:20}}>S2</Text>
                    </View>
                    <View style={[Styles.freeSlot,Styles.leftSlot]}>
                        <Text style={{textAlign:'center',padding:12,fontSize:20}}>S1</Text>
                    </View>
                    <View style={[Styles.freeSlot,Styles.rightSlot]}>
                        <Text style={{textAlign:'center',padding:12,fontSize:20}}>S2</Text>
                    </View><View style={[Styles.freeSlot,Styles.leftSlot]}>
                        <Text style={{textAlign:'center',padding:12,fontSize:20}}>S1</Text>
                    </View>
                    <View style={[Styles.freeSlot,Styles.rightSlot]}>
                        <Text style={{textAlign:'center',padding:12,fontSize:20}}>S2</Text>
                    </View>
                </View>
            </View>
            <BottomBar/>
        </View>
    )
   
}
export default ParkingSlots