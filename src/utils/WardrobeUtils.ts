import { BoardThickness } from "constants/BoardSize";
import { E_Category, E_Position } from "enums";
import { IPosition, ISize, IWardrobePiecesModel } from "models";

interface IGetPosition {
  fromLeft?: number;
  fromBottom?: number;
  width?: number;
  height?: number;
  drawerHeight?: number;
  numberOfGate?: number;
  gateNumber?: number;
}

const defaultGetPosition: IGetPosition = {
  fromLeft: 0,
  fromBottom: 0,
  width: 0,
  height: 0,
  drawerHeight: 0,
  numberOfGate: 0,
  gateNumber: 0,
}

export const WardrobeUtils = (size: ISize) => {
  let intialPosition: IPosition = { x: 0, y: 0, z: 0 };

  function getPosition(type: E_Position, boardSize: ISize | undefined = { width: 0, height: 0, depth: 0 }, positionAttr: IGetPosition) {
    switch (type) {
      case E_Position.BACK:
        return { x: 0, y: 0, z: 0 } as IPosition;
      case E_Position.LEFT:
        return { x: intialPosition.x + (BoardThickness.EIGHTEEN_MM / 2), y: intialPosition.y + boardSize.height / 2, z: intialPosition.z } as IPosition;
      case E_Position.RIGHT:
        return { x: intialPosition.x - (BoardThickness.EIGHTEEN_MM / 2) + size.width, y: intialPosition.y + boardSize.height / 2, z: intialPosition.z } as IPosition;
      case E_Position.TOP:
        return { x: intialPosition.x + (size.width / 2), y: intialPosition.y + size.height - (BoardThickness.EIGHTEEN_MM / 2), z: intialPosition.z } as IPosition;
      case E_Position.BOTTOM:
        return { x: intialPosition.x + (size.width / 2), y: intialPosition.y + (BoardThickness.EIGHTEEN_MM / 2), z: intialPosition.z } as IPosition;
      case E_Position.HORIZONTAL_PARTITION:
        return { x: intialPosition.x + (positionAttr.width ? (positionAttr.width / 2) + (BoardThickness.EIGHTEEN_MM / 4) : size.width / 2) + (positionAttr.fromLeft ? positionAttr.fromLeft!! - BoardThickness.EIGHTEEN_MM / 2 : 0), y: intialPosition.y + positionAttr.fromBottom!!, z: intialPosition.z } as IPosition;
      case E_Position.VERTICAL_PARTITION:
        return { x: intialPosition.x + positionAttr.fromLeft!!, y: intialPosition.y + (positionAttr.height ? (positionAttr.height / 2) + (BoardThickness.EIGHTEEN_MM / 4) : (size.height / 2)), z: intialPosition.z } as IPosition;
      case E_Position.DRAWER:
        return { x: intialPosition.x + (positionAttr.width ? (positionAttr.width / 2) + (BoardThickness.EIGHTEEN_MM / 4) : size.width / 2) + (positionAttr.fromLeft ? positionAttr.fromLeft!! - BoardThickness.EIGHTEEN_MM / 2 : 0), y: intialPosition.y + positionAttr.fromBottom!! - positionAttr.drawerHeight!! / 2, z: intialPosition.z } as IPosition;
      case E_Position.HANGER_ROAD:
        return { x: intialPosition.x + (positionAttr.width ? (positionAttr.width / 2) + (BoardThickness.EIGHTEEN_MM / 4) : size.width / 2) + (positionAttr.fromLeft ? positionAttr.fromLeft!! - BoardThickness.EIGHTEEN_MM / 2 : 0), y: intialPosition.y + positionAttr.fromBottom!!, z: intialPosition.z } as IPosition;
      case E_Position.DOOR:
        return { x: intialPosition.x + (boardSize.width / 2) + ((positionAttr.numberOfGate!! - positionAttr.gateNumber!!) * boardSize.width) + (positionAttr.numberOfGate!! > positionAttr.gateNumber!! ? BoardThickness.DOORS_GAP : 0), y: intialPosition.y + boardSize.height / 2, z: size.depth + BoardThickness.SIX_MM } as IPosition;
    }
  }

  function getSize(type: E_Position, positionAttr: IGetPosition) {
    switch (type) {
      case E_Position.BACK:
        return { width: size.width, height: size.height, depth: BoardThickness.SIX_MM } as ISize;
      case E_Position.LEFT:
        return { width: size.depth - BoardThickness.SIX_MM, height: size.height, depth: BoardThickness.EIGHTEEN_MM } as ISize;
      case E_Position.RIGHT:
        return { width: size.depth - BoardThickness.SIX_MM, height: size.height, depth: BoardThickness.EIGHTEEN_MM } as ISize;
      case E_Position.TOP:
        return { width: size.depth - BoardThickness.SIX_MM, height: size.width - (2 * BoardThickness.EIGHTEEN_MM), depth: BoardThickness.EIGHTEEN_MM } as ISize;
      case E_Position.BOTTOM:
        return { width: size.depth - BoardThickness.SIX_MM, height: size.width - (2 * BoardThickness.EIGHTEEN_MM), depth: BoardThickness.EIGHTEEN_MM } as ISize;
      case E_Position.HORIZONTAL_PARTITION:
        return { width: size.depth - BoardThickness.SIX_MM, height: (positionAttr.width ? positionAttr.width - (BoardThickness.EIGHTEEN_MM / 2) : size.width - BoardThickness.EIGHTEEN_MM) - BoardThickness.EIGHTEEN_MM, depth: BoardThickness.EIGHTEEN_MM } as ISize;
      case E_Position.VERTICAL_PARTITION:
        return { width: size.depth - BoardThickness.SIX_MM, height: (positionAttr.height ? positionAttr.height!! : size.height) - (2 * BoardThickness.EIGHTEEN_MM), depth: BoardThickness.EIGHTEEN_MM } as ISize;
      case E_Position.DRAWER:
        return { width: size.depth - BoardThickness.SIX_MM, height: (positionAttr.width ? positionAttr.width - (BoardThickness.EIGHTEEN_MM / 2) : size.width - BoardThickness.EIGHTEEN_MM) - BoardThickness.EIGHTEEN_MM, depth: positionAttr.drawerHeight!! - BoardThickness.EIGHTEEN_MM } as ISize;
      case E_Position.HANGER_ROAD:
        return { width: BoardThickness.HANGER_ROAD, height: BoardThickness.HANGER_ROAD, depth: (positionAttr.width ? positionAttr.width - (BoardThickness.EIGHTEEN_MM / 2) : size.width - BoardThickness.EIGHTEEN_MM) - BoardThickness.EIGHTEEN_MM } as ISize;
      case E_Position.DOOR:
        return { width: (size.width / positionAttr.numberOfGate!!) - (BoardThickness.DOORS_GAP / 2), height: size.height, depth: BoardThickness.EIGHTEEN_MM } as ISize;
    }
  }

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
        x: -(size.width / 2) - (boardThickness / 2) + (partitionSize.depth / 2) + (fromLeft - boardThickness),
        y: -(size.height / 2) + (partitionSize.height / 2) + fromTop,
        z: size.depth / 2
      } as IPosition;
    },
    partitionHPositionFromBottomLeft: (partitionSize: ISize, fromBottom: number, boardThickness: number) => {
      return {
        x: -(size.width / 2) + (partitionSize.height / 2),// + (boardThickness / 2),// + (size.width - partitionSize.height),// + (boardThickness / 2) + (size.width - partitionSize.height / 2),
        y: -(size.height / 2) - (boardThickness / 2) + fromBottom,
        z: size.depth / 2
      } as IPosition;
    },
    leftXPosition: (partitionSize: ISize, fromBottom: number, drawerDepth?: number, hangerWidth?: number) => {
      return {
        x: -(size.width / 2) + (partitionSize.height / 2) + (hangerWidth ? ((hangerWidth / 2)) : 0),
        y: -(size.height / 2) + (BoardThickness.EIGHTEEN_MM / 2) + fromBottom - (drawerDepth ? ((drawerDepth / 2)) : 0),
        z: size.depth / 2,
      } as IPosition;
    },
    leftYPosition: (partitionSize: ISize, fromLeft: number) => {
      return {
        x: -(size.width / 2) - (BoardThickness.EIGHTEEN_MM / 2) + fromLeft,
        y: -(size.height / 2) + (partitionSize.height / 2),
        z: size.depth / 2
      } as IPosition;
    },
    doorPosition: (numberOfDoors: number, gateNumber: number, doorGap: number) => {
      const doorWidth = size.width / numberOfDoors;
      return {
        x: -(size.width / 2) - doorGap / 2 + (doorWidth / 2) + ((gateNumber - 1) * doorWidth),
        y: 0,
        z: size.depth + BoardThickness.SIX_MM
      } as IPosition;
    },
    getPosition: (category: E_Category, type: E_Position, size: ISize, positionAttr?: IGetPosition) => {
      const attr: IGetPosition = positionAttr || defaultGetPosition;
      intialPosition = { x: -size.width / 2, y: -size.height / 2, z: size.depth / 2 };
      console.log('type, size', type, size, intialPosition, getPosition(type, getSize(type, attr), attr), getSize(type, attr));

      return { category, type, position: getPosition(type, getSize(type, attr), attr), size: getSize(type, attr) } as IWardrobePiecesModel;
    }
  }
}