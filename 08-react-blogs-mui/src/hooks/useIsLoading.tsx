import { useState } from "react";

export function useLoading<R>() {
    const [isLoading, setLoading] = useState(false);
    const load = (aPromise: Promise<R>) => {
        setLoading(true);
        return aPromise.finally(() => setLoading(false));
    };
    return [isLoading, load] as const;
}

// const [isLoading, load] = useLoading();
// load(Promise<R>): Promise<R>