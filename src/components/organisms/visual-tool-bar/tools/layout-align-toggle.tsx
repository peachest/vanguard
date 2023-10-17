import {SelectableSvgIconHoc}         from "src/components/organisms/visual-tool-bar/utils/selectable-svg-icon.hoc";
import AlignVerticalTopIcon           from "@mui/icons-material/AlignVerticalTop";
import AlignVerticalBottomIcon        from "@mui/icons-material/AlignVerticalBottom";
import AlignVerticalCenterIcon        from "@mui/icons-material/AlignVerticalCenter";
import AlignHorizontalRightIcon       from "@mui/icons-material/AlignHorizontalRight";
import AlignHorizontalLeftIcon        from "@mui/icons-material/AlignHorizontalLeft";
import AlignHorizontalCenterIcon      from "@mui/icons-material/AlignHorizontalCenter";
import {ToggleItem, TogglePoppingHoc} from "src/components/organisms/visual-tool-bar/utils/toggle-popping.hoc";

export enum HorizontalLayoutAlign {
    LEFT   = "horizontal left",
    CENTER = "horizontal center",
    RIGHT  = "horizontal right",
}

export enum VerticalLayoutAlign {
    TOP    = "vertical top",
    CENTER = "vertical center",
    Bottom = "vertical bottom",
}

export const layoutAlignItems: ToggleItem<HorizontalLayoutAlign | VerticalLayoutAlign>[][] = [
    [
        {
            key      : HorizontalLayoutAlign.LEFT,
            component: SelectableSvgIconHoc({svgIcon: AlignHorizontalLeftIcon}),
        },
        {
            key      : HorizontalLayoutAlign.CENTER,
            component: SelectableSvgIconHoc({svgIcon: AlignHorizontalCenterIcon}),
        },
        {
            key      : HorizontalLayoutAlign.RIGHT,
            component: SelectableSvgIconHoc({svgIcon: AlignHorizontalRightIcon}),
        },
    ],
    [
        {
            key      : VerticalLayoutAlign.TOP,
            component: SelectableSvgIconHoc({svgIcon: AlignVerticalTopIcon}),
        },
        {
            key      : VerticalLayoutAlign.CENTER,
            component: SelectableSvgIconHoc({svgIcon: AlignVerticalCenterIcon}),
        },
        {
            key      : VerticalLayoutAlign.Bottom,
            component: SelectableSvgIconHoc({svgIcon: AlignVerticalBottomIcon}),
        },
    ],
] ;

export const LayoutAlignToggle = TogglePoppingHoc(
    {
        selectItemGroups: layoutAlignItems,
        buttonNode      : <AlignHorizontalLeftIcon/>,
        buttonValue     : "LayoutAlign",
        tooltipTitle    : "分布对齐",
        tooltipPlacement: "bottom",
    }) ;
