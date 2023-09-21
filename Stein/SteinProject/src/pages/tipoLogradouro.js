import React, {useState} from "react";
import styles from "./styles"
import { View } from "react-native"
import {Picker} from '@react-native-picker/picker';

export default function tipoLogradouro({onTipoLograChange}){
    const [tipoLogra, setTipoLogra] = useState("Rua");
    
    const handleTipoLograChange = (itemValue) => {
        setTipoLogra(itemValue); // será colocado no "uf" a variável  
        onTipoLograChange(itemValue); // Chama a função de retorno com o valor selecionado que será enviardo para outra página
    };

    return (
        <View style={styles.list}>
            <Picker
                selectedValue={tipoLogra}
                onValueChange={handleTipoLograChange}
                
            >
                <Picker.Item label="Aeroporto" value="Aeroporto" style={styles.fontList} />
                <Picker.Item label="Alameda" value="Alameda" style={styles.fontList} />
                <Picker.Item label="Área" value="Área" style={styles.fontList} />
                <Picker.Item label="Avenida" value="Avenida" style={styles.fontList} />
                <Picker.Item label="Campo" value="Campo" style={styles.fontList} />
                <Picker.Item label="Chácara" value="Chácara" style={styles.fontList} />
                <Picker.Item label="Colônia" value="Colônia" style={styles.fontList} />
                <Picker.Item label="Condomínio" value="Condomínio" style={styles.fontList} />
                <Picker.Item label="Conjunto" value="Conjunto" style={styles.fontList} />
                <Picker.Item label="Distrito" value="Distrito" style={styles.fontList} />
                <Picker.Item label="Esplanada" value="Esplanada" style={styles.fontList} />
                <Picker.Item label="Estação" value="Estação" style={styles.fontList} />
                <Picker.Item label="Estrada" value="Estrada" style={styles.fontList} />
                <Picker.Item label="Favela" value="Favela" style={styles.fontList} />
                <Picker.Item label="Fazenda" value="Fazenda" style={styles.fontList} />
                <Picker.Item label="Feira" value="Feira" style={styles.fontList} />
                <Picker.Item label="Jardim" value="Jardim" style={styles.fontList} />
                <Picker.Item label="Ladeira" value="Lago" style={styles.fontList} />
                <Picker.Item label="Lagoa" value="Lagoa" style={styles.fontList} />
                <Picker.Item label="Largo" value="Largo" style={styles.fontList} />
                <Picker.Item label="Loteamento" value="Loteamento" style={styles.fontList} />
                <Picker.Item label="Morro" value="Morro" style={styles.fontList} />
                <Picker.Item label="Núcleo" value="Núcleo" style={styles.fontList} />
                <Picker.Item label="Parque" value="Parque" style={styles.fontList} />
                <Picker.Item label="Passarela" value="Passarela" style={styles.fontList} />
                <Picker.Item label="Pátio" value="Pátio" style={styles.fontList} />
                <Picker.Item label="Praça" value="Praça" style={styles.fontList} />
                <Picker.Item label="Quadra" value="Quadra" style={styles.fontList} />
                <Picker.Item label="Recanto" value="Recanto" style={styles.fontList} />
                <Picker.Item label="Residencial" value="Residencial" style={styles.fontList} />
                <Picker.Item label="Rodovia" value="Rodovia" style={styles.fontList} />
                <Picker.Item label="Rua" value="Rua" style={styles.fontList} />
                <Picker.Item label="Setor" value="Setor" style={styles.fontList} />
                <Picker.Item label="Sítio" value="Sítio" style={styles.fontList} />
                <Picker.Item label="Travessa" value="Travessa" style={styles.fontList} />
                <Picker.Item label="Trecho" value="Trecho" style={styles.fontList} />
                <Picker.Item label="Trevo" value="Trevo" style={styles.fontList} />
                <Picker.Item label="Vale" value="Vale" style={styles.fontList} />
                <Picker.Item label="Vereda" value="Vereda" style={styles.fontList} />
                <Picker.Item label="Via" value="Via" style={styles.fontList} />
                <Picker.Item label="Viaduto" value="Viaduto" style={styles.fontList} />
                <Picker.Item label="Viela" value="Viela" style={styles.fontList} />
                <Picker.Item label="Vila" value="Vila" style={styles.fontList} />
                </Picker>
        </View>        
    )
}