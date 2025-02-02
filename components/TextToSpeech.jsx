"use client";

import { useEffect, useState } from "react";
import { PauseIcon, PlayIcon, ResumeIcon, StopIcon } from "./Icons";

const TextToSpeech = ({ text }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [utterance, setUtterance] = useState(null);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);

    setUtterance(u);

    return () => {
      synth.cancel();
    };
  }, [text]);

  const handlePlay = () => {
    const synth = window.speechSynthesis;

    if (isPaused) {
      synth.resume();
    }

    synth.speak(utterance);

    setIsPaused(true);
  };

  const handlePause = () => {
    const synth = window.speechSynthesis;

    synth.pause();

    setIsPaused(true);
  };

  const handleStop = () => {
    const synth = window.speechSynthesis;

    synth.cancel();

    setIsPaused(false);
  };

  return (
    <div className="flex flex-row-reverse gap-5 py-2">
      <button onClick={handleStop}>
        <StopIcon />
      </button>
      <button onClick={handlePause}>
        <PauseIcon />
      </button>
      <button onClick={handlePlay}>
        {isPaused ? <ResumeIcon /> : <PlayIcon />}
      </button>
    </div>
  );
};

export default TextToSpeech;
