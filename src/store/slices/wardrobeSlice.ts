import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defaultWardrobeState, IWardrobeState } from "store/states/WardrobeState/WardrobeState";
import { ISize, IWardrobeModel, IWardrobePiecesModel } from "models";
import { ConvertUtils } from "utils";
import { WardrobeUtils } from "utils/WardrobeUtils";
import { E_Category, E_Position } from "enums";

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
    updateSizeInCWardrobe(draft: IWardrobeState, action: PayloadAction<ISize>) {
      const wardrobe: IWardrobeModel = {
        key: `${action.payload.width}*${action.payload.height}*${action.payload.depth}`,
        title: `Wardrobe ${ConvertUtils().toFeetFromInch(action.payload.width)}*${ConvertUtils().toFeetFromInch(action.payload.height)}`,
        size: { ...action.payload },
        wardrobeColor: '#3f51b5',
        innerColor: '#cccccc',
        pieces: [
          { ...WardrobeUtils(action.payload).getPosition(E_Category.BOARD, E_Position.BACK, action.payload), },
          { ...WardrobeUtils(action.payload).getPosition(E_Category.BOARD, E_Position.LEFT, action.payload), },
          { ...WardrobeUtils(action.payload).getPosition(E_Category.BOARD, E_Position.RIGHT, action.payload), },
          { ...WardrobeUtils(action.payload).getPosition(E_Category.BOARD, E_Position.TOP, action.payload), },
          { ...WardrobeUtils(action.payload).getPosition(E_Category.BOARD, E_Position.BOTTOM, action.payload), },
        ] as IWardrobePiecesModel[],
      };

      draft.customWardrobe = {
        ...wardrobe,
      };
    },
    updatePieceInCWardrobe(draft: IWardrobeState, action: PayloadAction<IWardrobePiecesModel>) {
      const pieces = draft.customWardrobe.pieces ? [...draft.customWardrobe.pieces] : [];
      pieces.push(action.payload);

      draft.customWardrobe = {
        ...draft.customWardrobe,
        pieces: [
          ...pieces,
        ],
      };
    },
    removePieceInCWardrobe(draft: IWardrobeState, action: PayloadAction<string>) {
      const index = draft.customWardrobe.pieces?.findIndex(p => p.key === action.payload);

      if (index && index >= 0) {
        const pieces = draft.customWardrobe.pieces ? [...draft.customWardrobe.pieces] : [];

        draft.customWardrobe = {
          ...draft.customWardrobe,
          pieces: [
            ...pieces.slice(0, index),
            ...pieces.slice(index + 1),
          ],
        };
      }
    },
    updateDoorsInCWardrobe(draft: IWardrobeState, action: PayloadAction<IWardrobePiecesModel[]>) {
      const doors = [...action.payload];
      const pieces = draft.customWardrobe.pieces ? [...draft.customWardrobe.pieces.filter(i => i.category !== E_Category.DOOR)] : [];

      draft.customWardrobe = {
        ...draft.customWardrobe,
        pieces: [
          ...pieces,
          ...doors,
        ],
      };
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