import {JSX, useEffect} from "react";
import {Meta, StoryObj} from "@storybook/react";
import {useSafeState}   from "ahooks";
import {
    playSelectorHOC,
}                       from "src/components/organisms/visual-tool-bar/utils/selectable-popping.hoc";
import {
    targetMarkerItems,
    TargetMarkerSelect,
}                       from "src/components/organisms/visual-tool-bar/tools/target-marker-select";

const Component = TargetMarkerSelect ;
const title = "Organisms/VisualToolBar/Tools/TargetMarkerSelect" ;
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
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [value, setValue] = useSafeState(props.value) ;
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            setValue(props.value) ;
        }, [props.value]) ;

        function handleChange(newValue: typeof value) {
            setValue(newValue) ;
            props.onChange(newValue) ;
        }

        return (
            <Component
                value={value}
                onChange={handleChange}
            />
        ) ;
    },
    play  : playSelectorHOC(
        {
            items  : targetMarkerItems,
            tooltip: "dest marker",
        }),
} ;
