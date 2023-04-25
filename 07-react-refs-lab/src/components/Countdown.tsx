import { forwardRef, useImperativeHandle, useRef } from "react";

// Define the handle types which will be passed to the forwardRef
export type CountdownHandle = {
  start: () => void;
  focus: () => void;
};

type CountdownProps = {};

const Countdown = forwardRef<CountdownHandle, CountdownProps>((props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    // start() has type inference here
    start() {
      alert("Start");
    },
    focus(){
      inputRef.current?.focus();
    }
  }));

  return <div>
    <h2>Countdown</h2>
    <input ref={inputRef} />
  </div>;
});

export default Countdown;