import React from "react";
import { View,Text } from "react-native";
import { BottomBarStyles } from "./BottomBarStyle";
import { Ionicons,AntDesign,MaterialIcons } from '@expo/vector-icons';

const BottomBar = ()=>{
    return (
        <View style={BottomBarStyles.bottomBar}>
            <View style={BottomBarStyles.icons}>
                <AntDesign name="home" size={20} style={BottomBarStyles.icon} />
                <Text style={BottomBarStyles.icon} >Home</Text>
            </View>
            <View style={BottomBarStyles.icons}>
                <MaterialIcons name="favorite-outline" size={20} style={BottomBarStyles.icon} />                
                <Text style={BottomBarStyles.icon} >Favourites</Text>
            </View>
            <View style={BottomBarStyles.icons}>
                <AntDesign name="book" size={20} style={BottomBarStyles.icon} />               
                <Text style={BottomBarStyles.icon}>Bookings</Text>
            </View>
            <View style={BottomBarStyles.icons}>
                <Ionicons name="settings-outline" size={20} style={BottomBarStyles.icon} />               
                <Text style={BottomBarStyles.icon}>settings</Text>
            </View>
        </View>
    )
}

export default BottomBar