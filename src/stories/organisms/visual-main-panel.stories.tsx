import {JSX}             from "react" ;
import {Meta, StoryObj}  from "@storybook/react" ;
import {VisualMainPanel} from "src/components/organisms/visual-main-panel" ;
import {VisualSidePanel} from "src/components/organisms/visual-side-panel" ;

const Component = VisualMainPanel ;
const title = "Organisms/VisualMainPanel" ;
type CompType = typeof Component
type Story = StoryObj<CompType>

const meta: Meta<CompType> = {
    title,
    component: Component,
    tags     : ["autodocs"],
    args     : Component.defaultProps,
} ;
export default meta ;

export const Origin: Story = {
    render: (props, context): JSX.Element => (
        <Component
            showViewNav={props.showViewNav}
            showSidePanel={props.showSidePanel}
            groupsOfCustomNodes={{
                basic: [
                    {
                        width : 100,
                        height: 50,
                        shape : "rect",
                        label : "矩形",
                    },
                    {
                        width : 100,
                        height: 100,
                        shape : "circle",
                        label : "圆形",
                    },
                ],
            }}
            slot={{
                sidePanel: (): JSX.Element => (
                    <>
                        <VisualSidePanel/>
                    </>
                ),
            }}
            onSelectionChanged={(selected) => {
                console.log(selected.map(cell => cell.shape)) ;
            }}
            onNodeAdded={(node) => {
                console.log("Node added") ;
                console.log(node) ;
            }}
            onCellAdded={(cell) => {
                console.log("Node added") ;
                console.log(cell) ;
            }}
            onCellRemoved={(cell) => {
                console.log("Node removed") ;
                console.log(cell) ;
            }}
        />
    ),
} ;
