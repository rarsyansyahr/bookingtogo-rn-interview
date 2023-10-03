import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {OrderDetail, Visitor} from "../models";

export interface OrderState {
    visitors: Array<Visitor>
    orderDetail: OrderDetail | undefined
}

const initialState: OrderState = {
    visitors: [],
    orderDetail: undefined,
}

const fetchOrderDetail = createAsyncThunk("order/fetchOrderDetail", async () => {

})

export const OrderSlice = createSlice({
    name: 'orderSlice',
    initialState,
    reducers: {
        setVisitors: (state, action: PayloadAction<OrderState["visitors"]>) => {
            state.visitors = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setVisitors } = OrderSlice.actions

export default OrderSlice.reducer
