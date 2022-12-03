import { configureStore } from '@reduxjs/toolkit';
import NavToggleReducer from './NavToggleSlice';
import IFSCSearchDetailReducer from './IfscSearchDetailInfo';
import IFSCFetchDetailReducer from './IfscFetchDetails';

const ReduxStore = configureStore({
    reducer: {
        NavToggle: NavToggleReducer,
        ifscSearchDetailInfo: IFSCSearchDetailReducer,
        ifscFetchDetails : IFSCFetchDetailReducer,
    }
});

export default ReduxStore;