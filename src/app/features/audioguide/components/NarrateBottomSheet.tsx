import { Camera, MapPinned, Mic, Pause, Play, Sparkles, Upload } from 'lucide-react';
import type { ChangeEvent } from 'react';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '../../../components/ui/sheet';
import { audioguideTotalMins } from '../data/audioguidesMock';
import { DUMMY_EXPLANATION_AUDIO_PATH } from '../../mediaExplain/constants';
import { mockLandmarkLabel, mockNarrationExcerpt } from '../utils/mockNarrationInsight';

type Phase = 'menu' | 'analyzing' | 'generating' | 'result';

function isImageFile(f: File) {
  return f.type.startsWith('image/');
}

function isVideoFile(f: File) {
  return f.type.startsWith('video/');
}

type NarrateBottomSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Used to tailor mock detection + related picks when city filter is "All". */
  contextCity: string;
  relatedTours: AudioguideTour[];
  registerExternalPause: (fn: (() => void) | null) => void;
  onPickRelatedTour?: (tourId: string) => void;
};

export function NarrateBottomSheet({
  open,
  onOpenChange,
  contextCity,
  relatedTours,
  registerExternalPause,
  onPickRelatedTour,
}: NarrateBottomSheetProps) {
  const inputId = useId();
  const fileRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const previewRef = useRef<string | null>(null);
  const timersRef = useRef<number[]>([]);

  const [phase, setPhase] = useState<Phase>('menu');
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [narrationPlaying, setNarrationPlaying] = useState(false);

  const clearTimers = () => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  };

  const pauseNarration = useCallback(() => {
    const a = audioRef.current;
    if (a) {
      a.pause();
      a.removeAttribute('src');
      a.load();
    }
    setNarrationPlaying(false);
  }, []);

  const resetAll = useCallback(() => {
    clearTimers();
    pauseNarration();
    if (previewRef.current) {
      URL.revokeObjectURL(previewRef.current);
      previewRef.current = null;
    }
    setPreviewUrl(null);
    setFile(null);
    setPhase('menu');
    if (fileRef.current) fileRef.current.value = '';
  }, [pauseNarration]);

  const abortPipelineKeepSheetOpen = useCallback(() => {
    clearTimers();
    pauseNarration();
    setPhase((p) => (p === 'analyzing' || p === 'generating' ? 'menu' : p));
  }, [pauseNarration]);

  useEffect(() => {
    registerExternalPause(abortPipelineKeepSheetOpen);
    return () => registerExternalPause(null);
  }, [registerExternalPause, abortPipelineKeepSheetOpen]);

  useEffect(() => {
    if (!open) resetAll();
  }, [open, resetAll]);

  useEffect(() => {
    return () => {
      clearTimers();
      if (previewRef.current) URL.revokeObjectURL(previewRef.current);
    };
  }, []);

  const runPipeline = useCallback(() => {
    clearTimers();
    setPhase('analyzing');
    timersRef.current.push(
      window.setTimeout(() => setPhase('generating'), 1700),
      window.setTimeout(() => setPhase('result'), 1700 + 1500),
    );
  }, []);

  const onFile = (picked?: File) => {
    if (!picked) return;
    if (!isImageFile(picked) && !isVideoFile(picked)) return;
    clearTimers();
    pauseNarration();
    if (previewRef.current) {
      URL.revokeObjectURL(previewRef.current);
      previewRef.current = null;
    }
    const url = URL.createObjectURL(picked);
    previewRef.current = url;
    setFile(picked);
    setPreviewUrl(url);
    runPipeline();
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onFile(e.target.files?.[0]);
  };

  const toggleNarration = () => {
    const a = audioRef.current;
    if (!a) return;
    if (narrationPlaying) {
      pauseNarration();
      return;
    }
    a.src = DUMMY_EXPLANATION_AUDIO_PATH;
    a.currentTime = 0;
    void a
      .play()
      .then(() => setNarrationPlaying(true))
      .catch(() => setNarrationPlaying(false));
  };

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const end = () => setNarrationPlaying(false);
    a.addEventListener('ended', end);
    return () => a.removeEventListener('ended', end);
  }, []);

  const cityKey = contextCity === 'All' ? 'Varanasi' : contextCity;
  const landmark = mockLandmarkLabel(cityKey);
  const excerpt = mockNarrationExcerpt(cityKey);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="max-h-[min(92dvh,720px)] rounded-t-[1.5rem] border-0 bg-[#FAFAFC] p-0 shadow-2xl ring-1 ring-black/5"
      >
        <audio ref={audioRef} className="sr-only" playsInline preload="none" />

        <SheetHeader className="border-b border-gray-100/90 bg-white px-4 pb-3 pt-2.5 text-left sm:px-5">
          <SheetTitle className="text-lg font-semibold tracking-tight text-[#0F172A] sm:text-xl">
            Create narration
          </SheetTitle>
          <SheetDescription className="text-sm leading-relaxed text-[#64748B]">
            Upload a landmark or street photo to hear its story through AI narration.
          </SheetDescription>
        </SheetHeader>

        <div className="flex max-h-[calc(min(92dvh,720px)-5.5rem)] flex-col overflow-y-auto px-4 pb-8 pt-3 sm:px-5">
          <input
            ref={fileRef}
            id={inputId}
            type="file"
            accept="image/*,video/*"
            className="sr-only"
            onChange={onInputChange}
          />

          <AnimatePresence mode="wait">
            {phase === 'menu' ? (
              <motion.div
                key="menu"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18 }}
                className="grid grid-cols-1 gap-2.5 sm:grid-cols-3"
              >
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="flex min-h-[48px] flex-col items-start gap-1 rounded-2xl border border-violet-200/90 bg-gradient-to-br from-violet-600 to-violet-700 p-3 text-left text-white shadow-md shadow-violet-900/20 transition-transform active:scale-[0.99] sm:min-h-[96px] sm:p-3.5"
                >
                  <Upload className="size-3 opacity-95" aria-hidden />
                  <span className="text-sm font-semibold">Photo or video</span>
                  <span className="text-[11px] font-medium text-violet-100/95">Upload from your library</span>
                </button>
                <button
                  type="button"
                  disabled
                  className="flex min-h-[48px] flex-col items-start gap-1 rounded-2xl border border-dashed border-gray-200 bg-gray-50/80 p-3 text-left text-gray-400 sm:min-h-[96px] sm:p-3.5"
                >
                  <Mic className="size-3" aria-hidden />
                  <span className="text-sm font-semibold text-gray-500">Record voice</span>
                  <span className="text-[11px]">Coming soon</span>
                </button>
                <button
                  type="button"
                  disabled
                  className="flex min-h-[48px] flex-col items-start gap-1 rounded-2xl border border-dashed border-gray-200 bg-gray-50/80 p-3 text-left text-gray-400 sm:min-h-[96px] sm:p-3.5"
                >
                  <MapPinned className="size-3" aria-hidden />
                  <span className="text-sm font-semibold text-gray-500">From landmark</span>
                  <span className="text-[11px]">Coming soon</span>
                </button>
              </motion.div>
            ) : null}

            {phase === 'analyzing' || phase === 'generating' ? (
              <motion.div
                key={phase}
                role="status"
                aria-live="polite"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="space-y-3 py-2"
              >
                {previewUrl && file && isImageFile(file) ? (
                  <img
                    src={previewUrl}
                    alt=""
                    className="mx-auto aspect-video max-h-40 w-full max-w-sm rounded-xl object-cover shadow-md ring-1 ring-black/5"
                  />
                ) : previewUrl ? (
                  <video src={previewUrl} muted className="mx-auto aspect-video max-h-40 w-full max-w-sm rounded-xl object-cover shadow-md ring-1 ring-black/5" />
                ) : null}
                <div className="flex flex-col items-center gap-3 rounded-2xl border border-violet-100 bg-white px-4 py-5 shadow-sm sm:px-5">
                  <div className="flex size-9 items-center justify-center rounded-full bg-violet-100">
                    <Sparkles className="size-4 animate-pulse text-violet-700" aria-hidden />
                  </div>
                  <p className="text-center text-base font-semibold text-[#0F172A]">
                    {phase === 'analyzing' ? 'Analyzing landmark…' : 'Generating narration…'}
                  </p>
                  <div className="flex w-full max-w-xs flex-col gap-2">
                    <div className="h-2.5 w-full animate-pulse rounded-full bg-violet-100" />
                    <div className="h-2.5 w-4/5 animate-pulse rounded-full bg-violet-50" />
                    <div className="h-2.5 w-3/5 animate-pulse rounded-full bg-violet-50/80" />
                  </div>
                  <p className="text-center text-xs text-[#64748B]">
                    {phase === 'analyzing'
                      ? 'Identifying architecture, context, and location cues.'
                      : 'Crafting a concise story you can listen to on the go.'}
                  </p>
                </div>
              </motion.div>
            ) : null}

            {phase === 'result' && previewUrl && file ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.22 }}
                className="space-y-3"
              >
                <div className="flex gap-3 overflow-hidden rounded-2xl border border-gray-100 bg-white p-3 shadow-sm ring-1 ring-gray-100/80 sm:p-3.5">
                  {isImageFile(file) ? (
                    <img
                      src={previewUrl}
                      alt="Your capture"
                      className="size-20 shrink-0 rounded-xl object-cover shadow-inner sm:size-24"
                    />
                  ) : (
                    <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-black sm:size-24">
                      <video src={previewUrl} muted className="size-full object-cover" />
                      <Camera className="absolute bottom-1.5 right-1.5 size-3 text-white/90 drop-shadow" aria-hidden />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-violet-600">Detected</p>
                    <p className="mt-0.5 text-sm font-semibold leading-snug text-[#0F172A]">{landmark}</p>
                  </div>
                </div>

                <div className="rounded-2xl border border-gray-100 bg-white p-3 shadow-sm ring-1 ring-gray-50 sm:p-3.5">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">Narration preview</p>
                  <p className="mt-2 text-sm leading-relaxed text-[#334155]">{excerpt}</p>
                  <button
                    type="button"
                    onClick={toggleNarration}
                    className="mt-3 flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-violet-700 px-3 py-2.5 text-sm font-semibold text-white shadow-md shadow-violet-900/20 transition-transform active:scale-[0.99]"
                  >
                    {narrationPlaying ? <Pause className="size-3" /> : <Play className="size-3 pl-0.5" />}
                    {narrationPlaying ? 'Pause narration' : 'Play narration'}
                  </button>
                </div>

                {relatedTours.length > 0 ? (
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#64748B]">
                      Nearby audio walks
                    </p>
                    <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                      {relatedTours.map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          disabled={!onPickRelatedTour}
                          onClick={() => {
                            onPickRelatedTour?.(t.id);
                          }}
                          className="min-w-[9.5rem] shrink-0 rounded-xl border border-gray-100 bg-white p-3 text-left shadow-sm ring-1 ring-gray-50 transition-colors hover:border-violet-200 hover:ring-violet-100 disabled:cursor-default disabled:opacity-90"
                        >
                          <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-500 text-sm">
                            {t.coverEmoji}
                          </div>
                          <p className="mt-2 line-clamp-2 text-xs font-semibold leading-snug text-[#0F172A]">
                            {t.title}
                          </p>
                          <p className="mt-1 text-[10px] font-medium text-[#64748B]">
                            {audioguideTotalMins(t)} min · {t.stops.length} stops
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}

                <button
                  type="button"
                  onClick={() => {
                    resetAll();
                    setTimeout(() => fileRef.current?.click(), 0);
                  }}
                  className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm font-semibold text-[#374151] hover:bg-gray-50"
                >
                  Try another photo
                </button>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </SheetContent>
    </Sheet>
  );
}
