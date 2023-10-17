import {createSvgIcon}                                          from "@mui/material";
import {basicIconStyle, outlinedIconStyle, strokeReactiveStyle} from "src/components/atoms/icons/base.style";

export const ArrowBackCircleOutlinedIcon = createSvgIcon(
    <g {...basicIconStyle}>
        <circle
            {...outlinedIconStyle}
            cx={7} cy={12}
            r={4}
        />
        <path d={"M 12 12 H 22"} {...strokeReactiveStyle}/>
    </g>,
    "ArrowBackCircleOutlined",
) ;
