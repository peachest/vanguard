import {SelectablePoppingHoc} from "src/components/organisms/visual-tool-bar/utils/selectable-popping.hoc";
import {JSX}                  from "react";
import FormatLineSpacingIcon  from "@mui/icons-material/FormatLineSpacing";
import {SelectableHoc}        from "src/components/organisms/visual-tool-bar/utils/selectable.hoc";

export enum LineSpacing {
    HALF        = "0.5",
    SINGLE      = "1",
    SINGLE_HALF = "1.5",
    DOUBLE      = "2",
}

export const lineSpacingItems = [
    {
        key      : LineSpacing.HALF,
        component: SelectableHoc(LineSpacing.HALF),
    },
    {
        key      : LineSpacing.SINGLE,
        component: SelectableHoc(LineSpacing.SINGLE),
    },
    {
        key      : LineSpacing.SINGLE_HALF,
        component: SelectableHoc(LineSpacing.SINGLE_HALF),
    },
    {
        key      : LineSpacing.DOUBLE,
        component: SelectableHoc(LineSpacing.DOUBLE),
    },
] ;

export const LineSpacingSelect = SelectablePoppingHoc(
    {
        selectItems     : lineSpacingItems,
        buttonNode      : (selected): JSX.Element => (
            <>
                <FormatLineSpacingIcon/>
            </>
        ),
        buttonValue     : "LineSpacing",
        tooltipTitle    : "行高",
        tooltipPlacement: "bottom",
    }) ;
