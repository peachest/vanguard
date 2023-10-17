import React, {JSX, ReactNode}                from "react" ;
import {Box}                                  from "@mui/material" ;
import {VisualToolBar}                        from "src/components/organisms/visual-tool-bar/visual-tool-bar" ;
import {GroupsOfCustomNodes, VisualMainPanel} from "src/components/organisms/visual-main-panel" ;
import {useToolbarStore}                      from "src/store/ToolbarStore" ;
import {VisualSidePanel}                      from "src/components/organisms/visual-side-panel" ;
import {useBoolean, useSafeState}             from "ahooks" ;
import {Cell, Edge, Node}                     from "@antv/x6" ;
import {Prettify}                             from "src/utils/type" ;
import {VisualFooter}                         from "src/components/organisms/visual-footer" ;


interface NodeDesc<S extends string = string, D = any> {
    stencilMetadata: Prettify<Node.Metadata & { shape: S }>,
    // dataComp: NodeDataComp<D>
    onAdded: (node: Node) => void
}

interface NodeShapeMapper {
    [shape: string]: NodeDesc;
}

export interface VisualEditorProps {
    stencilNodes: {
        [groupName: string]: NodeShapeMapper
    };
    onRenderCellsDataPanel: (args: { cells: Cell[] }) => ReactNode;
    // graphName: string;
    // setGraphName: (name: string) => void;
    // appIcon: ReactNode;
    graphJSON?: {
        nodes: Node.Metadata[],
        edges: Edge.Metadata[],
    };
}


export function VisualEditor(props: VisualEditorProps): JSX.Element {
    const {
              stencilNodes,
              onRenderCellsDataPanel,
              graphJSON,
          } = props ;

    const nodeShapeMapper = Object.entries(stencilNodes).reduce((previousValue, [_, mapper]) => ({
        ...previousValue,
        ...mapper,
    }), {} as NodeShapeMapper) ;


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
                  // shallow 会报错？
              ) ;

    const [openSidePanel, openSidePanelActions] = useBoolean(false) ;
    const [openDataPanel, openDataPanelActions] = useBoolean(false) ;

    function handleShowSidePanel() {
        openSidePanelActions.toggle() ;
        if (openDataPanel) {
            openDataPanelActions.setFalse() ;
        }
    }

    function handleShowDataPanel() {
        openDataPanelActions.toggle() ;
        if (openSidePanel) {
            openSidePanelActions.setFalse() ;
        }
    }

    // extract from stencilNodes
    const groupsOfCustomNodes = Object.entries(stencilNodes).reduce(
        (previousValue, [groupName, nodes], currentIndex) => ({
            ...previousValue,
            [groupName]: Object.entries(nodes).map(([_, desc]) => desc.stencilMetadata),
        }), {} as GroupsOfCustomNodes) ;

    const [selectedCells, setSelectedCells] = useSafeState<Cell[]>([]) ;
    const [totalCellCount, setTotalCellCount] = useSafeState<number>(0) ;

    const [showViewNav, showViewNavActions] = useBoolean(false) ;

    function handleToggleShowViewNav() {
        console.log("toggle showViewNav") ;
        showViewNavActions.toggle() ;
    }

    // const bold = selectedCells.filter(
    //     cell => (cell as Edge).getLabels(),
    // ) ;

    function handleToggleBold() {

    }


    return (
        <>
            <Box>
                {/*<VisualHeader graphName={graphName} setGraphName={setGraphName} appIcon={appIcon}/>*/}
                <VisualToolBar
                    // disableToggleBold={selectedCells.length <= 0}
                    // bold={false}
                    // onToggleBold={handleToggleBold}
                    formatAlign={formatAlign}
                    onFormatAlignChange={updateFormatAlign}
                    sourceMarker={sourceMarker}
                    onSourceMarkerChange={updateSourceMarker}
                    targetMarker={targetMarker}
                    onTargetMarkerChange={updateTargetMarker}
                    lineType={lineType}
                    onLineTypeChange={updateLineType}
                    lineStyle={lineStyle}
                    onLineStyleChange={updateLineStyle}
                    onExpandChange={updateExpand}
                    onLayoutAlignChange={updateLayoutAlign}
                    onShowPageSidePanel={handleShowSidePanel}
                    onShowDataSidePanel={handleShowDataPanel}
                />
                <VisualMainPanel
                    graphJSON={graphJSON}
                    showViewNav={showViewNav}
                    showSidePanel={openSidePanel || openDataPanel}
                    groupsOfCustomNodes={groupsOfCustomNodes}
                    slot={{
                        sidePanel: (): JSX.Element => (
                            <>
                                {
                                    openSidePanel
                                    ? (<VisualSidePanel/>)
                                    : openDataPanel
                                      ? (
                                          <>
                                              {
                                                  onRenderCellsDataPanel({cells: selectedCells})
                                              }
                                          </>
                                      )
                                      : (<></>)
                                }
                            </>
                        ),
                    }}
                    onSelectionChanged={(selected) => {
                        setSelectedCells(selected) ;
                        console.log("selected changed") ;
                        selected.forEach(cell => void console.log(cell)) ;
                        selected.forEach(cell => void console.log(cell.getAttrs())) ;
                        selected.forEach(cell => void console.log(cell.getMarkup())) ;
                    }}
                    onNodeAdded={({node, index}) => {
                        nodeShapeMapper[node.shape].onAdded(node) ;
                    }}
                    onCellAdded={() => {
                        setTotalCellCount(prev => prev + 1) ;
                    }}
                    onCellRemoved={() => {
                        setTotalCellCount(prev => prev - 1) ;
                    }}
                />
                <VisualFooter
                    totalCount={totalCellCount}
                    selectedCount={selectedCells.length}
                    onToggleShowViewNav={handleToggleShowViewNav}
                />
            </Box>
        </>
    ) ;
}

VisualEditor.defaultProps = {} ;
