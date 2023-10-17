import {createSvgIcon}                     from "@mui/material";
import {basicIconStyle, outlinedIconStyle} from "src/components/atoms/icons/base.style";

export const ArrowBackAsyncOpenedIcon = createSvgIcon(
    <g {...basicIconStyle}>
        <polyline
            {...outlinedIconStyle}
            points={"12 7, 2 12, 22 12"}
        />
    </g>,
    "ArrowBackAsyncOpened",
) ;
