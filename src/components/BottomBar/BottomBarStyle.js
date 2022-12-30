import { Button, StyleSheet } from "react-native";

export const BottomBarStyles = StyleSheet.create({
    bottomBar:{
        borderStartColor:"white",
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
        width:70,
        height:80,
        marginLeft:10,
        paddingLeft:"auto",
    },
    icon:{
        color:"#979A9A",
        textAlign:"center",
    }

})