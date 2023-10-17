import {JSX}                               from "react";
import {Meta, StoryObj}                    from "@storybook/react";
import {Expand, expandItems, ExpandSelect} from "src/components/organisms/visual-tool-bar/tools/expand-select";
import {playToggleHOC}                     from "src/components/organisms/visual-tool-bar/utils/toggle-popping.hoc";

const Component = ExpandSelect ;
const title = "Organisms/VisualToolBar/Tools/ExpandSelect" ;
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
    render: (props, context): JSX.Element => {

        function handleChange(newValue: Expand) {
            props.onChange(newValue) ;
        }

        return (
            <Component
                onChange={handleChange}
            />
        ) ;
    },
    play  : playToggleHOC(
        {
            items  : expandItems,
            tooltip: "匹配大小",
        }),
} ;
