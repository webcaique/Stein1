import React, {useState} from 'react';
import styles from './styles';
import {View} from 'react-native';
import {Picker} from '@react-native-picker/picker';

export default function selectList({ onUfChange }) {
    const [uf, setUf] = useState(); // variável
    
    const handleUfChange = (itemValue) => {
        setUf(itemValue);// será colocado no "uf" a variável  
        onUfChange(itemValue); // Chama a função de retorno com o valor selecionado que será enviardo para outra página
    };

    return (
        <View style={styles.list}>
            <Picker
                selectedValue={uf}
                onValueChange={handleUfChange}
            >
        <Picker.Item label="AC" value="AC" style={styles.fontList} />
        <Picker.Item label="AL" value="AL" style={styles.fontList} />
        <Picker.Item label="AP" value="AP" style={styles.fontList} />
        <Picker.Item label="AM" value="AM" style={styles.fontList} />
        <Picker.Item label="BA" value="BA" style={styles.fontList} />
        <Picker.Item label="CE" value="CE" style={styles.fontList} />
        <Picker.Item label="DF" value="DF" style={styles.fontList} />
        <Picker.Item label="ES" value="ES" style={styles.fontList} />
        <Picker.Item label="GO" value="GO" style={styles.fontList} />
        <Picker.Item label="MA" value="MA" style={styles.fontList} />
        <Picker.Item label="MT" value="MT" style={styles.fontList} />
        <Picker.Item label="MS" value="MS" style={styles.fontList} />
        <Picker.Item label="MG" value="MG" style={styles.fontList} />
        <Picker.Item label="PA" value="PA" style={styles.fontList} />
        <Picker.Item label="PB" value="PB" style={styles.fontList} />
        <Picker.Item label="PR" value="PR" style={styles.fontList} />
        <Picker.Item label="PE" value="PE" style={styles.fontList} />
        <Picker.Item label="PI" value="PI" style={styles.fontList} />
        <Picker.Item label="RJ" value="RJ" style={styles.fontList} />
        <Picker.Item label="RN" value="RN" style={styles.fontList} />
        <Picker.Item label="RS" value="RS" style={styles.fontList} />
        <Picker.Item label="RO" value="RO" style={styles.fontList} />
        <Picker.Item label="RR" value="RR" style={styles.fontList} />
        <Picker.Item label="SC" value="SC" style={styles.fontList} />
        <Picker.Item label="SP" value="SP" style={styles.fontList} />
        <Picker.Item label="SE" value="SE" style={styles.fontList} />
        <Picker.Item label="TO" value="TO" style={styles.fontList} />
      </Picker>
    </View>
  );
}
