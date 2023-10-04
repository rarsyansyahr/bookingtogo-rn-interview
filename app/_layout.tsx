import { SplashScreen, Slot } from 'expo-router';
import {FC, useEffect} from "react";
import {PaperProvider, MD3LightTheme as DefaultTheme, configureFonts} from 'react-native-paper';
import { store } from '../stores'
import { Provider as StoreProvider } from 'react-redux'
import dayjs from "dayjs"
import id from "dayjs/locale/id"
import {useFonts} from "expo-font";
import {OpenSans_400Regular, OpenSans_500Medium, OpenSans_600SemiBold} from "@expo-google-fonts/open-sans"
import {Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold} from "@expo-google-fonts/poppins"
import {Platform} from "react-native";
import AppLoading from 'expo-app-loading';

SplashScreen.preventAutoHideAsync();
dayjs.locale(id)

const isIos = Platform.OS === "ios"
const regularFont = isIos ? "Poppins_400Regular" : "OpenSans_400Regular"
const mediumFont = isIos ? "Poppins_500Medium" : "OpenSans_500Medium"
const semiBoldFont = isIos ? "Poppins_600SemiBold" : "OpenSans_600SemiBold"

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: "#335996",
        tertiary: "#FF7E32",
        background: "#FFFFFF"
    },
    fonts: configureFonts({
        config: {
            "displaySmall": {
                "fontFamily": mediumFont,
                "fontSize": 36,
                "fontWeight": "400",
                "letterSpacing": 0,
                "lineHeight": 44,
            },
            "displayMedium": {
                "fontFamily": mediumFont,
                "fontSize": 45,
                "fontWeight": "400",
                "letterSpacing": 0,
                "lineHeight": 52,
            },
            "displayLarge": {
                "fontFamily": mediumFont,
                "fontSize": 57,
                "fontWeight": "400",
                "letterSpacing": 0,
                "lineHeight": 64,
            },
            "headlineSmall": {
                "fontFamily": mediumFont,
                "fontSize": 24,
                "fontWeight": "400",
                "letterSpacing": 0,
                "lineHeight": 32,
            },
            "headlineMedium": {
                "fontFamily": mediumFont,
                "fontSize": 28,
                "fontWeight": "400",
                "letterSpacing": 0,
                "lineHeight": 36,
            },
            "headlineLarge": {
                "fontFamily": mediumFont,
                "fontSize": 32,
                "fontWeight": "400",
                "letterSpacing": 0,
                "lineHeight": 40,
            },
            "titleSmall": {
                "fontFamily": mediumFont,
                "fontSize": 14,
                "fontWeight": "500",
                "letterSpacing": 0.1,
                "lineHeight": 20,
            },
            "titleMedium": {
                "fontFamily": semiBoldFont,
                "fontSize": 16,
                "fontWeight": "500",
                "letterSpacing": 0.15,
                "lineHeight": 24,
            },
            "titleLarge": {
                "fontFamily": mediumFont,
                "fontSize": 22,
                "fontWeight": "400",
                "letterSpacing": 0,
                "lineHeight": 28,
            },
            "labelSmall": {
                "fontFamily": mediumFont,
                "fontSize": 11,
                "fontWeight": "500",
                "letterSpacing": 0.5,
                "lineHeight": 16,
            },
            "labelMedium": {
                "fontFamily": mediumFont,
                "fontSize": 12,
                "fontWeight": "500",
                "letterSpacing": 0.5,
                "lineHeight": 16,
            },
            "labelLarge": {
                "fontFamily": mediumFont,
                "fontSize": 14,
                "fontWeight": "500",
                "letterSpacing": 0.1,
                "lineHeight": 20,
            },
            "bodySmall": {
                "fontFamily": regularFont,
                "fontSize": 12,
                "fontWeight": "400",
                "letterSpacing": 0.4,
                "lineHeight": 16,
            },
            "bodyMedium": {
                "fontFamily": regularFont,
                "fontSize": 14,
                "fontWeight": "400",
                "letterSpacing": 0.25,
                "lineHeight": 20,
            },
            "bodyLarge": {
                "fontFamily": regularFont,
                "fontSize": 16,
                "fontWeight": "400",
                "letterSpacing": 0.15,
                "lineHeight": 24,
            }
        }
    })
};


const Layout: FC = () => {
    const [isLoaded] = useFonts(isIos ? {Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold} : {OpenSans_400Regular, OpenSans_500Medium, OpenSans_600SemiBold})

    useEffect(() => {
        dayjs.locale(id)

        SplashScreen.hideAsync()
    }, [isLoaded]);

    if(!isLoaded) return null

    return <StoreProvider store={store}>
        <PaperProvider theme={theme}>
            <Slot />
        </PaperProvider>
    </StoreProvider>
}

export default Layout
