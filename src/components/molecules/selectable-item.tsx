import {ElementType, JSX} from "react";
import CheckIcon          from "@mui/icons-material/Check";
import {Empty}            from "src/components/atoms/icons/empty";
import {Box}              from "@mui/material";

export interface Selectable {
    selected?: boolean;
}

export interface SelectableItemProps extends Selectable {
    selected?: boolean;
    slots: {
        component: ElementType<Selectable>;
    };
}

const defaultProps = {
    selected: false,
} ;

export const SelectableItem = (props: SelectableItemProps): JSX.Element => {
    const {
              selected = false,
              slots: {
                  component: Comp,
              },
          } = props ;
    return (
        <>
            {
                selected
                ? (<CheckIcon fontSize={"small"}/>)
                : (<Empty fontSize={"small"}/>)
            }
            <Box sx={{
                margin  : 0,
                padding : 0,
                minWidth: "0.5rem",
            }}/>
            <Comp selected={selected}/>
        </>
    ) ;
} ;

SelectableItem.defaultProps = defaultProps ;
