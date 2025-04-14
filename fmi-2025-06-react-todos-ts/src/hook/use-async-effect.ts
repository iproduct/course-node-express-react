import { useEffect } from 'react';

type AsyncEffect<V> = (isMounted?: () => boolean) => Promise<V>;
type Destructor<V> = (prevResult?: V) => void;

export default function useAsyncEffect<V>(effect: AsyncEffect<V>, inputs?: ReadonlyArray<unknown>, destroy?: Destructor<V>) {
    useEffect(function () {
        let result: V;
        let mounted = true;
        let maybePromise = effect(function () {
            return mounted;
        });

        Promise.resolve(maybePromise).then(function (value) {
            result = value;
        });

        return function () {
            mounted = false;

            if (destroy) {
                destroy(result);
            }
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, inputs);
}