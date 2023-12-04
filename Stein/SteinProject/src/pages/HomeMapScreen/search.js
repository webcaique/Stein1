import React,{Component} from "react";
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete"
import { RFValue } from "react-native-responsive-fontsize";

export default class Search extends Component {
  //Para ativar e desativar a barra de pesquisa
  state = {
    searchFocused: false,
  }
  render(){
    //As variaveis para ativar a barra de pesquisa, e puxar os dados do ponto pesquisado pelo usuário
    const {onLocationSelected, searchVal, resetSearch} = this.props;
    //Puxa o estado criado
    const {searchFocused} = this.state;
    return(
      <GooglePlacesAutocomplete
      placeholder="Para onde?"
      onPress={(data,details)=>{        
        onLocationSelected(data, details)
      }}
      query={{
        key:'AIzaSyAdVbhYEhx50Y8TS7tulpNCkj8yMZPYiSQ',
        language:'pt',
      }}
      textInputProps={{
        autoCapitalize:"none",
        autoCorrect:false,
        onFocus:()=>{
          this.setState({searchFocused:true})
          resetSearch(false)
        
        },
        onBlur:()=>{
          this.setState({searchFocused:false})
        },
        autoFocus: searchVal,
        
      }}
      listViewDisplayed={searchFocused}
      fetchDetails
      
      enablePoweredByContainer={false} 
      styles={{
        container:{
          height: "auto",
          width: "100%",
          maxWidth:RFValue(800),
          paddingHorizontal: 16,
          position: 'absolute',
          top:RFValue(80),
          elevation:5,
      },
      textInputContainer:{
      },
      textInput:{
        fontSize:RFValue(18),
      },
      listView:{
          elevation:5,
      },
      description:{
        fontSize:RFValue(18),

      },

      }}
      />
    )
  }
}
