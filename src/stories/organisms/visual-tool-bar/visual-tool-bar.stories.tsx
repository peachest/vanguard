import {VisualToolBar}   from "src/components/organisms/visual-tool-bar/visual-tool-bar" ;
import {Meta, StoryObj}  from "@storybook/react" ;
import {JSX, useEffect}  from "react" ;
import {useToolbarStore} from "src/store/ToolbarStore" ;
import {shallow}         from "zustand/shallow" ;
import {
    FormatAlign,
}                        from "src/components/organisms/visual-tool-bar/tools/format-align-select" ;
import {
    Marker,
}                        from "src/components/organisms/visual-tool-bar/tools/source-marker-select" ;
import {
    LineType,
}                        from "src/components/organisms/visual-tool-bar/tools/line-type-select" ;
import {
    LineStyle,
}                        from "src/components/organisms/visual-tool-bar/tools/line-style-select" ;
import {
    Expand,
}                        from "src/components/organisms/visual-tool-bar/tools/expand-select" ;
import {
    HorizontalLayoutAlign,
    VerticalLayoutAlign,
}                        from "src/components/organisms/visual-tool-bar/tools/layout-align-toggle" ;

const Component = VisualToolBar ;
const title = "Organisms/VisualToolBar/VisualToolbar" ;
type CompType = typeof Component;
type Story = StoryObj<CompType>

const meta: Meta<CompType> = {
    title,
    component: Component,
    tags     : ["autodocs"],
    args     : Component.defaultProps,
} ;
export default meta ;

export const Origin: Story = {
    render: (props, context): JSX.Element => {
        const {
                  formatAlign,
                  updateFormatAlign,
                  sourceMarker,
                  updateSourceMarker,
                  targetMarker,
                  updateTargetMarker,
                  lineType,
                  updateLineType,
                  lineStyle,
                  updateLineStyle,
                  updateExpand,
                  updateLayoutAlign,
              } =
                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  useToolbarStore(
                      state => ({
                          formatAlign       : state.formatAlign,
                          updateFormatAlign : state.updateFormatAlign,
                          sourceMarker      : state.sourceMarker,
                          updateSourceMarker: state.updateSourceMarker,
                          targetMarker      : state.targetMarker,
                          updateTargetMarker: state.updateTargetMarker,
                          lineType          : state.lineType,
                          updateLineType    : state.updateLineType,
                          lineStyle         : state.lineStyle,
                          updateLineStyle   : state.updateLineStyle,
                          updateExpand      : state.updateExpand,
                          updateLayoutAlign : state.updateLayoutAlign,
                      }),
                      shallow,
                  ) ;

        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            updateFormatAlign(props.formatAlign) ;
        }, [props.formatAlign]) ;

        function handleFormatAlignChange(newValue: FormatAlign) {
            updateFormatAlign(newValue) ;
            props.onFormatAlignChange(newValue) ;
        }

        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            updateSourceMarker(props.sourceMarker) ;
        }, [props.sourceMarker]) ;

        function handleSourceMarkerChange(newValue: Marker) {
            updateSourceMarker(newValue) ;
            props.onSourceMarkerChange(newValue) ;
        }

        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            updateTargetMarker(props.targetMarker) ;
        }, [props.targetMarker]) ;

        function handleTargetMarkerChange(newValue: Marker) {
            updateTargetMarker(newValue) ;
            props.onSourceMarkerChange(newValue) ;
        }

        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            updateLineType(props.lineType) ;
        }, [props.lineType]) ;

        function handleLineTypeChange(newValue: LineType) {
            updateLineType(newValue) ;
            props.onLineTypeChange(newValue) ;
        }

        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            updateLineStyle(props.lineStyle) ;
        }, [props.lineStyle]) ;

        function handleLineStyleChange(newValue: LineStyle) {
            updateLineStyle(newValue) ;
            props.onLineStyleChange(newValue) ;
        }

        function handleExpandChange(newValue: Expand) {
            updateExpand(newValue) ;
            props.onExpandChange(newValue) ;
        }

        function handleLayoutAlignChange(newValue: HorizontalLayoutAlign | VerticalLayoutAlign) {
            updateLayoutAlign(newValue) ;
            props.onLayoutAlignChange(newValue) ;
        }

        function handleShowSidePanel() {
            props.onShowPageSidePanel() ;
            console.log("click show side panel") ;
        }

        function handleShowDataPanel() {
            props.onShowDataSidePanel() ;
            console.log("click data side panel") ;
        }


        return (
            <Component
                formatAlign={formatAlign}
                onFormatAlignChange={handleFormatAlignChange}
                sourceMarker={sourceMarker}
                onSourceMarkerChange={handleSourceMarkerChange}
                targetMarker={targetMarker}
                onTargetMarkerChange={handleTargetMarkerChange}
                lineType={lineType}
                onLineTypeChange={handleLineTypeChange}
                lineStyle={lineStyle}
                onLineStyleChange={handleLineStyleChange}
                onExpandChange={handleExpandChange}
                onLayoutAlignChange={handleLayoutAlignChange}
                onShowPageSidePanel={handleShowSidePanel}
                onShowDataSidePanel={handleShowDataPanel}
            />
        ) ;
    },
} ;
