import {ElementType, FC, JSX, MouseEvent, ReactNode, useId, useState} from "react";
import {Popping}                                                      from "src/components/molecules/popping";
import {Menu, MenuItem, Tooltip, TooltipProps}                        from "@mui/material";
import BorderlessToggleButton
                                                                      from "src/components/atoms/borderless-toggle-button";
import ArrowDropDownIcon                                              from "@mui/icons-material/ArrowDropDown";
import {StoryObj}                                                     from "@storybook/react";
import {screen, userEvent, waitFor, within}                           from "@storybook/testing-library";
import {expect}                                                       from "@storybook/jest";

export interface SelectableItem<K extends string> {
    key: K,
    component: ElementType<{ selected?: boolean }>;
}

export interface SelectablePoppingHOCArgs<K extends string> {
    selectItems: SelectableItem<K>[];
    buttonNode: (selected: K) => ReactNode;
    buttonValue: string;
    tooltipTitle: TooltipProps["title"];
    tooltipPlacement: TooltipProps["placement"];
}

export interface SelectablePoppingHOCProps<K extends string = string> {
    value: K;
    onChange: (value: K) => void;
}

export const SelectablePoppingHoc = function <K extends string, P extends SelectablePoppingHOCProps<K>>(args: SelectablePoppingHOCArgs<K>): FC<P> {
    const {
              selectItems,
              tooltipTitle,
              tooltipPlacement,
              buttonValue,
              buttonNode,
          } = args ;

    const fc = (props: P): JSX.Element => {
        const {
                  value,
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
                                    {buttonNode(value)}
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
                                    selectItems.map(({key, component: Comp}) => {
                                        const selected = value === key ;
                                        return (
                                            <Tooltip key={key} title={key} arrow placement={"right"}>
                                                <MenuItem
                                                    key={key}
                                                    selected={selected}
                                                    aria-label={key}
                                                    onClick={() => void handleSelect(key)}
                                                    sx={{
                                                        margin: "4px auto",
                                                    }}
                                                >
                                                    <Comp
                                                        selected={selected}
                                                    ></Comp>
                                                </MenuItem>
                                            </Tooltip>
                                        ) ;
                                    })
                                }
                            </Menu>
                        </>
                    ),
                }}/>
            </>
        ) ;
    } ;
    fc.defaultProps = {
        value: selectItems[0].key,
    } ;
    return fc as FC<P> ;
} ;


export interface PlaySelectorHOCProps<K extends string> {
    items: SelectableItem<K>[];
    tooltip: string;
}

export function playSelectorHOC<K extends string>(
    props: PlaySelectorHOCProps<K>,
): StoryObj["play"] {
    const {
              items,
              tooltip,
          } = props ;

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
                expect(menuItems).toHaveLength(items.length) ;
                menuItems.forEach((menuItem, index) => {
                    expect(menuItem).toHaveAccessibleName(items[index].key) ;
                }) ;
            }) ;
        }) ;
    } ;
}
