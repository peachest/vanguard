import {createSvgIcon}                       from "@mui/material";
import {LineTypeBaseStyle, LineTypeIconBase} from "src/components/atoms/icons/line-type/base";

export const BezierIcon = createSvgIcon(
    <g {...LineTypeBaseStyle}>
        <LineTypeIconBase/>
        <path
            d={"M 8 5Q 19 5 19 16"}
        />
    </g>
    , "Bezier",
) ;
