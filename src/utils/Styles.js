import { BorderColor } from "@mui/icons-material";
import { height } from "@mui/system";
import { Button, StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
    /*-------------------------------Homepage-------------------------------------*/
    container:{
        minHeight: '100%',
        margin:0,
        padding:0,
        lineHeight:5,
        backgroundColor:'rgba(193,243,254,0.2)'     
    },
    topBar:{
        paddingTop:45,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        paddingBottom:10,
    },
    logo:{
        height:50,
        width:50,
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
        width:'80%',
        marginRight:5
    },
    dot:{
        top:-30,
        left:2
    },
    searchBox:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    parkingNear:{
        backgroundColor:"white",
        height:300,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderTopRightRadius:10,
        borderTopLeftRadius:10,
        borderColor:"#13728F",
        padding:12,
        position: 'absolute', 
        bottom: 0,
        width:'100%'
    },
    parkingNearTitle:{
        fontSize:24,
        fontWeight:'bold',
        color:"#13728F",
        marginBottom:5
    },
    cardsView:{
        display:"flex",
        padding:5,
        flexDirection:"row"
    },
    card:{
        borderWidth:1,
        width:300,
        height:170,
        borderColor:"#13728F",
        borderRadius:10,
        padding:5,
        marginRight:15,

    },
    cardHeader:{
        display:"flex",
        flexDirection:"row",
        justifyContent:'space-between',
        padding:3
    },
    cardHeaderText:{
        fontSize:20,
        color:"#3E4347",
        fontWeight:"bold",
    },
    star:{
        color:'#13728F',
        fontWeight:"bold"
    },
    cardBody:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        padding:10
    },
    cardElement:{
        display:'flex',
        flexDirection:'row',
        fontSize:13,
        marginBottom:2
    },
    cardIcons:{
        color:"#979A9A",
        marginRight:8,
    },
    slotTitle:{
        fontSize:14,
        color:"#3E4347",
        fontWeight:"bold",
    },
    slotNumber:{
        fontSize:20,
        textAlign:'center',
        fontWeight:'bold',
        color:'#13728F',
    },
    exploreBtn:{
        backgroundColor:'#13728F',
        borderRadius:5,
        padding:5,
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        width:'70%',
        marginLeft:'auto',
        marginRight:'auto'

    },
    exploreText:{
        textAlign:'center',
        color:"#CCF5FE",
        marginLeft:10
    },
    parkingTop:{
        width:"70%",
        marginLeft:3
    },
    parkingTopLocation:{
        display:'flex',
        flexDirection:'row',
    },
    profilePhoto:{
        width:50,
        height:50,
        borderRadius:50
    },

    /*---------------------------------Parking------------------------------------ */
    slotsHeader:{
        padding:12,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    slotBody:{
        padding:12,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        flexWrap: 'wrap',
        flex:2,
        marginTop:22
    },
    freeSlot:{
        width:"50%",
        height:60,
        borderColor:'#13728F',
    },
    leftSlot:{
        borderWidth:1,
        // borderTopWidth: 1,
        // borderBottomWidth: 1,
        // borderRightWidth: 1,
    },
    rightSlot:{
        borderLeftWidth:1,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderRightWidth: 0,
    },

    /*---------------------------------User account------------------------------------ */
    userAccount:{
        backgroundColor:'rgba(193,243,254,0.8)',
        height:'100%',
        borderTopRightRadius:10,
        borderTopLeftRadius:10,
        padding:12
    },
    inputGroup:{
        width:'100%',
        marginTop:10
    },
    label:{
        fontSize:20,
        marginBottom:6,
        color:"#13728F",
        fontWeight:'bold'
    },
    input:{
        borderWidth:2,
        padding:6,
        borderRadius:10,
        borderColor:'#13728F'
    }

})