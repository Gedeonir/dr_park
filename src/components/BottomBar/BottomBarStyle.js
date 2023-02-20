import { Button, StyleSheet } from "react-native";

export const BottomBarStyles = StyleSheet.create({
    bottomBar:{
        borderStartColor:"white",
        justifyContent:'space-between',
        height:60,
        display:'flex',
        flexDirection:'row',
        padding:8,
        backgroundColor:'white',
        width: '100%',
        position: 'absolute', 
        bottom: 0, 
    },
    icons:{
        width:'25%',
        height:80,
        paddingLeft:"auto",
    },
    icon:{
        color:"#979A9A",
        textAlign:"center",
    }

})