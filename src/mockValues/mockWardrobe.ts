import { E_Category, E_Position } from "enums";
import { ISize, IWardrobeModel, IWardrobePiecesModel } from "models";
import { ConvertUtils } from "utils";
import { WardrobeUtils } from "utils/WardrobeUtils";

const size36_84_24: ISize = { width: 36, height: 84, depth: 24 };
const size48_84_24: ISize = { width: 48, height: 84, depth: 24 };
const size72_84_24: ISize = { width: 72, height: 84, depth: 24 };
const size72_108_24: ISize = { width: 72, height: 108, depth: 24 };
const size120_120_24: ISize = { width: 120, height: 120, depth: 24 };

function getDetail(size: ISize): IWardrobeModel {
  return {
    key: `${size.width}*${size.height}*${size.depth}`,
    title: `Wardrobe ${ConvertUtils().toFeetFromInch(size.width)}*${ConvertUtils().toFeetFromInch(size.height)}`,
    size: { ...size },
    wardrobeColor: '#3f51b5',
    innerColor: '#cccccc',
  } as IWardrobeModel;
}

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
    ...getDetail(size36_84_24),
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
    ...getDetail(size48_84_24),
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
    ...getDetail(size72_84_24),
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
    ...getDetail(size72_108_24),
    pieces: [
      ...getPieces(size72_108_24),
      { ...WardrobeUtils(size72_108_24).getPosition(E_Category.PARTITION, E_Position.HORIZONTAL_PARTITION, size72_108_24, { fromBottom: 84 }), },

      { ...WardrobeUtils(size72_108_24).getPosition(E_Category.PARTITION, E_Position.VERTICAL_PARTITION, size72_108_24, { fromLeft: 36, height: 84 }), },
    ]
  },
  {
    ...getDetail(size120_120_24),
    pieces: [
      ...getPieces(size72_108_24),
    ]
  },
];