import * as types from '../constants/actionTypes';

const initialState = {
    isAnimating: false,
    showInstructionsOverlay: false,
    firstPlay: true
};

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case types.CHANGE_IS_ANIMATING:
            return {
                ...state,
                isAnimating: action.isAnimating
            }
        case types.INSTRUCTIONS_OVERLAY:
            return {
                ...state,
                showInstructionsOverlay: action.show
            }
        case types.PLAY_FIRST_TIME:
            return {
                ...state,
                firstPlay: false
            }
        default:
            return state;
    }
}