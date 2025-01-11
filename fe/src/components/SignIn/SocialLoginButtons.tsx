import React from 'react'
import { Button } from '../ui/button'
import { Github, Mail } from 'lucide-react'

export function SocialLoginButtons() {
    return (
        <div className="grid gap-4 text-white">
            <Button className="bg-gray-800/50 hover:bg-gray-800">
                <Github className="mr-2 h-4 w-4" />
                Github
            </Button>
            <Button className="bg-gray-800/50 hover:bg-gray-800">
                <Mail className="mr-2 h-4 w-4" />
                Google
            </Button>
        </div>
    )
}