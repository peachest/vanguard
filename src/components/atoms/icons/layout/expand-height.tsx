import {createSvgIcon} from "@mui/material";
import {ExpandBorder}  from "src/components/atoms/icons/layout/base";

export const ExpandHeightIcon = createSvgIcon(
    <g>
        <ExpandBorder/>
        <rect x={11} y={8} width={2} height={8}/>
        <polygon points={"9 8, 15 8, 12 5"}/>
        <polygon points={"9 16, 15 16, 12 19"}/>
    </g>,
    "ExpandReverse",
) ;
