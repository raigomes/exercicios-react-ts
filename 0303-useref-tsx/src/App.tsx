// Adicione funcionalidades ao player de vídeo:

// 1 - Use um estado reativo para verificar se o vídeo está tocando ou não.
// 2 - Função para avançar o vídeo em +2s.
// 3 - Função para alterar o playbackRate do vídeo.
// 4 - Função para entrar/sair do modo pictureInPicture.
// 5 - Função para alternar o som (mudo/não mudo) do vídeo.

import React from "react";
import videoSrc from "./video.mp4";
import Button from "./Button";

type Velocity = "1x" | "2x";

function App() {
  const [playing, setPlaying] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const play = () => {
    videoRef.current?.play();
    setPlaying(true);
  };

  const pause = () => {
    videoRef.current?.pause();
    setPlaying(false);
  };

  const advanceSeconds = (time: number) => {
    const video = videoRef.current;

    if (video instanceof HTMLVideoElement) {
      if (video.currentTime + time > video.duration) {
        video.currentTime = video.duration;
      } else {
        video.currentTime += time;
      }
    }
  };

  const advanceVelocity = (velocity: Velocity) => {
    const video = videoRef.current;

    if (video instanceof HTMLVideoElement) {
      switch (velocity) {
        case "1x":
          video.playbackRate = 1.0;
          break;
        case "2x":
          video.playbackRate = 2.0;
          break;
        default:
          console.error("Velocidade de Reprodução inválida");
      }
    }
  };

  const pictureInPicture = async () => {
    const video = videoRef.current;

    if (video instanceof HTMLVideoElement) {
      try {
        if (video !== document.pictureInPictureElement) {
          await video.requestPictureInPicture();
        } else {
          await document.exitPictureInPicture();
        }
      } catch (error) {
        console.error("Picture-in-Picture error:", error);
      }
    }
  };

  const mute = ({ target }: React.MouseEvent) => {
    const video = videoRef.current;

    if (video instanceof HTMLVideoElement && target instanceof HTMLElement) {
      video.muted = !video.muted;
      target.textContent = video.muted ? "UM" : "M";
    }
  };

  const handleEnded = () => {
    setPlaying(false);
  };

  return (
    <div>
      <div className="flex">
        {!playing && (
          <Button id="play" onClick={play}>
            Play
          </Button>
        )}
        {playing && (
          <Button id="pause" onClick={pause}>
            Pause
          </Button>
        )}

        <Button id="advance" onClick={() => advanceSeconds(2)}>
          + 2s
        </Button>
        <Button id="velocity1" onClick={() => advanceVelocity("1x")}>
          1x
        </Button>
        <Button id="velocity2" onClick={() => advanceVelocity("2x")}>
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
        onEnded={handleEnded}
      ></video>
    </div>
  );
}

export default App;
