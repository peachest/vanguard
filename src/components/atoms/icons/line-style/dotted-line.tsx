import {createSvgIcon} from "@mui/material";

export const DottedLineIcon = createSvgIcon(
    (
        <path
            d={
                "M3 13h2v-2H3v2z" +
                "m4 0h2v-2H7v2z" +
                "m4 0h2v-2h-2v2z" +
                "m4 0h2v-2h-2v2z" +
                "m4 0h2v-2h-2v2z"
            }
        />
    ),
    "DottedLine",
) ;
