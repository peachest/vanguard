import SvgIcon      from "@mui/material/SvgIcon";
import {FC, JSX}    from "react";
import {Selectable} from "src/components/molecules/selectable-item";

export interface SelectableSVGIconProps {
    svgIcon: typeof SvgIcon;
}

export const SelectableSvgIconHoc = ({svgIcon: Icon}: SelectableSVGIconProps): FC<Selectable> =>
    ({selected}): JSX.Element => {
        const color = !selected ? "action" : void 0 ;
        return (
            <Icon color={color}/>
        ) ;
    } ;
