import {Meta, StoryObj}  from "@storybook/react";
import {FC}              from "react";
import {ExpandWidthIcon} from "src/components/atoms/icons/layout/expand-width";

const component = ExpandWidthIcon as FC ;
const title = "Atoms/Icons/Layouts/ExpandWidthIcon" ;

type CompType = typeof component
const meta: Meta<CompType> = {
    title,
    component,
    tags: ["autodocs"],
} ;
export default meta ;

export const Origin: StoryObj<CompType> = {} ;

export const Large: StoryObj<CompType> = {
    args: {
        fontSize: "large",
    },
} ;

export const Medium: StoryObj<CompType> = {
    args: {
        fontSize: "medium",
    },
} ;

export const Small: StoryObj<CompType> = {
    args: {
        fontSize: "small",
    },
} ;

export const Action: StoryObj<CompType> = {
    args: {
        color: "action",
    },
} ;

export const Disabled: StoryObj<CompType> = {
    args: {
        color: "disabled",
    },
} ;

export const Error: StoryObj<CompType> = {
    args: {
        color: "error",
    },
} ;
export const Success: StoryObj<CompType> = {
    args: {
        color: "success",
    },
} ;
