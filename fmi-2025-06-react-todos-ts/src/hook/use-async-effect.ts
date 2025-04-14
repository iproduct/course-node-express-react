import { useEffect } from 'react';

type AsyncEffect<V> = (isValid?: () => boolean) => Promise<V>;
type Destructor<V> = (prevResult?: V) => void;

export default function useAsyncEffect<V>(effect: AsyncEffect<V>, dependencies?: ReadonlyArray<unknown>, destroy?: Destructor<V>) {
    useEffect(function () {
        let result: V;
        let valid = true;
        const maybePromise = effect(function () {
            return valid;
        });

        Promise.resolve(maybePromise).then(function (value) {
            result = value;
        });

        return function () {
            valid = false;

            if (destroy) {
                destroy(result);
            }
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependencies);
}