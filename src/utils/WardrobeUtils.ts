import { BoardThickness } from "constant/BoardSize";
import { E_Category, E_Position } from "enums";
import { defaultWardrobeCustomAttributes, IPosition, ISize, IWardrobeCustomAttributes, IWardrobeModel, IWardrobePiecesModel } from "models";
import { ConvertUtils } from "./ConvertUtils";
import { E_Unit } from "enums/E_Unit";

export function generateWardrobe(tmpSize: ISize): IWardrobeModel {
  const wardrobe: IWardrobeModel = {
    key: `${tmpSize.width}*${tmpSize.height}*${tmpSize.depth}`,
    title: `Wardrobe ${ConvertUtils().toFeetFromInch(tmpSize.width)}*${ConvertUtils().toFeetFromInch(tmpSize.height)}`,
    size: { ...tmpSize },
    wardrobeColor: '#3f51b5',
    innerColor: '#cccccc',
  };

  return {
    ...wardrobe,
    pieces: [
      { ...WardrobeUtils(wardrobe).getPosition(E_Category.BOARD, E_Position.BACK, tmpSize), key: "back" },
      { ...WardrobeUtils(wardrobe).getPosition(E_Category.BOARD, E_Position.LEFT, tmpSize), key: "left" },
      { ...WardrobeUtils(wardrobe).getPosition(E_Category.BOARD, E_Position.RIGHT, tmpSize), key: "right" },
      { ...WardrobeUtils(wardrobe).getPosition(E_Category.BOARD, E_Position.TOP, tmpSize), key: "top" },
      { ...WardrobeUtils(wardrobe).getPosition(E_Category.BOARD, E_Position.BOTTOM, tmpSize), key: "bottom" },
    ] as IWardrobePiecesModel[],
  };
}

export const WardrobeUtils = (wardrobe: IWardrobeModel) => {
  const size: ISize = wardrobe.size;
  let intialPosition: IPosition = { x: 0, y: 0, z: 0 };

  function getPosition(type: E_Position, boardSize: ISize | undefined = { width: 0, height: 0, depth: 0 }, positionAttr: IWardrobeCustomAttributes) {
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
        return {
          x: intialPosition.x + (boardSize.height / 2 + BoardThickness.EIGHTEEN_MM) + (positionAttr.fromLeft ? positionAttr.fromLeft!! - BoardThickness.EIGHTEEN_MM / 2 : 0),
          y: intialPosition.y + positionAttr.fromBottom!!,
          z: intialPosition.z
        } as IPosition;
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

  function getHorizontalHeight(boxWidth: number, partitionWidth?: number) {
    if (partitionWidth) {
      if (partitionWidth >= boxWidth) return boxWidth - (2 * BoardThickness.EIGHTEEN_MM);
      else return partitionWidth - BoardThickness.EIGHTEEN_MM - (BoardThickness.EIGHTEEN_MM / 2);
    } else return boxWidth - (2 * BoardThickness.EIGHTEEN_MM);
  }

  function getSize(type: E_Position, positionAttr: IWardrobeCustomAttributes) {
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
        return {
          width: size.depth - BoardThickness.SIX_MM,
          height: getHorizontalHeight(size.width, positionAttr.width),
          depth: BoardThickness.EIGHTEEN_MM
        } as ISize;
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
    getPosition: (category: E_Category, type: E_Position, size: ISize, positionAttr?: IWardrobeCustomAttributes) => {
      const attr: IWardrobeCustomAttributes = positionAttr || defaultWardrobeCustomAttributes;
      intialPosition = { x: -size.width / 2, y: -size.height / 2, z: size.depth / 2 };

      return { category, type, position: getPosition(type, getSize(type, attr), attr), size: getSize(type, attr) } as IWardrobePiecesModel;
    },
    export: () => {
      const exportWardrobe: IWardrobeModel = { ...wardrobe };

      exportWardrobe.size = ConvertUtils().convertSize(wardrobe.size, 'METER', E_Unit.INCH);

      exportWardrobe.pieces?.map(piece => ({
        ...piece,
        position: ConvertUtils().convertPosition(piece.position, 'METER', E_Unit.INCH),
        size: ConvertUtils().convertSize(piece.size, 'METER', E_Unit.INCH),
      }));

      return exportWardrobe;
    }
  }
}