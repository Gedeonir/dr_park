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
                    <Ionicons name="arrow-back-outline" size={26} style={{paddingTop:5}} color="#CCF5FE"/>
                    <Image style={Styles.logo} source={require('../../assets/images/profile.jpeg')}/>
                    <View style={Styles.parkingTop}>
                        <Text style={{fontSize:18,color:"#CCF5FE",fontWeight:'bold'}}>Parking Name</Text>
                        <View style={Styles.parkingTopLocation}>
                            <Text style={{color:"#CCF5FE"}}>Location</Text>
                        </View>
                    </View>
                </View>
            </View>
            <ScrollView horizontal={false} vertical={true} >
                <View>
                    <View>
                        <Text>
                            A1
                        </Text>
                    </View>
                </View>
                <View>
                    <View>
                        <Text>
                            A1
                        </Text>
                    </View>
                </View>
            </ScrollView>
            <BottomBar/>
        </View>
    )
   
}
export default ParkingSlots