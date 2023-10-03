import {FC, useState} from "react";
import {Link} from "expo-router";
import {useTheme, Divider, RadioButton} from "react-native-paper";
import {AppBar, Card, Text} from "../components";
import {View, Image, TextStyle, Pressable, FlatList, ListRenderItem, ScrollView} from "react-native";
import {StyleSheet} from "react-native"
import Icon from "@expo/vector-icons/MaterialCommunityIcons"
import {Visitor} from "../models";

const HotelCheck:FC<{status: "In" | "Out"; value: string}> = (props) => <View style={styles.hotelCheck}>
    <Text style={styles.boldText}>{`Check-${props.status}`}</Text>
    <Text color="#a0a0a0">{props.value}</Text>
</View>


const VisitorsCard:FC<{items: Array<Visitor>}> = (props) => <View style={styles.visitorsCard}>
    <Text style={styles.visitorTitle}>Data Tamu</Text>

    {props.items.map((item, index) => <Card style={styles.visitorCard} key={index}>
        <Icon name="face-man-profile" size={20}/>
        <Text style={styles.visitorText}>{(item.title === "Mr" ? "Tn" : "Ny") + ". " + item.name}</Text>
    </Card>)
    }
</View>

const Page:FC = () => {
    // * Theme
    const theme = useTheme()

    // * States
    const [orderFor, setOrderFor] = useState<"me" | "other">("other")

    // * Actions
    const onValueChange = (value: any) => setOrderFor(value)

    return <>
        <AppBar title="Payment Details" />

        <ScrollView showsVerticalScrollIndicator={false} style={styles.root}>
            <Divider/>
            <View style={styles.padding}>
                <Text style={styles.boldText}>Detail Pesanan</Text>
                <Card style={[styles.card, styles.flexRow]}>
                    <Image width={60} height={60} source={{uri: "https://hotelimages.sunhotels.net/HotelInfo/hotelImage.aspx?id=11463973"}} style={styles.image} />
                    <View>
                        <Text color={theme.colors.primary} style={styles.cardTitle}>Novotel Tangerang</Text>
                        <Text color="#a0a0a0">asdasdoas</Text>
                        <Text color="#a0a0a0">asdasdoas</Text>
                    </View>
                </Card>

                <HotelCheck status="In" value="01 November 2023" />

                <HotelCheck status="Out" value="04 November 2023" />

                <View style={styles.refund}><Icon name="cash-refund" color={theme.colors.tertiary} size={20} /><Text style={styles.refundText} color={theme.colors.tertiary}>Dapat direfund jika dibatalkan</Text></View>
            </View>
            <Divider />

            <View style={styles.padding}>
                <Text style={styles.boldText}>Detail Pemesan</Text>
                <Card style={styles.customerCard}>
                    <View>
                        <Text style={styles.customerCardTitle}>Tn. Andreass</Text>
                        <Text>andreas@gmail.com</Text>
                        <Text>+62 881928 912891 2</Text>
                    </View>
                    <Text underline color={theme.colors.primary}>Ubah</Text>
                </Card>

                <RadioButton.Group onValueChange={onValueChange} value={orderFor}>
                    <Pressable style={styles.orderForOption} onPress={() => setOrderFor("me")}>
                        <RadioButton value="me" />
                        <Text>Saya memesan untuk sendiri</Text>
                    </Pressable>
                    <Pressable style={styles.orderForOption} onPress={() => setOrderFor("other")}>
                        <RadioButton value="other" />
                        <Text>Saya memesan untuk orang lain</Text>
                    </Pressable>
                </RadioButton.Group>

                { orderFor === "other" &&  <>
                    <VisitorsCard items={[{title: "Mr", name: "Rizky"}, {title: "Ms", name: "Fauziyah"}]}/>
                    <Link href="/add-visitors" style={styles.changeVisitorsTextLink}>
                        <Text color={theme.colors.primary} style={styles.changeVisitorsText} underline>Ubah Data Tamu</Text>
                    </Link>
                </>}
            </View>

            <Divider style={styles.lastDivider} />
        </ScrollView>
    </>
}

const boldText = {fontWeight: "bold"} as TextStyle

const styles = StyleSheet.create({
    card: {marginVertical: 14},

    cardTitle: {...boldText, marginBottom: 4},

    image: {borderRadius: 10, marginEnd: 8},

    flexRow: { flexDirection: "row" },

    justifyBetween: {justifyContent: "space-between"},

    padding: {padding: 16},

    boldText,

    hotelCheck: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },

    refund: {flexDirection: "row", alignItems: "center", justifyContent: "flex-end"},

    refundText: {marginStart: 6},

    customerCard: {
        marginVertical: 14,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },

    customerCardTitle: {...boldText, marginBottom: 2},

    lastDivider: {marginBottom: 10},

    changeVisitorsText: {textAlign: "right"},

    changeVisitorsTextLink: {marginTop: 12},

    orderForOption: { flexDirection: "row", alignItems: "center" },

    visitorsCard: {marginTop: 10},

    visitorCard: { marginBottom: 8, flexDirection: "row", alignItems: "center" },

    visitorText: {marginStart: 8},

    visitorTitle: {marginBottom: 14},

    root: {backgroundColor: "#ffffff"}
})

export default Page
