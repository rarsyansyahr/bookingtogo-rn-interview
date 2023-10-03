import {FC} from "react";
import {Button, TextInput, useTheme} from "react-native-paper";
import {FlatList, ListRenderItem, StyleSheet, View} from "react-native";
import {EdgeInsets, useSafeAreaInsets} from "react-native-safe-area-context";
import Icon from "@expo/vector-icons/MaterialCommunityIcons"
import SelectDropdown from 'react-native-select-dropdown'
import {Visitor} from "../models";
import {AppBar, Text} from "../components"
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../stores";
import {Controller, useFieldArray, useForm} from "react-hook-form";
import {zodResolver} from '@hookform/resolvers/zod';
import * as z from 'zod';
import {setVisitors} from "../stores/OrderSlice";
import {router} from "expo-router";


type FormValues = {
    visitors: Array<Visitor>
}

const FormSchema = z.object({
    visitors: z.object({
        title: z.enum(["Mr", "Ms"]),
        name: z.string().min(1)
    }).array()
});

const AddVisitorsPage: FC = () => {
    // * Stores
    const dispatch = useDispatch()
    const initialVisitors = useSelector((state: RootState) => state.order.visitors)
    const defaultVisitors: Array<Visitor> = initialVisitors.length > 0 ? initialVisitors : [{title: "Mr", name: ""}]

    // * Form
    const {control, register, handleSubmit, formState} = useForm<FormValues>({
        defaultValues: {
            visitors: defaultVisitors
        },
        resolver: zodResolver(FormSchema)
    })
    const {isValid} = formState
    const {fields, append, remove} = useFieldArray({
        name: "visitors",
        control
    })

    // * Theme
    const theme = useTheme()
    const insets = useSafeAreaInsets()
    const styles = styling(insets)

    // * Data
    const dropdownItems = ["Mr", "Ms"]

    // * Actions
    const onAddVisitor = () => append({name: "", title: "Mr"})

    const onSubmit = (values: FormValues) => {
        if(!isValid) {
            alert("Lengkapi nama tamu")
            return
        }

        dispatch(setVisitors(values.visitors))

        router.back()
    }

    // * Components
    const ListHeader = <Text color={theme.colors.primary} style={styles.visitorTitle} variant="bodyLarge">Data Tamu</Text>

    const ListFooter = <Text color={theme.colors.tertiary} underline style={styles.footerListText} onPress={onAddVisitor}>+ Tambah Data Tamu</Text>

    const renderItem: ListRenderItem<Visitor & {id: string}> = ({item, index}) => (
        <View key={item.id} style={styles.listItem}>
            <Controller
                render={({field: {onChange, onBlur, value}}) =>
                    <SelectDropdown
                        data={dropdownItems}
                        onSelect={onChange}
                        onBlur={onBlur}
                        defaultValue={value}
                        buttonStyle={{width: 60}}
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
                        error={error!==undefined}
                    />
                }
                name={`visitors.${index}.name`}
                control={control}
            />
            <Icon
                name="trash-can-outline"
                size={28} color={theme.colors.error}
                onPress={() => remove(index)} />
        </View>
    )

    return <>
        <AppBar title="Tambah Data Tamu" />

        <View style={styles.root} >
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
                onPress={handleSubmit(onSubmit)}>
                Simpan
            </Button>

        </View>
    </>
}

const styling = (insets: EdgeInsets) => StyleSheet.create({
    listItem: {flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10},

    footerListText: {textAlign: "center", marginTop: 6},

    visitorInput: {flex: 1, marginStart: 10, marginEnd: 14},

    button: {marginHorizontal: 20,  marginBottom: insets.bottom},

    container: {flex: 1, paddingHorizontal: 16, paddingTop: 16, marginBottom: 16},

    visitorTitle: {fontWeight: "bold", marginBottom: 12},

    root: {backgroundColor: "#ffffff", flex: 1}
})

export default AddVisitorsPage
