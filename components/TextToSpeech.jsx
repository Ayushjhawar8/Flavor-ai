"use client";

import { useState, useEffect, useRef } from 'react';
import { PlayIcon, PauseIcon, ArrowPathIcon } from '@heroicons/react/24/solid';

const ControlButton = ({ onClick, children, ariaLabel, disabled }) => (
  <button
    onClick={onClick}
    className="btn btn-circle btn-ghost text-gray-600 hover:bg-gray-200 disabled:opacity-40"
    aria-label={ariaLabel}
    disabled={disabled}
  >
    {children}
  </button>
);

function TextToSpeech({ sentences, onHighlightChange }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const utteranceQueue = useRef([]);
  const currentUtteranceIndex = useRef(0);

  // This effect builds the queue of speech utterances when sentences change.
  useEffect(() => {
    utteranceQueue.current = sentences.map((sentence, index) => {
      const utterance = new SpeechSynthesisUtterance(sentence);
      utterance.lang = 'en-US';
      utterance.rate = 0.95;

      utterance.onstart = () => {
        onHighlightChange(index); // Highlight the sentence when it starts
        setIsPlaying(true);
        setIsPaused(false);
      };

      utterance.onend = () => {
        // If it was the last sentence, reset the state.
        if (index === sentences.length - 1) {
          setIsPlaying(false);
          onHighlightChange(-1);
          setProgress(100);
          setTimeout(() => setProgress(0), 1000); // Reset bar after a moment
        }
      };
      return utterance;
    });
  }, [sentences, onHighlightChange]);

  // Effect to manage progress bar updates
  useEffect(() => {
    let interval;
    if (isPlaying && !isPaused) {
      interval = setInterval(() => {
        const totalDuration = utteranceQueue.current.reduce((acc, utt) => acc + (utt.text.length / 10), 0); // Estimate duration
        const elapsedTime = utteranceQueue.current.slice(0, currentUtteranceIndex.current).reduce((acc, utt) => acc + (utt.text.length / 10), 0);
        setProgress((elapsedTime / totalDuration) * 100);
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isPaused]);

  const speakQueue = () => {
    const synth = window.speechSynthesis;
    // Chain utterances together
    for (let i = 0; i < utteranceQueue.current.length; i++) {
        utteranceQueue.current[i].onend = () => {
            currentUtteranceIndex.current = i + 1;
            if (i < utteranceQueue.current.length - 1) {
                synth.speak(utteranceQueue.current[i + 1]);
            } else {
                // Last utterance ended
                setIsPlaying(false);
                onHighlightChange(-1);
                setProgress(100);
                setTimeout(() => setProgress(0), 1000);
            }
        };
    }
    synth.speak(utteranceQueue.current[0]);
  };

  const handlePlayPause = () => {
    const synth = window.speechSynthesis;
    if (!isPlaying) {
      currentUtteranceIndex.current = 0;
      speakQueue();
    } else if (isPaused) {
      synth.resume();
      setIsPaused(false);
    } else {
      synth.pause();
      setIsPaused(true);
    }
  };

  const handleRestart = () => {
    window.speechSynthesis.cancel();
    setProgress(0);
    // A tiny delay is crucial to ensure the 'cancel' command is processed.
    setTimeout(() => {
        handlePlayPause();
    }, 100);
  };

  return (
    <div className="p-3 mb-6 bg-gray-100 border border-gray-200 rounded-xl shadow-sm flex flex-col gap-2 animate-fadeIn">
      {/* Progress Bar */}
      <div className="w-full bg-gray-300 rounded-full h-1.5">
        <div 
          className="bg-primary h-1.5 rounded-full transition-all duration-500 ease-linear" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      {/* Controls */}
      <div className="flex justify-center items-center gap-4">
        <ControlButton onClick={handlePlayPause} ariaLabel={isPlaying && !isPaused ? "Pause" : "Play"}>
          {isPlaying && !isPaused ? <PauseIcon className="h-6 w-6" /> : <PlayIcon className="h-6 w-6" />}
        </ControlButton>
        <ControlButton onClick={handleRestart} ariaLabel="Restart" disabled={!isPlaying}>
          <ArrowPathIcon className="h-5 w-5" />
        </ControlButton>
      </div>
    </div>
  );
}

export default TextToSpeech;

