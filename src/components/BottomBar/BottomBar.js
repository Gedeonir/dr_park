import React from "react";Pressable
import { View,Text,Pressable } from "react-native";
import { BottomBarStyles } from "./BottomBarStyle";
import { Ionicons,AntDesign,MaterialIcons } from '@expo/vector-icons';


const BottomBar = ({ navigation})=>{
    return (
        <View style={BottomBarStyles.bottomBar}>
            <Pressable style={BottomBarStyles.icons}  onPress={()=> navigation.navigate('Home')}>
                <AntDesign name="home" size={20} style={BottomBarStyles.icon} />
                <Text style={BottomBarStyles.icon} >Home</Text>
            </Pressable>
            <Pressable style={BottomBarStyles.icons}>
                <MaterialIcons name="favorite-outline" size={20} style={BottomBarStyles.icon} />                
                <Text style={BottomBarStyles.icon} >Favourites</Text>
            </Pressable>
            <Pressable style={BottomBarStyles.icons}>
                <AntDesign name="book" size={20} style={BottomBarStyles.icon} />               
                <Text style={BottomBarStyles.icon}>My Bookings</Text>
            </Pressable>
            <Pressable style={BottomBarStyles.icons}>
                <Ionicons name="settings-outline" size={20} style={BottomBarStyles.icon} />               
                <Text style={BottomBarStyles.icon}>Settings</Text>
            </Pressable>
        </View>
    )
}

export default BottomBar