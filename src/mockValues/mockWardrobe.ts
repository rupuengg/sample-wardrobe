import { E_Category, E_Position } from "enums";
import { ISize, IWardrobeModel } from "models";
import { BoardThickness } from "constants/BoardSize";
import { WardrobeUtils } from "utils/WardrobeUtils";

const size: ISize = { width: 36, height: 84, depth: 24 };
const size2: ISize = { width: 48, height: 84, depth: 24 };
const size3: ISize = { width: 72, height: 84, depth: 24 };

function getPieces(size: ISize) {
  return [
    { category: E_Category.BOARD, type: E_Position.BACK, position: { x: 0, y: 0, z: 0 }, size: { width: size.width, height: size.height, depth: BoardThickness.EIGHTEEN_MM } },
    { category: E_Category.BOARD, type: E_Position.LEFT, position: WardrobeUtils(size).leftFramePosition(BoardThickness.EIGHTEEN_MM), size: { width: size.depth - BoardThickness.SIX_MM, height: size.height, depth: BoardThickness.EIGHTEEN_MM } },
    { category: E_Category.BOARD, type: E_Position.RIGHT, position: WardrobeUtils(size).rightFramePosition(BoardThickness.EIGHTEEN_MM), size: { width: size.depth - BoardThickness.SIX_MM, height: size.height, depth: BoardThickness.EIGHTEEN_MM } },
    { category: E_Category.BOARD, type: E_Position.TOP, position: WardrobeUtils(size).topFramePosition(BoardThickness.EIGHTEEN_MM), size: { width: size.depth - BoardThickness.SIX_MM, height: size.width - (2 * BoardThickness.EIGHTEEN_MM), depth: BoardThickness.EIGHTEEN_MM } },
    { category: E_Category.BOARD, type: E_Position.BOTTOM, position: WardrobeUtils(size).bottomFramePosition(BoardThickness.EIGHTEEN_MM), size: { width: size.depth - BoardThickness.SIX_MM, height: size.width - (2 * BoardThickness.EIGHTEEN_MM), depth: BoardThickness.EIGHTEEN_MM } },
  ]
}

