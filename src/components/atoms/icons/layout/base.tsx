import {JSX, SVGProps} from "react";

export const ExpandBorder = (props: SVGProps<SVGGElement>): JSX.Element => (
    <g {...props}>
        <rect x={2} y={2} width={18} height={2}></rect>
        <rect x={20} y={2} width={2} height={18}></rect>
        <rect x={4} y={20} width={18} height={2}></rect>
        <rect x={2} y={4} width={2} height={18}></rect>
    </g>
) ;
