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
        room: {
            name: string;
        },
        params: {
            checkIn: string;
            checkOut: string;
            totalRoom: number;
            guestAdult: number;
        },
        prices: {
            isRefundable: boolean
        }
    },
}
