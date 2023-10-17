import {createSvgIcon}                       from "@mui/material";
import {basicIconStyle, strokeReactiveStyle} from "src/components/atoms/icons/base.style";

export const ArrowBackNoneIcon = createSvgIcon(
    <g {...basicIconStyle}>
        <path d={"M 3 10 v1h-1v2h1v1h2v-1h1v-2h-1v-1Z"} fill={"red"}/>
        <path d={"M 6 12 H 22"} {...strokeReactiveStyle}/>
    </g>,
    "ArrowBackNone",
) ;
