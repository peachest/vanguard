import {createSvgIcon}                                          from "@mui/material";
import {basicIconStyle, outlinedIconStyle, strokeReactiveStyle} from "src/components/atoms/icons/base.style";

export const ArrowBackBlockOutlinedIcon = createSvgIcon(
    <g {...basicIconStyle}>
        <polygon
            {...outlinedIconStyle}
            points={"12 7, 2 12, 12 17"}
        />
        <path d={"M 13 12 H 22"} {...strokeReactiveStyle}/>
    </g>,
    "ArrowBackBlockOutlined",
) ;
