import React, {ChangeEvent, JSX} from "react" ;
import {Meta, StoryObj}          from "@storybook/react" ;
import {VisualEditor}            from "src/components/templates/visual-editor" ;
import {Box, TextField}          from "@mui/material" ;
import {Cell, Edge, Node}        from "@antv/x6" ;

const Component = VisualEditor ;
const title = "Templates/VisualEditor" ;
type CompType = typeof Component
type Story = StoryObj<CompType>

const meta: Meta<CompType> = {
    title,
    component: Component,
    tags     : ["autodocs"],
    args     : Component.defaultProps,
} ;
export default meta ;


interface RectData {
    width: number,
    height: number
}

type RectNode = Node<{ data: RectData }>


function isRectNode(cell: Cell): cell is RectNode {
    return cell.isNode() && (!cell.shape || cell.shape === "rect" || cell.shape === "") ;
}


interface CircleData {
    radius: number,
}

type CircleNode = Node<{ data: CircleData }>


function isCircleNode(node: Cell): node is CircleNode {
    return node.isNode() && node.shape === "circle" ;
}

function RectDataComp({node}: {
    node: RectNode
}): JSX.Element {

    return (
        <>
            <Box sx={{
                display       : "flex",
                flexDirection : "column",
                justifyContent: "space-between",
                alignItems    : "center",
            }}>
                <div>
                    data config for rect node
                </div>
                <Box>
                    <TextField id="width input" label="Width" variant="outlined" defaultValue={node.data.width}
                               onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                   node.data.width = Number.parseFloat(event.target.value) ;
                               }}
                    />
                    <TextField id="height input" label="Width" variant="outlined" defaultValue={node.data.height}
                               onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                   node.data.height = Number.parseFloat(event.target.value) ;
                               }}
                    />
                </Box>
            </Box>
        </>
    ) ;
}

function CircleDataComp({node}: {
    node: CircleNode
}): JSX.Element {
    return (
        <>
            <Box sx={{
                display       : "flex",
                flexDirection : "column",
                justifyContent: "space-between",
                alignItems    : "center",
            }}>
                <div>
                    data config for circle node
                </div>
                <Box>
                    <TextField id="width input" label="Width" variant="outlined" defaultValue={node.data.radius}
                               onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                   node.data.radius = Number.parseFloat(event.target.value) ;
                               }}
                    />
                </Box>
            </Box>
        </>
    ) ;
}

class NodeShapeError extends Error {
    constructor(expectedShape: string, gotShape: string) {
        super(`Expect ${expectedShape} node, but got shape: ${gotShape}`) ;
    }
}

function handleRenderCellsDataPanel({cells}: { cells: Cell[] }): JSX.Element {
    return (
        <>
            {
                cells.length === 1 && cells[0].isNode()
                ? (
                    <>
                        {
                            isRectNode(cells[0])
                            ? (
                                <RectDataComp
                                    node={cells[0]}
                                />
                            )
                            : isCircleNode(cells[0])
                              ? (
                                  <CircleDataComp
                                      node={cells[0]}
                                  />
                              )
                              : (<></>)
                        }
                    </>
                )
                :
                (<></>)
            }
        </>
    )
                                                ;
}


function BasicEditor(props: {
    graphJSON: {
        edges: Edge.Metadata[],
        nodes: Node.Metadata[],
    }
}): JSX.Element {
    return (
        <Component
            graphJSON={props.graphJSON}
            onRenderCellsDataPanel={handleRenderCellsDataPanel}
            stencilNodes={{
                basic: {
                    rect  : {
                        stencilMetadata: {
                            width : 100,
                            height: 50,
                            shape : "rect",
                            label : "矩形",
                        },
                        onAdded        : (node: Node) => {
                            node.setData({
                                             width : 0,
                                             height: 0,
                                         }) ;
                        },
                    },
                    circle: {
                        stencilMetadata: {
                            width : 100,
                            height: 100,
                            shape : "circle",
                            label : "圆形",
                        },
                        onAdded        : (node: Node) => {
                            if (isCircleNode(node)) {
                                node.setData({
                                                 radius: 0,
                                             }) ;
                            } else {
                                throw new NodeShapeError("circle", node.shape) ;
                            }
                        },
                    },
                },
            }}/>
    ) ;

}

export const Origin: Story = {
    render: (props, context): JSX.Element => {
        const graphJSON: { edges: Edge.Metadata[], nodes: Node.Metadata[] } = {
            nodes: [
                {
                    id    : "node1",
                    x     : 130,
                    y     : 30,
                    width : 100,
                    height: 40,
                    label : "Hello",
                    attrs : {
                        body: {
                            stroke     : "#8f8f8f",
                            strokeWidth: 1,
                            fill       : "#fff",
                            rx         : 6,
                            ry         : 6,
                        },
                    },
                }, {
                    id    : "node2",
                    x     : 320,
                    y     : 240,
                    width : 100,
                    height: 40,
                    label : "World",
                    attrs : {
                        body: {
                            stroke     : "#8f8f8f",
                            strokeWidth: 1,
                            fill       : "#fff",
                            rx         : 6,
                            ry         : 6,
                        },
                        text: {
                            fontWeight: "bold",
                            fontStyle : "italic",
                        },
                    },
                },
            ],
            edges: [
                {
                    source: "node1",
                    target: "node2",
                    attrs : {
                        line: {
                            stroke     : "#8f8f8f",
                            strokeWidth: 1,
                        },
                    },
                },
            ],
        } ;
        return (
            <>
                <BasicEditor graphJSON={graphJSON}/>
            </>
        ) ;
    },
} ;
