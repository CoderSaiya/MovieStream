"use client";

import { AOSInit } from "@/components/AOSInit";
import { Banner } from "@/components/Banner";
import { MovieGrid } from "@/components/MovieGrid";
import { Sidebar } from "@/components/Sidebar";
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

  const hotMovies: MovieType[] = [
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
      <Banner />
      <main className="flex-1 py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-9">
              <MovieGrid movies={newMovies} title="NEW MOVIES" />
              <MovieGrid movies={hotMovies} title="HOT MOVIES" />
            </div>

            <aside className="lg:col-span-3">
              <Sidebar />
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
