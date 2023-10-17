import {expect}                             from "@storybook/jest";
import {Meta, StoryObj}                     from "@storybook/react";
import {FC, JSX, MouseEvent, useEffect}     from "react";
import {GridToggleButton, GridToolProps}    from "src/components/organisms/visual-tool-bar/tools/grid-toggle-button";
import {screen, userEvent, waitFor, within} from "@storybook/testing-library";
import {useBoolean}                         from "ahooks";

const component = GridToggleButton as FC<GridToolProps> ;
const title = "Organisms/VisualToolBar/Tools/GridToggleButton" ;
type CompType = typeof component
type Story = StoryObj<CompType>

const meta: Meta<CompType> = {
    title,
    component,
    tags: ["autodocs"],
    args: {
        ...component.defaultProps,
        show : false,
        value: "Grid",
    },
} ;
export default meta ;

export const Origin: StoryObj<CompType> = {
    render: (props, context): JSX.Element => {
        console.log(JSON.stringify(props, void 0, 2)) ;
        const [
                  showGrid,
                  {
                      set,
                      toggle,
                  },
              ]
                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  = useBoolean(props.show) ;

        function handleClick(e: MouseEvent<HTMLElement>): void {
            toggle() ;
            props.onClick(e) ;
        }

        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            set(props.show) ;
        }, [props.show]) ;

        return (
            <GridToggleButton
                {...props}
                show={showGrid} onClick={handleClick}
            />
        ) ;
    },
    play  : async (context) => {
        const {args, canvasElement, step} = context ;
        const canvas = within(canvasElement) ;

        const getTooltip = () => screen.queryByRole("tooltip") ;
        let show = args.show ;
        const getTooltipText = () => show ? args.showGridLabel : args.hideGridLabel ;

        const clickCase = async (label: string) => {
            await step(label, async () => {
                await userEvent.hover(canvas.getByRole("button")) ;
                await waitFor(() => {
                    const tooltip = getTooltip() ;
                    expect(tooltip).toBeInTheDocument() ;
                    expect(tooltip).toHaveTextContent(getTooltipText()!) ;
                }) ;

                await userEvent.click(canvas.getByRole("button")) ;
                show = !show ;
                await waitFor(() => void expect(args.onClick).toHaveBeenCalled()) ;

                await userEvent.unhover(canvas.getByRole("button")) ;
                await waitFor(() => {
                    const tooltip = getTooltip() ;
                    expect(tooltip).toBeNull() ;
                }) ;
            }) ;
        } ;

        await clickCase("First Click") ;
        await clickCase("Second Click") ;
    },
} ;
