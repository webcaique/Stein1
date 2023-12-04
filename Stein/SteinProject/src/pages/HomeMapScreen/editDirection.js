import { Platform, PixelRatio } from "react-native";

//Editar o mapa para ficar na proporção da tela do usuário

export function getPixelRatio(pixels){
    return Platform.select({
        ios:pixels,
        android: PixelRatio.getPixelSizeForLayoutSize(pixels),
    })
}