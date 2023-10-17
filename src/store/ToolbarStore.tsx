import {FormatAlign} from "src/components/organisms/visual-tool-bar/tools/format-align-select" ;
import {
    Marker,
}                    from "src/components/organisms/visual-tool-bar/tools/source-marker-select" ;
import {
    LineType,
}                    from "src/components/organisms/visual-tool-bar/tools/line-type-select" ;
import {
    LineStyle,
}                    from "src/components/organisms/visual-tool-bar/tools/line-style-select" ;
import {
    Expand,
}                    from "src/components/organisms/visual-tool-bar/tools/expand-select" ;
import {
    HorizontalLayoutAlign,
    VerticalLayoutAlign,
}                    from "src/components/organisms/visual-tool-bar/tools/layout-align-toggle" ;
import {create}      from "zustand" ;

export interface ToolbarState {
    formatAlign: FormatAlign;
    sourceMarker: Marker;
    targetMarker: Marker;
    lineType: LineType;
    lineStyle: LineStyle;
}

export interface ToolbarAction {
    updateFormatAlign: (formatAlign: FormatAlign) => void;
    updateSourceMarker: (sourceMarker: Marker) => void;
    updateTargetMarker: (targetMarker: Marker) => void;
    updateLineType: (lineType: LineType) => void;
    updateLineStyle: (lineStyle: LineStyle) => void;
    updateExpand: (expand: Expand) => void;
    updateLayoutAlign: (layoutAlign: HorizontalLayoutAlign | VerticalLayoutAlign) => void;
}

export const useToolbarStore = create<ToolbarAction & ToolbarState>(
    set => ({
        formatAlign      : FormatAlign.LEFT,
        updateFormatAlign: (newFormatAlign: FormatAlign) => void set(
            () => ({
                formatAlign: newFormatAlign,
            }),
        ),

        sourceMarker      : Marker.NONE,
        updateSourceMarker: (newSourceMarker: Marker) => void set(
            () => ({
                sourceMarker: newSourceMarker,
            }),
        ),

        targetMarker      : Marker.NONE,
        updateTargetMarker: (newTargetMarker: Marker) => void set(
            () => ({
                targetMarker: newTargetMarker,
            }),
        ),

        lineType      : LineType.STRAIGHT,
        updateLineType: (newLineType: LineType) => void set(
            () => ({
                lineType: newLineType,
            }),
        ),

        lineStyle      : LineStyle.SOLID_LINE,
        updateLineStyle: (newLineStyle: LineStyle) => void set(
            () => ({
                lineStyle: newLineStyle,
            }),
        ),

        updateExpand: (newExpand: Expand) => void set(
            () => {
                console.log(`Operating: Expand ${newExpand}`) ;
                return {} ;
            },
        ),

        updateLayoutAlign: (newLayoutAlign: HorizontalLayoutAlign | VerticalLayoutAlign) => void set(
            () => {
                console.log(`Operating: Expand ${newLayoutAlign}`) ;
                return {} ;
            },
        ),
    }),
) ;
