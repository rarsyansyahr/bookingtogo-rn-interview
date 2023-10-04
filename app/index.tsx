import {FC, memo, useMemo, useState} from "react";
import {Link} from "expo-router";
import {Badge, Divider, RadioButton, useTheme} from "react-native-paper";
import {AppBar, Card, Text} from "../components";
import {ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, TextStyle, View, ViewStyle} from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons"
import {Visitor} from "../models";
import dayjs from "dayjs";
import {MD3Colors} from "react-native-paper/lib/typescript/types";
import {useOrderDetail} from "../hooks";
import {EdgeInsets, useSafeAreaInsets} from "react-native-safe-area-context";

const Page:FC = () => {
    // * Store
    const {error, loading, orderDetail, visitors} = useOrderDetail()
    const chosenHotel = orderDetail?.chosenHotel
    const detail = chosenHotel?.detail
    const params = chosenHotel?.params
    const prices = chosenHotel?.prices

    const checkIn = dayjs(params?.checkIn).format("DD MMMM YYYY")
    const checkOut = dayjs(params?.checkOut).format("DD MMMM YYYY")

    // * Theme
    const theme = useTheme()
    const primary = theme.colors.primary
    const gray = "#CACACA"

    // * Styles
    const insets = useSafeAreaInsets()
    const styles = styling({colors: theme.colors, insets})

    // * States
    const [orderFor, setOrderFor] = useState<"me" | "other">("other")

    // * Actions
    const onValueChange = (value: any) => setOrderFor(value)

    // * Components
    const HeaderListItem:FC<{badge: number; label: string; active?: boolean}> = memo((props) =>{
        const headerListItemStyle: Array<ViewStyle> = [styles.headerListItem]

        if(!props?.active) headerListItemStyle.push(styles.inactiveHeaderListItem)

        return <View style={headerListItemStyle}>
            <Badge size={24} style={styles.badge}>{props.badge}</Badge>
            <Text variant="titleMedium">{props.label}</Text>
        </View>
    })

    const Header =() => <View style={styles.header}>
        <HeaderListItem badge={1} label="Detail Pesanan" active />
        <Icon name="minus" style={styles.minusIcon} />
        <HeaderListItem badge={2} label="Pembayaran" />
    </View>

    const OrderDetailCard = () => <View style={styles.padding}>
        <Text variant="titleMedium">Detail Pesanan</Text>
        <Card style={[styles.card, styles.flexRow]}>
            <Image width={60} height={60} source={{uri: detail?.images[0].thumbnail}} style={styles.image} />
            <View>
                <Text color={primary} style={styles.cardTitle}>{detail?.name}</Text>
                <Text color={gray}>asdasdoas</Text>
                <Text color={gray}>asdasdoas</Text>
            </View>
        </Card>

        <HotelCheck status="In" value={checkIn} />

        <HotelCheck status="Out" value={checkOut} />

        { prices?.isRefundable && <View style={styles.refund}>
            <Icon name="cash-refund" color={theme.colors.tertiary} size={20}/>
            <Text variant="bodyMedium" style={styles.refundText} color={theme.colors.tertiary}>Dapat direfund jika dibatalkan</Text>
        </View>}
    </View>

    const CustomerCard = () => <View style={styles.padding}>
        <Text variant="titleMedium">Detail Pemesan</Text>
        <Card style={styles.customerCard}>
            <View>
                <Text variant="titleMedium" style={styles.customerCardTitle}>Tn. Andreass</Text>
                <Text color={gray} variant="bodyMedium">andreas@gmail.com</Text>
                <Text color={gray} variant="bodyMedium">+62 881928 912891 2</Text>
            </View>
            <Text underline variant="bodyMedium" color={primary}>Ubah</Text>
        </Card>

        <RadioButton.Group onValueChange={onValueChange} value={orderFor}>
            <Pressable style={styles.orderForOption} onPress={() => setOrderFor("me")}>
                <RadioButton value="me" />
                <Text variant="titleSmall">Saya memesan untuk sendiri</Text>
            </Pressable>
            <Pressable style={styles.orderForOption} onPress={() => setOrderFor("other")}>
                <RadioButton value="other" />
                <Text variant="titleSmall">Saya memesan untuk orang lain</Text>
            </Pressable>
        </RadioButton.Group>

        { orderFor === "other" &&  <>
            <VisitorsCard items={visitors}/>

            <View style={styles.changeVisitorsTextLink}>
                <Link href="/add-visitors">
                    <Text color={primary} variant="bodyMedium" underline>Ubah Data Tamu</Text>
                </Link>
            </View>
        </>}
    </View>

    const HotelCheck:FC<{status: "In" | "Out"; value: string}> = memo((props) => <View style={styles.hotelCheck}>
        <Text variant="titleMedium">{`Check-${props.status}`}</Text>
        <Text color={gray} variant="bodyMedium">{props.value}</Text>
    </View>)


    const VisitorsCard:FC<{items: Array<Visitor>}> = memo((props) => <View style={styles.visitorsCard}>
        <Text variant="titleMedium" style={styles.visitorTitle}>Data Tamu</Text>

        {props.items.map((item, index) => <Card style={styles.visitorCard} key={index}>
            <Icon name="face-man-profile" size={20}/>
            <Text variant="titleSmall" style={styles.visitorText}>{(item.title === "Mr" ? "Tn" : "Ny") + ". " + item.name}</Text>
        </Card>)
        }
    </View>)

    if(loading) return <View style={styles.center}><ActivityIndicator color={primary} size="large" /></View>

    return <>
        <AppBar title="Payment Details" />

        <ScrollView showsVerticalScrollIndicator={false} style={styles.root}>
            <Header />
            <Divider/>
            <OrderDetailCard />
            <Divider />
            <CustomerCard />
            <Divider/>
        </ScrollView>
    </>
}

const styling = (props: {colors: MD3Colors, insets: EdgeInsets}) => StyleSheet.create({
    card: {marginVertical: 14},

    cardTitle: { marginBottom: 4},

    image: {borderRadius: 10, marginEnd: 8},

    flexRow: { flexDirection: "row" },

    justifyBetween: {justifyContent: "space-between"},

    padding: {padding: 16},

    hotelCheck: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },

    refund: {flexDirection: "row", alignItems: "center", justifyContent: "flex-end"},

    refundText: {marginStart: 6},

    customerCard: {
        marginVertical: 14,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },

    customerCardTitle: {marginBottom: 2},

    changeVisitorsTextLink: {marginTop: 12, alignItems: "flex-end"},

    orderForOption: { flexDirection: "row", alignItems: "center" },

    visitorsCard: {marginTop: 10},

    visitorCard: { marginBottom: 8, flexDirection: "row", alignItems: "center" },

    visitorText: {marginStart: 8},

    visitorTitle: {marginBottom: 14},

    root: {backgroundColor: "#ffffff", paddingBottom: props.insets.bottom},

    center: {flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#ffffff"},

    header: { padding: 14, flexDirection: "row", alignItems: "center", justifyContent: "flex-end" },

    badge: { backgroundColor: props.colors.primary, marginEnd: 4, fontWeight: "bold" },

    headerListItem: { flexDirection: "row", alignItems: "center" },

    inactiveHeaderListItem: { opacity: 0.4 },

    minusIcon: { marginHorizontal: 8 },
})

export default Page
