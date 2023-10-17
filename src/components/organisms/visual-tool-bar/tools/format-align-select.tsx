import {SelectablePoppingHoc} from "src/components/organisms/visual-tool-bar/utils/selectable-popping.hoc";
import FormatAlignCenterIcon  from "@mui/icons-material/FormatAlignCenter";
import FormatAlignLeftIcon    from "@mui/icons-material/FormatAlignLeft";
import {SelectableSvgIconHoc} from "src/components/organisms/visual-tool-bar/utils/selectable-svg-icon.hoc";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import FormatAlignRightIcon   from "@mui/icons-material/FormatAlignRight";
import {JSX}                  from "react";

export enum FormatAlign {
    LEFT    = "left",
    CENTER  = "center",
    RIGHT   = "right",
    JUSTIFY = "justify",
}

export const formatAlignItems = [
    {
        key      : FormatAlign.LEFT,
        component: SelectableSvgIconHoc({svgIcon: FormatAlignLeftIcon}),
    },
    {
        key      : FormatAlign.CENTER,
        component: SelectableSvgIconHoc({svgIcon: FormatAlignCenterIcon}),
    },
    {
        key      : FormatAlign.RIGHT,
        component: SelectableSvgIconHoc({svgIcon: FormatAlignRightIcon}),
    },
    {
        key      : FormatAlign.JUSTIFY,
        component: SelectableSvgIconHoc({svgIcon: FormatAlignJustifyIcon}),
    },
] ;

export const FormatAlignSelect = SelectablePoppingHoc(
    {
        selectItems     : formatAlignItems,
        buttonNode      : (selected): JSX.Element => (
            <>
                <FormatAlignCenterIcon/>
            </>
        ),
        buttonValue     : "FormatAlign",
        tooltipTitle    : "文本对齐",
        tooltipPlacement: "bottom",
    }) ;
