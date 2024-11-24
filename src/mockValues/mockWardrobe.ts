import { E_Category, E_Position } from "enums";
import { ISize, IWardrobeModel, IWardrobePiecesModel } from "models";
import { BoardThickness } from "constants/BoardSize";
import { WardrobeUtils } from "utils/WardrobeUtils";

const size36_84_24: ISize = { width: 36, height: 84, depth: 24 };
const size48_84_24: ISize = { width: 48, height: 84, depth: 24 };
const size72_84_24: ISize = { width: 72, height: 84, depth: 24 };
const size72_108_24: ISize = { width: 72, height: 108, depth: 24 };

function getPieces(size: ISize) {
  return [
    { ...WardrobeUtils(size).getPosition(E_Category.BOARD, E_Position.BACK, size), },
    { ...WardrobeUtils(size).getPosition(E_Category.BOARD, E_Position.LEFT, size), },
    { ...WardrobeUtils(size).getPosition(E_Category.BOARD, E_Position.RIGHT, size), },
    { ...WardrobeUtils(size).getPosition(E_Category.BOARD, E_Position.TOP, size), },
    { ...WardrobeUtils(size).getPosition(E_Category.BOARD, E_Position.BOTTOM, size), },
  ] as IWardrobePiecesModel[];
}

export const mockWardrobes: IWardrobeModel[] = [
  {
    key: '36*84*24',
    title: '3*7',
    size: size36_84_24,
    wardrobeColor: '#3f51b5',
    innerColor: '#cccccc',
    pieces: [
      ...getPieces(size36_84_24),
      { ...WardrobeUtils(size36_84_24).getPosition(E_Category.PARTITION, E_Position.HORIZONTAL_PARTITION, size36_84_24, { fromBottom: 36 }) },
      { ...WardrobeUtils(size36_84_24).getPosition(E_Category.PARTITION, E_Position.HORIZONTAL_PARTITION, size36_84_24, { fromBottom: 26 }) },
      { ...WardrobeUtils(size36_84_24).getPosition(E_Category.PARTITION, E_Position.HORIZONTAL_PARTITION, size36_84_24, { fromBottom: 16 }) },

      { ...WardrobeUtils(size36_84_24).getPosition(E_Category.DRAWER, E_Position.DRAWER, size36_84_24, { fromBottom: 36, drawerHeight: 10 }) },
      { ...WardrobeUtils(size36_84_24).getPosition(E_Category.DRAWER, E_Position.DRAWER, size36_84_24, { fromBottom: 26, drawerHeight: 10 }) },

      { ...WardrobeUtils(size36_84_24).getPosition(E_Category.HANGER_ROAD, E_Position.HANGER_ROAD, size36_84_24, { fromBottom: 82 }) },

      { ...WardrobeUtils(size36_84_24).getPosition(E_Category.DOOR, E_Position.DOOR, size36_84_24, { numberOfGate: 2, gateNumber: 1 }) },
      { ...WardrobeUtils(size36_84_24).getPosition(E_Category.DOOR, E_Position.DOOR, size36_84_24, { numberOfGate: 2, gateNumber: 2 }) },
    ]
  },
  {
    key: '48*84*24',
    title: '4*7',
    size: size48_84_24,
    wardrobeColor: '#3f51b5',
    innerColor: '#cccccc',
    pieces: [
      ...getPieces(size48_84_24),
      { ...WardrobeUtils(size48_84_24).getPosition(E_Category.PARTITION, E_Position.VERTICAL_PARTITION, size48_84_24, { fromLeft: 32 }), },

      { ...WardrobeUtils(size48_84_24).getPosition(E_Category.PARTITION, E_Position.HORIZONTAL_PARTITION, size48_84_24, { fromBottom: 36, width: 32 }), },
      { ...WardrobeUtils(size48_84_24).getPosition(E_Category.PARTITION, E_Position.HORIZONTAL_PARTITION, size48_84_24, { fromBottom: 26, width: 32 }), },
      { ...WardrobeUtils(size48_84_24).getPosition(E_Category.PARTITION, E_Position.HORIZONTAL_PARTITION, size48_84_24, { fromBottom: 16, width: 32 }), },

      { ...WardrobeUtils(size48_84_24).getPosition(E_Category.PARTITION, E_Position.HORIZONTAL_PARTITION, size48_84_24, { fromLeft: 32, fromBottom: 14, width: 16 }), },
      { ...WardrobeUtils(size48_84_24).getPosition(E_Category.PARTITION, E_Position.HORIZONTAL_PARTITION, size48_84_24, { fromLeft: 32, fromBottom: 28, width: 16 }), },
      { ...WardrobeUtils(size48_84_24).getPosition(E_Category.PARTITION, E_Position.HORIZONTAL_PARTITION, size48_84_24, { fromLeft: 32, fromBottom: 42, width: 16 }), },
      { ...WardrobeUtils(size48_84_24).getPosition(E_Category.PARTITION, E_Position.HORIZONTAL_PARTITION, size48_84_24, { fromLeft: 32, fromBottom: 56, width: 16 }), },
      { ...WardrobeUtils(size48_84_24).getPosition(E_Category.PARTITION, E_Position.HORIZONTAL_PARTITION, size48_84_24, { fromLeft: 32, fromBottom: 70, width: 16 }), },

      { ...WardrobeUtils(size48_84_24).getPosition(E_Category.DOOR, E_Position.DOOR, size48_84_24, { numberOfGate: 3, gateNumber: 1 }) },
      { ...WardrobeUtils(size48_84_24).getPosition(E_Category.DOOR, E_Position.DOOR, size48_84_24, { numberOfGate: 3, gateNumber: 2 }) },
      { ...WardrobeUtils(size48_84_24).getPosition(E_Category.DOOR, E_Position.DOOR, size48_84_24, { numberOfGate: 3, gateNumber: 3 }) },

      { ...WardrobeUtils(size48_84_24).getPosition(E_Category.DRAWER, E_Position.DRAWER, size48_84_24, { fromBottom: 36, width: 32, drawerHeight: 10 }) },
      { ...WardrobeUtils(size48_84_24).getPosition(E_Category.DRAWER, E_Position.DRAWER, size48_84_24, { fromBottom: 26, width: 32, drawerHeight: 10 }) },

      { ...WardrobeUtils(size48_84_24).getPosition(E_Category.HANGER_ROAD, E_Position.HANGER_ROAD, size48_84_24, { fromBottom: 82, width: 32 }) },
    ]
  },
  {
    key: '72*84*24',
    title: '6*7',
    size: size72_84_24,
    wardrobeColor: '#3f51b5',
    innerColor: '#cccccc',
    pieces: [
      ...getPieces(size72_84_24),
      { ...WardrobeUtils(size72_84_24).getPosition(E_Category.PARTITION, E_Position.VERTICAL_PARTITION, size72_84_24, { fromLeft: 36 }), },

      { ...WardrobeUtils(size72_84_24).getPosition(E_Category.PARTITION, E_Position.HORIZONTAL_PARTITION, size72_84_24, { fromBottom: 36, width: 36 }), },
      { ...WardrobeUtils(size72_84_24).getPosition(E_Category.PARTITION, E_Position.HORIZONTAL_PARTITION, size72_84_24, { fromBottom: 26, width: 36 }), },
      { ...WardrobeUtils(size72_84_24).getPosition(E_Category.PARTITION, E_Position.HORIZONTAL_PARTITION, size72_84_24, { fromBottom: 16, width: 36 }), },

      { ...WardrobeUtils(size72_84_24).getPosition(E_Category.DRAWER, E_Position.DRAWER, size72_84_24, { fromBottom: 36, width: 36, drawerHeight: 10 }) },
      { ...WardrobeUtils(size72_84_24).getPosition(E_Category.DRAWER, E_Position.DRAWER, size72_84_24, { fromBottom: 26, width: 36, drawerHeight: 10 }) },

      { ...WardrobeUtils(size72_84_24).getPosition(E_Category.PARTITION, E_Position.HORIZONTAL_PARTITION, size72_84_24, { fromLeft: 36, fromBottom: 36, width: 36 }), },
      { ...WardrobeUtils(size72_84_24).getPosition(E_Category.PARTITION, E_Position.HORIZONTAL_PARTITION, size72_84_24, { fromLeft: 36, fromBottom: 26, width: 36 }), },
      { ...WardrobeUtils(size72_84_24).getPosition(E_Category.PARTITION, E_Position.HORIZONTAL_PARTITION, size72_84_24, { fromLeft: 36, fromBottom: 16, width: 36 }), },

      { ...WardrobeUtils(size72_84_24).getPosition(E_Category.DRAWER, E_Position.DRAWER, size72_84_24, { fromLeft: 36, fromBottom: 36, width: 36, drawerHeight: 10 }), },
      { ...WardrobeUtils(size72_84_24).getPosition(E_Category.DRAWER, E_Position.DRAWER, size72_84_24, { fromLeft: 36, fromBottom: 26, width: 36, drawerHeight: 10 }) },

      { ...WardrobeUtils(size72_84_24).getPosition(E_Category.HANGER_ROAD, E_Position.HANGER_ROAD, size72_84_24, { fromBottom: 82, width: 36 }) },
      { ...WardrobeUtils(size72_84_24).getPosition(E_Category.HANGER_ROAD, E_Position.HANGER_ROAD, size72_84_24, { fromLeft: 36, fromBottom: 82, width: 36 }) },

      { ...WardrobeUtils(size72_84_24).getPosition(E_Category.DOOR, E_Position.DOOR, size72_84_24, { numberOfGate: 4, gateNumber: 1 }) },
      { ...WardrobeUtils(size72_84_24).getPosition(E_Category.DOOR, E_Position.DOOR, size72_84_24, { numberOfGate: 4, gateNumber: 2 }) },
      { ...WardrobeUtils(size72_84_24).getPosition(E_Category.DOOR, E_Position.DOOR, size72_84_24, { numberOfGate: 4, gateNumber: 3 }) },
      { ...WardrobeUtils(size72_84_24).getPosition(E_Category.DOOR, E_Position.DOOR, size72_84_24, { numberOfGate: 4, gateNumber: 4 }) },
    ]
  },
  {
    key: '72*108*24',
    title: '7*9',
    size: size72_108_24,
    wardrobeColor: '#3f51b5',
    innerColor: '#cccccc',
    pieces: [
      ...getPieces(size72_108_24),
      { ...WardrobeUtils(size72_108_24).getPosition(E_Category.PARTITION, E_Position.HORIZONTAL_PARTITION, size72_108_24, { fromBottom: 84 }), },

      { ...WardrobeUtils(size72_108_24).getPosition(E_Category.PARTITION, E_Position.VERTICAL_PARTITION, size72_108_24, { fromLeft: 36, height: 84 }), },
    ]
  },
  // {
  //   key: '120*120*24',
  //   title: '10*10',
  //   size: { width: 120, height: 120, depth: 24 },
  //   wardrobeColor: '#3f51b5',
  //   innerColor: '#cccccc'
  // },
];