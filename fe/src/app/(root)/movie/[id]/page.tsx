import { Metadata } from "next";
import DetailClient from "./client";

// update sau
  const movieData = {
    id: 1,
    title: "Doraemon: Nobita's New Dinosaur",
    alternateTitle: "Doraemon the Movie 2020: Nobita's New Dinosaur",
    synopsis: `Nobita vô tình tìm được một quả trứng khủng long hóa thạch xen lẫn đất đá trong khuôn viên triển lãm hóa thạch khủng long mà cậu đã đến tham quan trước đó. Cậu đưa nó trở về trạng thái nguyên thủy bằng "Khăn trùm thời gian". Sau khi đem ấp, quả trứng nở ra một loài khủng long mới không có tên trong Bách khoa toàn thư vũ trụ và đặt tên chúng là Kyū và Myū. Mặc dù muốn bí mật chăm sóc chúng song việc có khủng long trong phố vẫn bị cư dân phát hiện; Nobita cùng các bạn buộc phải đưa chúng về Kỷ Phấn Trắng 66 triệu năm trước — thời đại của chúng.`,
    coverImage: "https://upload.wikimedia.org/wikipedia/vi/9/97/Eiga_Doraemon_Nobita_no_Shin_Ky%C5%8Dry%C5%AB_poster.jpg",
    rating: 9.3,
    totalRatings: 27,
    releaseDate: "12/12",
    viewCount: '5,699',
    episodes: {
      current: 1,
      total: 1
    },
    schedule: "Oneshot",
    status: "Full",
    quality: "FHD",
    ageRating: "PG-13 - Teens 13 and up",
    language: "VietSub",
    studio: ["Shin-Ei Animation"],
    season: "Fall - 2024",
    genres: ["Action", "Adventure", "Comedy", "Fantasy", "Kids", "Shounen"],
    director: "Hiraoka Masahiro",
    country: "Japanese",
    followers: 55
  }


export const metadata: Metadata = {
  title: movieData.title,
  description: movieData.synopsis,
};

export default function DetailPage() {
  return (
    <DetailClient/>
  )
}

