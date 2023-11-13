import React,{Component} from "react";
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete"

export default class Search extends Component {
  state = {
    searchFocused: false,
  }
  render(){
    const {onLocationSelected, searchVal, resetSearch} = this.props;
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
          maxWidth:800,
          paddingHorizontal: 16,
          position: 'absolute',
          top:80,
          elevation:5,
      },
      textInputContainer:{
      },
      textInput:{
        fontSize:18,
      },
      listView:{
          elevation:5,
      },
      description:{
        fontSize:18,

      },

      }}
      />
    )
  }
}
