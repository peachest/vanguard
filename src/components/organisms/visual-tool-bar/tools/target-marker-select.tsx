import {SelectableSvgIconHoc}            from "src/components/organisms/visual-tool-bar/utils/selectable-svg-icon.hoc" ;
import {ArrowBackNoneIcon}               from "src/components/atoms/icons/arrow/arrow-back-none" ;
import {SelectablePoppingHoc}            from "src/components/organisms/visual-tool-bar/utils/selectable-popping.hoc" ;
import {allMarkers, Marker}              from "src/components/organisms/visual-tool-bar/tools/source-marker-select" ;
import {ArrowForwardNoneIcon}            from "src/components/atoms/icons/arrow/arrow-forward-none" ;
import {ArrowForwardBlockFilledIcon}     from "src/components/atoms/icons/arrow/arrow-forward-block-filled" ;
import {ArrowForwardBlockOutlinedIcon}   from "src/components/atoms/icons/arrow/arrow-forward-block-outlined" ;
import {ArrowForwardBlockOpenedIcon}     from "src/components/atoms/icons/arrow/arrow-forward-block-opened" ;
import {ArrowForwardCircleFilledIcon}    from "src/components/atoms/icons/arrow/arrow-forward-circle-filled" ;
import {ArrowForwardCircleOutlinedIcon}  from "src/components/atoms/icons/arrow/arrow-forward-circle-outlined" ;
import {ArrowForwardDiamondFilledIcon}   from "src/components/atoms/icons/arrow/arrow-forward-diamond-filled" ;
import {ArrowForwardDiamondOutlinedIcon} from "src/components/atoms/icons/arrow/arrow-forward-diamond-outlined" ;
import {ArrowForwardAsyncOpenedIcon}     from "src/components/atoms/icons/arrow/arrow-forward-async-opened" ;

const targetMarkerIconMapper: Record<Marker, typeof ArrowBackNoneIcon> = {
    [Marker.NONE]            : ArrowForwardNoneIcon,
    [Marker.BLOCK_FILLED]    : ArrowForwardBlockFilledIcon,
    [Marker.BLOCK_OUTLINED]  : ArrowForwardBlockOutlinedIcon,
    [Marker.BLOCK_OPENED]    : ArrowForwardBlockOpenedIcon,
    [Marker.CIRCLE_FILLED]   : ArrowForwardCircleFilledIcon,
    [Marker.CIRCLE_OUTLINED] : ArrowForwardCircleOutlinedIcon,
    [Marker.DIAMOND_FILLED]  : ArrowForwardDiamondFilledIcon,
    [Marker.DIAMOND_OUTLINED]: ArrowForwardDiamondOutlinedIcon,
    [Marker.ASYNC_OPENED]    : ArrowForwardAsyncOpenedIcon,
} ;

export const targetMarkerItems = allMarkers.map(marker => ({
    key      : marker,
    component: SelectableSvgIconHoc({svgIcon: targetMarkerIconMapper[marker]}),
})) ;

export const TargetMarkerSelect = SelectablePoppingHoc(
    {
        selectItems     : targetMarkerItems,
        buttonNode      : (marker) => {
            const Icon = targetMarkerIconMapper[marker] ;
            return (
                <Icon/>
            ) ;
        },
        buttonValue     : "DestMarker",
        tooltipTitle    : "dest marker",
        tooltipPlacement: "bottom",
    }) ;
