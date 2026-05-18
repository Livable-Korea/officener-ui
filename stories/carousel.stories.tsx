import type { Meta, StoryObj } from '@storybook/react';
import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../src/components/ui/carousel';

const meta = {
  title: 'Components/Carousel',
  component: Carousel,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

const SAMPLE_SLIDES = [
  { title: '빌딩 광고 수익, 지금 시작해 보세요', body: '엘리베이터·로비 디스플레이로 새 수익원을 만듭니다.' },
  { title: '입주사 만족도를 직접 확인하세요', body: '설문조사로 운영 인사이트를 얻을 수 있어요.' },
  { title: '회의실·헬스장 예약을 스마트하게', body: '공용시설 예약을 한 곳에서 관리하세요.' },
];

const SlideCard = ({ title, body }: { title: string; body: string }) => (
  <div className="flex h-40 flex-col justify-between rounded-lg bg-gradient-to-br from-indigo-50 to-blue-100 p-4">
    <div>
      <span className="inline-block rounded-full bg-white/70 px-2 py-0.5 text-sm font-medium text-indigo-700">이런 기능도 있어요!</span>
      <h4 className="mt-2 text-base font-bold text-gray-900">{title}</h4>
      <p className="mt-1 text-sm text-gray-600">{body}</p>
    </div>
    <span className="text-sm font-medium text-indigo-700">도입하기 →</span>
  </div>
);

export const Default: Story = {
  render: () => (
    <div className="w-[320px]">
      <Carousel opts={{ loop: true }}>
        <CarouselContent>
          {SAMPLE_SLIDES.map((slide) => (
            <CarouselItem key={slide.title}>
              <SlideCard {...slide} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
};

export const WithDots: Story = {
  render: () => (
    <div className="w-[320px]">
      <Carousel opts={{ loop: true }}>
        <CarouselContent>
          {SAMPLE_SLIDES.map((slide) => (
            <CarouselItem key={slide.title}>
              <SlideCard {...slide} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselDots className="mt-3" />
      </Carousel>
    </div>
  ),
};

export const Autoplaying: Story = {
  render: () => (
    <div className="w-[320px]">
      <Carousel
        opts={{ loop: true }}
        plugins={[Autoplay({ delay: 3500, stopOnInteraction: false, stopOnMouseEnter: true })]}
      >
        <CarouselContent>
          {SAMPLE_SLIDES.map((slide) => (
            <CarouselItem key={slide.title}>
              <SlideCard {...slide} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselDots className="mt-3" />
      </Carousel>
    </div>
  ),
};

export const DotsOverlayBottom: Story = {
  render: () => (
    <div className="w-[320px]">
      <Carousel opts={{ loop: true }} className="relative">
        <CarouselContent>
          {SAMPLE_SLIDES.map((slide) => (
            <CarouselItem key={slide.title}>
              <SlideCard {...slide} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselDots className="absolute bottom-3 left-1/2 -translate-x-1/2" />
      </Carousel>
    </div>
  ),
};
