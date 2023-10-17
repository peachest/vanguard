import {createSvgIcon}                   from "@mui/material";
import {basicIconStyle, filledIconStyle} from "src/components/atoms/icons/base.style";

export const ArrowBackCircleFilledIcon = createSvgIcon(
    <g {...basicIconStyle}>
        <path
            d={
                "M 12 12 A 5 5 0 0 0 2 12 A 5 5 0 1 0 12 12" +
                "v -1 H 22 v 2 H 12"
            }
            {...filledIconStyle}
        />
    </g>,
    "ArrowBackCircleFilled",
) ;
