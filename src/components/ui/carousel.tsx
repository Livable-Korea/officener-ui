import { cn } from '@/lib/utils';
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from 'embla-carousel-react';
import * as React from 'react';

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

interface CarouselProps {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: 'horizontal' | 'vertical';
  setApi?: (api: CarouselApi) => void;
}

interface CarouselContextProps extends CarouselProps {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  scrollTo: (index: number) => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  selectedIndex: number;
  slideCount: number;
}

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

const useCarousel = () => {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error('useCarousel must be used within a <Carousel />');
  }
  return context;
};

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = 'horizontal',
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === 'horizontal' ? 'x' : 'y',
      },
      plugins,
    );
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [slideCount, setSlideCount] = React.useState(0);

    const onSelect = React.useCallback((emblaApi: CarouselApi) => {
      if (!emblaApi) return;
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
      setSelectedIndex(emblaApi.selectedScrollSnap());
    }, []);

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev();
    }, [api]);

    const scrollNext = React.useCallback(() => {
      api?.scrollNext();
    }, [api]);

    const scrollTo = React.useCallback(
      (index: number) => {
        api?.scrollTo(index);
      },
      [api],
    );

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === 'ArrowRight') {
          event.preventDefault();
          scrollNext();
        }
      },
      [scrollPrev, scrollNext],
    );

    React.useEffect(() => {
      if (!api || !setApi) return;
      setApi(api);
    }, [api, setApi]);

    React.useEffect(() => {
      if (!api) return;
      setSlideCount(api.scrollSnapList().length);
      onSelect(api);
      api.on('reInit', onSelect);
      api.on('select', onSelect);
      return () => {
        api.off('select', onSelect);
      };
    }, [api, onSelect]);

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api,
          opts,
          orientation:
            orientation || (opts?.axis === 'y' ? 'vertical' : 'horizontal'),
          scrollPrev,
          scrollNext,
          scrollTo,
          canScrollPrev,
          canScrollNext,
          selectedIndex,
          slideCount,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn('relative', className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  },
);
Carousel.displayName = 'Carousel';

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel();
  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          'flex',
          orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col',
          className,
        )}
        {...props}
      />
    </div>
  );
});
CarouselContent.displayName = 'CarouselContent';

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel();
  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        'min-w-0 shrink-0 grow-0 basis-full',
        orientation === 'horizontal' ? 'pl-4' : 'pt-4',
        className,
      )}
      {...props}
    />
  );
});
CarouselItem.displayName = 'CarouselItem';

interface CarouselButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 화살표 아이콘 (자유 주입). 미지정 시 기본 SVG 표시 */
  icon?: React.ReactNode;
}

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  CarouselButtonProps
>(({ className, icon, ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();
  return (
    <button
      ref={ref}
      type="button"
      onClick={scrollPrev}
      disabled={!canScrollPrev}
      aria-label="이전 슬라이드"
      className={cn(
        'absolute z-10 flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition disabled:cursor-not-allowed disabled:opacity-50 hover:bg-gray-50',
        orientation === 'horizontal'
          ? '-left-3 top-1/2 -translate-y-1/2'
          : '-top-3 left-1/2 -translate-x-1/2 rotate-90',
        className,
      )}
      {...props}
    >
      {icon ?? <DefaultArrowIcon direction="prev" />}
    </button>
  );
});
CarouselPrevious.displayName = 'CarouselPrevious';

const CarouselNext = React.forwardRef<HTMLButtonElement, CarouselButtonProps>(
  ({ className, icon, ...props }, ref) => {
    const { orientation, scrollNext, canScrollNext } = useCarousel();
    return (
      <button
        ref={ref}
        type="button"
        onClick={scrollNext}
        disabled={!canScrollNext}
        aria-label="다음 슬라이드"
        className={cn(
          'absolute z-10 flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition disabled:cursor-not-allowed disabled:opacity-50 hover:bg-gray-50',
          orientation === 'horizontal'
            ? '-right-3 top-1/2 -translate-y-1/2'
            : '-bottom-3 left-1/2 -translate-x-1/2 rotate-90',
          className,
        )}
        {...props}
      >
        {icon ?? <DefaultArrowIcon direction="next" />}
      </button>
    );
  },
);
CarouselNext.displayName = 'CarouselNext';

const CarouselDots = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { slideCount, selectedIndex, scrollTo } = useCarousel();
  if (slideCount <= 1) return null;
  return (
    <div
      ref={ref}
      className={cn('flex items-center justify-center gap-1.5', className)}
      {...props}
    >
      {Array.from({ length: slideCount }).map((_, idx) => {
        const isActive = idx === selectedIndex;
        return (
          <button
            // biome-ignore lint/suspicious/noArrayIndexKey: 슬라이드 인덱스는 안정적
            key={idx}
            type="button"
            onClick={() => scrollTo(idx)}
            aria-label={`${idx + 1}번째 슬라이드로 이동`}
            aria-current={isActive}
            className={cn(
              'h-1.5 rounded-full transition-all',
              isActive ? 'w-4 bg-gray-700' : 'w-1.5 bg-gray-300 hover:bg-gray-400',
            )}
          />
        );
      })}
    </div>
  );
});
CarouselDots.displayName = 'CarouselDots';

const DefaultArrowIcon = ({ direction }: { direction: 'prev' | 'next' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {direction === 'prev' ? <polyline points="15 18 9 12 15 6" /> : <polyline points="9 18 15 12 9 6" />}
  </svg>
);

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
  useCarousel,
};
export type { CarouselApi, CarouselOptions, CarouselPlugin };
