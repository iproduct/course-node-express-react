import { Component, createRef, ForwardedRef, forwardRef, ReactNode } from "react";

class VideoPlayer extends Component<{ children?: ReactNode }> {
    videoRef = createRef<HTMLVideoElement>();
    play() {
        if(this.videoRef.current) {
            this.videoRef.current.play()
        }
    }
    pause() {
        if(this.videoRef.current) {
            this.videoRef.current.pause()
        }
    }
    render() {
        return (
            <>
                <video
                    ref={this.videoRef}
                    controls
                    src={"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"}
                />
                {this.props.children}
            </>
        );
    }
}
export default VideoPlayer;
