import {JSX, useEffect} from "react";
import {Meta, StoryObj} from "@storybook/react";
import {useSafeState}   from "ahooks";
import {
    playSelectorHOC,
}                       from "src/components/organisms/visual-tool-bar/utils/selectable-popping.hoc";
import {
    sourceMarkerItems,
    SourceMarkerSelect,
}                       from "src/components/organisms/visual-tool-bar/tools/source-marker-select";

const Component = SourceMarkerSelect ;
const title = "Organisms/VisualToolBar/Tools/VisualMainPanel" ;
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
            items  : sourceMarkerItems,
            tooltip: "source marker",
        }),
} ;
