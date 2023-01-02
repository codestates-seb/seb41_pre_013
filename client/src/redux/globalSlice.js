import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isNavMenuView: false,
};

export const globalSlice = createSlice({
	name: 'global',
	initialState,
	reducers: {
		setNavMenuView(state, action) {
			state.isNavMenuView = action.payload;
		},
	},
});

export const { setNavMenuView } = globalSlice.actions;
export default globalSlice.reducer;
