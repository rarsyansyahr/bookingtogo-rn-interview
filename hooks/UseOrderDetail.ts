import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../stores";
import {fetchOrderDetail} from "../stores/OrderSlice";

export const useOrderDetail = () => {
    const dispatch = useDispatch()
    const order = useSelector((state: RootState) => state.order)

    useEffect(() => {
        // @ts-ignore
        dispatch(fetchOrderDetail())
    }, []);

    return order
}
