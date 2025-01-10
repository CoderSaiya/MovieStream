'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Camera } from 'lucide-react'

export function ProfileAvatar() {
    const [avatar, setAvatar] = useState('/images/init-avatar.png')

    return (
        <div className="relative h-32 w-32">
            <Image
                src={avatar}
                alt="Avatar"
                width={128}
                height={128}
                className="rounded-full object-cover"
            />
            <label
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-red-600 text-white hover:bg-red-700"
            >
                <Camera className="h-4 w-4" />
                <input
                    id="avatar-upload"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                            const reader = new FileReader()
                            reader.onloadend = () => {
                                setAvatar(reader.result as string)
                            }
                            reader.readAsDataURL(file)
                        }
                    }}
                />
            </label>
        </div>
    )
}