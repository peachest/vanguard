import {createSvgIcon}                                        from "@mui/material";
import {basicIconStyle, filledIconStyle, strokeReactiveStyle} from "src/components/atoms/icons/base.style";

export const ArrowBackBlockFilledIcon = createSvgIcon(
    <g {...basicIconStyle}>
        <polygon
            {...filledIconStyle}
            points={"12 7, 2 12, 12 17"}
        />
        <path d={"M 12 12 H 22"} {...strokeReactiveStyle}/>
    </g>,
    "ArrowBackBlockFilled",
) ;
