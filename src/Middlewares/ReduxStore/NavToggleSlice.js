import { createSlice } from '@reduxjs/toolkit'

const NavToggleSlice = createSlice({
    name: "NavToggle",
    initialState: false,
    reducers: {
        setNavToggle(state, actions) {
            return !state;
        }
    }
});

export const { setNavToggle } = NavToggleSlice.actions;
export default NavToggleSlice.reducer;