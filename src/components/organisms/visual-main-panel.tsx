import {FC, JSX, useLayoutEffect, useRef} from "react" ;
import {useMount}                         from "ahooks" ;
import {findDOMNode}                      from "react-dom" ;

import {Box, useTheme} from "@mui/material" ;
import Grid            from "@mui/material/Unstable_Grid2" ;

import {Cell, Edge, Graph, Node} from "@antv/x6" ;
import {Stencil}                 from "@antv/x6-plugin-stencil" ;
import {Selection}               from "@antv/x6-plugin-selection" ;
import {Snapline}                from "@antv/x6-plugin-snapline" ;
import {Scroller}                from "@antv/x6-plugin-scroller" ;
import {Transform}               from "@antv/x6-plugin-transform" ;
import {Clipboard}               from "@antv/x6-plugin-clipboard" ;
import {KeyboardImpl}            from "@antv/x6-plugin-keyboard/es/keyboard" ;
import {Keyboard}                from "@antv/x6-plugin-keyboard" ;
import {MiniMap}                 from "@antv/x6-plugin-minimap" ;

const stencilConfig: Partial<Stencil.Options> = {
    title: "Stencil",
    search(cell, keyword) {
        return cell.shape.includes(keyword) ;
    },
    placeholder       : "Search by shape name",
    notFoundText      : "Not Found",
    collapsable       : true,
    stencilGraphHeight: 800,
    stencilGraphWidth : 200,
    layoutOptions     : {
        resizeToFit: true,
    },
} ;

const selectionConfig: Selection.Options = {
    enabled             : true,
    multiple            : true,
    rubberband          : true,
    movable             : true,
    showNodeSelectionBox: true,
} ;

const snapLineConfig: Snapline.Options = {
    enabled: true,
    clean  : false,
} ;

const panelConfig: Graph.Options = {
    // width     : 800,
    height    : 800,
    background: {
        color: "#F2F7FA",
    },
} ;

const scrollerConfig: Scroller.Options = {
    enabled    : true,
    pageVisible: true,
    pageBreak  : true,
} ;

const transformConfig: Transform.Options = {
    resizing: {
        enabled            : true,
        minWidth           : 1,
        maxWidth           : 200,
        minHeight          : 1,
        maxHeight          : 150,
        orthogonal         : false,
        restrict           : false,
        preserveAspectRatio: false,
    },
    rotating: {
        enabled: true,
        grid   : 15,
    },
} ;

const clipboardConfig: Clipboard.Options = {
    enabled: true,
} ;
const keyboardConfig: KeyboardImpl.Options = {
    enabled: true,
    global : true,
} ;

const miniMapConfig: Partial<MiniMap.Options> = {
    width  : 200,
    height : 160,
    padding: 10,
} ;

export interface GroupsOfCustomNodes {
    [key: string]: (Node | Node.Metadata)[];
}

interface VisualMainPanelProps {
    groupsOfCustomNodes: GroupsOfCustomNodes;
    showSidePanel: boolean;
    showViewNav: boolean;
    graphJSON?: {edges: Edge.Metadata[], nodes: Node.Metadata[]}

    slot: {
        sidePanel: FC
    };
    onSelectionChanged: (selected: Cell[]) => void;
    onNodeAdded: (args: {
        node: Node,
        index: number
    }) => void;
    onCellAdded: (args: { cell: Cell, index: number }) => void;
    onCellRemoved: (args: { cell: Cell, index: number }) => void;
}

function extractGroupsConfig(groupsOfCustomNodes: GroupsOfCustomNodes): Stencil.Options["groups"] {
    return (Reflect.ownKeys(groupsOfCustomNodes) as string[]).map(key => ({
        name : key,
        title: key,
    })) ;
}

const height = 800 ;
const drawerWidth = 240 ;

