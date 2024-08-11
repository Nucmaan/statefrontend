import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  propertyList: [],
  loading: false,
  error: null,
};

const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {
    PropertyListStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    PropertyListSuccess: (state, action) => {
      state.loading = false;
      state.propertyList = action.payload;
    },
    PropertyListFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // delete property reducer actions here

    DeletePropertyStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    DeletePropertySuccess: (state, action) => {
      state.loading = false;
      state.propertyList = state.propertyList.filter(
        (property) => property._id !== action.payload
      );
    },
    DeletePropertyFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // add properties

    AddPropertyStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    AddPropertySuccess: (state, action) => {
      state.loading = false;
      state.propertyList.push(action.payload);
    },
    AddPropertyFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // update property
    UpdatePropertyStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    UpdatePropertySuccess: (state, action) => {
      state.loading = false;
      const updatedPropertyIndex = state.propertyList.findIndex(
        (property) => property._id === action.payload._id
      );
      if (updatedPropertyIndex!== -1) {
        state.propertyList[updatedPropertyIndex] = action.payload;
      }
    },
    UpdatePropertyFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

  },
});

export const {
  PropertyListStart,
  PropertyListSuccess,
  PropertyListFailure,
  DeletePropertyStart,
  DeletePropertySuccess,
  DeletePropertyFailure,
  AddPropertyStart,
  AddPropertySuccess,
  AddPropertyFailure,
  UpdatePropertyStart,
  UpdatePropertySuccess,
  UpdatePropertyFailure,
} = propertySlice.actions;

export default propertySlice.reducer;
