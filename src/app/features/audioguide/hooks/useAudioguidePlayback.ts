import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Plays optional hosted audio; otherwise uses Web Speech API for narration.
 * Playback is toggled per stop from explicit user taps (autoplay-safe).
 */
export function useAudioguidePlayback() {
  const [activeStopId, setActiveStopId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const mediaActiveRef = useRef(false);

  const stopAll = useCallback(() => {
    mediaActiveRef.current = false;
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    const a = audioRef.current;
    if (a) {
      a.pause();
      a.removeAttribute('src');
      a.load();
    }
    setActiveStopId(null);
  }, []);

  useEffect(() => () => stopAll(), [stopAll]);

  const startSpeech = useCallback((stopId: string, text: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.93;
    u.onstart = () => {
      mediaActiveRef.current = false;
      setActiveStopId(stopId);
    };
    u.onend = () => setActiveStopId(null);
    u.onerror = () => setActiveStopId(null);
    window.speechSynthesis.speak(u);
  }, []);

  const play = useCallback(
    (stopId: string, narration: string, mediaUrl?: string) => {
      stopAll();
      if (mediaUrl && audioRef.current) {
        mediaActiveRef.current = true;
        const a = audioRef.current;
        a.src = mediaUrl;
        void a
          .play()
          .then(() => setActiveStopId(stopId))
          .catch(() => {
            mediaActiveRef.current = false;
            startSpeech(stopId, narration);
          });
        return;
      }
      startSpeech(stopId, narration);
    },
    [stopAll, startSpeech],
  );

  const toggle = useCallback(
    (stopId: string, narration: string, mediaUrl?: string) => {
      if (activeStopId === stopId) {
        stopAll();
        return;
      }
      play(stopId, narration, mediaUrl);
    },
    [activeStopId, play, stopAll],
  );

  const onAudioEnded = useCallback(() => {
    if (!mediaActiveRef.current) return;
    mediaActiveRef.current = false;
    setActiveStopId(null);
  }, []);

  return { activeStopId, audioRef, toggle, stopAll, onAudioEnded };
}
