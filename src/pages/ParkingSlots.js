import React from 'react'
import {
   AppRegistry,
   StyleSheet,
   Text,
   View,
   Button,
   Alert,
   SafeAreaView,
   TextInput,
   TouchableOpacity,
   Image,
   Modal,
   ToastAndroid
 } from 'react-native';
import { Styles } from '../utils/Styles';
import BottomBar from '../components/BottomBar/BottomBar';
import MapView from 'react-native-maps'
import { Ionicons,Entypo,Octicons,EvilIcons,FontAwesome5,AntDesign,MaterialIcons} from '@expo/vector-icons';
import { getOneParking } from '../redux/actions/fetchAllParkingsAction';
import { getOneParkingSlots } from '../redux/actions/fetchAllParkingsAction';
import { useDispatch,useSelector } from 'react-redux';
import {BACKEND_URL} from '@env'



const ParkingSlots= ({ navigation, route }) => {
    const {parkingID} = route.params;
    const [open, setOpen] = React.useState(false);
    const [formData,setFormData] = React.useState({
        slotCode:"",
        slotSize:"",
        sensor:""
    })

    const [modalVisible, setModalVisible] = React.useState(false);

    function showToast(name) {
        ToastAndroid.show(`${name} is required!`, ToastAndroid.LONG,ToastAndroid.TOP,25,50);
    }

    const handleSubmit = async(event)=>{
        setOpen(false)
        const reg = new RegExp("^((S))[0-9]", "i");
        const input={
            slotCode:formData.slotCode,
            slotSize:formData.slotCode,
            sensor:formData.sensor
         }

        if (formData.sensor ==="") {
            showToast("Slot sensor")
        }else if(formData.slotCode ===""){
            showToast("Slot code/name")
        }else if(formData.slotSize ===""){
            showToast("Slot size")
        }else if(!reg.test(formData.sensor)){
            ToastAndroid.show(`Sensor must startWith S followed by number between 0-9`, ToastAndroid.LONG,ToastAndroid.TOP,25,50);
        }else {
            fetch(`${BACKEND_URL}/parkings/${parkingID}/slots`,{
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
                   console.log(data);
                 });
             })
            setOpen(true)
        }
    }

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
    },[parkingID,slotsData]);


    return(
        <View style={Styles.container}> 
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
                            <TouchableOpacity style={{backgroundColor:'#CCF5FE',borderRadius:10,height:40,width:90}} title='Add new' onPress={() => setModalVisible(true)}>
                                <Text style={[Styles.signInText, { padding: 10,color:"#13728F",textAlign:'center' }]}>ADD NEW</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                    setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',width:'100%'}}>
                                <Text style={Styles.parkingNearTitle}>Add new slot</Text>
                                <TouchableOpacity style={{marginRight:6}}>
                                    <AntDesign name="closecircle" size={36} style={{paddingTop:5}} color="#13728F" onPress={() => {setModalVisible(false),setOpen(false)}} />
                                </TouchableOpacity>
                            </View>                                
                            <View style={Styles.inputGroup}>
                                <Text style={Styles.label}>Slot Code/Name</Text>
                                <TextInput
                                    style={Styles.input}
                                    defaultValue={formData.slotCode}
                                    placeholder="Enter slot code/name"
                                    name="slotCode"
                                    onChangeText={(value)=>{
                                        setFormData({
                                        ...formData,
                                        slotCode:value
                                        })
                                    }
                                    }
                                />
                            </View>
                            <View style={Styles.inputGroup}>
                                <Text style={Styles.label}>Slot size</Text>
                                <TextInput
                                    name='slotSize'
                                    defaultValue={formData.slotSize}
                                    style={Styles.input}
                                    placeholder="Enter size of slot"
                                    onChangeText={(sizeValue)=>
                                        setFormData({
                                            ...formData,
                                            slotSize:sizeValue
                                        })
                                    }
                                />
                            </View>

                            <View style={Styles.inputGroup}>
                                <Text style={Styles.label}>Slot sensor</Text>
                                <TextInput
                                    name='sensor'
                                    defaultValue={formData.sensor}
                                    style={Styles.input}
                                    placeholder="Enter slot sensor"
                                    onChangeText={(sensorValue)=>
                                        setFormData({
                                        ...formData,
                                        sensor:sensorValue
                                        })
                                    }
                                />
                            </View>

                            <View style={Styles.inputGroup}>
                                <TouchableOpacity style={{backgroundColor:'#13728F',height:40,borderRadius:10}} onPress={()=> handleSubmit()}>
                                    <Text style={{textAlign:'center',fontSize:20,color:'white',padding:6}}>Add slot</Text>
                                </TouchableOpacity>
                            </View>
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
                        <View style={{padding:10,position:'absolute',top:'30%',right:0,left:0, display:`${slotsData?.parkingSlots.length > 0?'none':'flex'}`}}>
                            <Text style={{textAlign:'center',fontSize:20,padding:5,margin:12}}>{parkingData.oneParking.parkingName} have no slots yet</Text>
                        </View>
                        {slotsData?.parkingSlots.map((slot) => {
                            return (
                                slot.status == 'Available' ? (
                                    <View style={[Styles.freeSlot]} key={slot._id}>
                                        <Text style={{ color: '#13728F', textAlign: 'center', marginBottom: 4, fontWeight: 'bold' }}>{slot.slotCode}({slot.sensor})</Text>
                                    </View>
                                ) : (
                                    <View style={[Styles.freeSlot]} key={slot._id}>
                                        <Text style={{ color: '#13728F', textAlign: 'center', marginBottom: 4, fontWeight: 'bold' }}>{slot.slotCode}({slot.sensor})</Text>
                                        <Image style={{ height: 40, width: 100 }} source={require('../../assets/images/topViewCar.png')} />
                                    </View>
                                )

                            );
                        })}

                    </View>
                </View>
                <View style={{height:80,with:'90%',position:'absolute',bottom:'10%',padding:10,right:0,left:0}}>
                    <TouchableOpacity style={[Styles.exploreBtn,{height:50,width:'70%'}]} title='Explore' onPress={() => navigation.navigate('bookParking', { parkingID: parkingData?.oneParking._id })}>
                        <Text style={[Styles.exploreText,{fontSize:20}]}>BooK parking</Text>
                    </TouchableOpacity>
                </View>
                
            <BottomBar/>
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    modalView: {
      backgroundColor: "white",
      borderRadius: 20,
      padding: 15,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      width:'90%'

    },
  });

export default ParkingSlots