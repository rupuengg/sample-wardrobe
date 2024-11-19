import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defaultWardrobeState, IWardrobeState } from "store/states/WardrobeState/WardrobeState";
import { IWardrobeModel } from "models";

export const wardrobeSlice = createSlice({
  name: 'wardrobeSlice',
  initialState: defaultWardrobeState,
  reducers: {
    setWardrobes(draft: IWardrobeState, action: PayloadAction<IWardrobeModel[]>) {
      draft.wardrobes = action.payload;
    },
    setCurrentWardrobe(draft: IWardrobeState, action: PayloadAction<IWardrobeModel>) {
      draft.currentWardrobe = action.payload;
    },
    setWardrobeColor(draft: IWardrobeState, action: PayloadAction<string>) {
      draft.currentWardrobe.wardrobeColor = action.payload;
    },
    setWardrobeInnerColor(draft: IWardrobeState, action: PayloadAction<string>) {
      draft.wardrobeInnerColor = action.payload;
    },
    toggleWireframe(draft: IWardrobeState, action: PayloadAction<boolean | undefined>) {
      draft.showWireframe = action.payload !== undefined ? action.payload : !draft.showWireframe;
    },
    toggleDoors(draft: IWardrobeState, action: PayloadAction<boolean | undefined>) {
      draft.showDoors = action.payload !== undefined ? action.payload : !draft.showDoors;
    },
  },
  // extraReducers: (builder: ActionReducerMapBuilder<IDataManagementState>) => {
  //   builder
  //     .addCase(loadData.fulfilled, (draft: IDataManagementState, action: PayloadAction<DataManagementEntity[]>) => {
  //       wardrobeSlice.caseReducers.endLoading(draft);
  //     })
  // }
});

export const WardrobeActions = wardrobeSlice.actions;
export const wardrobeReducer = wardrobeSlice.reducer;