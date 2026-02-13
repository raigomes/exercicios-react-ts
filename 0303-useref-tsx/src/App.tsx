// Adicione funcionalidades ao player de vídeo:

// 1 - Use um estado reativo para verificar se o vídeo está tocando ou não.
// 2 - Função para avançar o vídeo em +2s.
// 3 - Função para alterar o playbackRate do vídeo.
// 4 - Função para entrar/sair do modo pictureInPicture.
// 5 - Função para alternar o som (mudo/não mudo) do vídeo.

import React from "react";
import videoSrc from "./video.mp4";
import Button from "./Button";

function App() {
  const [playing, setPlaying] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const forward = (time: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime += time;
  };

  const changePlaybackRate = (speed: number) => {
    if (!videoRef.current) return;
    videoRef.current.playbackRate = speed;
  };

  const pictureInPicture = async () => {
    if (!videoRef.current) return;

    try {
      if (videoRef.current !== document.pictureInPictureElement) {
        await videoRef.current.requestPictureInPicture();
      } else {
        await document.exitPictureInPicture();
      }
    } catch (error) {
      console.error("Picture-in-Picture error:", error);
    }
  };

  const mute = ({ target }: React.MouseEvent) => {
    if (!videoRef.current || !(target instanceof HTMLElement)) return;
    videoRef.current.muted = !videoRef.current.muted;
    target.textContent = videoRef.current.muted ? "UM" : "M";
  };

  return (
    <div>
      <div className="flex">
        {playing ? (
          <Button id="pause" onClick={() => videoRef.current?.pause()}>
            Pause
          </Button>
        ) : (
          <Button id="play" onClick={() => videoRef.current?.play()}>
            Play
          </Button>
        )}

        <Button id="advance" onClick={() => forward(2)}>
          + 2s
        </Button>
        <Button id="velocity1" onClick={() => changePlaybackRate(1)}>
          1x
        </Button>
        <Button id="velocity2" onClick={() => changePlaybackRate(2)}>
          2x
        </Button>
        <Button id="pip" onClick={pictureInPicture}>
          PiP
        </Button>
        <Button id="mute" onClick={mute}>
          M
        </Button>
      </div>
      <video
        controls
        src={videoSrc}
        ref={videoRef}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      ></video>
    </div>
  );
}

export default App;
