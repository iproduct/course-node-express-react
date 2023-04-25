/* eslint-disable react-hooks/exhaustive-deps */
import { EffectCallback, useEffect } from "react";

export const useOnMount = (f: EffectCallback) => useEffect(() => f(), [])
export const useOnMountAsync = (f: () => Promise<void>) =>
    useEffect(() => {
        f()
    }, []);
