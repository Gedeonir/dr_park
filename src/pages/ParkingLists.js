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
import { createParkingSlot } from '../redux/actions/fetchAllParkingsAction';
import { locations } from '../utils/locations';
import SelectDropdown from 'react-native-select-dropdown'


const ParkingLists= ({ navigation, route }) => {
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
      (state) => state.getAllParkingsReducer?.getParkings
    );
    React.useEffect(() => {
      async function handleGetParkings() {
         await dispatch(getAllParkings());
      };

      handleGetParkings()
      getProvinces();
    },[]);

    const [modalVisible, setModalVisible] = React.useState(false);

    const [open, setOpen] = React.useState(false);
    const [formData,setFormData] = React.useState({
        province:"",
        district:"",
        sector:"",
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
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '90%' }}>
                        <Ionicons name="arrow-back-outline" size={26} style={{ paddingTop: 5 }} color="#CCF5FE" onPress={() => navigation.goBack()} />
                        <View style={Styles.parkingTop}>
                            <Text style={{ fontSize: 18, color: "#CCF5FE", fontWeight: 'bold',padding:5 }}>Parkings</Text>
                        </View>
                        <TouchableOpacity style={{backgroundColor:'#CCF5FE',borderRadius:10,height:40,width:90}} title='Add new' onPress={() => setModalVisible(true)}>
                            <Text style={[Styles.signInText, { padding: 10,color:"#13728F",textAlign:'center' }]}>ADD NEW</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <SelectDropdown
                buttonStyle={Styles.input}
                data={provinces}
                dropdownIconPosition={'right'}
                renderDropdownIcon={isOpened=>{
                    return <EvilIcons name={isOpened?"chevron-up":"chevron-down"} size={24} color="black" />
                }}
                onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index)
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem
                }}
                rowTextForSelection={(item, index) => {
                    return item
                }}
            />
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
                            <Text style={Styles.parkingNearTitle}>Add new parking</Text>
                            <TouchableOpacity style={{marginRight:6}}>
                                <AntDesign name="closecircle" size={36} style={{paddingTop:5}} color="#13728F" onPress={() => {setModalVisible(false),setOpen(false)}} />
                            </TouchableOpacity>
                        </View>
                        
                        <View style={Styles.inputGroup}>
                            <Text style={Styles.label}>Parking name</Text>
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
                            <Text style={Styles.label}>Province</Text>
                            <SelectDropdown
                                buttonStyle={Styles.input}
                                data={provinces}
                                dropdownIconPosition={'right'}
                                defaultButtonText={'Select province'}
                                renderDropdownIcon={isOpened=>{
                                    return <EvilIcons name={isOpened?"chevron-up":"chevron-down"} size={24} color="black" />
                                }}
                                onSelect={(selectedItem, index) => {
                                    setFormData({
                                        ...formData,
                                        province:selectedItem
                                        })
                                    getDistricts(selectedItem)
                                }}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    return selectedItem
                                }}
                                rowTextForSelection={(item, index) => {
                                    return item
                                }}
                            />
                        </View>

                        <View style={Styles.inputGroup}>
                            <Text style={Styles.label}>District</Text>
                            <SelectDropdown
                                buttonStyle={Styles.input}
                                data={districts}
                                dropdownIconPosition={'right'}
                                defaultButtonText={'Select District'}
                                renderDropdownIcon={isOpened=>{
                                    return <EvilIcons name={isOpened?"chevron-up":"chevron-down"} size={24} color="black" />
                                }}
                                onSelect={(selectedItem, index) => {
                                    getSectors(formData.province,selectedItem)
                                }}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    return selectedItem
                                }}
                                rowTextForSelection={(item, index) => {
                                    return item
                                }}
                            />
                        </View>
                        <View style={Styles.inputGroup}>
                            <Text style={Styles.label}>Sector</Text>
                            <SelectDropdown
                                buttonStyle={Styles.input}
                                data={sectors}
                                dropdownIconPosition={'right'}
                                defaultButtonText={'Select sector'}
                                renderDropdownIcon={isOpened=>{
                                    return <EvilIcons name={isOpened?"chevron-up":"chevron-down"} size={24} color="black" />
                                }}
                                onSelect={(selectedItem, index) => {
                                    console.log(selectedItem, index)
                                }}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    return selectedItem
                                }}
                                rowTextForSelection={(item, index) => {
                                    return item
                                }}
                            />
                        </View>
                        <View style={Styles.inputGroup}>
                            <Text style={Styles.label}>Exact location</Text>
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
                            <Text style={Styles.label}>Price</Text>
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

export default ParkingLists