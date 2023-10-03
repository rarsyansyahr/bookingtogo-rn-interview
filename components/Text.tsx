import {FC} from "react";
import {StyleSheet} from "react-native"
import {Text as RNText, TextProps as RNTextProps} from "react-native-paper"

type TextProps =  RNTextProps<any> & {underline?: boolean; color?: string}

export const Text: FC<TextProps> = (props) => {
    const {underline = false, style, color = "#000000", ...rest} = props

    // * Styles
    const styles = styling({color})
    const textStyle = [style]

    if(underline) textStyle.push(styles.underline)

    if(color) textStyle.push(styles.color)

    return <RNText {...rest} style={textStyle} />
}

const styling = (props: {color?: string}) => StyleSheet.create({
    underline: {
        textDecorationLine: "underline"
    },
    color: {
        color: props?.color
    }
})

