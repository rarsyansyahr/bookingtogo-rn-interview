import {Constants} from "./Constants"
const {isIos} = Constants

const regularFont = isIos ? "Poppins_400Regular" : "OpenSans_400Regular"
const mediumFont = isIos ? "Poppins_500Medium" : "OpenSans_500Medium"
const semiBoldFont = isIos ? "Poppins_600SemiBold" : "OpenSans_600SemiBold"

export const FontConfig = {
    "displaySmall": {
        "fontFamily": mediumFont,
        "fontSize": 36,
        "fontWeight": "400",
        "letterSpacing": 0,
        "lineHeight": 44,
    },
    "displayMedium": {
        "fontFamily": mediumFont,
        "fontSize": 45,
        "fontWeight": "400",
        "letterSpacing": 0,
        "lineHeight": 52,
    },
    "displayLarge": {
        "fontFamily": mediumFont,
        "fontSize": 57,
        "fontWeight": "400",
        "letterSpacing": 0,
        "lineHeight": 64,
    },
    "headlineSmall": {
        "fontFamily": mediumFont,
        "fontSize": 24,
        "fontWeight": "400",
        "letterSpacing": 0,
        "lineHeight": 32,
    },
    "headlineMedium": {
        "fontFamily": mediumFont,
        "fontSize": 28,
        "fontWeight": "400",
        "letterSpacing": 0,
        "lineHeight": 36,
    },
    "headlineLarge": {
        "fontFamily": mediumFont,
        "fontSize": 32,
        "fontWeight": "400",
        "letterSpacing": 0,
        "lineHeight": 40,
    },
    "titleSmall": {
        "fontFamily": mediumFont,
        "fontSize": 14,
        "fontWeight": "500",
        "letterSpacing": 0.1,
        "lineHeight": 20,
    },
    "titleMedium": {
        "fontFamily": semiBoldFont,
        "fontSize": 16,
        "fontWeight": "500",
        "letterSpacing": 0.15,
        "lineHeight": 24,
    },
    "titleLarge": {
        "fontFamily": mediumFont,
        "fontSize": 22,
        "fontWeight": "400",
        "letterSpacing": 0,
        "lineHeight": 28,
    },
    "labelSmall": {
        "fontFamily": mediumFont,
        "fontSize": 11,
        "fontWeight": "500",
        "letterSpacing": 0.5,
        "lineHeight": 16,
    },
    "labelMedium": {
        "fontFamily": mediumFont,
        "fontSize": 12,
        "fontWeight": "500",
        "letterSpacing": 0.5,
        "lineHeight": 16,
    },
    "labelLarge": {
        "fontFamily": mediumFont,
        "fontSize": 14,
        "fontWeight": "500",
        "letterSpacing": 0.1,
        "lineHeight": 20,
    },
    "bodySmall": {
        "fontFamily": regularFont,
        "fontSize": 12,
        "fontWeight": "400",
        "letterSpacing": 0.4,
        "lineHeight": 16,
    },
    "bodyMedium": {
        "fontFamily": regularFont,
        "fontSize": 14,
        "fontWeight": "400",
        "letterSpacing": 0.25,
        "lineHeight": 20,
    },
    "bodyLarge": {
        "fontFamily": regularFont,
        "fontSize": 16,
        "fontWeight": "400",
        "letterSpacing": 0.15,
        "lineHeight": 24,
    }
}
