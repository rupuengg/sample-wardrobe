import { IPosition, ISize } from "models";

export const WardrobeUtils = (size: ISize) => {
  return {
    leftFramePosition: (boardThickness: number) => {
      return { x: -(size.width / 2) + (boardThickness / 2), y: 0, z: size.depth / 2 } as IPosition;
    },
    rightFramePosition: (boardThickness: number) => {
      return { x: (size.width / 2) - (boardThickness / 2), y: 0, z: size.depth / 2 } as IPosition;
    },
    topFramePosition: (boardThickness: number) => {
      return { x: 0, y: (size.height / 2) - (boardThickness / 2), z: size.depth / 2 } as IPosition;
    },
    bottomFramePosition: (boardThickness: number) => {
      return { x: 0, y: -(size.height / 2) + (boardThickness / 2), z: size.depth / 2 } as IPosition;
    },
    partitionFromTopPosition: (fromTop: number, boardThickness: number) => {
      return { x: 0, y: (size.height / 2) - (boardThickness / 2) + fromTop, z: size.depth / 2 } as IPosition;
    },
    partitionFromLeftPosition: (fromLeft: number, boardThickness: number) => {
      return { x: -(size.width / 2) + (boardThickness / 2) + fromLeft, y: 0, z: size.depth / 2 } as IPosition;
    },
    drawerFromTopPosition: (fromTop: number, drawerHeight: number, boardThickness: number) => {
      return { x: 0, y: (size.height / 2) - (boardThickness / 2) + fromTop - (drawerHeight / 2), z: size.depth / 2 } as IPosition;
    },
    hangerRoadFromTopPosition: (fromTop: number, boardThickness: number) => {
      return { x: 0, y: (size.height / 2) - (boardThickness / 2) + fromTop, z: size.depth / 2 } as IPosition;
    },
    leftDoorPosition: (boardThickness: number, doorGap: number) => {
      return { x: -(size.width / 4) - doorGap / 2, y: 0, z: size.depth + boardThickness } as IPosition;
    },
    rightDoorPosition: (boardThickness: number, doorGap: number) => {
      return { x: (size.width / 4) + doorGap / 2, y: 0, z: size.depth + boardThickness } as IPosition;
    },
    partitionVPositionFromBottomLeft: (partitionSize: ISize, fromLeft: number, fromTop: number, boardThickness: number) => {
      return {
        x: -(size.width / 2) - (boardThickness / 2) + (partitionSize.depth / 2) + fromLeft,
        y: -(size.height / 2) + (partitionSize.height / 2) + fromTop,
        z: size.depth / 2
      } as IPosition;
    },
    partitionHPositionFromBottomLeft: (partitionSize: ISize, fromTop: number, boardThickness: number) => {
      console.log('size,partitionSize', size, partitionSize);
      return {
        x: 0,//-(size.width / 2) + (boardThickness / 2) + (partitionSize.height / 2) + (size.width - partitionSize.height / 2),
        y: 0,//-(size.height / 2) - + (boardThickness / 2) + fromTop,
        z: 0,//size.depth / 2
      } as IPosition;
    },
  }
}