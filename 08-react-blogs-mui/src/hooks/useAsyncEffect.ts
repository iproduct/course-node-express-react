import { useEffect } from 'react';

type AsyncEffect<V> = (isMounted: () => boolean) => Promise<V>;
type Destructor<V> = (prevResult: V) => void;

export default function useAsyncEffect<V>(effect: AsyncEffect<V>, destroy: Destructor<V>, inputs: any) {
    var hasDestroy = typeof destroy === 'function';

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

            if (hasDestroy) {
                destroy(result);
            }
        };
    }, hasDestroy ? inputs : destroy);
}