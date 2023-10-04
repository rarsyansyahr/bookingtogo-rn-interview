import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { Link } from 'expo-router';
import { FC, memo, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { RadioButton } from 'react-native-paper';

import { Visitor } from '../../../models';
import { Colors } from '../../../utils';
import { Card } from '../../Card';
import { Text } from '../../Text';

type CustomerCardProps = {
  visitors: Visitor[];
};

type OrderFor = 'me' | 'other';

const VisitorsCard: FC<{ items: Visitor[] }> = memo((props) => (
  <View style={styles.visitorsCard}>
    <Text variant="titleMedium" style={styles.visitorTitle}>
      Data Tamu
    </Text>

    {props.items.map((item, index) => (
      <Card style={styles.visitorCard} key={index}>
        <Icon name="face-man-profile" size={20} />
        <Text variant="titleSmall" style={styles.visitorText}>
          {(item.title === 'Mr' ? 'Tn' : 'Ny') + '. ' + item.name}
        </Text>
      </Card>
    ))}
  </View>
));

export const CustomerCard: FC<CustomerCardProps> = (props) => {
  const { visitors } = props;

  // * States
  const [orderFor, setOrderFor] = useState<OrderFor>('other');

  // * Actions
  const onValueChange = (value: string) => setOrderFor(value as OrderFor);

  return (
    <View style={styles.padding}>
      <Text variant="titleMedium">Detail Pemesan</Text>
      <Card style={styles.customerCard}>
        <View>
          <Text variant="titleMedium" style={styles.customerCardTitle}>
            Tn. Andreass
          </Text>
          <Text color={Colors.gray} variant="bodyMedium">
            andreas@gmail.com
          </Text>
          <Text color={Colors.gray} variant="bodyMedium">
            +62 881928 912891 2
          </Text>
        </View>
        <Text underline variant="bodyMedium" color={Colors.primary}>
          Ubah
        </Text>
      </Card>

      <RadioButton.Group onValueChange={onValueChange} value={orderFor}>
        <Pressable style={styles.orderForOption} onPress={() => setOrderFor('me')}>
          <RadioButton value="me" />
          <Text variant="titleSmall">Saya memesan untuk sendiri</Text>
        </Pressable>
        <Pressable style={styles.orderForOption} onPress={() => setOrderFor('other')}>
          <RadioButton value="other" />
          <Text variant="titleSmall">Saya memesan untuk orang lain</Text>
        </Pressable>
      </RadioButton.Group>

      {orderFor === 'other' && (
        <>
          <VisitorsCard items={visitors} />

          <View style={styles.changeVisitorsTextLink}>
            <Link href="/add-visitors">
              <Text color={Colors.primary} variant="bodyMedium" underline>
                Ubah Data Tamu
              </Text>
            </Link>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  padding: { padding: 16 },

  customerCard: {
    marginVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  customerCardTitle: { marginBottom: 2 },

  changeVisitorsTextLink: { marginTop: 12, alignItems: 'flex-end' },

  orderForOption: { flexDirection: 'row', alignItems: 'center' },

  visitorsCard: { marginTop: 10 },

  visitorCard: { marginBottom: 8, flexDirection: 'row', alignItems: 'center' },

  visitorText: { marginStart: 8 },

  visitorTitle: { marginBottom: 14 },
});
