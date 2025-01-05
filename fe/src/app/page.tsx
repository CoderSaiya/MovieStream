"use client";

import { AOSInit } from "@/components/AOSInit";
import { Banner } from "@/components/Banner";
import { Features } from "@/components/Features";
import { MovieGrid } from "@/components/MovieGrid";
import { MovieType } from "@/types/movie";

export default function Home() {
  // data cung chua connect api, update sau
  const newMovies: MovieType[] = [
    {
      id: 1,
      title: "Doraemon: Nobita's New Dinosaur",
      episode: 1,
      views: "5,699",
      rating: 9.3,
      image: "https://upload.wikimedia.org/wikipedia/vi/9/97/Eiga_Doraemon_Nobita_no_Shin_Ky%C5%8Dry%C5%AB_poster.jpg",
    },
    {
      id: 2,
      title: "Doraemon: Nobita's New Dinosaur",
      episode: 1,
      views: "5,699",
      rating: 9.3,
      image: "https://upload.wikimedia.org/wikipedia/vi/9/97/Eiga_Doraemon_Nobita_no_Shin_Ky%C5%8Dry%C5%AB_poster.jpg",
    },
    {
      id: 3,
      title: "Doraemon: Nobita's New Dinosaur",
      episode: 1,
      views: "5,699",
      rating: 9.3,
      image: "https://upload.wikimedia.org/wikipedia/vi/9/97/Eiga_Doraemon_Nobita_no_Shin_Ky%C5%8Dry%C5%AB_poster.jpg",
    },
    {
      id: 4,
      title: "Doraemon: Nobita's New Dinosaur",
      episode: 1,
      views: "5,699",
      rating: 9.3,
      image: "https://upload.wikimedia.org/wikipedia/vi/9/97/Eiga_Doraemon_Nobita_no_Shin_Ky%C5%8Dry%C5%AB_poster.jpg",
    },
    {
      id: 5,
      title: "Doraemon: Nobita's New Dinosaur",
      episode: 1,
      views: "5,699",
      rating: 9.3,
      image: "https://upload.wikimedia.org/wikipedia/vi/9/97/Eiga_Doraemon_Nobita_no_Shin_Ky%C5%8Dry%C5%AB_poster.jpg",
    },
    {
      id: 6,
      title: "Doraemon: Nobita's New Dinosaur",
      episode: 1,
      views: "5,699",
      rating: 9.3,
      image: "https://upload.wikimedia.org/wikipedia/vi/9/97/Eiga_Doraemon_Nobita_no_Shin_Ky%C5%8Dry%C5%AB_poster.jpg",
    },
    {
      id: 7,
      title: "Doraemon: Nobita's New Dinosaur",
      episode: 1,
      views: "5,699",
      rating: 9.3,
      image: "https://upload.wikimedia.org/wikipedia/vi/9/97/Eiga_Doraemon_Nobita_no_Shin_Ky%C5%8Dry%C5%AB_poster.jpg",
    },
    {
      id: 8,
      title: "Doraemon: Nobita's New Dinosaur",
      episode: 1,
      views: "5,699",
      rating: 9.3,
      image: "https://upload.wikimedia.org/wikipedia/vi/9/97/Eiga_Doraemon_Nobita_no_Shin_Ky%C5%8Dry%C5%AB_poster.jpg",
    },
    {
      id: 9,
      title: "Doraemon: Nobita's New Dinosaur",
      episode: 1,
      views: "5,699",
      rating: 9.3,
      image: "https://upload.wikimedia.org/wikipedia/vi/9/97/Eiga_Doraemon_Nobita_no_Shin_Ky%C5%8Dry%C5%AB_poster.jpg",
    },
    {
      id: 10,
      title: "Doraemon: Nobita's New Dinosaur",
      episode: 1,
      views: "5,699",
      rating: 9.3,
      image: "https://upload.wikimedia.org/wikipedia/vi/9/97/Eiga_Doraemon_Nobita_no_Shin_Ky%C5%8Dry%C5%AB_poster.jpg",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <AOSInit />
      <main>
        <Banner />
        <Features />
        <MovieGrid movies={newMovies} title="New Movies" />
      </main>
    </div>
  );
}
