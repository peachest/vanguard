import {SelectableSvgIconHoc}         from "src/components/organisms/visual-tool-bar/utils/selectable-svg-icon.hoc";
import {ArrowBackNoneIcon}            from "src/components/atoms/icons/arrow/arrow-back-none";
import {ArrowBackBlockFilledIcon}     from "src/components/atoms/icons/arrow/arrow-back-block-filled";
import {ArrowBackBlockOutlinedIcon}   from "src/components/atoms/icons/arrow/arrow-back-block-outlined";
import {ArrowBackBlockOpenedIcon}     from "src/components/atoms/icons/arrow/arrow-back-block-opened";
import {ArrowBackCircleFilledIcon}    from "src/components/atoms/icons/arrow/arrow-back-circle-filled";
import {ArrowBackCircleOutlinedIcon}  from "src/components/atoms/icons/arrow/arrow-back-circle-outlined";
import {ArrowBackDiamondFilledIcon}   from "src/components/atoms/icons/arrow/arrow-back-diamond-filled";
import {ArrowBackDiamondOutlinedIcon} from "src/components/atoms/icons/arrow/arrow-back-diamond-outlined";
import {ArrowBackAsyncOpenedIcon}     from "src/components/atoms/icons/arrow/arrow-back-async-opened";
import {SelectablePoppingHoc}         from "src/components/organisms/visual-tool-bar/utils/selectable-popping.hoc";

export enum Marker {
    NONE             = "none",
    BLOCK_FILLED     = "block-filled",
    BLOCK_OUTLINED   = "block-outlined",
    BLOCK_OPENED     = "block-opened",
    CIRCLE_FILLED    = "circle-filled",
    CIRCLE_OUTLINED  = "circle-outlined",
    DIAMOND_FILLED   = "diamond-filled",
    DIAMOND_OUTLINED = "diamond-outlined",
    ASYNC_OPENED     = "async-opened",
}

export const allMarkers = [
    Marker.NONE,
    Marker.BLOCK_FILLED,
    Marker.BLOCK_OUTLINED,
    Marker.BLOCK_OPENED,
    Marker.CIRCLE_FILLED,
    Marker.CIRCLE_OUTLINED,
    Marker.DIAMOND_FILLED,
    Marker.DIAMOND_OUTLINED,
    Marker.ASYNC_OPENED,
] ;

const sourceMarkerIconMapper: Record<Marker, typeof ArrowBackNoneIcon> = {
    [Marker.NONE]            : ArrowBackNoneIcon,
    [Marker.BLOCK_FILLED]    : ArrowBackBlockFilledIcon,
    [Marker.BLOCK_OUTLINED]  : ArrowBackBlockOutlinedIcon,
    [Marker.BLOCK_OPENED]    : ArrowBackBlockOpenedIcon,
    [Marker.CIRCLE_FILLED]   : ArrowBackCircleFilledIcon,
    [Marker.CIRCLE_OUTLINED] : ArrowBackCircleOutlinedIcon,
    [Marker.DIAMOND_FILLED]  : ArrowBackDiamondFilledIcon,
    [Marker.DIAMOND_OUTLINED]: ArrowBackDiamondOutlinedIcon,
    [Marker.ASYNC_OPENED]    : ArrowBackAsyncOpenedIcon,
} ;

export const sourceMarkerItems = allMarkers.map(marker => ({
    key      : marker,
    component: SelectableSvgIconHoc({svgIcon: sourceMarkerIconMapper[marker]}),
})) ;

export const SourceMarkerSelect = SelectablePoppingHoc(
    {
        selectItems     : sourceMarkerItems,
        buttonNode      : (marker) => {
            const Icon = sourceMarkerIconMapper[marker] ;
            return (
                <Icon/>
            ) ;
        },
        buttonValue     : "SourceMarker",
        tooltipTitle    : "source marker",
        tooltipPlacement: "bottom",
    }) ;
