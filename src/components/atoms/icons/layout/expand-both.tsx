import {createSvgIcon} from "@mui/material";
import {ExpandBorder}  from "src/components/atoms/icons/layout/base";

export const ExpandBothIcon = createSvgIcon(
    <g>
        <ExpandBorder/>

        {/*<rect x={8} y={11} width={8} height={2}/>*/}
        {/*<rect x={11} y={8} width={2} height={8}/>*/}
        <path
            d={"M8 11v2h3v3h2v-3h3v-2h-3v-3h-2v3h-3z"}
        />

        <polygon points={"9 8, 15 8, 12 5"}/>
        <polygon points={"9 16, 15 16, 12 19"}/>
        <polygon points={"8 9, 8 15, 5 12"}/>
        <polygon points={"16 9, 16 15, 19 12"}/>
    </g>,
    "ExpandBoth",
) ;
