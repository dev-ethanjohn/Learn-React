import BRgradient from "../../assets/vid-bottom-right-gradient.png";
import TLgradient from "../../assets/vid-top-left-gradient.png";
import videoImg from "../../assets/video.png";

import playButton from "../../assets/play-button.png";

function Video() {
  return (
    <section className="video">
      <div className="video__container">
        <img className="video__image" src={videoImg} alt="video" />
        <button
          className="video__play"
          style={{ backgroundImage: `url(${playButton})` }}
        ></button>
        <div className="video__overlay"></div>
      </div>
      <img
        className="video-gradient video__tl-gradient"
        src={TLgradient}
        alt="gradient"
      />
      <img
        className="video-gradient video__br-gradient"
        src={BRgradient}
        alt="gradient"
      />
    </section>
  );
}

export default Video;
