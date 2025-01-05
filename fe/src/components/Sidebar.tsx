import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Facebook } from 'lucide-react'

export function Sidebar() {
    const comments = [
        {
            avatar: "https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg",
            name: "Đoàn Chi Phèo",
            comment: "xin mấy bộ gây nứng cực mạnh",
            time: "8 minutes",
            likes: 12
        },
        {
            avatar: "https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg",
            name: "Nhu Ann",
            comment: "cho hỏi, mà đạo tổ sư bản anime khúc lam trạm uống rượu say xong bắt gã bắt vit ở tập nào vậy, mình chỉ coi bản live nên mới biết",
            time: "2 minutes",
            likes: 5
        },
        {
            avatar: "https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg",
            name: "Duc Duongg",
            comment: "lập harem chọn mé cưng,healer bảo thủ",
            time: "2 minutes",
            likes: 3
        },
        {
            avatar: "https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg",
            name: "Duc Duongg",
            comment: "lập harem chọn mé cưng,healer bảo thủ",
            time: "2 minutes",
            likes: 3
        },
        {
            avatar: "https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg",
            name: "Duc Duongg",
            comment: "lập harem chọn mé cưng,healer bảo thủ",
            time: "2 minutes",
            likes: 3
        },
        {
            avatar: "https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg",
            name: "Duc Duongg",
            comment: "lập harem chọn mé cưng,healer bảo thủ",
            time: "2 minutes",
            likes: 3
        },
    ];

    const newlyMovie = [
        { title: "Tasokare Hotel", episode: "01" },
        { title: "Nhất Thế Độc Tôn", episode: "86" },
        { title: "Man Hoang Tiên Giới", episode: "33" },
        { title: "Luyện Khí Mười Vạn Năm", episode: "198" },
        { title: "Vạn Giới Độc Tôn", episode: "292" },
    ];
    return (
        <div className="space-y-6" data-aos="fade-left">
            <div className="rounded-xl bg-gray-900 p-4" data-aos="fade-left">
                <h3 className="mb-4 text-lg font-bold text-white">What to watch today?</h3>
                <p className="mb-4 text-sm text-gray-400">
                    If you are bored and don&apos;t know what to watch today. Let us choose for you.
                </p>
                <Button className="w-full rounded-xl bg-red-600 hover:bg-red-700">
                    Watch Random Movie
                </Button>
            </div>

            <div className="rounded-xl bg-gray-900 p-4" data-aos="fade-left">
                <h3 className="mb-4 text-lg font-bold text-white">NEWLY UPDATED MOVIE</h3>
                <div className="space-y-3">
                    {newlyMovie.map((anime, index) => (
                        <Link
                            key={index}
                            href="#"
                            className="flex items-center space-x-2 text-sm hover:text-red-500"
                        >
                            <span className="text-red-500">•</span>
                            <span className="flex-1 line-clamp-1 text-gray-300">{anime.title}</span>
                            <span className="text-gray-500">Tập {anime.episode}</span>
                        </Link>
                    ))}
                </div>
            </div>

            <div className="rounded-xl bg-gray-900 p-4" data-aos="fade-left">
                <h3 className="mb-4 text-lg font-bold text-white">Q/A</h3>
                <div className="mb-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Facebook className="h-6 w-6 text-blue-500" />
                            <span className="text-sm text-white">Don&apos;t forget to like MovieFlix page</span>
                        </div>
                        <span className="text-sm text-gray-500">4001 comments</span>
                    </div>
                    <div className="mt-2 flex items-center space-x-2">
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="Bình luận..."
                                className="w-full rounded-lg bg-gray-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                        </div>
                        <Button variant="outline" size="sm">
                            Latest
                        </Button>
                    </div>
                </div>
                <div className="space-y-4 overflow-auto scrollbar-hide max-h-80">
                    {comments.map((comment, index) => (
                        <div key={index} className="flex space-x-3">
                            <div className="h-8 w-8 flex-shrink-0">
                                <Image
                                    src={comment.avatar}
                                    alt={comment.name}
                                    width={32}
                                    height={32}
                                    className="rounded-full"
                                />
                            </div>
                            <div className="flex-1">
                                <div className="rounded-xl bg-gray-800 p-3">
                                    <p className="text-sm font-semibold text-white">{comment.name}</p>
                                    <p className="text-sm text-gray-300">{comment.comment}</p>
                                </div>
                                <div className="mt-1 flex items-center space-x-3 text-xs text-gray-400">
                                    <button className="hover:text-red-500">Like</button>
                                    <button className="hover:text-red-500">Reply</button>
                                    <span>{comment.time}</span>
                                    {comment.likes > 0 && (
                                        <span className="flex items-center space-x-1">
                                            <span>•</span>
                                            <span>{comment.likes} like(s)</span>
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}