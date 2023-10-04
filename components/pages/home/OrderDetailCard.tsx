import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import dayjs from 'dayjs';
import { FC, memo } from 'react';
import { Image, View, StyleSheet } from 'react-native';

import { OrderDetail } from '../../../models';
import { Colors } from '../../../utils';
import { Card } from '../../Card';
import { Text } from '../../Text';

const HotelCheck: FC<{ status: 'In' | 'Out'; value: string }> = memo((props) => (
  <View style={styles.hotelCheck}>
    <Text variant="titleMedium">{`Check-${props.status}`}</Text>
    <Text color={Colors.gray} variant="bodyMedium">
      {props.value}
    </Text>
  </View>
));

export const OrderDetailCard: FC<{ orderDetail?: OrderDetail }> = (props) => {
  const { orderDetail } = props;
  const chosenHotel = orderDetail?.chosenHotel;
  const detail = chosenHotel?.detail;
  const params = chosenHotel?.params;
  const prices = chosenHotel?.prices;
  const room = chosenHotel?.room;

  // * Data
  const checkIn = dayjs(params?.checkIn).format('DD MMMM YYYY');
  const checkOut = dayjs(params?.checkOut).format('DD MMMM YYYY');
  const totalNight = dayjs(params?.checkOut).diff(params?.checkIn, 'day');
  const roomDetail = `${params?.totalRoom} Kamar • Quadpurble • ${params?.guestAdult} Tamu • ${totalNight} Malam`;

  return (
    <View style={styles.padding}>
      <Text variant="titleMedium">Detail Pesanan</Text>
      <Card style={[styles.card, styles.flexRow]}>
        <Image
          width={50}
          height={50}
          source={{ uri: detail?.images[0].thumbnail }}
          style={styles.image}
        />
        <View style={{ flex: 1 }}>
          <Text color={Colors.primary} variant="titleSmall">
            {detail?.name}
          </Text>
          <Text color={Colors.gray} numberOfLines={1} ellipsizeMode="tail" variant="bodySmall">
            {room?.name}
          </Text>
          <Text color={Colors.gray} numberOfLines={1} ellipsizeMode="tail" variant="bodySmall">
            {roomDetail}
          </Text>
        </View>
      </Card>

      <HotelCheck status="In" value={checkIn} />

      <HotelCheck status="Out" value={checkOut} />

      {prices?.isRefundable && (
        <View style={styles.refund}>
          <Icon name="cash-refund" color={Colors.tertiary} size={20} />
          <Text variant="bodyMedium" style={styles.refundText} color={Colors.tertiary}>
            Dapat direfund jika dibatalkan
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: { marginVertical: 14 },

  image: { borderRadius: 10, marginEnd: 8 },

  flexRow: { flexDirection: 'row' },

  padding: { padding: 16 },

  hotelCheck: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },

  refund: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' },

  refundText: { marginStart: 6 },
});
