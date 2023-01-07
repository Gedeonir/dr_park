import * as actions from '../constants/index'
import axios from 'axios'
import { toast } from "react-toastify";
import {BACKEND_URL} from '@env'

const notify = (toastMsg) => toast(toastMsg);

export const getAllParkings = () => async (dispatch) => {
    try {
        const res = await axios.get(`${BACKEND_URL}/parkings`)
        
        return dispatch({
            type: actions.FETCH_ALL_PARKINGS_SUCCESS,
            payload: res.data.data.parkings,
        })

    } catch (error) {
        return dispatch({
            type: actions.FETCH_ALL_PARKINGS_FAIL,
            payload: error.message,
        })
        throw error
    }
};

export const getOneParking = (id)=> async(dispatch)=>{
    try {
        const res = await axios.get(`${BACKEND_URL}/parkings/${id}`) 

        return dispatch({
            type: actions.FETCH_ONE_PARKING,
            payload: res.data.data.oneParking,
        })
    } catch (error) {
        return dispatch({
            type: actions.FETCH_ONE_PARKING_FAIL,
            payload: error.message,
        })
    }
};

export const getOneParkingSlots = (id)=>async(dispatch)=>{
    try {
        const res = await axios.get(`${BACKEND_URL}/parkings/${id}/slots`)

        return dispatch({
            type: actions.FETCH_ONE_PARKING_SLOTS,
            payload: res.data.data.parkingSlots,
        })
    } catch (error) {
        return dispatch({
            type: actions.FETCH_ONE_PARKING_SLOTS_FAIL,
            payload: error.message,
        })
    }
}
