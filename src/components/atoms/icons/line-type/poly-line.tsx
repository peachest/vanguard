import {createSvgIcon}                       from "@mui/material";
import {LineTypeBaseStyle, LineTypeIconBase} from "src/components/atoms/icons/line-type/base";

export const PolylineIcon = createSvgIcon(
    <g {...LineTypeBaseStyle}>
        <LineTypeIconBase/>
        <polyline
            points={"8 5,12 5,12 19,16 19"}
        />
    </g>
    , "Polyline",
) ;
