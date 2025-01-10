'use client';

import { Button } from "@/components/ui/button"
import { Breadcrumb } from '../Breadcrumb';
import Link from "next/link";

export function ProfileHeader() {
    const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: "Edit profile", href: "#" },
    ];

    const handleSave = () => {
        // Save profile (update later)
    }

    return (
        <div className="flex items-center justify-between border-b bg-white px-6 py-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
                <Breadcrumb items={breadcrumbItems} />
            </div>
            <div className="flex items-center gap-4">
                <Link href={"/"}>
                    <Button variant="ghost" data-aos="fade-up">Cancle</Button>
                </Link>
                <Button className="bg-red-600 hover:bg-red-700" data-aos="fade-down" onClick={handleSave}>
                    Save
                </Button>
            </div>
        </div>
    )
}