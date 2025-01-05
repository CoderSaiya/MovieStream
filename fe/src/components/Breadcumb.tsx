import Link from "next/link"
import { ChevronRight } from 'lucide-react'
import { BreadcrumbItem } from "@/types"

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
    return (
        <nav className="container py-4">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-400">
                {items.map((item, index) => (
                    <li key={item.href} className="flex items-center gap-2">
                        <Link href={item.href} className={`${index < items.length - 1 && ("hover:text-red-500")}`}>
                            {item.label}
                        </Link>
                        {index < items.length - 1 && (
                            <ChevronRight className="h-4 w-4" />
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    )
}