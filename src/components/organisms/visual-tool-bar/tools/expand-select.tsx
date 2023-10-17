import {ExpandWidthIcon}      from "src/components/atoms/icons/layout/expand-width";
import {ExpandHeightIcon}     from "src/components/atoms/icons/layout/expand-height";
import {ExpandBothIcon}       from "src/components/atoms/icons/layout/expand-both";
import {SelectableSvgIconHoc} from "src/components/organisms/visual-tool-bar/utils/selectable-svg-icon.hoc";
import {TogglePoppingHoc}     from "src/components/organisms/visual-tool-bar/utils/toggle-popping.hoc";

export enum Expand {
    WIDTH  = "width",
    HEIGHT = "height",
    BOTH   = "both",
}

export const expandItems = [
    [
        {
            key      : Expand.WIDTH,
            component: SelectableSvgIconHoc({svgIcon: ExpandWidthIcon}),
        },
        {
            key      : Expand.HEIGHT,
            component: SelectableSvgIconHoc({svgIcon: ExpandHeightIcon}),
        },
        {
            key      : Expand.BOTH,
            component: SelectableSvgIconHoc({svgIcon: ExpandBothIcon}),
        },
    ],
] ;

export const ExpandSelect = TogglePoppingHoc(
    {
        selectItemGroups: expandItems,
        buttonNode      : <ExpandBothIcon/>,
        buttonValue     : "Expand",
        tooltipTitle    : "匹配大小",
        tooltipPlacement: "bottom",
    }) ;
