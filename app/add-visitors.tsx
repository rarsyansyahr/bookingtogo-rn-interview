import {FC} from "react";
import {Button, TextInput, useTheme} from "react-native-paper";
import {FlatList, ListRenderItem, Platform, StyleSheet, View} from "react-native";
import {EdgeInsets, useSafeAreaInsets} from "react-native-safe-area-context";
import Icon from "@expo/vector-icons/MaterialCommunityIcons"
import SelectDropdown from 'react-native-select-dropdown'
import {Visitor} from "../models";
import {AppBar, Text} from "../components"
import {Controller} from "react-hook-form";
import {useAddVisitorForm} from "../hooks";

const isIos = Platform.OS === "ios"
const fontFamily = isIos ? "Poppins_400Regular" : "OpenSans_400Regular"

const AddVisitorsPage: FC = () => {
    // * Form
    const {onAddVisitor, onRemoveVisitor, control, handleSubmit, onSaveVisitors, fields} = useAddVisitorForm()

    // * Theme
    const theme = useTheme()
    const insets = useSafeAreaInsets()
    const gray = "#CACACA"
    const styles = styling(insets)

    // * Data
    const dropdownItems = ["Mr", "Ms"]

    // * Components
    const ListHeader = <Text color={theme.colors.primary} style={styles.visitorTitle} variant="titleMedium">Data
        Tamu</Text>

    const ListFooter = <Text color={theme.colors.tertiary} variant="titleSmall" underline style={styles.footerListText}
                             onPress={onAddVisitor}>+ Tambah Data Tamu</Text>

    const renderItem: ListRenderItem<Visitor & { id: string }> = ({item, index}) => (
        <View key={item.id} style={styles.listItem}>
            <Controller
                render={({field: {onChange, onBlur, value}}) =>
                    <SelectDropdown
                        data={dropdownItems}
                        onSelect={onChange}
                        onBlur={onBlur}
                        defaultValue={value}
                        buttonStyle={styles.dropdownButton}
                        buttonTextStyle={styles.dropdownButtonText}
                        dropdownStyle={styles.dropdown}
                        renderDropdownIcon={(isOpen) => <Icon name={isOpen ? "menu-up" : "menu-down"} size={24} />}
                    />
                }
                name={`visitors.${index}.title`}
                control={control}
            />
            <Controller
                render={({field: {onChange, onBlur, value}, fieldState: {error, isTouched}}) =>
                    <TextInput
                        mode="outlined"
                        style={styles.visitorInput}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                        error={error !== undefined}
                        outlineStyle={{borderRadius: 12}}
                        outlineColor={gray}
                    />
                }
                name={`visitors.${index}.name`}
                control={control}
            />
            <Icon
                name="trash-can-outline"
                size={28} color={theme.colors.error}
                onPress={() => onRemoveVisitor(index)}/>
        </View>
    )

    return <>
        <AppBar title="Tambah Data Tamu"/>

        <View style={styles.root}>
            <FlatList
                ListHeaderComponent={ListHeader}
                ListFooterComponent={ListFooter}
                data={fields}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                style={styles.container}
            />

            <Button
                mode="contained"
                buttonColor={theme.colors.tertiary}
                style={styles.button}
                onPress={handleSubmit(onSaveVisitors)}>
                Simpan
            </Button>

        </View>
    </>
}

const styling = (insets: EdgeInsets) => StyleSheet.create({
    listItem: {flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10},

    footerListText: {textAlign: "center", marginTop: 6},

    visitorInput: {flex: 1, marginStart: 10, marginEnd: 14},

    button: {marginHorizontal: 20, marginBottom: insets.bottom, borderRadius: 10},

    container: {flex: 1, paddingHorizontal: 16, paddingTop: 16, marginBottom: 16},

    visitorTitle: { marginBottom: 12},

    root: {backgroundColor: "#FFFFFF", flex: 1},

    dropdownButton: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#CACACA',
        width: 80,
        height: 56
    },

    dropdownButtonText: { fontFamily, fontSize: 16 },

    dropdown: {borderRadius: 12, fontFamily}
})

export default AddVisitorsPage
