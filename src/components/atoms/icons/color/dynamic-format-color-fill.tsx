import {forwardSVGProps}   from "src/utils/svg";
import {DynamicColorProps} from "src/components/atoms/icons/color/common";

export const DynamicFormatColorFillIcon = forwardSVGProps<DynamicColorProps>(
    ({dynamicColor}) => (
        <g>
            <path d={
                "M16.56 8.94 7.62 0 6.21 1.41l2.38 2.38-5.15 5.15c-.59.59-.59 1.54 0 2.12l5.5 5.5c.29.29.68.44 1.06.44s.77-.15 1.06-.44l5.5-5.5c.59-.58.59-1.53 0-2.12z" +
                "M5.21 10 10 5.21 14.79 10H5.21z" +
                "M19 11.5s-2 2.17-2 3.5c0 1.1.9 2 2 2s2-.9 2-2c0-1.33-2-3.5-2-3.5z"
            }/>
            <path d={"M2 20h20v4H2v-4z"} color={dynamicColor}/>
        </g>
    ),
    "DynamicFormatColorFill",
    (key): boolean => {
        switch (key) {
            case "dynamicColor":
                return true ;
            default:
                return false ;
        }
    },
) ;
