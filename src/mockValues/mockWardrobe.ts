import { E_Category, E_Position } from "enums";
import { ISize, IWardrobeModel } from "models";
import { generateWardrobe, WardrobeUtils } from "utils";

const size36_84_24: ISize = { width: 36, height: 84, depth: 24 };
const size48_84_24: ISize = { width: 48, height: 84, depth: 24 };
const size72_84_24: ISize = { width: 72, height: 84, depth: 24 };
const size72_108_24: ISize = { width: 72, height: 108, depth: 24 };
const size120_120_24: ISize = { width: 120, height: 120, depth: 24 };

const wardrobe36_84_24: IWardrobeModel = { ...generateWardrobe(size36_84_24) };
const wardrobe48_84_24: IWardrobeModel = { ...generateWardrobe(size48_84_24) };
const wardrobe72_84_24: IWardrobeModel = { ...generateWardrobe(size72_84_24) };
const wardrobe72_108_24: IWardrobeModel = { ...generateWardrobe(size72_108_24) };
const wardrobe120_120_24: IWardrobeModel = { ...generateWardrobe(size120_120_24) };

export const mockWardrobes: IWardrobeModel[] = [
  {
    ...wardrobe36_84_24,
    pieces: [
      ...wardrobe36_84_24.pieces || [],
      { ...WardrobeUtils(wardrobe36_84_24).getPosition(E_Category.PARTITION, E_Position.HORIZONTAL_PARTITION, size36_84_24, { fromBottom: 36 }) },
      { ...WardrobeUtils(wardrobe36_84_24).getPosition(E_Category.PARTITION, E_Position.HORIZONTAL_PARTITION, size36_84_24, { fromBottom: 26 }) },
      { ...WardrobeUtils(wardrobe36_84_24).getPosition(E_Category.PARTITION, E_Position.HORIZONTAL_PARTITION, size36_84_24, { fromBottom: 16 }) },

      { ...WardrobeUtils(wardrobe36_84_24).getPosition(E_Category.DRAWER, E_Position.DRAWER, size36_84_24, { fromBottom: 36, drawerHeight: 10 }) },
      { ...WardrobeUtils(wardrobe36_84_24).getPosition(E_Category.DRAWER, E_Position.DRAWER, size36_84_24, { fromBottom: 26, drawerHeight: 10 }) },

      { ...WardrobeUtils(wardrobe36_84_24).getPosition(E_Category.HANGER_ROAD, E_Position.HANGER_ROAD, size36_84_24, { fromBottom: 82 }) },

      { ...WardrobeUtils(wardrobe36_84_24).getPosition(E_Category.DOOR, E_Position.DOOR, size36_84_24, { numberOfGate: 2, gateNumber: 1 }) },
      { ...WardrobeUtils(wardrobe36_84_24).getPosition(E_Category.DOOR, E_Position.DOOR, size36_84_24, { numberOfGate: 2, gateNumber: 2 }) },
    ]
  },
  {
    ...wardrobe48_84_24,
    pieces: [
      ...wardrobe48_84_24.pieces || [],
      { ...WardrobeUtils(wardrobe48_84_24).getPosition(E_Category.PARTITION, E_Position.VERTICAL_PARTITION, size48_84_24, { fromLeft: 32 }), },

      { ...WardrobeUtils(wardrobe48_84_24).getPosition(E_Category.PARTITION, E_Position.HORIZONTAL_PARTITION, size48_84_24, { fromBottom: 36, width: 32 }), },
      { ...WardrobeUtils(wardrobe48_84_24).getPosition(E_Category.PARTITION, E_Position.HORIZONTAL_PARTITION, size48_84_24, { fromBottom: 26, width: 32 }), },
      { ...WardrobeUtils(wardrobe48_84_24).getPosition(E_Category.PARTITION, E_Position.HORIZONTAL_PARTITION, size48_84_24, { fromBottom: 16, width: 32 }), },

      { ...WardrobeUtils(wardrobe48_84_24).getPosition(E_Category.PARTITION, E_Position.HORIZONTAL_PARTITION, size48_84_24, { fromLeft: 32, fromBottom: 14, width: 16 }), },
      { ...WardrobeUtils(wardrobe48_84_24).getPosition(E_Category.PARTITION, E_Position.HORIZONTAL_PARTITION, size48_84_24, { fromLeft: 32, fromBottom: 28, width: 16 }), },
      { ...WardrobeUtils(wardrobe48_84_24).getPosition(E_Category.PARTITION, E_Position.HORIZONTAL_PARTITION, size48_84_24, { fromLeft: 32, fromBottom: 42, width: 16 }), },
      { ...WardrobeUtils(wardrobe48_84_24).getPosition(E_Category.PARTITION, E_Position.HORIZONTAL_PARTITION, size48_84_24, { fromLeft: 32, fromBottom: 56, width: 16 }), },
      { ...WardrobeUtils(wardrobe48_84_24).getPosition(E_Category.PARTITION, E_Position.HORIZONTAL_PARTITION, size48_84_24, { fromLeft: 32, fromBottom: 70, width: 16 }), },

      { ...WardrobeUtils(wardrobe48_84_24).getPosition(E_Category.DOOR, E_Position.DOOR, size48_84_24, { numberOfGate: 3, gateNumber: 1 }) },
      { ...WardrobeUtils(wardrobe48_84_24).getPosition(E_Category.DOOR, E_Position.DOOR, size48_84_24, { numberOfGate: 3, gateNumber: 2 }) },
      { ...WardrobeUtils(wardrobe48_84_24).getPosition(E_Category.DOOR, E_Position.DOOR, size48_84_24, { numberOfGate: 3, gateNumber: 3 }) },

      { ...WardrobeUtils(wardrobe48_84_24).getPosition(E_Category.DRAWER, E_Position.DRAWER, size48_84_24, { fromBottom: 36, width: 32, drawerHeight: 10 }) },
      { ...WardrobeUtils(wardrobe48_84_24).getPosition(E_Category.DRAWER, E_Position.DRAWER, size48_84_24, { fromBottom: 26, width: 32, drawerHeight: 10 }) },

      { ...WardrobeUtils(wardrobe48_84_24).getPosition(E_Category.HANGER_ROAD, E_Position.HANGER_ROAD, size48_84_24, { fromBottom: 82, width: 32 }) },
    ]
  },
  {
    ...wardrobe72_84_24,
    pieces: [
      ...wardrobe72_84_24.pieces || [],
      { ...WardrobeUtils(wardrobe72_84_24).getPosition(E_Category.PARTITION, E_Position.VERTICAL_PARTITION, size72_84_24, { fromLeft: 36 }), },

      { ...WardrobeUtils(wardrobe72_84_24).getPosition(E_Category.PARTITION, E_Position.HORIZONTAL_PARTITION, size72_84_24, { fromBottom: 36, width: 36 }), },
      { ...WardrobeUtils(wardrobe72_84_24).getPosition(E_Category.PARTITION, E_Position.HORIZONTAL_PARTITION, size72_84_24, { fromBottom: 26, width: 36 }), },
      { ...WardrobeUtils(wardrobe72_84_24).getPosition(E_Category.PARTITION, E_Position.HORIZONTAL_PARTITION, size72_84_24, { fromBottom: 16, width: 36 }), },

      { ...WardrobeUtils(wardrobe72_84_24).getPosition(E_Category.DRAWER, E_Position.DRAWER, size72_84_24, { fromBottom: 36, width: 36, drawerHeight: 10 }) },
      { ...WardrobeUtils(wardrobe72_84_24).getPosition(E_Category.DRAWER, E_Position.DRAWER, size72_84_24, { fromBottom: 26, width: 36, drawerHeight: 10 }) },

      { ...WardrobeUtils(wardrobe72_84_24).getPosition(E_Category.PARTITION, E_Position.HORIZONTAL_PARTITION, size72_84_24, { fromLeft: 36, fromBottom: 36, width: 36 }), },
      { ...WardrobeUtils(wardrobe72_84_24).getPosition(E_Category.PARTITION, E_Position.HORIZONTAL_PARTITION, size72_84_24, { fromLeft: 36, fromBottom: 26, width: 36 }), },
      { ...WardrobeUtils(wardrobe72_84_24).getPosition(E_Category.PARTITION, E_Position.HORIZONTAL_PARTITION, size72_84_24, { fromLeft: 36, fromBottom: 16, width: 36 }), },

      { ...WardrobeUtils(wardrobe72_84_24).getPosition(E_Category.DRAWER, E_Position.DRAWER, size72_84_24, { fromLeft: 36, fromBottom: 36, width: 36, drawerHeight: 10 }), },
      { ...WardrobeUtils(wardrobe72_84_24).getPosition(E_Category.DRAWER, E_Position.DRAWER, size72_84_24, { fromLeft: 36, fromBottom: 26, width: 36, drawerHeight: 10 }) },

      { ...WardrobeUtils(wardrobe72_84_24).getPosition(E_Category.HANGER_ROAD, E_Position.HANGER_ROAD, size72_84_24, { fromBottom: 82, width: 36 }) },
      { ...WardrobeUtils(wardrobe72_84_24).getPosition(E_Category.HANGER_ROAD, E_Position.HANGER_ROAD, size72_84_24, { fromLeft: 36, fromBottom: 82, width: 36 }) },

      { ...WardrobeUtils(wardrobe72_84_24).getPosition(E_Category.DOOR, E_Position.DOOR, size72_84_24, { numberOfGate: 4, gateNumber: 1 }) },
      { ...WardrobeUtils(wardrobe72_84_24).getPosition(E_Category.DOOR, E_Position.DOOR, size72_84_24, { numberOfGate: 4, gateNumber: 2 }) },
      { ...WardrobeUtils(wardrobe72_84_24).getPosition(E_Category.DOOR, E_Position.DOOR, size72_84_24, { numberOfGate: 4, gateNumber: 3 }) },
      { ...WardrobeUtils(wardrobe72_84_24).getPosition(E_Category.DOOR, E_Position.DOOR, size72_84_24, { numberOfGate: 4, gateNumber: 4 }) },
    ]
  },
  {
    ...wardrobe72_108_24,
    pieces: [
      ...wardrobe72_108_24.pieces || [],
      { ...WardrobeUtils(wardrobe72_108_24).getPosition(E_Category.PARTITION, E_Position.HORIZONTAL_PARTITION, size72_108_24, { fromBottom: 84 }), },

      { ...WardrobeUtils(wardrobe72_108_24).getPosition(E_Category.PARTITION, E_Position.VERTICAL_PARTITION, size72_108_24, { fromLeft: 36, height: 84 }), },
    ]
  },
  {
    ...wardrobe120_120_24,
    pieces: [
      ...wardrobe120_120_24.pieces || [],
    ]
  },
];