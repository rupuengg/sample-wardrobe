import { mockWardrobes } from "mockValues";
import { IWardrobeModel } from "models";

export interface IWardrobeState {
  wardrobes: IWardrobeModel[];
  currentWardrobe: IWardrobeModel;
  wardrobeColor?: string;
  wardrobeInnerColor?: string;
  showWireframe?: boolean;
  showDoors?: boolean;
}

export const defaultWardrobeState: IWardrobeState = {
  wardrobes: [...mockWardrobes],
  currentWardrobe: mockWardrobes[0],
}