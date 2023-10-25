import { Platform, PixelRatio } from "react-native";

export function getPixelRatio(pixels){
    return Platform.select({
        ios:pixels,
        android: PixelRatio.getPixelSizeForLayoutSize(pixels),
    })
}