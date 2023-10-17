import React, {JSX, MouseEventHandler} from "react";
import "./button.css";

/**
 * Primary UI component for user interaction
 */
export interface ButtonProps {
    primary?: boolean,
    backgroundColor?: string,
    size?: string,
    label: string,
    onClick?: MouseEventHandler<HTMLButtonElement>
}

export const Button = (
    {primary, backgroundColor, size, label, ...props}: ButtonProps,
): JSX.Element => {
    const mode = (primary === true)
                 ? "storybook-button--primary"
                 : "storybook-button--secondary" ;
    return (
        <button
            type="button"
            className={["storybook-button", `storybook-button--${String(size)}`, mode].join(" ")}
            style={(backgroundColor != null)
                   ? {backgroundColor}
                   : {}}
            {...props}
        >
            {label}
        </button>
    ) ;
} ;

// Button.propTypes = {
//     /**
//      * Is this the principal call to action on the page?
//      */
//     primary: PropTypes.bool,
//     /**
//      * What background color to use
//      */
//     backgroundColor: PropTypes.string,
//     /**
//      * How large should the button be?
//      */
//     size: PropTypes.oneOf(["small", "medium", "large"]),
//     /**
//      * Button contents
//      */
//     label: PropTypes.string.isRequired,
//     /**
//      * Optional click handler
//      */
//     onClick: PropTypes.func,
// } ;

Button.defaultProps = {
    backgroundColor: undefined,
    primary        : false,
    size           : "medium",
    onClick        : undefined,
} ;
