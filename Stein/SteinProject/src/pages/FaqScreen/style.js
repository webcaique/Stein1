import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container:{
        flex:1,
        width:"100%",
        height:"100%",
        padding:20,
        paddingTop:50,
    },
    faqText:{
        width:"100%",
        alignItems:"center",
        marginBottom:20,
    },
    imagem:{
        width:25,
        height:25,
        resizeMode:"contain",
        transform: [{rotate:'90deg'}],
    },
    boxes:{
        width:"100%",
        flexDirection:"row",
        justifyContent:"space-between",
    },
    lines:{
        width:"100%",
        height:2,
        backgroundColor:"#000000",
        marginTop:5,
    },
    spaceBetweenBoxes:{
        marginVertical:20,
    }
    
})

export default styles;