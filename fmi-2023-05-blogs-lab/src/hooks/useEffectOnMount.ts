/* eslint-disable react-hooks/exhaustive-deps */
import { EffectCallback, useEffect } from 'react';
export default function useEffectOnMount(effectCallback: EffectCallback) {
   useEffect(effectCallback, []);
}