import {ElementType, FC, JSX, MouseEvent, ReactNode, useId, useState} from "react" ;
import {Popping}                                                      from "src/components/molecules/popping" ;
import {Divider, Menu, MenuItem, Tooltip, TooltipProps}               from "@mui/material" ;
import BorderlessToggleButton
                                                                      from "src/components/atoms/borderless-toggle-button" ;
import ArrowDropDownIcon                                              from "@mui/icons-material/ArrowDropDown" ;
import {StoryObj}                                                     from "@storybook/react" ;
import {screen, userEvent, waitFor, within}                           from "@storybook/testing-library" ;
import {expect}                                                       from "@storybook/jest" ;

export interface ToggleItem<K extends string = string> {
    key: K,
    component: ElementType<{}>;
}

export interface TogglePoppingHOCArgs<K extends string> {
    selectItemGroups: ToggleItem<K>[][];
    buttonNode: ReactNode;
    buttonValue: string;
    tooltipTitle: TooltipProps["title"];
    tooltipPlacement: TooltipProps["placement"];
}

export interface TogglePoppingHOCProps<K extends string = string> {
    onChange: (value: K) => void;
}

export const TogglePoppingHoc = function <K extends string>(args: TogglePoppingHOCArgs<K>): FC<TogglePoppingHOCProps<K>> {
    const {
              selectItemGroups,
              tooltipTitle,
              tooltipPlacement,
              buttonValue,
              buttonNode,
          } = args ;

    const fc = (props: TogglePoppingHOCProps<K>): JSX.Element => {
        const {
                  onChange,
              } = props ;

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const popoverId = useId() ;
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const popperId = useId() ;

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null) ;
        const open = !!anchorEl ;

        function handleOpenMenu(event: MouseEvent<HTMLElement>): void {
            setAnchorEl(event.currentTarget) ;
        }

        function handleCloseMenu(): void {
            setAnchorEl(null) ;
        }

        function handleSelect(selectedValue: K): void {
            onChange(selectedValue) ;
        }

        return (
            <>
                <Popping slots={{
                    popover: (
                        <>
                            <Tooltip
                                arrow
                                title={tooltipTitle}
                                placement={tooltipPlacement}
                            >
                                <BorderlessToggleButton
                                    value={buttonValue}
                                    id={popoverId}
                                    aria-haspopup={"listbox"}
                                    aria-label={"selectable popping button"}
                                    aria-controls={popperId}
                                    aria-expanded={open ? "true" : void 0}
                                    onClick={handleOpenMenu}
                                >
                                    {buttonNode}
                                    <ArrowDropDownIcon/>
                                </BorderlessToggleButton>
                            </Tooltip>
                        </>
                    ),
                    popper : (
                        <>
                            <Menu
                                open={open}
                                id={popperId}
                                anchorEl={anchorEl}
                                onClose={handleCloseMenu}
                                MenuListProps={{
                                    "aria-labelledby": popoverId,
                                    role             : "listbox",
                                }}
                            >
                                {
                                    selectItemGroups.reduce<ReactNode[]>((result, curr, currentIndex) => {
                                        if (currentIndex > 0) {
                                            result.push(
                                                <Divider
                                                    flexItem
                                                    key={`divider-${currentIndex}`}
                                                    orientation="horizontal"/>,
                                            ) ;
                                        }
                                        return [
                                            ...result,
                                            ...curr.map(({key, component: Comp}) => (
                                                <Tooltip key={key} title={key} arrow placement={"right"}>
                                                    <MenuItem
                                                        key={key}
                                                        aria-label={key}
                                                        onClick={() => void handleSelect(key)}
                                                        sx={{
                                                            margin: "4px auto",
                                                        }}
                                                    >
                                                        <Comp/>
                                                    </MenuItem>
                                                </Tooltip>
                                            )),
                                        ] ;
                                    }, [])
                                }
                            </Menu>
                        </>
                    ),
                }}/>
            </>
        ) ;
    } ;
    return fc as FC<TogglePoppingHOCProps<K>> ;
} ;


export interface PlayToggleHOCProps<K extends string> {
    items: ToggleItem<K>[][];
    tooltip: string;
}

export function playToggleHOC<K extends string>(
    props: PlayToggleHOCProps<K>,
): StoryObj["play"] {
    const {
              items,
              tooltip,
          } = props ;
    // const totalItemCount = items.reduce((result, curr) => result + curr.length, 0) ;

    const allItems = items.reduce((result, curr) => [...result, ...curr], []) ;

    return async function (context) {
        const {args, canvasElement, step} = context ;
        const canvas = within(canvasElement) ;
        const button = canvas.getByRole("button") ;

        const queryTooltip = () => screen.queryByRole("tooltip") ;
        const queryListBox = () => screen.queryByRole("listbox") ;
        const queryAllMenuItems = () => screen.queryAllByRole("menuitem") ;


        await step("Check Tooltip A11y", async () => {
            await userEvent.hover(button) ;
            await waitFor(() => {
                const tooltipEl = queryTooltip() ;
                expect(tooltipEl).toBeInTheDocument() ;
                expect(tooltipEl).toHaveTextContent(tooltip) ;
            }) ;
        }) ;

        await step("Check Items", async () => {
            await userEvent.click(button) ;
            await waitFor(() => {
                const listBox = queryListBox() ;
                expect(listBox).toBeInTheDocument() ;
                const menuItems = queryAllMenuItems() ;
                expect(menuItems).toHaveLength(allItems.length) ;
                menuItems.forEach((menuItem, index) => {
                    expect(menuItem).toHaveAccessibleName(allItems[index].key) ;
                }) ;
            }) ;
        }) ;
    } ;
}
