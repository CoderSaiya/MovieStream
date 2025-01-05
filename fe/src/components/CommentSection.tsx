import { Button } from "@/components/ui/button"
import Image from "next/image"

export function CommentsSection() {
    const comments =
        [
            {
                avatar: "https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg",
                name: "Nam Anh",
                comment: "Done 5/1/2025 !!!",
                time: "43 minute(s) ago"
            },
            {
                avatar: "https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg",
                name: "Oh HanKil",
                comment: "h ngôi hông SS2, cuối tập 12 nó announce luôn rồi",
                time: "2 minute(s) ago"
            }
        ]

    return (
        <div className="container py-6">
            <div className="space-y-6">
                <div className="flex">
                    <div className="flex items-center gap-2">
                        <span>Don&apos;t forget to like MovieFlix page</span>
                        <a className="flex h-[30px] p-4 bg-blue-600 jusitfy-center items-center gap-2 rounded" href="https://www.facebook.com" target="_blank" rel="noreferrer">
                            {/* Facebook Like Button Placeholder */}
                            <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Facebook_like_thumb.png/640px-Facebook_like_thumb.png" alt="Facebook Like Button" width={20} height={20} />
                            <span className="text-white gap-2">Like(s)</span>
                            <span className="text-white">58</span>
                        </a>
                    </div>
                    <div className="flex items-center px-2 gap-2">
                        <span>to update anime every day</span>
                    </div>
                </div>

                <div>
                    <p className="mb-2">
                        Join Discord <span className="text-red-500">here!!</span> or Telegram{" "}
                        <span className="text-red-500">here!</span> to get the fastest new anime notifications.
                    </p>
                    <div className="flex items-center justify-between">
                        <span>{comments.length} comment(s)</span>
                        <Button variant="outline" size="sm">
                            Latest
                        </Button>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex gap-3">
                        <Image
                            src="https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg"
                            alt="User Avatar"
                            width={40}
                            height={40}
                            className="h-10 w-10 rounded-full"
                        />
                        <div className="flex-1">
                            <textarea
                                placeholder="Bình luận..."
                                className="w-full rounded-lg border-2 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                                rows={3}
                            />
                        </div>
                    </div>

                    {/* Sample Comments */}
                    <div className="space-y-4">
                        {comments.map((comment, index) => (
                            <div key={index} className="flex gap-3">
                                <Image
                                    src={comment.avatar}
                                    alt={`${comment.name}'s avatar`}
                                    width={40}
                                    height={40}
                                    className="h-10 w-10 rounded-full"
                                />
                                <div className="flex-1">
                                    <div className="rounded-lg p-3">
                                        <p className="font-semibold">{comment.name}</p>
                                        <p>{comment.comment}</p>
                                    </div>
                                    <div className="mt-1 flex items-center gap-2 text-xs text-gray-400">
                                        <button className="hover:text-red-500">Like</button>
                                        <span>•</span>
                                        <button className="hover:text-red-500">Reply</button>
                                        <span>•</span>
                                        <span>{comment.time}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}