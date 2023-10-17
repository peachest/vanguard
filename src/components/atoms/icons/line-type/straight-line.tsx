import {createSvgIcon}                       from "@mui/material";
import {LineTypeBaseStyle, LineTypeIconBase} from "src/components/atoms/icons/line-type/base";

export const StraightIcon = createSvgIcon(
    <g {...LineTypeBaseStyle}>
        <LineTypeIconBase/>
        <polyline
            points={"7 7,17 17"}
        />
    </g>,
    "Straight",
) ;
