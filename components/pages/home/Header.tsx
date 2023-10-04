import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { FC, memo } from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';
import { Badge } from 'react-native-paper';

import { Colors } from '../../../utils';
import { Text } from '../../Text';

const HeaderListItem: FC<{ badge: number; label: string; active?: boolean }> = memo((props) => {
  const headerListItemStyle: ViewStyle[] = [styles.headerListItem];

  if (!props?.active) headerListItemStyle.push(styles.inactiveHeaderListItem);

  return (
    <View style={headerListItemStyle}>
      <Badge size={24} style={styles.badge}>
        {props.badge}
      </Badge>
      <Text variant="titleMedium">{props.label}</Text>
    </View>
  );
});
export const Header: FC = () => (
  <View style={styles.header}>
    <HeaderListItem badge={1} label="Detail Pesanan" active />
    <Icon name="minus" style={styles.minusIcon} />
    <HeaderListItem badge={2} label="Pembayaran" />
  </View>
);

const styles = StyleSheet.create({
  header: { padding: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' },

  badge: { backgroundColor: Colors.primary, marginEnd: 4, fontWeight: 'bold' },

  headerListItem: { flexDirection: 'row', alignItems: 'center' },

  inactiveHeaderListItem: { opacity: 0.4 },

  minusIcon: { marginHorizontal: 8 },
});
