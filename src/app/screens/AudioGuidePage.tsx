import { ArrowLeft, Headphones, Pause, Play, Plus } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { CircleIconButton } from '../components/commonComponents';
import { cn } from '../components/ui/utils';
import {
  AUDIOGUIDE_TOURS,
  audioguideTotalMins,
  getAudioguideTourById,
  useAudioguidePlayback,
} from '../features/audioguide';
import { AudioGuideDiscoverHero } from '../features/audioguide/components/AudioGuideDiscoverHero';
import type { CityFilter } from '../features/audioguide/components/AudioGuideDiscoverHero';
import { AudioGuideTourCard } from '../features/audioguide/components/AudioGuideTourCard';
import { NarrateBottomSheet } from '../features/audioguide/components/NarrateBottomSheet';
import type { AudioguideTour } from '../features/audioguide';
import { PAGE_PAD_X } from '../shellLayout';

const SAVED_KEY = 'yourguide_audioguides_saved_v1';

type AudioGuidePageProps = {
  onExit: () => void;
};

function loadSavedSet(): Set<string> {
  try {
    const raw = localStorage.getItem(SAVED_KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw) as unknown;
    if (!Array.isArray(arr)) return new Set();
    return new Set(arr.filter((x): x is string => typeof x === 'string'));
  } catch {
    return new Set();
  }
}

