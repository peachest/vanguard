import {JSX, MouseEvent, useState}          from "react" ;
import {Box, Divider, Menu, Paper, Tooltip} from "@mui/material" ;
import StyledToggleButtonGroup              from "src/components/atoms/styled-toggle-button-group" ;
import FormatBoldIcon                       from "@mui/icons-material/FormatBold" ;
import FormatItalicIcon                     from "@mui/icons-material/FormatItalic" ;
import FormatUnderlinedIcon                 from "@mui/icons-material/FormatUnderlined" ;
import FormatColorFillIcon                  from "@mui/icons-material/FormatColorFill" ;
import ArrowDropDownIcon                    from "@mui/icons-material/ArrowDropDown" ;
import FormatLineSpacingIcon                from "@mui/icons-material/FormatLineSpacing" ;
import FormatColorTextIcon                  from "@mui/icons-material/FormatColorText" ;
import BorderColorIcon                      from "@mui/icons-material/BorderColor" ;
import FormatSizeIcon                       from "@mui/icons-material/FormatSize" ;
import LayersIcon                           from "@mui/icons-material/Layers" ;
import UndoIcon                             from "@mui/icons-material/Undo" ;
import RedoIcon                             from "@mui/icons-material/Redo" ;
import FormatPaintIcon                      from "@mui/icons-material/FormatPaint" ;
import AddPhotoAlternateIcon                from "@mui/icons-material/AddPhotoAlternate" ;
import AddLinkIcon                          from "@mui/icons-material/AddLink" ;
import PaletteIcon                          from "@mui/icons-material/Palette" ;
import ChevronLeftIcon                      from "@mui/icons-material/ChevronLeft" ;
import ChevronRightIcon                     from "@mui/icons-material/ChevronRight" ;

import {HexColorInput, HexColorPicker}    from "react-colorful" ;
import {
    GridToggleButton,
}                                         from "src/components/organisms/visual-tool-bar/tools/grid-toggle-button" ;
import {
    FormatAlign,
    FormatAlignSelect,
}                                         from "src/components/organisms/visual-tool-bar/tools/format-align-select" ;
import BorderlessToggleButton             from "src/components/atoms/borderless-toggle-button" ;
import {
    Marker,
    SourceMarkerSelect,
}                                         from "src/components/organisms/visual-tool-bar/tools/source-marker-select" ;
import {
    TargetMarkerSelect,
}                                         from "src/components/organisms/visual-tool-bar/tools/target-marker-select" ;
import {
    LineType,
    LineTypeSelect,
}                                         from "src/components/organisms/visual-tool-bar/tools/line-type-select" ;
import {useSafeState}                     from "ahooks" ;
import {
    LineStyle,
    LineStyleSelect,
}                                         from "src/components/organisms/visual-tool-bar/tools/line-style-select" ;
import {
    Expand,
    ExpandSelect,
}                                         from "src/components/organisms/visual-tool-bar/tools/expand-select" ;
import {
    HorizontalLayoutAlign,
    LayoutAlignToggle,
    VerticalLayoutAlign,
}                                         from "src/components/organisms/visual-tool-bar/tools/layout-align-toggle" ;
import {DisplaySettings, PermDataSetting} from "@mui/icons-material" ;

interface VisualToolBarProps {
    formatAlign: FormatAlign,
    onFormatAlignChange: (value: FormatAlign) => void

    sourceMarker: Marker,
    onSourceMarkerChange: (value: Marker) => void

    targetMarker: Marker,
    onTargetMarkerChange: (value: Marker) => void

    lineType: LineType,
    onLineTypeChange: (value: LineType) => void

    lineStyle: LineStyle,
    onLineStyleChange: (value: LineStyle) => void

    onExpandChange: (value: Expand) => void
    onLayoutAlignChange: (value: HorizontalLayoutAlign | VerticalLayoutAlign) => void

    onShowPageSidePanel: () => void

    onShowDataSidePanel: () => void

