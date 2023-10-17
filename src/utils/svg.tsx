import {JSX, ReactNode, useMemo}     from "react";
import {createSvgIcon, SvgIconProps} from "@mui/material";
import SvgIcon                       from "@mui/material/SvgIcon";
import {reverseIconStyle}            from "src/components/atoms/icons/base.style";

export function forwardSVGProps<T extends Record<string, any> = Record<string, never>>(
    path: (props: T) => ReactNode,
    displayName: string,
    shouldForwardProp: (prop: keyof (SvgIconProps & T)) => boolean,
): (props: SvgIconProps & T) => JSX.Element {
    return function (props: SvgIconProps & T): JSX.Element {
        const propKeys = Reflect.ownKeys(props) as (keyof SvgIconProps)[] ;
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const wrappedProps = useMemo(() => (propKeys
            .filter(shouldForwardProp)
            .reduce(
                (res, curr) => ({
                    ...res,
                    [curr]: props[curr],
                }),
                {},
            ) as T), [propKeys, props]) ;

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const intrinsicProps = useMemo(() => (propKeys
            .filter(key => !shouldForwardProp(key))
            .reduce(
                (res, curr) => ({
                    ...res,
                    [curr]: props[curr],
                }),
                {},
            ) as SvgIconProps), [propKeys, props]) ;


        // eslint-disable-next-line react-hooks/rules-of-hooks
        const BaseSVG = useMemo(() => createSvgIcon(
            path(wrappedProps),
            displayName,
        ), [wrappedProps]) ;

        return (
            <>
                <BaseSVG {...intrinsicProps}/>
            </>
        ) ;
    } ;
}

export function rotateSVG(Comp: typeof SvgIcon, displayName: string): typeof SvgIcon {
    return createSvgIcon(
        <g {...reverseIconStyle}>
            <Comp/>
        </g>,
        displayName,
    ) ;
}
