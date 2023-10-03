interface Image {
    url: string;
    title: string;
    thumbnail: string;
}

export interface OrderDetail {
    chosenHotel: {
        detail: {
            images: Array<Image>;
            name: string;
        };
        params: {
            checkIn: string;
            checkOut: string
        },
        prices: {
            isRefundable: boolean
        }
    },
}
