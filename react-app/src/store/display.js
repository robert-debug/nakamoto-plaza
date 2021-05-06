const SET_DISPLAY = 'display/SET_DISPLAY'

const setDisplay = (display) => ({
    type: SET_USER,
    payload: display
})

export const displaySetter = (display) = async(dispatch) => {
    dispatch(setDisplay(display))
}

const initialState = { display: 'home' };

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_DISPLAY:
            return { display: action.payload };
        default:
            return state;
    }
}
