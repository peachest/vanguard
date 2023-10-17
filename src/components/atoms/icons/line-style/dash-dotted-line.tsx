import {createSvgIcon} from "@mui/material";

export const DashDottedLineIcon = createSvgIcon(
    (
        <path
            d={
                "M3 13h6v-2H3v2z" +
                "m8 0h2v-2h-2v2z" +
                "m4 0h6v-2h-6v2z"
            }
        />
    ),
    "DashDottedLine",
) ;
