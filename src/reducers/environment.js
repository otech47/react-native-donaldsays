import * as types from '../constants/actionTypes';

const initialState = {
    isAnimating: false,
    isLoading: false,
    showLoginOverlay: false,
    mapTipsOverlay: false,
    withdrawTipsOverlay: false,
    graphTipsOverlay: false,
    walletTipsOverlay: false,
    error: null
};

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case types.CHANGE_IS_ANIMATING:
            return {
                ...state,
                isAnimating: action.isAnimating
            }
        case types.CHANGE_IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            }
        case types.LOGIN_OVERLAY:
            return {
                ...state,
                showLoginOverlay: action.show
            }
        case types.SHOW_TIPS:
            return {
                ...state,
                mapTipsOverlay: true,
                withdrawTipsOverlay: true,
                graphTipsOverlay: true,
                walletTipsOverlay: true
            }
        case types.HIDE_MAP_TIPS:
            return {
                ...state,
                mapTipsOverlay: false
            }
        case types.HIDE_WITHDRAW_TIPS:
            return {
                ...state,
                withdrawTipsOverlay: false
            }
        case types.HIDE_GRAPH_TIPS:
            return {
                ...state,
                graphTipsOverlay: false
            }
        case types.HIDE_WALLET_TIPS:
            return {
                ...state,
                walletTipsOverlay: false
            }
        case types.RECEIVE_ERROR:
            return {
                ...state,
                error: action.error
            };
        default:
            return state;
    }
}