    // disableToggleBold: boolean
    // bold: boolean
    // onToggleBold: () => void
}


const defaultProps = {
    // formatAlign  : FormatAlign.LEFT,
    // verticalAlign: VerticalAlign.TOP,
    // sourceMarker : Marker.NONE,
    // targetMarker   : Marker.NONE,
    // lineType
} ;

export function VisualToolBar(props: VisualToolBarProps): JSX.Element {
    const {
              formatAlign,
              onFormatAlignChange,
              sourceMarker,
              onSourceMarkerChange,
              targetMarker,
              onTargetMarkerChange,
              lineType,
              onLineTypeChange,
              lineStyle,
              onLineStyleChange,
              onExpandChange,
              onLayoutAlignChange,
              onShowPageSidePanel,
              onShowDataSidePanel,
          } = props ;


    const [alignment, setAlignment] = useSafeState("left") ;
    const [formats, setFormats] = useState(() => ["italic"]) ;
    const [lineFormat, setLineFormat] = useState(() => ["line style"]) ;

    function handleAlignment(
        event: MouseEvent<HTMLElement>,
        newAlignment: string,
    ): void {
        setAlignment(newAlignment) ;
    }

    function handleFormat(
        event: MouseEvent<HTMLElement>,
        newFormat: string[],
    ): void {
        setFormats(newFormat) ;
    }

    function handleLineFormat(
        event: MouseEvent<HTMLElement>,
        newLineFormat: string[],
    ): void {
        setLineFormat(newLineFormat) ;
    }

    const [grid, setGrid] = useState(true) ;

    function handleGrid(): void {
        setGrid(grid => !grid) ;
    }

    const [backgroundColor, setBackgroundColor] = useState("#fff") ;
    const [colorPickerAnchorEl, setColorPickerAnchorEl] = useState<HTMLElement | null>(null) ;
    const open = !!colorPickerAnchorEl ;
    const handleClick = (event: MouseEvent<HTMLElement>): void => {
        setColorPickerAnchorEl(event.currentTarget) ;
    } ;
    const handleClose = (): void => {
        setColorPickerAnchorEl(null) ;
    } ;

    const [toggleWindow, setToggleWindow] = useState<"flex-end" | "flex-start">("flex-start") ;

    function handleToggleWindow(): void {
        setToggleWindow((prev) => {
            switch (prev) {
                case "flex-end":
                    return "flex-start" ;
                case "flex-start":
                    return "flex-end" ;
            }
        }) ;
    }

    return (
        <>
            <Box
                sx={{
                    display       : "flex",
                    justifyContent: "space-between",
                    alignItems    : "center",
                    width         : "100%",
                }}
            >
                <Box
                    sx={{
                        display       : "flex",
                        flexDirection : toggleWindow === "flex-start" ? "row" : "row-reverse",
                        alignItems    : "center",
                        justifyContent: "space-between",
                        width         : "90%",
                    }}
                >
                    <Paper
                        elevation={0}
                        sx={{
                            display       : "flex",
                            justifyContent: toggleWindow,
                            border        : theme => `1px solid ${theme.palette.divider}`,
                            flexWrap      : "nowrap",
                            overflow      : "hidden",
                        }}
                    >
                        <Tooltip title={"撤销"} arrow placement={"bottom"}>
                        <span>
                        <BorderlessToggleButton value="undo" aria-label="undo">
                            <UndoIcon/>
                        </BorderlessToggleButton>
                        </span>
                        </Tooltip>
                        <Tooltip title={"重做"} arrow placement={"bottom"}>
                        <span>
                        <BorderlessToggleButton value="redo" aria-label="redo">
                            <RedoIcon/>
                        </BorderlessToggleButton></span>
                        </Tooltip>
                        <Tooltip title={"格式刷"} arrow placement={"bottom"}>
                        <span>
                        <BorderlessToggleButton value="format paint" aria-label="format paint" disabled>
                            <FormatPaintIcon/>
                        </BorderlessToggleButton>
                        </span>
                        </Tooltip>
                        <Divider flexItem orientation="vertical" sx={{
                            mx: 0.5,
                            my: 1,
                        }}/>
                        <Tooltip title={"背景颜色"} arrow placement={"bottom"}>
                            <BorderlessToggleButton
                                value="page color"
                                aria-label="page color"
                                onClick={handleClick}
                            >
                                <PaletteIcon/>
                            </BorderlessToggleButton>
                        </Tooltip>
                        <Menu
                            anchorEl={colorPickerAnchorEl}
                            open={open}
                            onClose={handleClose}
                        >
                            <li style={{
                                margin        : "0.5rem 1rem",
                                display       : "flex",
                                flexDirection : "column",
                                alignItems    : "center",
                                justifyContent: "space-between",
                            }}>
                                <HexColorPicker
                                    color={backgroundColor} onChange={setBackgroundColor}
                                    style={{
                                        margin: "0.5rem 0",
                                    }}
                                />
                                <HexColorInput color={backgroundColor} onChange={setBackgroundColor} prefixed alpha/>
                            </li>
                        </Menu>
                        <GridToggleButton
                            show={grid} onClick={handleGrid} value={"BackgroundGrid"}
                        />
                        <Divider flexItem orientation="vertical" sx={{
                            mx: 0.5,
                            my: 1,
                        }}/>
                        <Tooltip title={"插入图片"} arrow placement={"bottom"}>
                            <BorderlessToggleButton value="add photo" aria-label="add photo">
                                <AddPhotoAlternateIcon/>
                            </BorderlessToggleButton>
                        </Tooltip>
                        <Tooltip title={"超链接"} arrow placement={"bottom"}>
                            <BorderlessToggleButton value="add link" aria-label="add link">
                                <AddLinkIcon/>
                            </BorderlessToggleButton>
                        </Tooltip>
                        <Divider flexItem orientation="vertical" sx={{
                            mx: 0.5,
                            my: 1,
                        }}/>

                        <Tooltip title={"字号"} arrow placement={"bottom"}>
                            <BorderlessToggleButton value="text size" aria-label="text size">
                                <FormatSizeIcon/>
                                <ArrowDropDownIcon/>
                            </BorderlessToggleButton>
                        </Tooltip>


                        <Divider flexItem orientation="vertical" sx={{
                            mx: 0.5,
                            my: 1,
                        }}/>
                        <StyledToggleButtonGroup
                            size="small"
                            value={formats}
                            onChange={handleFormat}
                            aria-label="text formatting"
                        >
                            <Tooltip title={"加粗"} arrow placement={"bottom"}>
                                <BorderlessToggleButton value="bold" aria-label="bold">
                                    <FormatBoldIcon/>
                                </BorderlessToggleButton>
                            </Tooltip>
                            <Tooltip title={"倾斜"} arrow placement={"bottom"}>
                                <BorderlessToggleButton value="italic" aria-label="italic">
                                    <FormatItalicIcon/>
                                </BorderlessToggleButton>
                            </Tooltip>

                            <Tooltip title={"下划线"} arrow placement={"bottom"}>
                                <BorderlessToggleButton value="underlined" aria-label="underlined">
                                    <FormatUnderlinedIcon/>
                                </BorderlessToggleButton>
                            </Tooltip>

                            <Tooltip title={"文本颜色"} arrow placement={"bottom"}>
                                <BorderlessToggleButton value="text color" aria-label="text color">
                                    <FormatColorTextIcon/>
                                    <ArrowDropDownIcon/>
                                </BorderlessToggleButton>
                            </Tooltip>


                            <FormatAlignSelect value={formatAlign} onChange={onFormatAlignChange}/>


                            <Tooltip title={"行高"} arrow placement={"bottom"}>
                                <BorderlessToggleButton value="line-spacing" aria-label="line spacing">
                                    <FormatLineSpacingIcon/>
                                    <ArrowDropDownIcon/>
                                </BorderlessToggleButton>
                            </Tooltip>

                            {/*<Tooltip title={"行高"} arrow placement={"bottom"}>*/}
                            {/*    <BorderlessToggleButton value="text format" aria-label="text format">*/}
                            {/*        <TextFormatIcon/>*/}
                            {/*        <ArrowDropDownIcon/>*/}
                            {/*    </BorderlessToggleButton>*/}
                            {/*</Tooltip>*/}
                        </StyledToggleButtonGroup>
                        <Divider flexItem orientation="vertical" sx={{
                            mx: 0.5,
                            my: 1,
                        }}/>
                        <StyledToggleButtonGroup
                            size="small"
                            value={lineFormat}
                            onChange={handleLineFormat}
                            aria-label="line formatting"
                        >

                            <Tooltip title={"填充颜色"} arrow placement={"bottom"}>
                                <BorderlessToggleButton value="fill color" aria-label="fill color">
                                    <FormatColorFillIcon/>
                                    <ArrowDropDownIcon/>
                                </BorderlessToggleButton>
                            </Tooltip>

                            <Tooltip title={"连线颜色"} arrow placement={"bottom"}>
                                <BorderlessToggleButton value="border color" aria-label="border color">
                                    <BorderColorIcon/>
                                    <ArrowDropDownIcon/>
                                </BorderlessToggleButton>
                            </Tooltip>
                        </StyledToggleButtonGroup>
                        <LineTypeSelect value={lineType} onChange={onLineTypeChange}/>
                        <LineStyleSelect value={lineStyle} onChange={onLineStyleChange}/>
                        <Divider flexItem orientation="vertical" sx={{
                            mx: 0.5,
                            my: 1,
                        }}/>
                        <StyledToggleButtonGroup
                            size="small"
                            // value={lineFormat}
                            // onChange={handleLineFormat}
                            aria-label="layout"
                        >
                            <Tooltip title={"图层排列"} arrow placement={"bottom"}>
                                <BorderlessToggleButton value="layer" aria-label="layer">
                                    <LayersIcon/>
                                    <ArrowDropDownIcon/>
                                </BorderlessToggleButton>
                            </Tooltip>
                        </StyledToggleButtonGroup>
                        <LayoutAlignToggle onChange={onLayoutAlignChange}/>
                        <ExpandSelect onChange={onExpandChange}/>
                        <Divider flexItem orientation="vertical" sx={{
                            mx: 0.5,
                            my: 1,
                        }}/>
                        <SourceMarkerSelect value={sourceMarker} onChange={onSourceMarkerChange}/>
                        <TargetMarkerSelect value={targetMarker} onChange={onTargetMarkerChange}/>
                    </Paper>
                    <BorderlessToggleButton value="toggle window" aria-label="toggle window"
                                            onClick={handleToggleWindow}>
                        {toggleWindow === "flex-start"
                            // ? (<ArrowBackIcon/>)
                            // : (<ArrowForwardIcon/>)
                         ? (<ChevronLeftIcon/>)
                         : (<ChevronRightIcon/>)
                        }
                    </BorderlessToggleButton>
                </Box>

                <Box sx={{
                    display       : "flex",
                    justifyContent: "flex-end",
                    alignItems    : "center",
                }}>
                    <Tooltip title={"样式"} arrow placement={"bottom"}>
                        <BorderlessToggleButton value="show page side panel" aria-label="show page side panel"
                                                onClick={onShowPageSidePanel}>
                            <DisplaySettings/>
                        </BorderlessToggleButton>
                    </Tooltip>
                    <Tooltip title={"数据"} arrow placement={"bottom"}>
                    <span>
                    <BorderlessToggleButton
                        value="show node data panel"
                        aria-label="shoo node data panel"
                        onClick={onShowDataSidePanel}>
                        <PermDataSetting/>
                    </BorderlessToggleButton>
                    </span>
                    </Tooltip>
                </Box>
            </Box>
        </>
    ) ;
}

VisualToolBar.defaultProps = defaultProps ;
