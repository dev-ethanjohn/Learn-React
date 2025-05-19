import { useRef } from "react";

import monkey from "../src/assets/monkey.mp4";

function Video() {
  const videoRef = useRef(null);
  function enter() {
    videoRef.current?.play();
  }

  function leave() {
    videoRef.current?.pause();
  }
  return (
    <>
      <video
        src={monkey}
        onMouseEnter={enter}
        onMouseLeave={leave}
        ref={videoRef}
        width="300"
        muted
        loop
      ></video>
    </>
  );
}

export default Video;
