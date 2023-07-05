// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
import {Button, ButtonProps} from "src/stories/components/example/Button" ;
import {Meta, StoryObj}      from "@storybook/react" ;
import {FC}                  from "react" ;

const meta: Meta<typeof Button> = {
    title    : "Example/Button",
    component: Button as FC<ButtonProps>,
    tags     : ["autodocs"],
    argTypes : {
        backgroundColor: {control: "color"},
    },
} ;
export default meta ;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: StoryObj<typeof Button> = {
    render: () => <Button
        primary={true} size={"small"} label={"Button"} onClick={(e) => {
        console.log(e) ;
    }
    }></Button>,
} ;

export const Secondary = {
    args: {
        label: "Button",
    },
} ;

export const Large = {
    args: {
        size : "large",
        label: "Button",
    },
} ;

export const Small = {
    args: {
        size : "small",
        label: "Button",
    },
} ;
