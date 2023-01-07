import React from "react";TouchableOpacity
import { View,Text,TouchableOpacity } from "react-native";
import { BottomBarStyles } from "./BottomBarStyle";
import { Ionicons,AntDesign,MaterialIcons } from '@expo/vector-icons';


const BottomBar = ({ navigation})=>{
    return (
        <View style={BottomBarStyles.bottomBar}>
            <TouchableOpacity style={BottomBarStyles.icons}  onPress={()=> navigation.navigate('Home')}>
                <AntDesign name="home" size={20} style={BottomBarStyles.icon} />
                <Text style={BottomBarStyles.icon} >Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={BottomBarStyles.icons}>
                <MaterialIcons name="favorite-outline" size={20} style={BottomBarStyles.icon} />                
                <Text style={BottomBarStyles.icon} >Favourites</Text>
            </TouchableOpacity>
            <TouchableOpacity style={BottomBarStyles.icons}>
                <AntDesign name="book" size={20} style={BottomBarStyles.icon} />               
                <Text style={BottomBarStyles.icon}>Parkings</Text>
            </TouchableOpacity>
            <TouchableOpacity style={BottomBarStyles.icons}>
                <Ionicons name="settings-outline" size={20} style={BottomBarStyles.icon} />               
                <Text style={BottomBarStyles.icon}>settings</Text>
            </TouchableOpacity>
        </View>
    )
}

export default BottomBar