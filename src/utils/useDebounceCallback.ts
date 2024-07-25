import { useCallback, useEffect, useRef } from "react"

/**
 * Returns debounced callback.
 * 
 * @param cb callback to debounce (could be with any args)
 * @param timeout time in miliseconds to wait before calling the callback
 * @returns debounce callback
 */
const useDebounceCallback = <T extends Array<any> = any[]>(cb: (...args: T) => any, timeout: number): ((...args: T) => void) => {
    const debouncedTimeoutId = useRef<number | undefined>(undefined)

    const debouncedCb = useCallback((...args: T) => {
        clearTimeout(debouncedTimeoutId.current)
        debouncedTimeoutId.current = setTimeout(() => {
            cb(...args)
        }, timeout)
    }, [cb, timeout])

    // clear timeout when destroyed
    useEffect(() => () => {
        clearTimeout(debouncedTimeoutId.current)
    }, [])

    return debouncedCb
}

export default useDebounceCallback
