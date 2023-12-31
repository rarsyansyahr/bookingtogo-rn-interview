import { FC } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';
import { Divider } from 'react-native-paper';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppBar } from '../components';
import { CustomerCard, Header, OrderDetailCard } from '../components/pages/home';
import { useOrderDetail } from '../hooks';
import { Colors } from '../utils';

const Page: FC = () => {
  // * Store
  const { loading, orderDetail, visitors } = useOrderDetail();

  // * Styles
  const insets = useSafeAreaInsets();
  const styles = styling(insets);

  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator color={Colors.primary} size="large" />
      </View>
    );

  return (
    <>
      <AppBar title="Payment Details" />

      <Header />
      <Divider />

      <ScrollView showsVerticalScrollIndicator={false} style={styles.root}>
        <OrderDetailCard orderDetail={orderDetail} />
        <Divider />
        <CustomerCard visitors={visitors} />
        <Divider style={styles.lastDivider} />
      </ScrollView>
    </>
  );
};

const styling = (insets: EdgeInsets) =>
  StyleSheet.create({
    root: { backgroundColor: Colors.white },

    lastDivider: { marginBottom: insets.bottom + (insets.bottom > 0 ? 0 : 20) },

    center: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.white,
    },
  });

export default Page;
