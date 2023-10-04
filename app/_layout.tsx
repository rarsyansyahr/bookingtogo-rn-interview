import {
  OpenSans_400Regular,
  OpenSans_500Medium,
  OpenSans_600SemiBold,
} from '@expo-google-fonts/open-sans';
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from '@expo-google-fonts/poppins';
import dayjs from 'dayjs';
import id from 'dayjs/locale/id';
import { useFonts } from 'expo-font';
import { SplashScreen, Slot } from 'expo-router';
import { FC, useEffect } from 'react';
import { PaperProvider, MD3LightTheme as DefaultTheme, configureFonts } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';

import { store } from '../stores';
import { Colors, Constants, FontConfig } from '../utils';

const { isIos } = Constants;

SplashScreen.preventAutoHideAsync();
dayjs.locale(id);

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.primary,
    tertiary: Colors.tertiary,
    error: Colors.error,
    background: Colors.background,
  },
  fonts: configureFonts({
    // @ts-ignore
    config: FontConfig,
  }),
};

const iOSFonts = { Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold };
const androidFonts = { OpenSans_400Regular, OpenSans_500Medium, OpenSans_600SemiBold };

const Layout: FC = () => {
  const [isLoaded] = useFonts(isIos ? iOSFonts : androidFonts);

  useEffect(() => {
    dayjs.locale(id);

    SplashScreen.hideAsync();
  }, [isLoaded]);

  if (!isLoaded) return null;

  return (
    <StoreProvider store={store}>
      <PaperProvider theme={theme}>
        <Slot />
      </PaperProvider>
    </StoreProvider>
  );
};

export default Layout;
