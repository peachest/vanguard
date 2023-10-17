import {ElementType, JSX, MouseEvent} from "react";
import {Tooltip}                      from "@mui/material";
import GridOnIcon                     from "@mui/icons-material/GridOn";
import GridOffIcon                    from "@mui/icons-material/GridOff";
import {DefaultProps}                 from "src/utils/type";
import BorderlessToggleButton         from "src/components/atoms/borderless-toggle-button";

export interface GridToolProps {
    show: boolean;
    onClick: (event: MouseEvent<HTMLElement>) => void;
    value: string;
    showGridLabel?: string;
    hideGridLabel?: string;
    slots?: {
        ShowGridIcon?: ElementType,
        HideGridIcon?: ElementType,
    };
}

const defaultProps: DefaultProps<GridToolProps> = {
    showGridLabel: "showing grid",
    hideGridLabel: "hiding grid",
    slots        : {
        ShowGridIcon: GridOnIcon,
        HideGridIcon: GridOffIcon,
    },
} ;

export function GridToggleButton(props: GridToolProps): JSX.Element {
    const {
              show,
              onClick,
              value,
              showGridLabel,
              hideGridLabel,
              slots: {
                  ShowGridIcon = defaultProps.slots.ShowGridIcon,
                  HideGridIcon = defaultProps.slots.HideGridIcon,
              } = {},
          } = props ;

    return (
        <Tooltip
            title={
                show
                ? showGridLabel
                : hideGridLabel
            }
            arrow
            placement={"bottom"}
        >
            <BorderlessToggleButton value={value} aria-label={value} onClick={onClick}>
                {
                    show
                    ? <ShowGridIcon/>
                    : <HideGridIcon/>
                }
            </BorderlessToggleButton>
        </Tooltip>
    ) ;
}

GridToggleButton.defaultProps = defaultProps ;
