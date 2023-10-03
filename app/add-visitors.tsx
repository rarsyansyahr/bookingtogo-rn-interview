import {FC, useEffect, useState} from "react";
import {useTheme, Button, TextInput} from "react-native-paper";
import { router } from 'expo-router';
import {FlatList, ListRenderItem, View, StyleSheet} from "react-native";
import {EdgeInsets, useSafeAreaInsets} from "react-native-safe-area-context";
import Icon from "@expo/vector-icons/MaterialCommunityIcons"
import SelectDropdown from 'react-native-select-dropdown'
import {Visitor} from "../models";
import {AppBar, Text} from "../components"

const AddVisitorsPage: FC = () => {
    // * Theme
    const theme = useTheme()
    const insets = useSafeAreaInsets()
    const styles = styling(insets)

    // * States
    const [visitors, setVisitors] = useState<Array<Visitor>>([{name: "", title: "Mr"}])

    // * Data
    const dropdownItems = ["Mr", "Ms"]

    // * Actions

    const onAddVisitor = () => setVisitors((prev) => [...prev, {name: "", title: "Mr"}])

    const onRemoveVisitor = (index: number) => setVisitors((prev) => prev.filter((item, idx) => index !== idx))

    const onChangeTitle = (index: number, value: Visitor["title"]) => setVisitors((prev) => prev.map((item, idx) => {
        if(index === idx && item.title !== value) item.title = value

        return item
    }))

    const onSave = () => router.back()

    // * Components
    const ListHeader = <Text color={theme.colors.primary} style={styles.visitorTitle} variant="bodyLarge">Data Tamu</Text>

    const ListFooter = <Text color={theme.colors.tertiary} underline style={styles.footerListText} onPress={onAddVisitor}>+ Tambah Data Tamu</Text>

    const renderItem: ListRenderItem<Visitor> = ({item, index}) => <View key={index} style={styles.listItem}>
        <SelectDropdown data={dropdownItems} onSelect={(value) => onChangeTitle(index, value)} defaultValue={item.title ?? "Mr"} buttonStyle={{width: 60}} />
        <TextInput mode="outlined" style={styles.visitorInput} />
        <Icon name="trash-can-outline" size={28} color={theme.colors.error} onPress={() => onRemoveVisitor(index)} />
    </View>

    useEffect(() => {
        return () => {
            setVisitors([])
        }
    }, []);

    return <>
        <AppBar title="Tambah Data Tamu" />

        <View style={styles.root}>
            <View style={styles.container}>
                <FlatList ListHeaderComponent={ListHeader} ListFooterComponent={ListFooter} data={visitors} renderItem={renderItem} showsVerticalScrollIndicator={false} />
            </View>

            <Button mode="contained" buttonColor={theme.colors.tertiary} style={styles.button} onPress={onSave}>Simpan</Button>
        </View>
    </>
}

const styling = (insets: EdgeInsets) => StyleSheet.create({
    listItem: {flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10},

    footerListText: {textAlign: "center", marginTop: 6},

    visitorInput: {flex: 1, marginStart: 10, marginEnd: 14},

    button: {marginHorizontal: 20,  marginBottom: insets.bottom + 20},

    container: {flex: 1, margin: 16},

    visitorTitle: {fontWeight: "bold", marginBottom: 12},

    root: {backgroundColor: "#ffffff", flex: 1}
})

export default AddVisitorsPage
