import { SkipForward, MessageSquare, Lightbulb, Bookmark, Maximize2, AlertTriangle, Camera } from 'lucide-react'
import { Button } from "@/components/ui/button"

export function PlayerActions() {
    return (
        <div className="flex flex-wrap items-center gap-2 border-b border-gray-800 p-4">
            <Button variant="ghost" className="flex items-center gap-2">
                <SkipForward className="h-4 w-4" />
                Next episode
            </Button>
            <Button variant="ghost" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Comments
            </Button>
            <Button variant="ghost" className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                Lights out
            </Button>
            <Button variant="ghost" className="flex items-center gap-2">
                <Bookmark className="h-4 w-4" />
                Follows
            </Button>
            <Button variant="ghost" className="flex items-center gap-2">
                <Maximize2 className="h-4 w-4" />
                Zoom In
            </Button>
            <Button variant="ghost" className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Report
            </Button>
            <Button variant="ghost" className="flex items-center gap-2">
                <Camera className="h-4 w-4" />
                Screenshot
            </Button>
        </div>
    )
}