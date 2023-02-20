import * as actions from '../constants/index'

const initialState = {  
    searchParking:{
        parkings:[],
        success:false,
        error:null,
        loading:true,
    },
 
}

export function searchParkingReducer(state = initialState, action){
    switch(action.type){

        case actions.SEARCH_PARKING_SUCCESS:
            return {
                ...state,
                searchParking:{
                    success:true,
                    error:null,
                    loading:false,
                    parkings:action.payload
                },
            }
        case actions.SEARCH_PARKING_FAIL:
            return{
                ...state,
                searchParking:{
                    success:false,
                    error:action.payload,
                    loading:false,
                },
            }
        default:
            return state 
    }
}
