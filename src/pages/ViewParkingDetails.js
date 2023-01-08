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
 import { Ionicons,Entypo,Octicons,EvilIcons,FontAwesome5,AntDesign,MaterialIcons,Feather} from '@expo/vector-icons';
 import { useDispatch,useSelector } from 'react-redux';
 import { getOneParking } from '../redux/actions/fetchAllParkingsAction';

const ViewParkingDetails= ({ navigation, route }) => {
    const {ID} = route.params;
    const dispatch = useDispatch();
    const parkingData = useSelector(
        (state) => state.getOneParkingReducer?.oneParking
    );
    
    React.useEffect(() => {
    async function handleGetParking() {
        await dispatch(getOneParking(ID));
    };

    handleGetParking()
    },[parkingData]);

    return(
        <View style={Styles.container}>
            {parkingData.loading?(
                <View style={{padding:12,position:'absolute',top:'30%',right:0,left:0}}>
                    <Image style={[Styles.profilePhoto,{marginLeft:'auto',marginRight:'auto',marginTop:20}]} source={require('../../assets/images/loading.gif')}/>
                    <Text style={{textAlign:'center'}}>Loading...</Text>
                </View>
            ):( 
                parkingData.success?(
                <>
                <View style={{ backgroundColor: "#13728F", paddingStart: 2, paddingEnd: 2 }}>
                    <View style={Styles.topBar}>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '70%' }}>
                            <Ionicons name="arrow-back-outline" size={26} style={{ paddingTop: 5 }} color="#CCF5FE" onPress={() => navigation.goBack()} />
                            <Image style={Styles.profilePhoto} source={require('../../assets/images/profile.jpeg')} />
                            <View style={Styles.parkingTop}>
                                <Text style={{ fontSize: 18, color: "#CCF5FE", fontWeight: 'bold' }}>{parkingData?.oneParking.parkingName}</Text>
                                <View style={Styles.parkingTopLocation}>
                                    <Text style={{ color: "#CCF5FE" }}>{parkingData?.oneParking.location}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width: '20%' }}>
                            <AntDesign name="edit" size={20} style={{ paddingTop: 5 }} color="#CCF5FE" />
                            <MaterialIcons name="delete" size={20} style={{ paddingTop: 5 }} color="#5c0512" />
                        </View>
                    </View>
                </View>
                <MapView style={{ flex: 1 }} region={{ latitude: 42.882004, longitude: 74.582748, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }} showsUserLocation={true} />
                <View style={[Styles.card, { position: 'absolute', height: 200, left: 50, bottom: 100, backgroundColor: 'white' }]}>
                    <View style={Styles.cardBody}>
                        <View>
                            <View style={Styles.cardElement}>
                                <EvilIcons name="location" size={20} style={Styles.cardIcons} />
                                <View>
                                    <Text>{parkingData?.oneParking.province}</Text>
                                    <Text>{parkingData?.oneParking.district}</Text>
                                    <Text>{parkingData?.oneParking.sector}</Text>
                                    <Text>{parkingData?.oneParking.location}</Text>
                                </View>
                            </View>
                            <View style={Styles.cardElement}>
                                <Ionicons name="md-car-sport-outline" size={20} style={Styles.cardIcons} />
                                <Text>Parking capacity</Text>
                            </View>
                            <View style={Styles.cardElement}>
                                <Ionicons name="cash-outline" size={20} style={Styles.cardIcons} />
                                <Text>{parkingData.oneParking.prices}Rwf/h</Text>
                            </View>
                        </View>
                        <View>
                            <Text style={[Styles.slotTitle, { fontSize: 20 }]}>Slots Available</Text>
                            <Text style={[Styles.slotNumber, { fontSize: 30 }]}>12</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={Styles.exploreBtn} title='Explore' onPress={() => navigation.navigate('parkingSlots', { parkingID: parkingData?.oneParking._id })}>
                        <Text style={Styles.exploreText}>View slots</Text>
                    </TouchableOpacity>
                </View>
                </>):(
                    <View style={{padding:10,position:'absolute',top:'30%',right:0,left:0}}>
                        <MaterialIcons style={{textAlign:'center'}} name="error" size={100} color="#13728F" />
                        <Text style={{textAlign:'center',fontSize:20,padding:5,margin:12}}>{parkingData.error}</Text>
                        <TouchableOpacity style={Styles.exploreBtn} title='Explore' onPress={()=> navigation.navigate('parkingDetails',{ID:parking._id})}>
                        <Text style={Styles.exploreText}>Reload</Text>
                        </TouchableOpacity>
                    </View>
                )
            )}
            <BottomBar/>
        </View>
    )
   
}
export default ViewParkingDetails