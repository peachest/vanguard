import {Selectable}         from "src/components/molecules/selectable-item";
import {FC, JSX, ReactNode} from "react";

export const SelectableHoc = (component: ReactNode): FC<Selectable> =>
    ({selected}): JSX.Element => (
            <>
                {component}
            </>
        ) ;
