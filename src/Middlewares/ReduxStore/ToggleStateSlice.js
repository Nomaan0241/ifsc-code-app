import { createSlice } from '@reduxjs/toolkit'

const ToggleStateSlice = createSlice({
    name: "ToggleState",
    initialState: {
        navToggle: false,
        isLoading: false,
    },
    reducers: {
        setNavToggle(state, actions) {
            state.navToggle = !state.navToggle;
        },
        setLoadingState(state, actions) {
            state.isLoading = actions.payload;
        }
    }
});

export const { setNavToggle, setLoadingState } = ToggleStateSlice.actions;
export default ToggleStateSlice.reducer;