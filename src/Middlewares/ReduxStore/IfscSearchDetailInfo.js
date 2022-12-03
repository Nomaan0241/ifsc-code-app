import { createSlice } from '@reduxjs/toolkit'

const ifscSearchDetailInfo = createSlice({
    name: 'ifscSearchDetailInfo',
    initialState: {
        bank: '',
        state: '',
        district: '',
        branch: '',
    },
    reducers: {
        setIFSCSearchDetailInfo(state, actions) {
            state[actions.payload.key] = actions.payload.value;
        }
    }
});

export const { setIFSCSearchDetailInfo } = ifscSearchDetailInfo.actions;
export default ifscSearchDetailInfo.reducer;