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
    setWardrobeByKey(draft: IWardrobeState, action: PayloadAction<string>) {
      const index = draft.wardrobes.findIndex(i => i.key === action.payload);
      if (index >= 0) {
        draft.currentWardrobe = draft.wardrobes[index];
      }
    },
    setCurrentWardrobe(draft: IWardrobeState, action: PayloadAction<IWardrobeModel | undefined>) {
      draft.currentWardrobe = action.payload ? { ...action.payload } : undefined;
    },
    setWardrobeColor(draft: IWardrobeState, action: PayloadAction<string>) {
      if (draft.currentWardrobe) draft.currentWardrobe.wardrobeColor = action.payload;
      draft.wardrobeColor = action.payload;
    },
    setWardrobeInnerColor(draft: IWardrobeState, action: PayloadAction<string>) {
      draft.wardrobeInnerColor = action.payload;
    },
    // toggleWireframe(draft: IWardrobeState, action: PayloadAction<boolean | undefined>) {
    //   draft.showWireframe = action.payload !== undefined ? action.payload : !draft.showWireframe;
    // },
    // toggleDoors(draft: IWardrobeState, action: PayloadAction<boolean | undefined>) {
    //   draft.showDoors = action.payload !== undefined ? action.payload : !draft.showDoors;
    // },
    // toggleGridLine(draft: IWardrobeState, action: PayloadAction<boolean | undefined>) {
    //   draft.showGridLine = action.payload !== undefined ? action.payload : !draft.showGridLine;
    // },
    // toggleAxes(draft: IWardrobeState, action: PayloadAction<boolean | undefined>) {
    //   draft.showAxes = action.payload !== undefined ? action.payload : !draft.showAxes;
    // },
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