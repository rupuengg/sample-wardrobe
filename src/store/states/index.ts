import { IApplicationState } from 'store/store';
import { defaultWardrobeState } from './WardrobeState/WardrobeState';

export * from './WardrobeState';

export const defaultState: IApplicationState = {
  wardrobe: { ...defaultWardrobeState },
};