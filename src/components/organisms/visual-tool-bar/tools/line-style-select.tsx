import {SelectableSvgIconHoc} from "src/components/organisms/visual-tool-bar/utils/selectable-svg-icon.hoc";
import {SolidLineIcon}        from "src/components/atoms/icons/line-style/solid-line";
import {DashLineIcon}         from "src/components/atoms/icons/line-style/dash-line";
import {DottedLineIcon}       from "src/components/atoms/icons/line-style/dotted-line";
import {DashDottedLineIcon}   from "src/components/atoms/icons/line-style/dash-dotted-line";
import {SelectablePoppingHoc} from "src/components/organisms/visual-tool-bar/utils/selectable-popping.hoc";
import LineStyleIcon          from "@mui/icons-material/LineStyle";
import {JSX}                  from "react";

export enum LineStyle {
    SOLID_LINE       = "SolidLine",
    DASH_LINE        = "DashLine",
    DOTTED_LINE      = "DottedLine",
    DASH_DOTTED_LINE = "DashDottedLine"
}

export const lineStyleItems = [
    {
        key      : LineStyle.SOLID_LINE,
        component: SelectableSvgIconHoc({svgIcon: SolidLineIcon}),
    },
    {
        key      : LineStyle.DASH_LINE,
        component: SelectableSvgIconHoc({svgIcon: DashLineIcon}),
    },
    {
        key      : LineStyle.DOTTED_LINE,
        component: SelectableSvgIconHoc({svgIcon: DottedLineIcon}),
    },
    {
        key      : LineStyle.DASH_DOTTED_LINE,
        component: SelectableSvgIconHoc({svgIcon: DashDottedLineIcon}),
    },
] ;

export const LineStyleSelect = SelectablePoppingHoc(
    {
        selectItems     : lineStyleItems,
        buttonNode      : (selected): JSX.Element => (
            <>
                <LineStyleIcon/>
            </>
        ),
        buttonValue     : "LineStyle",
        tooltipTitle    : "连线样式",
        tooltipPlacement: "bottom",
    }) ;
