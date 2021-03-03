let initialState = {
    data: [],
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case 'setdata':
            return {
                data: action.data,
            }
        
        default:
            return state
    }

}

export default reducer;