'use client'

import { PlayerActions } from '@/components/Playback/PlayerAction'
import { ServerSelection } from '@/components/Playback/ServerSection'
import { VideoPlayer } from '@/components/Playback/VideoPlayer'
import React from 'react'

export default function PlaybackPage() {
    return (
        <>
            <VideoPlayer />
            <PlayerActions />
            <ServerSelection />
        </>
    )
}