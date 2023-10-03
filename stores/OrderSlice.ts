import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {OrderDetail, Visitor} from "../models";

export interface OrderState {
    visitors: Array<Visitor>
    orderDetail?: OrderDetail
    loading: boolean
    error?: string
}

const initialState: OrderState = {
    visitors: [],
    orderDetail: undefined,
    loading: false,
    error: undefined
}

export const fetchOrderDetail = createAsyncThunk<OrderDetail>("order/fetchOrderDetail", async () => {
    const response = await fetch("https://parseapi.back4app.com/classes/hotel/bVonXoSUHK", {
        method: "GET",
        headers: {
            "X-Parse-Application-Id": "Rr9ZKgR2t2f49g5ueLWriacIrvKy8Hwv7P87FSw3",
            "X-Parse-REST-API-Key": "4C6gLjrbNGoym5m9j9mFQiDzXO5eETLxjUjY9Fzy"
        }
    })

    // if(response.status === 400) return thunkAPI.rejectWithValue(await response.json())

    const json = await response.json()
    const chosenHotel = json?.chosen_hotel?.data?.get_chosen_hotel
    const detail = chosenHotel?.chosen_hotel_detail
    const params = chosenHotel?.chosen_hotel_params
    const prices = chosenHotel?.chosen_hotel_prices

    return {
        chosenHotel: {
            detail: {
                name: detail?.hotel_name,
                images: detail?.images
            },
            params: {
                checkIn: params?.check_in,
                checkOut: params?.check_out
            },
            prices: {
                isRefundable: prices?.is_refundable
            }
        }
    }
})

export const OrderSlice = createSlice({
    name: 'orderSlice',
    initialState,
    reducers: {
        setVisitors: (state, action: PayloadAction<OrderState["visitors"]>) => {
            state.visitors = action.payload
        },

        setLoading: (state, action: PayloadAction<OrderState["loading"]>) => {
            state.loading = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchOrderDetail.pending, (state, {payload}) => {
            state.loading = true
        })

        builder.addCase(fetchOrderDetail.fulfilled, (state, {payload}) => {
            state.orderDetail = payload
            state.loading = false
        })

        builder.addCase(fetchOrderDetail.rejected, (state,{error}) => {
            state.loading = false
            state.error = error.message
        })
    }
})

// Action creators are generated for each case reducer function
export const { setVisitors } = OrderSlice.actions

export default OrderSlice.reducer
