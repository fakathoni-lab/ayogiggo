import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Play, Volume2 } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious } from
"@/components/ui/carousel";

const VideoShowcase = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
  { key: "all", labelKey: "videoShowcase.categories.all" },
  { key: "fashion", labelKey: "videoShowcase.categories.fashion" },
  { key: "beauty", labelKey: "videoShowcase.categories.beauty" },
  { key: "tech", labelKey: "videoShowcase.categories.tech" },
  { key: "food", labelKey: "videoShowcase.categories.food" },
  { key: "fitness", labelKey: "videoShowcase.categories.fitness" },
  { key: "lifestyle", labelKey: "videoShowcase.categories.lifestyle" }];


  const videos = [
  { id: 1, creator: "Sarah M.", handle: "@sarahcreates", category: "fashion", views: "2.3M", thumbnail: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=1000&fit=crop&q=90" },
  { id: 2, creator: "Jake L.", handle: "@jakefitness", category: "fitness", views: "1.8M", thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=1000&fit=crop&q=90" },
  { id: 3, creator: "Emma K.", handle: "@emmastyle", category: "beauty", views: "3.1M", thumbnail: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=1000&fit=crop&q=90" },
  { id: 4, creator: "Mike T.", handle: "@miketech", category: "tech", views: "890K", thumbnail: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=600&h=1000&fit=crop&q=90" },
  { id: 5, creator: "Lisa R.", handle: "@lisaeats", category: "food", views: "1.2M", thumbnail: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=1000&fit=crop&q=90" },
  { id: 6, creator: "Tom W.", handle: "@tomtravels", category: "lifestyle", views: "2.7M", thumbnail: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&h=1000&fit=crop&q=90" },
  { id: 7, creator: "Nina P.", handle: "@ninalife", category: "lifestyle", views: "1.5M", thumbnail: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=600&h=1000&fit=crop&q=90" },
  { id: 8, creator: "Alex C.", handle: "@alexfashion", category: "fashion", views: "980K", thumbnail: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=1000&fit=crop&q=90" }];


  const filteredVideos = activeCategory === "all" ?
  videos :
  videos.filter((v) => v.category === activeCategory);

  const getCategoryLabel = (categoryKey: string) => {
    const cat = categories.find((c) => c.key === categoryKey);
    return cat ? t(cat.labelKey) : categoryKey;
  };

  return (
    <section className="py-20 bg-[#020617]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            {t('videoShowcase.title')} <span className="text-gradient">{t('videoShowcase.titleHighlight')}</span>
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto">
            {t('videoShowcase.subtitle')}
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) =>
          <button
            key={category.key}
            onClick={() => setActiveCategory(category.key)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
            activeCategory === category.key ?
            "bg-gradient-to-r from-primary to-accent text-white shadow-lg" :
            "bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-white"}`
            }>

              {t(category.labelKey)}
            </button>
          )}
        </div>

        {/* Video Carousel */}
        <Carousel
          opts={{
            align: "start",
            loop: true
          }}
          className="w-full max-w-6xl mx-auto">

          <CarouselContent className="-ml-2 md:-ml-4">
            {filteredVideos.map((video) =>
            <CarouselItem key={video.id} className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5">
                <div className="group relative aspect-[9/16] rounded-2xl overflow-hidden bg-slate-900 cursor-pointer card-hover">
                  {/* Thumbnail */}
                  <img
                  src={video.thumbnail}
                  alt={`${video.creator}'s video`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />

                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-14 h-14 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                      <Play className="w-6 h-6 text-primary-foreground fill-current ml-1" />
                    </div>
                  </div>
                  
                  {/* Sound Indicator */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm flex items-center gap-1">
                      <Volume2 className="w-3 h-3 text-white" />
                      <span className="text-xs text-white">Sound</span>
                    </div>
                  </div>
                  
                  {/* Creator Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="font-semibold text-white text-sm truncate">{video.creator}</p>
                    <p className="text-white/70 text-xs truncate">{video.handle}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-white/60">{video.views} {t('common.views').toLowerCase()}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary/80 text-white">
                        {getCategoryLabel(video.category)}
                      </span>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            )}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-12 bg-slate-900 border-white/10 text-white hover:bg-slate-800" />
          <CarouselNext className="hidden md:flex -right-12 bg-slate-900 border-white/10 text-white hover:bg-slate-800" />
        </Carousel>
      </div>
    </section>);

};

export default VideoShowcase;