import { SplashScreen, Slot } from 'expo-router';
import {FC} from "react";

SplashScreen.preventAutoHideAsync();

const Layout: FC = () => {
    return <Slot />
}

export default Layout
