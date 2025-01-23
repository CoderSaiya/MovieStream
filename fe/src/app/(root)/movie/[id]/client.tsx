'use client'

import { CommentsSection } from "@/components/Detail/CommentSection"
import { MovieDetails } from "@/components/Detail/MovieDetails"
import { MovieTab } from "@/components/Detail/MovieTab"
import { useGetMovieByIdQuery } from "@/redux/slice/api"
import { MovieDetailsProps } from "@/types"
import { MovieType } from "@/types/movie"
import { useParams } from "next/navigation"

export default function DetailClient() {
    // const movieData = {
    //     id: 1,
    //     title: "Doraemon: Nobita's New Dinosaur",
    //     alternateTitle: "Doraemon the Movie 2020: Nobita's New Dinosaur",
    //     synopsis: `Nobita vô tình tìm được một quả trứng khủng long hóa thạch xen lẫn đất đá trong khuôn viên triển lãm hóa thạch khủng long mà cậu đã đến tham quan trước đó. Cậu đưa nó trở về trạng thái nguyên thủy bằng "Khăn trùm thời gian". Sau khi đem ấp, quả trứng nở ra một loài khủng long mới không có tên trong Bách khoa toàn thư vũ trụ và đặt tên chúng là Kyū và Myū. Mặc dù muốn bí mật chăm sóc chúng song việc có khủng long trong phố vẫn bị cư dân phát hiện; Nobita cùng các bạn buộc phải đưa chúng về Kỷ Phấn Trắng 66 triệu năm trước — thời đại của chúng.`,
    //     coverImage: "https://upload.wikimedia.org/wikipedia/vi/9/97/Eiga_Doraemon_Nobita_no_Shin_Ky%C5%8Dry%C5%AB_poster.jpg",
    //     rating: 9.3,
    //     totalRatings: 27,
    //     releaseDate: "12/12",
    //     viewCount: '5,699',
    //     episodes: {
    //         current: 1,
    //         total: 1
    //     },
    //     schedule: "Oneshot",
    //     status: "Full",
    //     quality: "FHD",
    //     ageRating: "PG-13 - Teens 13 and up",
    //     language: "VietSub",
    //     studio: ["Shin-Ei Animation"],
    //     season: "Fall - 2024",
    //     genres: ["Action", "Adventure", "Comedy", "Fantasy", "Kids", "Shounen"],
    //     director: "Hiraoka Masahiro",
    //     country: "Japanese",
    //     followers: 55
    // }

    const id = Number(useParams().id);
    if (isNaN(id)) {
        throw new Error("Invalid movie id");
    }

    const { data } = useGetMovieByIdQuery(id)
    const movieData = data?.data

    const mapMovieDataToDetailsProps = (movie: MovieType | undefined): MovieDetailsProps => {
        return {
            title: movie?.title || "Unknow Title",
            alternateTitle: movie?.title ?? "Unknow Title",
            synopsis: movie?.synopsis || movie?.description || "No synopsis available.",
            coverImage: movie?.image || "",
            rating: movie?.rating || 0,
            totalRatings: 0,
            releaseDate: movie?.date || "Unknown Date",
            viewCount: movie?.views || "0",
            episodes: {
                current: movie?.episode || 0,
                total: 0,
            },
            schedule: "Unknown",
            status: "Unknown",
            quality: movie?.quality || "SD",
            ageRating: "N/A",
            language: "N/A",
            studio: movie?.studio ? [movie.studio] : [],
            season: movie?.year ? `Year ${movie.year}` : "Unknown",
            genres: movie?.genres || [],
            director: "N/A",
            country: "N/A",
            followers: 0,
        };
    };

    const movieDetailsProps = mapMovieDataToDetailsProps(movieData);

    return (
        <>
            <MovieDetails {...movieDetailsProps} />
            <MovieTab />
            <CommentsSection />
        </>
    );
}