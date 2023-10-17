import {JSX}                               from "react";
import {basicIconStyle, outlinedIconStyle} from "src/components/atoms/icons/base.style";

export const LineTypeIconBase = (): JSX.Element => (
    <g>
        <circle
            r={3} cx={5} cy={5}
        />
        <circle
            r={3} cx={19} cy={19}
        />
    </g>
) ;

export const LineTypeBaseStyle = {
    ...basicIconStyle,
    ...outlinedIconStyle,
} ;
