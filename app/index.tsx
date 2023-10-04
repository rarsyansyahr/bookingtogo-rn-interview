import {FC} from "react";
import {Divider} from "react-native-paper";
import {AppBar} from "../components";
import {ActivityIndicator, ScrollView, StyleSheet, View} from "react-native";
import {useOrderDetail} from "../hooks";
import {EdgeInsets, useSafeAreaInsets} from "react-native-safe-area-context";
import {Colors} from "../utils";
import {CustomerCard, Header, OrderDetailCard} from "../components/pages/home";

const Page:FC = () => {
    // * Store
    const {error, loading, orderDetail, visitors} = useOrderDetail()

    // * Styles
    const insets = useSafeAreaInsets()
    const styles = styling({insets})

    if(loading) return <View style={styles.center}><ActivityIndicator color={Colors.primary} size="large" /></View>

    return <>
        <AppBar title="Payment Details" />

        <Header />

        <ScrollView showsVerticalScrollIndicator={false} style={styles.root}>
            <Divider/>
            <OrderDetailCard orderDetail={orderDetail} />
            <Divider />
            <CustomerCard visitors={visitors} />
            <Divider style={styles.lastDivider}/>
        </ScrollView>
    </>
}

const styling = (props: {insets: EdgeInsets}) => StyleSheet.create({
    root: {backgroundColor: Colors.white},

    lastDivider: {marginBottom:props.insets.bottom},

    center: {flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: Colors.white},
})

export default Page