export function VisualMainPanel(props: VisualMainPanelProps): JSX.Element {
    const {

              showSidePanel,
              showViewNav,
              groupsOfCustomNodes,
              slot: {
                  sidePanel: SidePanel,
              },
              onSelectionChanged,
              onNodeAdded,
              onCellRemoved,
              onCellAdded,
        graphJSON,
          } = props ;
    console.log(`showViewNav ${showViewNav}`) ;

    // ref for elements
    const refEditorPanel = useRef(null) ;
    const refStencilPanel = useRef(null) ;
    const refViewNav = useRef(null) ;

    // ref for graph object
    const refGraph = useRef<Graph | null>(null) ;

    useLayoutEffect(() => {
        if (showViewNav) {
            refGraph.current?.use(new MiniMap({
                                                  container: findDOMNode(refViewNav.current) as HTMLElement,
                                                  ...miniMapConfig,
                                              })) ;
        } else {
            refGraph.current?.disablePlugins("minimap") ;
        }
    }, [showViewNav]) ;


    useMount(() => {
        // initialize graph object
        if (refGraph.current == null) {
            const container = findDOMNode(refEditorPanel.current) as HTMLElement ;
            const graph = new Graph({
                                        ...panelConfig,
                                        container,
                                    }) ;
            // add plugin
            graph.use(new Selection(selectionConfig)) ;
            graph.use(new Snapline(snapLineConfig)) ;
            const scrollerPlugin = new Scroller(scrollerConfig) ;
            graph.use(scrollerPlugin) ;
            scrollerPlugin.container.style.width = "100%" ;
            graph.use(new Transform(transformConfig)) ;
            graph.use(new Clipboard(clipboardConfig)) ;
            graph.use(new Keyboard(keyboardConfig)) ;

            // register event handlers
            graph.on("selection:changed", ({selected}) => {
                console.log(refGraph.current?.toJSON()) ;
                onSelectionChanged(selected) ;
            }, {
                         passive: true,
                     }) ;

            graph.on("node:added", (args) => {
                         onNodeAdded(args) ;
                         args.node.addTools({
                                                name: "node-editor",
                                            }) ;

                     }, {
                         passive: true,
                     },
            ) ;
            graph.on("cell:added", onCellAdded, {
                passive: true,
            }) ;
            graph.on("cell:removed", onCellRemoved, {
                passive: true,
            }) ;
            graph.on("edge:added", (args) => {
                args.edge.addTools({
                                       name: "edge-editor",
                                   }) ;
            }) ;

            // bind shortcuts
            graph.bindKey("ctrl+c", () => {
                const cells = graph.getSelectedCells() ;
                if (cells.length) {
                    graph.copy(cells) ;
                }
                return false ;
            }) ;

            graph.bindKey("ctrl+v", () => {
                if (!graph.isClipboardEmpty()) {
                    const cells = graph.paste({offset: 32}) ;
                    graph.cleanSelection() ;
                    graph.select(cells) ;
                }
                return false ;
            }) ;


            // graph.fromJSON(graphJSON || {}) ;
            if (graphJSON) {
                graph.addNodes(graphJSON.nodes) ;
                graph.addEdges(graphJSON.edges) ;
            }
            refGraph.current = graph ;
        }

        // initialize stencil panel object
        const stencil = new Stencil(
            {
                ...stencilConfig,
                groups: extractGroupsConfig(groupsOfCustomNodes),
                target: refGraph.current,
            }) ;
        findDOMNode(refStencilPanel.current)?.appendChild(stencil.container) ;
        Object.entries(groupsOfCustomNodes).forEach(([groupName, nodes]) => {
            stencil.load(nodes, groupName) ;
        }) ;
    }) ;
    const theme = useTheme() ;

    return (
        <>
            <Grid container spacing={0}>
                <Grid xs={3}>
                    <div
                        style={{
                            position: "relative",
                            height  : "100%",
                            border  : "1px solid #f0f0f0",
                        }}
                        ref={refStencilPanel}
                    />
                </Grid>
                <Grid xs={showSidePanel ? 6 : 9}
                      sx={{
                          "& .MuiGrid2-root": {
                              overflow: "scroll",
                          },
                      }}
                >
                    <Box sx={{
                        position: "relative",
                    }}>

                        <Box ref={refEditorPanel} sx={{
                            width: "100%",
                        }}></Box>
                        {
                            showViewNav
                            ? (
                                <Box
                                    ref={refViewNav}
                                    sx={{
                                        position: "absolute",
                                        right   : 0,
                                        bottom  : 0,

                                    }}
                                >
                                </Box>
                            )
                            : (<></>)
                        }
                    </Box>
                </Grid>
                {
                    showSidePanel
                    ? (
                        <Grid xs={3}>
                            <SidePanel/>
                        </Grid>
                    )
                    : (<></>)
                }
            </Grid>
        </>
    ) ;
}

VisualMainPanel.defaultProps = {
    showSidePanel: false,
    showViewNav  : false,
} ;
