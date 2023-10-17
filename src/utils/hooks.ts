import {useSafeState}                        from "ahooks";
import {Dispatch, SetStateAction, useEffect} from "react";

export function useControllableProps<T extends Record<string, any>, K extends keyof T>(
    props: T,
    key: K,
): [T[K], Dispatch<SetStateAction<T[K]>>] {
    const [state, setState] = useSafeState<T[K]>(props[key]) ;
    useEffect(() => {
        setState(props[key]) ;
    }, [props[key]]) ;

    return [state, setState] ;
}
