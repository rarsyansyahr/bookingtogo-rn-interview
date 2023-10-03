import {FC} from "react";
import {View, StyleSheet, ViewProps} from "react-native";

type CardProps = ViewProps

export const Card: FC<CardProps> = (props) => {
    const {style, ...rest} = props

    const cardStyle = [styles.container, style]

    return <View {...rest} style={cardStyle} />
}

const styles = StyleSheet.create({
    container: {backgroundColor: "white", padding: 8, borderColor: "gray", borderWidth: 1, borderRadius: 10}
})
