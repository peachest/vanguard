import {createSvgIcon}                   from "@mui/material";
import {basicIconStyle, filledIconStyle} from "src/components/atoms/icons/base.style";

export const ArrowBackDiamondFilledIcon = createSvgIcon(
    <g {...basicIconStyle}>
        <path
            {...filledIconStyle}
            d={"M 22 11 L 12 11, 7 6, 1 12, 7 18, 12 13, 22 13 Z"}
        />
    </g>,
    "ArrowBackDiamondFilled",
) ;
