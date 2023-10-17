import {JSX}                  from "react" ;
import {Box, Tooltip}         from "@mui/material" ;
import BorderlessToggleButton from "src/components/atoms/borderless-toggle-button" ;
import {Map, TableChart}      from "@mui/icons-material" ;

export interface VisualFooterProps {
    totalCount: number;
    selectedCount: number;
    onToggleShowViewNav: ()=> void ;
}

export function VisualFooter(props: VisualFooterProps): JSX.Element {
    const {
              totalCount,
              selectedCount,
            onToggleShowViewNav,
          } = props ;
    return (
        <>
            <Box
                sx={{
                    display        : "flex",
                    justifyContent : "space-between",
                    alignItems     : "center",
                }}
            >
                <Box>
                    {`图形: ${selectedCount}/${totalCount}`}
                </Box>
                <Box
                    sx={{
                        display       : "flex",
                        justifyContent: "space-evenly",
                        alignItems    : "center",
                    }}
                >
                    <Tooltip title={"模板"} arrow placement={"top"}>
                        <BorderlessToggleButton value={"template"}>
                            <TableChart/>
                        </BorderlessToggleButton>
                    </Tooltip>

                    <Tooltip title={"视图导航"} arrow placement={"top"}>
                        <BorderlessToggleButton
                            value={"view guide"}
                            onClick={onToggleShowViewNav}
                        >
                            <Map/>
                        </BorderlessToggleButton>
                    </Tooltip>


                </Box>

            </Box>
        </>
    ) ;
}
