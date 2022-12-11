import { configureStore } from '@reduxjs/toolkit';
import ToggleStateReducer from './ToggleStateSlice';
import IFSCSearchDetailReducer from './IfscSearchDetailInfo';
import IFSCFetchDetailReducer from './IfscFetchDetails';

const ReduxStore = configureStore({
    reducer: {
        ifscSearchDetailInfo: IFSCSearchDetailReducer,
        ifscFetchDetails : IFSCFetchDetailReducer,
        toggleState : ToggleStateReducer,
    }
});

export default ReduxStore;