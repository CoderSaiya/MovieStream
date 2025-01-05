'use client'

import { MovieType } from "@/types/movie";
import Image from "next/image";
import { useState } from "react";
import { Button } from "../ui/button";
import { Play } from "lucide-react";

export const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  // update sau
  const slides: MovieType[] = [
    {
      id: 1,
      title: "NEET Kunoichi to Nazeka Dousei Hajimemashita",
      image: "https://i.ytimg.com/vi/VQOQDIm3XhA/maxresdefault.jpg",
      episode: 20,
      date: "01/24",
      year: 2025,
      isHD: true,
      synopsis: "Tsukasa, một người bình thường làm công ăn lương bị yêu quái tấn công và được cứu bởi cô gái ninja Shizuri...",
      studio: "Quad",
      genres: ["Slice of Life", "Shounen", "Supernatural", "Romance", "Comedy"]
    },
    {
      id: 2,
      title: "NEET Kunoichi to Nazeka Dousei Hajimemashita",
      image: "https://i.ytimg.com/vi/VQOQDIm3XhA/maxresdefault.jpg",
      episode: 20,
      date: "01/24",
      year: 2025,
      isHD: true,
      synopsis: "Tsukasa, một người bình thường làm công ăn lương bị yêu quái tấn công và được cứu bởi cô gái ninja Shizuri...",
      studio: "Quad",
      genres: ["Slice of Life", "Shounen", "Supernatural", "Romance", "Comedy"]
    },
    {
      id: 3,
      title: "NEET Kunoichi to Nazeka Dousei Hajimemashita",
      image: "https://i.ytimg.com/vi/VQOQDIm3XhA/maxresdefault.jpg",
      episode: 20,
      date: "01/24",
      year: 2025,
      isHD: true,
      synopsis: "Tsukasa, một người bình thường làm công ăn lương bị yêu quái tấn công và được cứu bởi cô gái ninja Shizuri...",
      studio: "Quad",
      genres: ["Slice of Life", "Shounen", "Supernatural", "Romance", "Comedy"]
    },
  ]

  return (
    <div className="relative h-[500px] w-full">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-500 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
        >
          <div className="relative h-full w-full">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority
              data-aos="zoom-in"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <h1 className="mb-2 text-3xl font-bold md:text-4xl lg:text-5xl text-white" data-aos="fade-right">
                {slide.title}
              </h1>
              <div className="mb-4 flex flex-wrap items-center gap-3 text-sm" data-aos="fade-left">
                <span className="rounded bg-yellow-500/20 px-2 py-1 text-yellow-500 text-white">
                  {slide.episode}
                </span>
                <span className="text-white">{slide.date}</span>
                <span className="text-white">{slide.year}</span>
                {slide.isHD && (
                  <span className="rounded bg-red-600 px-2 py-1 text-xs font-bold text-white">
                    HD
                  </span>
                )}
              </div>
              <p className="mb-4 max-w-2xl text-sm text-gray-300 md:text-base" data-aos="fade-right">
                {slide.synopsis}
              </p>
              <div className="mb-4 space-y-2" data-aos="fade-left">
                <div className="flex items-center space-x-2 text-sm">
                  <span className="font-semibold text-white">Studio:</span>
                  <span className="text-white">{slide.studio}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-white">
                  <span className="font-semibold">Thể Loại:</span>
                  <div className="flex flex-wrap gap-2">
                    {slide.genres?.map((genre) => (
                      <span
                        key={genre}
                        className="rounded border border-gray-600 px-2 py-0.5 text-xs"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4" data-aos="fade-up">
                <Button className="bg-red-600 hover:bg-red-700">
                  <Play className="mr-2 h-4 w-4" /> Watch
                </Button>
                {/* <div className="flex -space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-800 bg-gray-900"
                    >
                      <User2 className="h-4 w-4" />
                    </div>
                  ))}
                </div> */}
                <button className="rounded border border-gray-600 p-2">
                  <span className="sr-only">More options</span>
                  <div className="space-y-1">
                    <div className="h-1 w-1 rounded-full bg-current bg-white"></div>
                    <div className="h-1 w-1 rounded-full bg-current bg-white"></div>
                    <div className="h-1 w-1 rounded-full bg-current bg-white"></div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full ${index === currentSlide ? 'bg-red-600' : 'bg-gray-600'
              }`}
            onClick={() => setCurrentSlide(index)}
          >
            <span className="sr-only">Slide {index + 1}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
