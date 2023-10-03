import { SplashScreen, Slot } from 'expo-router';
import {FC, useEffect} from "react";
import { PaperProvider, MD3LightTheme as DefaultTheme } from 'react-native-paper';
import { store } from '../stores'
import { Provider as StoreProvider } from 'react-redux'
import dayjs from "dayjs"
import id from "dayjs/locale/id"

SplashScreen.preventAutoHideAsync();

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: "#335996",
        tertiary: "#FF7E32",
        background: "white"
    },
};


const Layout: FC = () => {
    useEffect(() => {
        dayjs.locale(id)

        SplashScreen.hideAsync()
    }, []);

    return <StoreProvider store={store}>
        <PaperProvider theme={theme}>
            <Slot />
        </PaperProvider>
    </StoreProvider>
}

export default Layout
