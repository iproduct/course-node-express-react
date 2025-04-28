import { Children, ForwardedRef, forwardRef, ReactElement, ReactNode } from "react";

function VideoPlayer({children}: {children?: ReactNode}, videoRef: ForwardedRef<HTMLVideoElement>) {
    return (
        <>
            <video
                ref={videoRef}
                controls
                src={"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"}
            />
            {children}
            {/* Children count: {Children.count(children)}
            {Children.toArray(children)
                .filter(elem => elem && (elem as ReactElement).type && (elem as ReactElement).type === 'button')
            } */}
        </>
    );
}
export default forwardRef(VideoPlayer);
