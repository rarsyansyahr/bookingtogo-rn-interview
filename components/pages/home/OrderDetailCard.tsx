import {Image, View, StyleSheet} from "react-native";
import {Text} from "../../Text";
import {Card} from "../../Card";
import {Colors} from "../../../utils";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import {FC, memo} from "react";
import {OrderDetail} from "../../../models";
import dayjs from "dayjs";

const HotelCheck:FC<{status: "In" | "Out"; value: string}> = memo((props) => <View style={styles.hotelCheck}>
    <Text variant="titleMedium">{`Check-${props.status}`}</Text>
    <Text color={Colors.gray} variant="bodyMedium">{props.value}</Text>
</View>)

export const OrderDetailCard: FC<{ orderDetail?: OrderDetail }> = (props) => {
    const {orderDetail} = props
    const chosenHotel = orderDetail?.chosenHotel
    const detail = chosenHotel?.detail
    const params = chosenHotel?.params
    const prices = chosenHotel?.prices

    const checkIn = dayjs(params?.checkIn).format("DD MMMM YYYY")
    const checkOut = dayjs(params?.checkOut).format("DD MMMM YYYY")

    return <View style={styles.padding}>
        <Text variant="titleMedium">Detail Pesanan</Text>
        <Card style={[styles.card, styles.flexRow]}>
            <Image width={60} height={60} source={{uri: detail?.images[0].thumbnail}} style={styles.image}/>
            <View>
                <Text color={Colors.primary} style={styles.cardTitle}>{detail?.name}</Text>
                <Text color={Colors.gray}>asdasdoas</Text>
                <Text color={Colors.gray}>asdasdoas</Text>
            </View>
        </Card>

        <HotelCheck status="In" value={checkIn}/>

        <HotelCheck status="Out" value={checkOut}/>

        {prices?.isRefundable && <View style={styles.refund}>
            <Icon name="cash-refund" color={Colors.tertiary} size={20}/>
            <Text variant="bodyMedium" style={styles.refundText} color={Colors.tertiary}>Dapat direfund jika
                dibatalkan</Text>
        </View>}
    </View>
}

const styles = StyleSheet.create({
    card: {marginVertical: 14},

    cardTitle: { marginBottom: 4},

    image: {borderRadius: 10, marginEnd: 8},

    flexRow: { flexDirection: "row" },

    padding: {padding: 16},

    hotelCheck: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },

    refund: {flexDirection: "row", alignItems: "center", justifyContent: "flex-end"},

    refundText: {marginStart: 6},

})
