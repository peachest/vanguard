import {createSvgIcon}                     from "@mui/material";
import {basicIconStyle, outlinedIconStyle} from "src/components/atoms/icons/base.style";

export const ArrowBackDiamondOutlinedIcon = createSvgIcon(
    <g {...basicIconStyle}>
        <path
            {...outlinedIconStyle}
            d={"M 22 12 H 12 L 7 7 2 12 7 17 12 12 "}
        />
    </g>,
    "ArrowBackDiamondOutlined",
) ;
