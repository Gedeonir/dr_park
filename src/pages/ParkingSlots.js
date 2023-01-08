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
import { Ionicons,Entypo,Octicons,EvilIcons,FontAwesome5,AntDesign,MaterialIcons} from '@expo/vector-icons';
import { getOneParking } from '../redux/actions/fetchAllParkingsAction';
import { getOneParkingSlots } from '../redux/actions/fetchAllParkingsAction';
import { useDispatch,useSelector } from 'react-redux';
import { Modal } from '@mui/material';


const ParkingSlots= ({ navigation, route }) => {
    const {parkingID} = route.params;

    const [addNewSlotModal, setAddNewSlotModal] = React.useState(false);

    const dispatch = useDispatch();
    const parkingData = useSelector(
        (state) => state.getOneParkingReducer?.oneParking
    );

    const slotsData = useSelector((state)=>state.getParkingSlotsReducer?.parkingSlots)
    
    React.useEffect(() => {
        async function handleGetParking() {
            await dispatch(getOneParking(parkingID));
        };

        async function handleGetParkingSlots() {
            await dispatch(getOneParkingSlots(parkingID));
        };

        handleGetParking()
        handleGetParkingSlots()
    },[]);

    return(
        <View style={Styles.container}>
            {parkingData.loading && slotsData.loading?(
                <View style={{padding:12,position:'absolute',top:'30%',right:0,left:0}}>
                    <Image style={[Styles.profilePhoto,{marginLeft:'auto',marginRight:'auto',marginTop:20}]} source={require('../../assets/images/loading.gif')}/>
                    <Text style={{textAlign:'center'}}>Loading...</Text>
                </View>
            ):( 
                parkingData.success && slotsData.success?(
                    <>
                    <View style={{ backgroundColor: "#13728F", paddingStart: 10, paddingEnd: 10 }}>
                        <View style={Styles.topBar}>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '70%' }}>
                                <Ionicons name="arrow-back-outline" size={26} style={{ paddingTop: 5 }} color="#CCF5FE" onPress={() => navigation.goBack()} />
                                <Image style={Styles.profilePhoto} source={require('../../assets/images/profile.jpeg')} />
                                <View style={Styles.parkingTop}>
                                    <Text style={{ fontSize: 18, color: "#CCF5FE", fontWeight: 'bold' }}>{parkingData?.oneParking.parkingName}</Text>
                                    <View style={Styles.parkingTopLocation}>
                                        <Text style={{ color: "#CCF5FE" }}>Slots</Text>
                                    </View>
                                </View>
                                <TouchableOpacity title='Add new' onPress={() => setAddNewSlotModal(true)}>
                                    <Text style={[Styles.signInText, { padding: 4 }]}>ADD NEW</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <Modal
                    animationType="slide"
                    transparent={true}
                    visible={addNewSlotModal}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setAddNewSlotModal(!addNewSlotModal);
                      }}>
                        <View style={{backgroundColor:'rgba(193,243,254)',width:'90%',padding:10,marginLeft:'auto',marginRight:'auto',borderRadius:10}}>
                            <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                                <Text style={Styles.parkingNearTitle}>Add new slot</Text>
                                <TouchableOpacity style={{marginRight:6}}>
                                    <AntDesign name="closecircle" size={26} style={{paddingTop:5}} color="#13728F" onPress={()=> navigation.goBack()} />
                                </TouchableOpacity>
                            </View>
                            <View style={Styles.inputGroup}>
                                <Text style={Styles.label}>Slot Code/Name</Text>
                                <TextInput
                                    style={Styles.input}
                                    placeholder="Enter slot name"
                                />
                            </View>
                            <View style={Styles.inputGroup}>
                                <Text style={Styles.label}>Slot size</Text>
                                <TextInput
                                    secureTextEntry={true}
                                    style={Styles.input}
                                    placeholder="Enter size of slot"
                                />
                            </View>

                            <View style={Styles.inputGroup}>
                                <Text style={Styles.label}>Slot sensor</Text>
                                <TextInput
                                    secureTextEntry={true}
                                    style={Styles.input}
                                    placeholder="Enter slot sensor"
                                />
                            </View>

                            <View style={Styles.inputGroup}>
                                <TouchableOpacity style={{backgroundColor:'#13728F',height:40,borderRadius:10}}>
                                    <Text style={{textAlign:'center',fontSize:20,color:'white',padding:6}}>Add slot</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                    <View style={{ padding: 8 }}>
                        <View style={Styles.slotsHeader}>
                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <View style={{ width: 50, borderColor: '#13728F', borderWidth: 1, marginRight: 14, borderRadius: 10 }} />
                                <Text style={{color: '#13728F'}}>Free</Text>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <View style={{ width: 50, marginRight: 4, borderRadius: 10 }}>
                                    <Image style={{ height: 20, width: 40 }} source={require('../../assets/images/topViewCar.png')} />
                                </View>
                                <Text style={{color: '#13728F'}}>Occupied</Text>
                            </View>
                        </View>
                        <View style={Styles.slotBody}>
                            {slotsData?.parkingSlots.map((slot) => {
                                return (
                                    slot.status == 'Available' ? (
                                        <View style={[Styles.freeSlot]} key={slot._id}>
                                            <Text style={{ color: '#13728F', textAlign: 'center', marginBottom: 4, fontWeight: 'bold' }}>{slot.slotCode}</Text>
                                        </View>
                                    ) : (
                                        <View style={[Styles.freeSlot]} key={slot._id}>
                                            <Text style={{ color: '#13728F', textAlign: 'center', marginBottom: 4, fontWeight: 'bold' }}>{slot.slotCode}</Text>
                                            <Image style={{ height: 40, width: 100 }} source={require('../../assets/images/topViewCar.png')} />
                                        </View>
                                    )

                                );
                            })}

                        </View>
                    </View>
                    </>
                ):(
                    <View style={{padding:10,position:'absolute',top:'30%',right:0,left:0}}>
                        <MaterialIcons style={{textAlign:'center'}} name="error" size={100} color="#13728F" />
                        <Text style={{textAlign:'center',fontSize:20,padding:5,margin:12}}>{parkingData.error|| slotsData.error}</Text>
                        <TouchableOpacity style={Styles.exploreBtn} title='Explore' onPress={()=> navigation.navigate('parkingDetails',{ID:parking._id})}>
                        <Text style={Styles.exploreText}>Reload</Text>
                        </TouchableOpacity>
                    </View>
                ))}
           
            <BottomBar/>
        </View>
    )
   
}
export default ParkingSlots