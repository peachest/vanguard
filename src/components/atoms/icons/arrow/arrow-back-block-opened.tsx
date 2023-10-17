import {createSvgIcon}                     from "@mui/material";
import {basicIconStyle, outlinedIconStyle} from "src/components/atoms/icons/base.style";

export const ArrowBackBlockOpenedIcon = createSvgIcon(
    <g {...basicIconStyle}>
        <path
            d={"M 12 7 L 2 12 12 17 M 4 12 H 22"}
            {...outlinedIconStyle}
        />
    </g>,
    "ArrowBackBlockOpened",
) ;
