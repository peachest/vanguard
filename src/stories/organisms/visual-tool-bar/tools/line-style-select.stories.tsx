import {JSX, useEffect}                  from "react";
import {Meta, StoryObj}                  from "@storybook/react";
import {useSafeState}                    from "ahooks";
import {lineStyleItems, LineStyleSelect} from "src/components/organisms/visual-tool-bar/tools/line-style-select";
import {playSelectorHOC}                 from "src/components/organisms/visual-tool-bar/utils/selectable-popping.hoc";

const Component = LineStyleSelect ;
const title = "Organisms/VisualToolBar/Tools/LineStyleSelect" ;
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
            items  : lineStyleItems,
            tooltip: "连线样式",
        }),
} ;
