import { ForwardedRef, forwardRef, ReactNode } from "react";

function VideoPlayer({children}: {children?: ReactNode}, videoRef: ForwardedRef<HTMLVideoElement>) {
    return (
        <>
            <video
                ref={videoRef}
                controls
                src={"https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4"}
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
