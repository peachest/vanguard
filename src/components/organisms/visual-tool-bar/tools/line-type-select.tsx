import {PolylineIcon}         from "src/components/atoms/icons/line-type/poly-line";
import {StraightIcon}         from "src/components/atoms/icons/line-type/straight-line";
import {SelectableSvgIconHoc} from "src/components/organisms/visual-tool-bar/utils/selectable-svg-icon.hoc";
import {BezierIcon}           from "src/components/atoms/icons/line-type/bezier";
import {SelectablePoppingHoc} from "src/components/organisms/visual-tool-bar/utils/selectable-popping.hoc";
import LineWeightIcon         from "@mui/icons-material/LineWeight";
import {JSX}                  from "react";

export enum LineType {
    STRAIGHT = "straight",
    POLYLINE = "polyline",
    BEZIER   = "bezier",
}

export const lineTypeItems = [
    {
        key      : LineType.STRAIGHT,
        component: SelectableSvgIconHoc({svgIcon: StraightIcon}),
    },
    {
        key      : LineType.POLYLINE,
        component: SelectableSvgIconHoc({svgIcon: PolylineIcon}),
    },
    {
        key      : LineType.BEZIER,
        component: SelectableSvgIconHoc({svgIcon: BezierIcon}),
    },
] ;

export const LineTypeSelect = SelectablePoppingHoc(
    {
        selectItems     : lineTypeItems,
        buttonNode      : (selected): JSX.Element => (
            <>
                <LineWeightIcon/>
            </>
        ),
        buttonValue     : "LineType",
        tooltipTitle    : "连线宽度",
        tooltipPlacement: "bottom",
    }) ;
