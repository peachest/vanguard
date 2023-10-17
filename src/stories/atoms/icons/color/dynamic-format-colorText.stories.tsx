import {Meta, StoryObj}             from "@storybook/react";
import {FC}                         from "react";
import {DynamicFormatColorTextIcon} from "src/components/atoms/icons/color/dynamic-format-color-text";

const component = DynamicFormatColorTextIcon as FC ;
const title = "Atoms/Icons/DynamicColors/DynamicFormatColorTextIcon" ;

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

export const White: StoryObj<CompType> = {
    args: {
        dynamicColor: "white",
    },
} ;

export const Black: StoryObj<CompType> = {
    args: {
        dynamicColor: "black",
    },
} ;

export const Red: StoryObj<CompType> = {
    args: {
        dynamicColor: "red",
    },
} ;

export const Orange: StoryObj<CompType> = {
    args: {
        dynamicColor: "orange",
    },
} ;

export const Yellow: StoryObj<CompType> = {
    args: {
        dynamicColor: "yellow",
    },
} ;
export const Green: StoryObj<CompType> = {
    args: {
        dynamicColor: "green",
    },
} ;

export const Cyan: StoryObj<CompType> = {
    args: {
        dynamicColor: "cyan",
    },
} ;

export const Blue: StoryObj<CompType> = {
    args: {
        dynamicColor: "blue",
    },
} ;

export const Purple: StoryObj<CompType> = {
    args: {
        dynamicColor: "purple",
    },
} ;
