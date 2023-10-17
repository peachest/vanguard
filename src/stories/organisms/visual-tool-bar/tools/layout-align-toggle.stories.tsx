import {JSX}            from "react";
import {Meta, StoryObj} from "@storybook/react";
import {
    HorizontalLayoutAlign,
    layoutAlignItems,
    LayoutAlignToggle,
    VerticalLayoutAlign,
}                       from "src/components/organisms/visual-tool-bar/tools/layout-align-toggle";
import {
    playToggleHOC,
}                       from "src/components/organisms/visual-tool-bar/utils/toggle-popping.hoc";

const Component = LayoutAlignToggle ;
const title = "Organisms/VisualToolBar/Tools/LayoutAlignToggle" ;
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
        function handleChange(newValue: HorizontalLayoutAlign | VerticalLayoutAlign) {
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
            items  : layoutAlignItems,
            tooltip: "分布对齐",
        }),
} ;
