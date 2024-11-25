/* eslint-disable jsx-a11y/anchor-is-valid */
import { useCallback, useMemo, useState } from "react";
import { CirclePicker } from "react-color";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { IWardrobeModel } from "models";
import { mockWardrobes } from "mockValues";
import { useAppDispatch } from "store/store";
import { WardrobeActions } from "store/slices";
import { WardrobeConstants } from "constants/WardrobeConstants";
import { E_Custom_Option } from "enums/E_Custom_Option";
import { UrlUtils } from "utils/urlUtils";

export interface ICustomOption {
  wardrobe?: IWardrobeModel;
  color?: string;
  wireframe?: boolean;
  showDoors?: boolean;
  showGridLine?: boolean;
  showAxes?: boolean;
}

export const CustomOption: React.FC<ICustomOption> = ({ wardrobe, color = '#3f51b5', showDoors = false, wireframe = false, showGridLine = false, showAxes = true }) => {
  const dispatch: any = useAppDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [initialWardrobe] = useState<IWardrobeModel | undefined>(wardrobe);
  const [initialShowDoors] = useState<boolean>(showDoors);
  const [initialWireframe] = useState<boolean>(wireframe);
  const [initialShowGridLine] = useState<boolean>(showGridLine);
  const [initialShowAxes] = useState<boolean>(showAxes);

  const customOptions = useMemo(() => Object.keys(E_Custom_Option), []);

  const getOptionText = useCallback((key: string) => {
    const type = E_Custom_Option[key as keyof typeof E_Custom_Option];
    switch (type) {
      case E_Custom_Option.WIREFRAME:
        return WardrobeConstants.TITLE.WIREFRAME;
      case E_Custom_Option.DOORS:
        return WardrobeConstants.TITLE.DOORS;
      case E_Custom_Option.GRID_LINE:
        return WardrobeConstants.TITLE.GRID_LINE;
      case E_Custom_Option.AXES:
        return WardrobeConstants.TITLE.AXES;
      case E_Custom_Option.RESET:
        return WardrobeConstants.TITLE.RESET;
      default:
        return '';
    }
  }, []);

  const handleColorChange = useCallback((color: any) => {
    dispatch(WardrobeActions.setWardrobeColor(color.hex));
  }, [dispatch]);

  const handleEntityChange = useCallback((e: any, key: string) => {
    e.preventDefault();

    navigate({
      pathname: UrlUtils.makeRouteWidthoutSearch(params.entity),
      search: `?${searchParams.toString()}`
    });
  }, [navigate]);

  const handleOptionChange = useCallback((e: any, key: string) => {
    const type = E_Custom_Option[key as keyof typeof E_Custom_Option];
    e.preventDefault();

    searchParams.set('q', key);
    navigate({
      pathname: UrlUtils.makeRouteWidthoutSearch(params.entity),
      search: `?${searchParams.toString()}`
    });
    switch (type) {
      case E_Custom_Option.WIREFRAME:
        dispatch(WardrobeActions.toggleWireframe());
        break;
      case E_Custom_Option.DOORS:
        dispatch(WardrobeActions.toggleDoors());
        break;
      case E_Custom_Option.GRID_LINE:
        dispatch(WardrobeActions.toggleGridLine());
        break;
      case E_Custom_Option.AXES:
        dispatch(WardrobeActions.toggleAxes());
        break;
      case E_Custom_Option.RESET:
        dispatch(WardrobeActions.setCurrentWardrobe(initialWardrobe));
        dispatch(WardrobeActions.toggleWireframe(initialWireframe));
        dispatch(WardrobeActions.toggleDoors(initialShowDoors));
        dispatch(WardrobeActions.toggleGridLine(initialShowGridLine));
        dispatch(WardrobeActions.toggleAxes(initialShowAxes));
        break;
      default:
        return '';
    }
  }, [dispatch, initialShowAxes, initialShowDoors, initialShowGridLine, initialWardrobe, initialWireframe]);

  customOptions.map((item: string) => console.log('item => ', item));

  return <div className="custom-option">
    <div className="inner-box">
      <h3 className="title">{WardrobeConstants.TITLE.COLOR_PICKER}</h3>
      <CirclePicker color={color} onChange={handleColorChange} />
      <h3 className="title">{WardrobeConstants.TITLE.SIZE_PICKER}</h3>
      <div className="wardrobe-size">
        <ul className="sizes">
          {
            mockWardrobes.map(item => <li key={item.key}>
              <Link onClick={(e) => handleEntityChange(e, item.key)} to={''} className={params.entity === item.key ? 'active' : ''}>{`${item.size.width / 12} * ${item.size.height / 12} Feet`}</Link>
            </li>)
          }
        </ul>
      </div>
      <h3 className="title">{WardrobeConstants.TITLE.OTHER_OPTION}</h3>
      <div className="other">
        <ul className="sizes">
          {
            customOptions.map((item: string) => <li key={item}>
              <Link onClick={(e) => handleOptionChange(e, item)} to={''}>{getOptionText(item)}</Link>
            </li>)
          }
        </ul>
      </div>
    </div>
  </div>
}