export default function AudioGuidePage({ onExit }: AudioGuidePageProps) {
  const narratePauseRef = useRef<(() => void) | null>(null);
  const registerNarratePause = useCallback((fn: (() => void) | null) => {
    narratePauseRef.current = fn;
  }, []);

  const callNarratePause = () => narratePauseRef.current?.();

  const [city, setCity] = useState<CityFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [tourId, setTourId] = useState<string | null>(null);
  const [narrateOpen, setNarrateOpen] = useState(false);
  const [savedIds, setSavedIds] = useState<Set<string>>(loadSavedSet);
  const [previewTourId, setPreviewTourId] = useState<string | null>(null);

  const { activeStopId, audioRef, toggle, stopAll, onAudioEnded } = useAudioguidePlayback();

  const tour = tourId ? getAudioguideTourById(tourId) : undefined;
  const totalMins = tour ? audioguideTotalMins(tour) : 0;

  useEffect(() => {
    try {
      localStorage.setItem(SAVED_KEY, JSON.stringify([...savedIds]));
    } catch {
      // ignore
    }
  }, [savedIds]);

  const byCity = useMemo(() => {
    if (city === 'All') return AUDIOGUIDE_TOURS;
    return AUDIOGUIDE_TOURS.filter((t) => t.city === city);
  }, [city]);

  const visibleTours = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return byCity;
    return byCity.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.subtitle.toLowerCase().includes(q) ||
        t.city.toLowerCase().includes(q) ||
        t.stops.some((s) => s.title.toLowerCase().includes(q)),
    );
  }, [byCity, searchQuery]);

  const contextCity = city === 'All' ? 'Varanasi' : city;

  const relatedForNarrate = useMemo(() => {
    const c = city === 'All' ? 'Varanasi' : city;
    return AUDIOGUIDE_TOURS.filter((t) => t.city === c).slice(0, 4);
  }, [city]);

  const toggleSaved = (id: string) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handlePreview = (t: AudioguideTour) => {
    callNarratePause();
    const s0 = t.stops[0];
    if (!s0) return;
    const isThisPreview = previewTourId === t.id && activeStopId === s0.id;
    if (isThisPreview) {
      stopAll();
      setPreviewTourId(null);
      return;
    }
    stopAll();
    toggle(s0.id, s0.narration, s0.sampleAudioUrl);
    setPreviewTourId(t.id);
  };

  const openTour = (id: string) => {
    callNarratePause();
    stopAll();
    setPreviewTourId(null);
    setTourId(id);
  };

  const onTourStopToggle = (stopId: string, narration: string, mediaUrl?: string) => {
    callNarratePause();
    setPreviewTourId(null);
    toggle(stopId, narration, mediaUrl);
  };

  const handleBack = () => {
    if (tourId) {
      setTourId(null);
      return;
    }
    onExit();
  };

  useEffect(() => {
    if (tourId) return;
    if (!previewTourId || activeStopId !== null) return;
    setPreviewTourId(null);
  }, [tourId, previewTourId, activeStopId]);

  return (
    <div className="relative min-h-full bg-gradient-to-b from-[#F4F2FB] via-[#F8F7FC] to-[#EFEEF6] pb-28">
      <audio ref={audioRef} className="sr-only" playsInline onEnded={onAudioEnded} />

      <header className="sticky top-0 z-20 border-b border-white/60 bg-white/90 shadow-sm shadow-violet-950/5 backdrop-blur-md">
        <div className={`flex items-center gap-2.5 py-2.5 ${PAGE_PAD_X}`}>
          <CircleIconButton
            density="compact"
            icon={ArrowLeft}
            label={tourId ? 'Back to discovery' : 'Back to home'}
            onClick={handleBack}
            className="border border-gray-200/90 bg-white text-[#374151] shadow-sm hover:bg-violet-50/60"
            iconClassName="text-[#374151]"
          />
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-base font-semibold tracking-tight text-[#0F172A] sm:text-[17px]">
              {tour ? tour.title : 'Audio guides'}
            </h1>
            <p className="truncate text-xs text-[#64748B] sm:text-[13px]">
              {tour ? `${tour.city} · ${totalMins} min total` : 'Immersive walks & AI narration'}
            </p>
          </div>
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-violet-800 text-white shadow-md shadow-violet-900/25 ring-1 ring-white/20">
            <Headphones className="size-3" aria-hidden />
          </div>
        </div>
      </header>

      {!tour ? (
        <>
          <AudioGuideDiscoverHero
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            city={city}
            onCityChange={setCity}
          />

          <div className={`mt-1.5 space-y-2.5 pb-5 ${PAGE_PAD_X}`}>
            {visibleTours.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-violet-200/80 bg-white/80 px-4 py-8 text-center text-sm text-[#64748B] shadow-sm">
                No guides match your search. Try another city or keyword.
              </p>
            ) : (
              visibleTours.map((t, i) => {
                const mins = audioguideTotalMins(t);
                const s0 = t.stops[0];
                const isPreviewing = Boolean(s0 && previewTourId === t.id && activeStopId === s0.id);
                return (
                  <motion.div
                    key={t.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: Math.min(i * 0.04, 0.24) }}
                  >
                    <AudioGuideTourCard
                      tour={t}
                      totalMins={mins}
                      isBookmarked={savedIds.has(t.id)}
                      isPreviewing={isPreviewing}
                      onOpenTour={() => openTour(t.id)}
                      onPreview={() => handlePreview(t)}
                      onToggleBookmark={() => toggleSaved(t.id)}
                    />
                  </motion.div>
                );
              })
            )}
          </div>

          <button
            type="button"
            onClick={() => setNarrateOpen(true)}
            className={cn(
              'fixed z-40 flex min-h-[48px] items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-violet-700 px-4 py-2.5 text-sm font-semibold text-white shadow-xl shadow-violet-900/35 ring-2 ring-white/30 transition-transform hover:from-violet-500 hover:to-violet-600 active:scale-[0.97]',
              'bottom-[calc(4.25rem+env(safe-area-inset-bottom))] right-4 sm:bottom-[calc(4.5rem+env(safe-area-inset-bottom))]',
            )}
            aria-haspopup="dialog"
            aria-expanded={narrateOpen}
          >
            <Plus className="size-3 shrink-0 stroke-[2px]" aria-hidden />
            Narrate
          </button>

          <NarrateBottomSheet
            open={narrateOpen}
            onOpenChange={setNarrateOpen}
            contextCity={contextCity}
            relatedTours={relatedForNarrate}
            registerExternalPause={registerNarratePause}
            onPickRelatedTour={(id) => {
              setNarrateOpen(false);
              openTour(id);
            }}
          />
        </>
      ) : (
        <div className={`space-y-3 pt-3 ${PAGE_PAD_X}`}>
          <div className="rounded-2xl border border-violet-100/90 bg-gradient-to-r from-[#FAF5FF] to-white px-3.5 py-3 text-xs leading-relaxed text-violet-950 shadow-sm ring-1 ring-violet-100/80 sm:px-4 sm:py-3">
            <span className="font-semibold text-violet-900">{tour.language}</span>
            <span className="text-violet-400"> · </span>
            <span className="text-[#475569]">Use headphones outdoors and stay aware of traffic.</span>
          </div>

          <ol className="space-y-2.5">
            {tour.stops.map((stop) => {
              const playing = activeStopId === stop.id;
              return (
                <li
                  key={stop.id}
                  className="overflow-hidden rounded-2xl border border-gray-100/90 bg-white shadow-md shadow-slate-900/5 ring-1 ring-gray-100/80"
                >
                  <div className="flex gap-3 p-3 sm:gap-3 sm:p-3.5">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-100 to-violet-50 text-[11px] font-bold text-violet-800 sm:size-10 sm:text-xs">
                      {stop.order}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h2 className="text-sm font-semibold text-[#0F172A] sm:text-[15px]">{stop.title}</h2>
                          <p className="mt-0.5 text-[11px] font-medium text-[#64748B] sm:text-xs">
                            ~{stop.durationMins} min
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => onTourStopToggle(stop.id, stop.narration, stop.sampleAudioUrl)}
                          className={cn(
                            'flex size-10 shrink-0 items-center justify-center rounded-full shadow-md transition-colors',
                            playing
                              ? 'bg-slate-800 text-white hover:bg-slate-900'
                              : 'bg-gradient-to-br from-violet-600 to-violet-700 text-white hover:from-violet-500 hover:to-violet-600',
                          )}
                          aria-label={playing ? `Pause ${stop.title}` : `Play ${stop.title}`}
                        >
                          {playing ? <Pause className="size-3" /> : <Play className="size-3 pl-0.5" />}
                        </button>
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-[#475569] sm:text-[13px]">{stop.narration}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      )}
    </div>
  );
}
