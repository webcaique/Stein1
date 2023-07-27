import React, {useState} from "react";
import styles from "./styles"
import { View } from "react-native"
import {Picker} from '@react-native-picker/picker';

export default function selectList(){
    const [selectCountry, setSelectCountry] = useState();
    return(
        <View style={styles.list}>
            <Picker
                selectedValue={selectCountry}
                onValueChange={(itemValue, itemIndex) =>
                    setSelectCountry(itemValue)
            }
            >
                            <Picker.Item  label="AC" value="AC" />
                            <Picker.Item label="AL" value="AL" />
                            <Picker.Item label="AP" value="AP" />
                            <Picker.Item label="AM" value="AM" />
                            <Picker.Item label="BA" value="BA" />
                            <Picker.Item label="CE" value="CE" />
                            <Picker.Item  label="DF" value="DF" />
                            <Picker.Item  label="ES" value="ES" />
                            <Picker.Item label="GO" value="GO" />
                            <Picker.Item label="MA" value="MA" />
                            <Picker.Item  label="MT" value="MT" />
                            <Picker.Item  label="MS" value="MS" />
                            <Picker.Item label="MG" value="MG" />
                            <Picker.Item label="PA" value="PA" />
                            <Picker.Item label="PB" value="PB" />
                            <Picker.Item  label="PR" value="PR" />
                            <Picker.Item  label="PE" value="PE" />
                            <Picker.Item label="PI" value="PI" />
                            <Picker.Item label="RJ" value="RJ" />
                            <Picker.Item label="RN" value="RN" />
                            <Picker.Item label="RS" value="RS" />
                            <Picker.Item label="RO" value="RO" />
                            <Picker.Item label="RR" value="RR" />
                            <Picker.Item label="SC" value="SC" />
                            <Picker.Item label="SP" value="SP" />
                            <Picker.Item label="SE" value="SE" />
                            <Picker.Item label="TO" value="TO" />
                </Picker>
        </View>        
    )
}