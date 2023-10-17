import {createSvgIcon} from "@mui/material";
import {ExpandBorder}  from "src/components/atoms/icons/layout/base";

export const ExpandWidthIcon = createSvgIcon(
    <g>
        <ExpandBorder/>
        <rect x={8} y={11} width={8} height={2}/>
        <polygon points={"8 9, 8 15, 5 12"}/>
        <polygon points={"16 9, 16 15, 19 12"}/>
    </g>,
    "Expand",
) ;
