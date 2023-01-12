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
import { getAllParkings } from '../redux/actions/fetchAllParkingsAction';
import { useDispatch,useSelector } from 'react-redux';
import { locations } from '../utils/locations';
import SelectDropdown from 'react-native-select-dropdown'


const Booking= ({ navigation, route }) => {
    const dispatch = useDispatch();
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [sectors, setSectors] = useState([]);

    const getProvinces = () => {
        provinces.length = 0;
        Object.keys(locations).forEach((province) => {
          provinces.push(province);
        });
    };
    
    const getDistricts = (provinceName) => {
        try {
            const data = locations[provinceName];
            districts.length = 0;
            Object.keys(data).forEach((district) => {
            districts.push(district);
            });
        } catch (error) {
            console.log(error);
        }
    };

    const getSectors = (provinceName, districtName) => {
        try {
            const data = locations[provinceName][districtName];
            sectors.length = 0;
            Object.keys(data).forEach((sector) => {
            sectors.push(sector);
            });
        } catch (error) {
            console.log(error);
        }
    };

    const parkingData = useSelector(
        (state) => state.getOneParkingReducer?.oneParking
    );
    

    React.useEffect(() => {
        const {ID} = route.params;
        async function handleGetParking() {
            await dispatch(getOneParking(ID));
        };

        handleGetParking()
    },[]);

    const [modalVisible, setModalVisible] = React.useState(false);

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
        <View style={Styles.container}>
            <View style={{ backgroundColor: "#13728F", paddingStart: 10, paddingEnd: 10 }}>
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
            <View style={styles.centeredView}>
                <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',width:'100%'}}>
                    <Text style={Styles.parkingNearTitle}>Booking form</Text>
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
           
            
            <BottomBar/>
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor:'rgba(193,243,254,0.2)',
      padding: 15,
      alignItems: "center",
      width:'95%'
    },
    modalView: {
    backgroundColor:'rgba(193,243,254,0.2)',
      borderRadius: 20,
      padding: 20,
      alignItems: "center",

    },
  });

export default Booking