const { createSlice } = require("@reduxjs/toolkit");

const userSlice = createSlice({
    name:'user',
    initialState: {
        user: '',
    },
    reducers:{
        addUserData: (state, action)=>{
            state.user = action.payload;
        },
        resetUserData: (state)=>{
            state.user = ''; 
        }
    }
});

export const {addUserData, resetUserData} = userSlice.actions;
export default userSlice.reducer;