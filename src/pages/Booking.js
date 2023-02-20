import React,{useState} from 'react'
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
   ToastAndroid,
} from 'react-native';
import { Styles } from '../utils/Styles';
import BottomBar from '../components/BottomBar/BottomBar';
import MapView from 'react-native-maps'
import { Ionicons,Entypo,Octicons,EvilIcons,FontAwesome5,AntDesign,MaterialIcons} from '@expo/vector-icons';
import { getOneParking } from '../redux/actions/fetchAllParkingsAction';
import { useDispatch,useSelector } from 'react-redux';
import { locations } from '../utils/locations';
import SelectDropdown from 'react-native-select-dropdown'
import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-modern-datepicker';


const Booking= ({ navigation, route }) => {

    const [datePicker, setDatePicker] = useState(false);

  const [date, setDate] = useState(new Date());

  const [timePicker, setTimePicker] = useState(false);

  const [checkInTime, setTime] = useState(new Date(Date.now()));
  

 const showDatePicker = ()=> {
    setDatePicker(true);
  };

  const showTimePicker = () => {
    setTimePicker(true);
  };

  const onDateSelected = (event, value) => {
    setDate(value);
    setDatePicker(false);
    //navigation.navigate("AfternoonRemote", {opt_date: value.toISOString().slice(0,10)});
  };

  const onCheckInTimeSelected = (event, value) => {
    setTime(value);
    setTimePicker(false);
    let time = checkInTime.getTime()
    console.log(time.toISOString().slice(0,10))
  };

    // const parkingData = useSelector(
    //     (state) => state.getOneParkingReducer?.oneParking
    // );
    

    // React.useEffect(() => {
    //     const {ID} = route.params;
    //     async function handleGetParking() {
    //         await dispatch(getOneParking(ID));
    //     };

    //     handleGetParking()
    // },[]);

    const [modalVisible, setModalVisible] = React.useState(false);
    const [isDisplayDate, setShow] = useState(false);
    const [displaymode, setMode] = useState('date');

    const [open, setOpen] = React.useState(false);
    const [formData,setFormData] = React.useState({
        slotCode:"",
        slotSize:"",
        sensor:""
    })

    const parkingCreateMessage = useSelector(
        (state) => state.createParkingSlotReducer?.slotCreated
    );

    const handleSubmit = async(event)=>{
        setOpen(false)
        const reg = new RegExp("^((S))[0-9]", "i");

        if (formData.sensor ==="") {
            showToast("Slot sensor")
        }else if(formData.slotCode ===""){
            showToast("Slot code/name")
        }else if(formData.slotSize ===""){
            showToast("Slot size")
        }else if(!reg.test(formData.sensor)){
            ToastAndroid.show(`Sensor must startWith S followed by number between 0-9`, ToastAndroid.LONG,ToastAndroid.TOP,25,50);
        }else {
            await dispatch(createParkingSlot(parkingID,{
                slotCode:formData.slotCode,
                slotSize:formData.slotSize,
                sensor:formData.sensor
            }))
            setOpen(true)
            console.log(parkingCreateMessage)
        }
    }

    return(
        <SafeAreaView style={Styles.container}>
            <View style={{ backgroundColor: "#13728F", paddingStart: 10, paddingEnd: 10 }}>
                <View style={Styles.topBar}>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '70%' }}>
                        <Ionicons name="arrow-back-outline" size={26} style={{ paddingTop: 5 }} color="#CCF5FE" onPress={() => navigation.goBack()} />
                        <Image style={Styles.profilePhoto} source={require('../../assets/images/profile.jpeg')} />
                        {/* <View style={Styles.parkingTop}>
                            <Text style={{ fontSize: 18, color: "#CCF5FE", fontWeight: 'bold' }}>{parkingData?.oneParking.parkingName}</Text>
                            <View style={Styles.parkingTopLocation}>
                                <Text style={{ color: "#CCF5FE" }}>{parkingData?.oneParking.location}</Text>
                            </View>
                        </View> */}
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width: '20%' }}>
                        <AntDesign name="edit" size={20} style={{ paddingTop: 5 }} color="#CCF5FE" />
                        <MaterialIcons name="delete" size={20} style={{ paddingTop: 5 }} color="#5c0512" />
                    </View>
                </View>
            </View>
            <View style={styles.centeredView}>
                <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',width:'100%'}}>
                    <Text style={Styles.parkingNearTitle}>Book a parking today</Text>
                </View>

                <Text style={[Styles.label,{width:'100%'}]}>Date</Text>
                <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',width:'100%',marginBottom:10}}>
                    <TouchableOpacity style={{backgroundColor:'rgba(193,243,254,0.9)',height:40,borderRadius:10,width:'60%'}} onPress={showDatePicker}>
                        <Text style={{textAlign:'center',fontSize:20,color:'#13728F',padding:6}}>{date.toISOString().slice(0,10)}</Text>
                    </TouchableOpacity>
                </View>
                <Text style={[Styles.label,{width:'100%'}]}>Time</Text>
                <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',width:'100%',marginBottom:10}}>
                    <View style={{backgroundColor:'rgba(193,243,254,0.9)',padding:10,borderRadius:10,width:'50%',marginRight:5}}>
                        <Text style={Styles.label}>CheckIn</Text>
                        <TouchableOpacity style={{borderColor:'#13728F',borderWidth:1,backgroundColor:'rgba(193,243,254,0.9)',height:40,borderRadius:10,width:'100%'}} onPress={showTimePicker}>
                            <Text style={{textAlign:'center',fontSize:15,color:'#13728F',padding:6,width:'100%'}}>{new Date(checkInTime).toLocaleTimeString('en',{ timeStyle: 'short', hour12: false, timeZone: 'UTC',format:'HH:mmrr' })}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{backgroundColor:'rgba(193,243,254,0.9)',padding:10,borderRadius:10,width:'50%'}}>
                        <Text style={Styles.label}>CheckOut</Text>
                        <TouchableOpacity style={{borderColor:'#13728F',borderWidth:1,backgroundColor:'rgba(193,243,254,0.9)',height:40,borderRadius:10,width:'100%'}} onPress={showTimePicker}>
                            <Text style={{textAlign:'left',fontSize:15,color:'#13728F',padding:6,width:'100%'}}></Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={[Styles.label,{width:'100%'}]}>Add vehicle details</Text>
                <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',width:'100%',marginBottom:10}}>
                    <View style={{backgroundColor:'rgba(193,243,254,0.9)',padding:3,borderRadius:10}}>
                        <Text style={Styles.label}>vehiclePlateNumber</Text>
                        <TextInput
                            style={Styles.input}
                            defaultValue={formData.slotCode}
                            placeholder="Enter platenumber"
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
                </View>
                <Text style={[Styles.label,{width:'100%'}]}>Total amount</Text>
                <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',width:'100%',marginBottom:10}}>
                    <View style={{borderColor:'#13728F',borderWidth:1,padding:3,borderRadius:10}}>
                        <Text style={{color:'#13728F',padding:10,width:100,textAlign:'center',fontWeight:'bold',fontSize:20}}>100</Text>
                    </View>
                </View>
                    {datePicker && (
                    <DateTimePicker
                        value={date}
                        mode={'date'}
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        is24Hour={true}
                        onChange={onDateSelected}
                        style={styles.datePicker}
                    />
                    )}

                    {timePicker && (
                    <DateTimePicker
                        value={checkInTime}
                        mode={'time'}
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        is24Hour={false}
                        onChange={onCheckInTimeSelected}
                        style={styles.datePicker}
                    />
                    )}
                {/* <DatePicker
                    style={styles.datePickerStyle}
                    value={date}
                    mode="date"
                    placeholder="select date"
                    format="DD/MM/YYYY"
                    minDate={'01-01-2000'}
                    maxDate="01-01-2000"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                        dateIcon: {
                        position: 'absolute',
                        right: -5,
                        top: 4,
                        marginLeft: 0,
                        },
                        dateInput: {
                        borderColor : "gray",
                        alignItems: "flex-start",
                        borderWidth: 0,
                        borderBottomWidth: 1,
                        },
                        placeholderText: {
                        fontSize: 17,
                        color: "gray"
                        },
                        dateText: {
                        fontSize: 17,
                        }
                    }}
                    is24Hour={true}
                    display="default"
                    onChange={changeSelectedDate}
                    /> */}

                <View style={{height:60,width:'90%',position:'relative',bottom:0,padding:10,right:0,left:0}}>
                    <TouchableOpacity style={[Styles.exploreBtn,{height:40,width:'70%',borderRadius:20}]} title='Explore' onPress={() => navigation.navigate('bookParking', { ID: parkingData?.oneParking._id })}>
                        <Text style={[Styles.exploreText,{fontSize:18,padding:1}]}>Proceed to Pay</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    centeredView: {
      backgroundColor:'rgba(193,243,254,0.2)',
      padding: 15,
      alignItems: "center",
      width:'100%',
      height:'100%'
    },
    modalView: {
    backgroundColor:'rgba(193,243,254,0.2)',
      borderRadius: 20,
      padding: 20,
      alignItems: "center",

    },
    calendar: {
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 10,
      },
  });

export default Booking