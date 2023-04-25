import { ForwardedRef, forwardRef, ReactNode } from "react";

function VideoPlayer(props: { children?: ReactNode }, videoRef: ForwardedRef<HTMLVideoElement>) {
    return (
        <>
            <video
                ref={videoRef}
                controls
                src={"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"}
            />
            {props.children}
        </>
    );
}
export default forwardRef(VideoPlayer);
