import {JSX}                from "react" ;
import {BasicTabs}          from "src/components/molecules/basic-tabs" ;
import {PageStyleSidePanel} from "src/components/molecules/page-style-side-panel" ;
import {NodeStyleSidePanel} from "src/components/molecules/node-style-side-panel" ;

interface VisualSidePanelProps {
}

enum Label {
    PAGE_STYLE = "页面样式",
    NODE_STYLE = "节点样式"
}


export function VisualSidePanel(props: VisualSidePanelProps): JSX.Element {
    function renderContext(tabLabel: Label) {
        switch (tabLabel) {
            case Label.PAGE_STYLE:
                return (<PageStyleSidePanel></PageStyleSidePanel>) ;
            case Label.NODE_STYLE:
                return (<NodeStyleSidePanel></NodeStyleSidePanel>) ;
        }
    }

    return (
        <>
            <BasicTabs
                tabLabels={[
                    Label.PAGE_STYLE,
                    Label.NODE_STYLE,
                ]}
                renderContext={renderContext}
            />
        </>
    ) ;
}

VisualSidePanel.defaultProps = {} ;
