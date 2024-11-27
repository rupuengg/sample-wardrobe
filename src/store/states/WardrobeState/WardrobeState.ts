import { mockWardrobes } from "mockValues";
import { defaultWardrobeModel, IWardrobeModel } from "models";

export interface IWardrobeState {
  wardrobes: IWardrobeModel[];
  currentWardrobe?: IWardrobeModel;
  wardrobeColor?: string;
  wardrobeInnerColor?: string;
  showWireframe?: boolean;
  showDoors?: boolean;
  showGridLine?: boolean;
  showAxes?: boolean;
  customWardrobe: IWardrobeModel;
}

export const defaultWardrobeState: IWardrobeState = {
  wardrobes: [...mockWardrobes],
  currentWardrobe: mockWardrobes[3],
  showGridLine: true,
  showAxes: true,
  customWardrobe: defaultWardrobeModel,
}