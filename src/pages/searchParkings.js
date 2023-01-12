import React from 'react'
import { useState, useEffect } from "react";
import { connect } from "react-redux";
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
   ScrollView,
   Modal,
   ToastAndroid
 } from 'react-native';
 import { useDispatch, useSelector } from "react-redux";
 import { Styles } from '../utils/Styles';
 import MapView from 'react-native-maps'
 import BottomBar from '../components/BottomBar/BottomBar';
 import { Ionicons,Entypo,Octicons,EvilIcons,FontAwesome5,AntDesign,MaterialIcons} from '@expo/vector-icons';
 import * as SecureStore from 'expo-secure-store';
 import { searchParking } from '../redux/actions/fetchAllParkingsAction';
 import SelectDropdown from 'react-native-select-dropdown'


const Search = ({ navigation}) => {
    const options = ["Location", "parkingName"]
    const [open,setOpen] = React.useState(false)
    const[values,setValues] = React.useState({
        wordEntered:"",
        filterColumn:""
    }) 
   const [loading,setLoading]= React.useState(false)
   const dispatch = useDispatch();
   const searchData = useSelector(
      (state) => state.searchParkingReducer?.searchParking
    );
    const [modalVisible, setModalVisible] = React.useState(false);

   useEffect(() => {
      handleSearch()
   },[]);

    function showToast() {
        ToastAndroid.show(`Enter the keyWord`, ToastAndroid.LONG,ToastAndroid.TOP,25,50);
    }
   const handleSearch = async()=>{
        if (values.wordEntered === "") {
            showToast();
        }else{
            setOpen(true);
            setLoading(true)
            const input={
                wordEntered:values.wordEntered,
                filterColumn:values.filterColumn
            }
            await dispatch(searchParking(input));
            setOpen(true);
            setLoading(false);
        }
   
   }

   console.log("data",searchData)


   return (
      <View style={Styles.container}>
         <View style={{backgroundColor:"#13728F",paddingBottom:10,paddingStart:10,paddingEnd:10}}>
            <SafeAreaView style={Styles.searchBox}>
                <View style={[Styles.inputGroup,{display:'flex',flexDirection:'row',justifyContent:'space-between'}]}>
                    <TextInput
                    placeholder='Search parking'
                    style={[Styles.searchInput]}
                    defaultValue={values.wordEntered}
                    onChangeText={(value)=>{
                        setValues({
                        ...values,
                        wordEntered:value
                        });
                    }}
                    />
                    <TouchableOpacity style={{position:'absolute',top:'20%',left:'2%'}} title='Notification' onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back-outline" size={26} color="#13728F" onPress={() => navigation.goBack()} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[Styles.signIn,{position:'absolute',right:'25%',top:'20%'}]} title='Notification' onPress={() => handleSearch()}>
                        <AntDesign name="search1" size={20} color="#13728F" />
                    </TouchableOpacity>
                    <TouchableOpacity style={[Styles.signIn]} title='Notification' onPress={() => setModalVisible(true)}>
                        <AntDesign name="filter" size={35} color="#CCF5FE" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
         </View>
         <View style={Styles.parkingList}>
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
                        <TouchableOpacity style={{marginRight:6}}>
                            <AntDesign name="closecircle" size={36} style={{paddingTop:5}} color="#13728F" onPress={() => {setModalVisible(false)}} />
                        </TouchableOpacity>
                        <Text>Search by</Text>
                        <SelectDropdown
                            buttonStyle={Styles.searchBy}
                            data={options}
                            defaultValue={values.filterColumn}
                            dropdownIconPosition={'right'}
                            renderDropdownIcon={isOpened=>{
                                return <EvilIcons name={isOpened?"chevron-up":"chevron-down"} size={24} color="black" />
                            }}
                            onSelect={(selectedItem, index) => {
                                setModalVisible(false)
                                setValues({
                                    ...values,
                                    filterColumn:selectedItem
                                    })
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem
                            }}
                            rowTextForSelection={(item, index) => {
                                return item
                            }}
                        />
                    </View>
                </View>
            </Modal>
            <View>
               <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',display:`${open?'flex':'none'}`}}>
                <Text style={Styles.parkingNearTitle}>Search result for "{values.wordEntered}"</Text>
               </View>
               {loading?(
                  <View style={{padding:12}}>
                     <Image style={[Styles.profilePhoto,{marginLeft:'auto',marginRight:'auto',marginTop:20}]} source={require('../../assets/images/loading.gif')}/>
                     <Text style={{textAlign:'center'}}>Loading...</Text>
                  </View>
               ):(
                  searchData.success?(
                     <View horizontal={true} style={Styles.cardsViewSearch}>
                        <View style={{padding:10,position:'absolute',top:'30%',right:0,left:0, display:`${searchData?.parkings?.parkings.length > 0?'none':'flex'}`}}>
                            <Text style={{textAlign:'center',fontSize:20,padding:5,margin:12}}>No result</Text>
                        </View>
                        {searchData?.parkings?.parkings.map((parking)=>{
                           return(
                              <View style={[Styles.card,{height:80}]} key={parking._id}>
                                 <View style={Styles.cardHeader}>
                                    <Text style={Styles.cardHeaderText}>{parking.parkingName}</Text>
                                    <TouchableOpacity style={{backgroundColor:'#13728F',width:60}} title='Explore' onPress={()=> navigation.navigate('parkingSlots',{parkingID:parking._id})}>
                                        <Text style={Styles.exploreText}>Book</Text>
                                    </TouchableOpacity>
                                 </View>
                                 <View style={Styles.cardElement}>
                                    <EvilIcons name="location" size={20} style={Styles.cardIcons} />
                                    <Text>{parking.province},{parking.district},{parking.sector},{parking.location}</Text>
                                 </View>
                              </View>
                           )
                        })}
                     </View>
                  ):(
                     <View style={{padding:10}}>
                        <MaterialIcons style={{textAlign:'center'}} name="error" size={60} color="#13728F" />
                        <Text style={{textAlign:'center',fontSize:20,padding:5}}>{searchData.error}</Text>
                        <TouchableOpacity style={Styles.exploreBtn} title='Explore' onPress={()=> navigation.navigate('parkingDetails',{ID:parking._id})}>
                           <Text style={Styles.exploreText}>Reload</Text>
                        </TouchableOpacity>
                     </View>
                  )
                  )}
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
    },
    modalView: {
      backgroundColor: "white",
      borderRadius: 10,
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
      width:'50%',
      top:'10%',
      position:'absolute'

    },
  });
 
export default Search