export const mockWardrobes: IWardrobeModel[] = [
  // {
  //   key: '36*84*24',
  //   title: '3*7',
  //   size: size,
  //   wardrobeColor: '#3f51b5',
  //   innerColor: '#cccccc',
  //   pieces: [
  //     ...getPieces(size),
  //     { category: E_Category.PARTITION, type: E_Position.HORIZONTAL_PARTITION, position: WardrobeUtils(size).partitionHPositionFromBottomLeft({ width: 24, height: 36, depth: BoardThickness.EIGHTEEN_MM }, 36, BoardThickness.EIGHTEEN_MM), size: { width: 24 - BoardThickness.SIX_MM, height: size.width - (2 * BoardThickness.EIGHTEEN_MM), depth: BoardThickness.EIGHTEEN_MM } },
  //     { category: E_Category.PARTITION, type: E_Position.HORIZONTAL_PARTITION, position: WardrobeUtils(size).partitionHPositionFromBottomLeft({ width: 24, height: 36, depth: BoardThickness.EIGHTEEN_MM }, 26, BoardThickness.EIGHTEEN_MM), size: { width: 24 - BoardThickness.SIX_MM, height: size.width - (2 * BoardThickness.EIGHTEEN_MM), depth: BoardThickness.EIGHTEEN_MM } },
  //     { category: E_Category.PARTITION, type: E_Position.HORIZONTAL_PARTITION, position: WardrobeUtils(size).partitionHPositionFromBottomLeft({ width: 24, height: 36, depth: BoardThickness.EIGHTEEN_MM }, 16, BoardThickness.EIGHTEEN_MM), size: { width: 24 - BoardThickness.SIX_MM, height: size.width - (2 * BoardThickness.EIGHTEEN_MM), depth: BoardThickness.EIGHTEEN_MM } },
  //     { category: E_Category.DRAWER, type: E_Position.DRAWER, position: WardrobeUtils(size).drawerFromTopPosition(-48, 10, BoardThickness.EIGHTEEN_MM), size: { width: 24 - BoardThickness.SIX_MM, height: 36 - (2 * BoardThickness.EIGHTEEN_MM), depth: 10 - (BoardThickness.EIGHTEEN_MM) } },
  //     { category: E_Category.DRAWER, type: E_Position.DRAWER, position: WardrobeUtils(size).drawerFromTopPosition(-58, 10, BoardThickness.EIGHTEEN_MM), size: { width: 24 - BoardThickness.SIX_MM, height: 36 - (2 * BoardThickness.EIGHTEEN_MM), depth: 10 - (BoardThickness.EIGHTEEN_MM) } },
  //     { category: E_Category.HANGER_ROAD, type: E_Position.HANGER_ROAD, position: WardrobeUtils(size).partitionFromTopPosition(-3, BoardThickness.EIGHTEEN_MM), size: { width: BoardThickness.HANGER_ROAD, height: BoardThickness.HANGER_ROAD, depth: 36 - (2 * BoardThickness.EIGHTEEN_MM) }, frontColor: 'black' },
  //     { category: E_Category.DOOR, type: E_Position.DOOR, position: WardrobeUtils(size).leftDoorPosition(BoardThickness.SIX_MM, BoardThickness.GAP), size: { width: 36 / 2 - BoardThickness.GAP, height: 84, depth: BoardThickness.EIGHTEEN_MM } },
  //     { category: E_Category.DOOR, type: E_Position.DOOR, position: WardrobeUtils(size).rightDoorPosition(BoardThickness.SIX_MM, BoardThickness.GAP), size: { width: 36 / 2 - BoardThickness.GAP, height: 84, depth: BoardThickness.EIGHTEEN_MM } },
  //   ]
  // },
  {
    key: '48*84*24',
    title: '4*7',
    size: size2,
    wardrobeColor: '#3f51b5',
    innerColor: '#cccccc',
    pieces: [
      ...getPieces(size2),
      { category: E_Category.PARTITION, type: E_Position.VERTICAL_PARTITION, position: WardrobeUtils(size2).partitionVPositionFromBottomLeft({ width: 24, height: 84, depth: BoardThickness.EIGHTEEN_MM }, 36, 0, BoardThickness.EIGHTEEN_MM), size: { width: size2.depth - BoardThickness.SIX_MM, height: size2.height - (2 * BoardThickness.EIGHTEEN_MM), depth: BoardThickness.EIGHTEEN_MM } },
      { category: E_Category.PARTITION, type: E_Position.HORIZONTAL_PARTITION, position: WardrobeUtils(size2).partitionHPositionFromBottomLeft({ width: 24, height: 36, depth: BoardThickness.EIGHTEEN_MM }, 36, BoardThickness.EIGHTEEN_MM), size: { width: 24 - BoardThickness.SIX_MM, height: 36 - (2 * BoardThickness.EIGHTEEN_MM), depth: BoardThickness.EIGHTEEN_MM } },
      { category: E_Category.PARTITION, type: E_Position.HORIZONTAL_PARTITION, position: WardrobeUtils(size2).partitionHPositionFromBottomLeft({ width: 24, height: 36, depth: BoardThickness.EIGHTEEN_MM }, 26, BoardThickness.EIGHTEEN_MM), size: { width: 24 - BoardThickness.SIX_MM, height: 36 - (2 * BoardThickness.EIGHTEEN_MM), depth: BoardThickness.EIGHTEEN_MM } },
      { category: E_Category.PARTITION, type: E_Position.HORIZONTAL_PARTITION, position: WardrobeUtils(size2).partitionHPositionFromBottomLeft({ width: 24, height: 36, depth: BoardThickness.EIGHTEEN_MM }, 16, BoardThickness.EIGHTEEN_MM), size: { width: 24 - BoardThickness.SIX_MM, height: 36 - (2 * BoardThickness.EIGHTEEN_MM), depth: BoardThickness.EIGHTEEN_MM } },
      { category: E_Category.DRAWER, type: E_Position.DRAWER, position: WardrobeUtils(size2).partitionHPositionFromBottomLeft({ width: 24, height: 36 - BoardThickness.EIGHTEEN_MM, depth: 10 }, 36 - 5, BoardThickness.EIGHTEEN_MM), size: { width: 24 - BoardThickness.SIX_MM, height: 36 - (2 * BoardThickness.EIGHTEEN_MM), depth: 10 - (BoardThickness.EIGHTEEN_MM) } },
      { category: E_Category.DRAWER, type: E_Position.DRAWER, position: WardrobeUtils(size2).partitionHPositionFromBottomLeft({ width: 24, height: 36 - BoardThickness.EIGHTEEN_MM, depth: 10 }, 26 - 5, BoardThickness.EIGHTEEN_MM), size: { width: 24 - BoardThickness.SIX_MM, height: 36 - (2 * BoardThickness.EIGHTEEN_MM), depth: 10 - (BoardThickness.EIGHTEEN_MM) } },
    ]
  },
  {
    key: '72*84*24',
    title: '6*7',
    size: size3,
    wardrobeColor: '#ffc107',
    innerColor: '#cccccc',
    pieces: [
      ...getPieces(size3),
    ]
  },
  {
    key: '84*108*24',
    title: '7*9',
    size: { width: 84, height: 108, depth: 24 },
    wardrobeColor: '#ffc107',
    innerColor: '#cccccc'
  },
  {
    key: '120*120*24',
    title: '10*10',
    size: { width: 120, height: 120, depth: 24 },
    wardrobeColor: '#ffc107',
    innerColor: '#cccccc'
  },
];