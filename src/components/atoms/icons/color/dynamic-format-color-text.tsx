import {forwardSVGProps}   from "src/utils/svg";
import {DynamicColorProps} from "src/components/atoms/icons/color/common";


export const DynamicFormatColorTextIcon = forwardSVGProps<DynamicColorProps>(
    ({dynamicColor}) => (
        <g>
            <path
                d="M2 20m3.49-3h2.42l1.27-3.58h5.65L16.09 17h2.42L13.25 3h-2.5L5.49 17zm4.42-5.61 2.03-5.79h.12l2.03 5.79H9.91z"
            />
            <path d="M2 20h20v4H2v-4z" color={dynamicColor}/>
        </g>
    ),
    "DynamicFormatColorText",
    (key): boolean => {
        switch (key) {
            case "dynamicColor":
                return true ;
            default:
                return false ;
        }
    },
) ;
