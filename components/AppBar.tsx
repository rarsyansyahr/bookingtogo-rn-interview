import { useRouter } from 'expo-router';
import { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Appbar as RNAppBar, useTheme } from 'react-native-paper';

type AppHeaderProps = { title: string; onBackPress?: () => void };

export const AppBar: FC<AppHeaderProps> = (props) => {
  const { onBackPress, title } = props;

  // * Navigations
  const router = useRouter();

  // * Theme
  const theme = useTheme();
  const styles = styling(theme.colors.primary);

  // * Actions
  const onBack = () => {
    if (onBackPress) {
      onBackPress();
      return;
    }

    if (router.canGoBack()) router.back();
  };

  return (
    <RNAppBar.Header style={styles.header}>
      <RNAppBar.BackAction onPress={onBack} color="white" />
      <RNAppBar.Content title={title} color="white" titleStyle={styles.title} />
    </RNAppBar.Header>
  );
};

const styling = (color: string) =>
  StyleSheet.create({
    header: { backgroundColor: color },

    title: { fontWeight: '600' },
  });
