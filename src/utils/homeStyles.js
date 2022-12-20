import { BorderColor } from "@mui/icons-material";
import { Button, StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
    container:{
        minHeight: '100%',
        margin:0,
        padding:0,       
    },
    topBar:{
        paddingTop:45,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        paddingBottom:10
    },
    logo:{
        height:40,
        width:40
    },
    topBarBtn1:{
        paddingTop:5,
        display:'flex',
        flexDirection:'row',
    },
    signIn:{
        borderRadius:20,
        padding:6,
    },
    signInText:{
        color:"#CCF5FE",
    },
    searchInput:{
        backgroundColor:"white",
        height: 50,
        borderWidth: 1,
        padding: 10,
        borderRadius:10,
        width:270,
        marginRight:10
    },
    dot:{
        top:-30,
        left:2
    },
    searchBox:{
        display:'flex',
        flexDirection:'row',
    },
    parkingNear:{
        backgroundColor:"white",
        height:200,
        borderTopWidth: 1,
        borderTopRightRadius:20,
        borderTopLeftRadius:20,
        borderColor:"#13728F",
        padding:12,
    }
    

})