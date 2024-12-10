/* eslint-disable jsx-a11y/anchor-is-valid */
import { useCallback, useMemo } from "react";
import { CirclePicker } from "react-color";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { mockWardrobes } from "mockValues";
import { useAppDispatch } from "store/store";
import { WardrobeActions } from "store/slices";
import { WardrobeConstants } from "constants/WardrobeConstants";
import { E_Custom_Option } from "enums/E_Custom_Option";
import { UrlUtils } from "utils/urlUtils";

export interface ICustomOption {
  color?: string;
}

export const CustomOption: React.FC<ICustomOption> = ({ color = '#3f51b5' }) => {
  const dispatch: any = useAppDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const customOptions = useMemo(() => Object.keys(E_Custom_Option), []);

  const getOptionText = useCallback((key: string) => {
    const type = E_Custom_Option[key as keyof typeof E_Custom_Option];
    switch (type) {
      case E_Custom_Option.WIREFRAME:
        return WardrobeConstants.OPTION_TITLE.WIREFRAME;
      case E_Custom_Option.DOORS:
        return WardrobeConstants.OPTION_TITLE.DOORS;
      case E_Custom_Option.GRID_LINE:
        return WardrobeConstants.OPTION_TITLE.GRID_LINE;
      case E_Custom_Option.AXES:
        return WardrobeConstants.OPTION_TITLE.AXES;
      case E_Custom_Option.DETAIL:
        return WardrobeConstants.OPTION_TITLE.DETAIL;
      case E_Custom_Option.RESET:
        return WardrobeConstants.OPTION_TITLE.RESET;
      default:
        return '';
    }
  }, []);

  const handleColorChange = useCallback((color: any) => {
    dispatch(WardrobeActions.setWardrobeColor(color.hex));
  }, [dispatch]);

  const handleEntityChange = useCallback((e: any, key: string) => {
    e.preventDefault();
    navigate(UrlUtils.makeRoute(key, undefined));
  }, [navigate]);

  const handleOptionChange = useCallback((e: any, key: string) => {
    e.preventDefault();
    const type = E_Custom_Option[key as keyof typeof E_Custom_Option];
    switch (type) {
      case E_Custom_Option.WIREFRAME:
      case E_Custom_Option.DOORS:
      case E_Custom_Option.GRID_LINE:
      case E_Custom_Option.AXES:
      case E_Custom_Option.DETAIL:
        if (searchParams.get(key)) searchParams.delete(key);
        else searchParams.set(key, 'true');
        break;
      case E_Custom_Option.RESET:
        searchParams.delete('WIREFRAME');
        searchParams.delete('DOORS');
        searchParams.delete('GRID_LINE');
        searchParams.delete('AXES');
        break;
      default:
        return '';
    }

    navigate({
      pathname: UrlUtils.makeRouteWidthoutSearch(params.entity, undefined),
      search: `?${searchParams.toString()}`
    });
  }, [navigate, params.entity, searchParams]);

  return <div className="custom-option">
    <div className="inner-box">
      <h3 className="title">{WardrobeConstants.OPTION_TITLE.COLOR_PICKER}</h3>
      <CirclePicker color={color} onChange={handleColorChange} />
      <h3 className="title">{WardrobeConstants.OPTION_TITLE.SIZE_PICKER}</h3>
      <div className="wardrobe-size">
        <ul className="sizes">
          {
            mockWardrobes.map(item => <li key={item.key}>
              <Link onClick={(e) => handleEntityChange(e, item.key)} to={''} className={params.entity === item.key ? 'active' : ''}>{`${item.size!!.width / 12} * ${item.size!!.height / 12} Feet`}</Link>
            </li>)
          }
          <li><Link to={UrlUtils.makeRoute('custom', undefined)} className={params.entity === 'custom' ? 'active' : ''}>{WardrobeConstants.OPTION_TITLE.CUSTOM}</Link></li>
        </ul>
      </div>
      <h3 className="title">{WardrobeConstants.OPTION_TITLE.OTHER_OPTION}</h3>
      <div className="other">
        <ul className="sizes">
          {
            customOptions.map((item: string) => <li key={item}>
              <Link onClick={(e) => handleOptionChange(e, item)} to={''} className={Boolean(searchParams.get(item)?.toString()) ? 'active' : ''}>{getOptionText(item)}</Link>
            </li>)
          }
        </ul>
      </div>
    </div>
  </div>
}