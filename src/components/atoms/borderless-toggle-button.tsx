import {styled, ToggleButton} from "@mui/material";

const BorderlessToggleButton = styled(ToggleButton)(
    () => ({
        border                   : 0,
        margin                   : "4px",
        padding                  : "7px",
        "&.Mui-disabled"        : {
            border: 0,
        },
    }),
) ;
export default BorderlessToggleButton ;
