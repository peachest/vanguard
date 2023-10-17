import {Page}              from "./Page";
import {userEvent, within} from "@storybook/testing-library";

export default {
    title     : "Example/Page",
    component : Page,
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
        layout: "fullscreen",
    },
} ;

export const LoggedOut = {} ;

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
export const LoggedIn = {
    play: async ({canvasElement}: { canvasElement: HTMLCanvasElement }): Promise<void> => {
        const canvas = within(canvasElement) ;
        const loginButton = canvas.getByRole("button", {
            name: /Log in/i,
        }) ;
        await void userEvent.click(loginButton) ;
    },
} ;
