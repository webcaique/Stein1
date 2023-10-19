import React from 'react';
import {TextInput, ScrollView, View} from 'react-native';
import { GoogleAutoComplete } from 'react-native-google-autocomplete';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

function Search() {
  return (
      <GooglePlacesAutocomplete
        placeholder="Para onde?"
        onPress={(data, details) => {
            console.log(data)
        }}
        query={{
          key: 'AIzaSyAdVbhYEhx50Y8TS7tulpNCkj8yMZPYiSQ',
          language: 'pt-BR',
        }}
        textInputProps={{
          autoCapitalize: 'none',
          autoCorrect: false,
        }}
        fetchDetails={true}
        enablePoweredByContainer={false}
        styles={{
            container:{
                height: "auto",
                width: "100%",
                maxWidth:800,
                paddingHorizontal: 16,
                position: 'absolute',
                top:60,
                elevation:5,
            },
            textInputContainer:{
            },
            textInput:{

            },
            listView:{
                borderRadius:10,
                elevation:5,

            },
            row:{
                borderRadius:10,
            }
        }}
      />    
  );
}
export default Search;
