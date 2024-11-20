import { E_Category, E_Position } from "enums";
import { IWardrobeModel } from "models";
import { BoardThickness } from "constants/BoardSize";

export const mockWardrobes: IWardrobeModel[] = [
  {
    key: '36*84*24',
    title: '3*7',
    size: { width: 36, height: 84, depth: 24 },
    wardrobeColor: '#ffc107',
    innerColor: '#cccccc',
    pieces: [
      { category: E_Category.BOARD, type: E_Position.BACK, position: { x: 0, y: 0, z: 0 }, size: { width: 36, height: 84, depth: BoardThickness.EIGHTEEN_MM } },
      { category: E_Category.BOARD, type: E_Position.LEFT, position: { x: -(36 / 2) + (BoardThickness.EIGHTEEN_MM / 2), y: 0, z: 24 / 2 }, size: { width: 24 - BoardThickness.SIX_MM, height: 84, depth: BoardThickness.EIGHTEEN_MM } },
      { category: E_Category.BOARD, type: E_Position.RIGHT, position: { x: (36 / 2) - (BoardThickness.EIGHTEEN_MM / 2), y: 0, z: 24 / 2 }, size: { width: 24 - BoardThickness.SIX_MM, height: 84, depth: BoardThickness.EIGHTEEN_MM } },
      { category: E_Category.BOARD, type: E_Position.TOP, position: { x: 0, y: (84 / 2) - (BoardThickness.EIGHTEEN_MM / 2), z: 24 / 2 }, size: { width: 24 - BoardThickness.SIX_MM, height: 36 - (2 * BoardThickness.EIGHTEEN_MM), depth: BoardThickness.EIGHTEEN_MM } },
      { category: E_Category.BOARD, type: E_Position.BOTTOM, position: { x: 0, y: -(84 / 2) + (BoardThickness.EIGHTEEN_MM / 2), z: 24 / 2 }, size: { width: 24 - BoardThickness.SIX_MM, height: 36 - (2 * BoardThickness.EIGHTEEN_MM), depth: BoardThickness.EIGHTEEN_MM } },
      { category: E_Category.PARTITION, type: E_Position.PARTITION_H, position: { x: 0, y: -12, z: 24 / 2 }, size: { width: 24, height: 36 - (2 * BoardThickness.EIGHTEEN_MM), depth: BoardThickness.EIGHTEEN_MM } },
      { category: E_Category.PARTITION, type: E_Position.PARTITION_H, position: { x: 0, y: -22, z: 24 / 2 }, size: { width: 24, height: 36 - (2 * BoardThickness.EIGHTEEN_MM), depth: BoardThickness.EIGHTEEN_MM } },
      { category: E_Category.PARTITION, type: E_Position.PARTITION_H, position: { x: 0, y: -32, z: 24 / 2 }, size: { width: 24, height: 36 - (2 * BoardThickness.EIGHTEEN_MM), depth: BoardThickness.EIGHTEEN_MM } },
      { category: E_Category.DRAWER, type: E_Position.DRAWER, position: { x: 0, y: -22 + (10 / 2), z: 24 / 2 }, size: { width: 24, height: 36 - (2 * BoardThickness.EIGHTEEN_MM), depth: 10 - (BoardThickness.EIGHTEEN_MM) } },
      { category: E_Category.DRAWER, type: E_Position.DRAWER, position: { x: 0, y: -32 + (10 / 2), z: 24 / 2 }, size: { width: 24, height: 36 - (2 * BoardThickness.EIGHTEEN_MM), depth: 10 - (BoardThickness.EIGHTEEN_MM) } },
      { category: E_Category.HANGER_ROAD, type: E_Position.HANGER_ROAD, position: { x: 0, y: (84 / 2) - (BoardThickness.EIGHTEEN_MM / 2) - 3, z: 24 / 2 }, size: { width: BoardThickness.HANGER_ROAD, height: BoardThickness.HANGER_ROAD, depth: 36 - (2 * BoardThickness.EIGHTEEN_MM) }, frontColor: 'black' },
    ]
  },
  { key: '48*84*24', title: '4*7', size: { width: 48, height: 84, depth: 24 }, wardrobeColor: '#ffc107', innerColor: '#cccccc' },
  { key: '72*84*24', title: '6*7', size: { width: 72, height: 84, depth: 24 }, wardrobeColor: '#ffc107', innerColor: '#cccccc' },
  { key: '84*108*24', title: '7*9', size: { width: 84, height: 108, depth: 24 }, wardrobeColor: '#ffc107', innerColor: '#cccccc' },
  { key: '120*120*24', title: '10*10', size: { width: 120, height: 120, depth: 24 }, wardrobeColor: '#ffc107', innerColor: '#cccccc' },
];