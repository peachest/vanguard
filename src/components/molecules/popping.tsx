import {JSX, ReactNode} from "react";

export interface PoppingProps {
    slots: {
        popover: ReactNode
        popper: ReactNode,
    };
}

export const Popping = (props: PoppingProps): JSX.Element => {
    const {
              slots: {
                  popper,
                  popover,
              },
          } = props ;

    return (
        <>
            {popover}
            {popper}
        </>
    ) ;
} ;
