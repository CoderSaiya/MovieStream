import { useRef, useEffect } from 'react'
import { Play, Pause, Volume2, VolumeX, Maximize, SkipForward, Settings } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { useVideoPlayerStore } from '@/types/state'

export function VideoPlayer() {
    const videoRef = useRef<HTMLVideoElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    const {
        isPlaying,
        isMuted,
        volume,
        currentTime,
        duration,
        showOverlay,
        error,
        isLoading,
        setIsPlaying,
        setIsMuted,
        setVolume,
        setCurrentTime,
        setDuration,
        setShowOverlay,
        setError,
        setIsLoading
      } = useVideoPlayerStore();

    useEffect(() => {
        const video = videoRef.current
        if (video) {
            video.volume = volume

            const handleMetadata = () => {
                setDuration(video.duration)
                setIsLoading(false)
            }

            video.addEventListener('loadedmetadata', handleMetadata)

            if (video.readyState >= 1) {
                handleMetadata()
            }

            return () => {
                video.removeEventListener('loadedmetadata', handleMetadata)
            }
        }
    }, [volume])

    const togglePlay = () => {
        const video = videoRef.current;
        if (video) {
            if (showOverlay) {
                setShowOverlay(false);
            }

            if (isPlaying) {
                video.pause();
            } else {
                // doi video ready
                if (video.readyState >= 3) {
                    video.play().catch((err) => {
                        setError('Video could not be played. Please try again later.');
                        console.error('Playback error:', err);
                    });
                } else {
                    setError('Video is not ready yet. Please wait...');
                }
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted
            setIsMuted(!isMuted)
        }
    }

    const handleVolumeChange = (value: number[]) => {
        const newVolume = value[0]
        if (videoRef.current) {
            videoRef.current.volume = newVolume
            setVolume(newVolume)
            if (newVolume > 0 && isMuted) {
                setIsMuted(false)
                videoRef.current.muted = false
            }
        }
    }

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime)
        }
    }

    const handleLoadedMetadata = () => {
        const video = videoRef.current;
        if (video && video.readyState >= 1) {
            setDuration(video.duration);
        } else {
            console.error('Video metadata is not ready.');
        }
    };

    const handleError = () => {
        setError('There was an error loading the video. Please try again later.')
        setIsLoading(false);
    }

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            containerRef.current?.requestFullscreen().catch(err => {
                console.error('Error attempting to enable fullscreen:', err)
            })
        } else {
            document.exitFullscreen()
        }
    }

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        return `${minutes}:${seconds.toString().padStart(2, '0')}`
    }

    return (
        <div ref={containerRef} className="relative aspect-video w-full bg-black">
            {showOverlay && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/80 text-center p-4">
                    <h2 className="text-3xl font-bold text-yellow-500 mb-4">THIS WEBSITE CONTAINS ADS!</h2>
                    <p className="text-2xl text-gray-400 mb-4">HOW TO MAINTAIN A WEBSITE WITHOUT ADVERTISING?!</p>
                    <p className="text-xl text-white mb-8">IF YOU USE AD BLOCKER</p>
                    <p className="text-xl text-red-500">PLEASE TURN OFF TO SUPPORT MOVIEFLIX!</p>
                    <Button
                        size="lg"
                        className="mt-8 bg-red-600 hover:bg-red-700"
                        onClick={togglePlay}
                    >
                        <Play className="mr-2 h-6 w-6" />
                        WATCH NOW
                    </Button>
                </div>
            )}

            {error && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/90">
                    <div className="text-center">
                        <p className="text-red-500 mb-4">{error}</p>
                        <Button
                            onClick={() => {
                                setError(null)
                                if (videoRef.current) {
                                    videoRef.current.load()
                                    setIsLoading(true)
                                }
                            }}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            Retry
                        </Button>
                    </div>
                </div>
            )}

            {isLoading && !error && !showOverlay && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/50">
                    <div className="text-white">Loading video...</div>
                </div>
            )}

            <video
                ref={videoRef}
                className="h-full w-full"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onError={handleError}
                onEnded={() => setIsPlaying(false)}
                playsInline
            >
                <source
                    src="/videos/test.mp4"
                />
                Your browser does not support video playback.
            </video>

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <Slider
                    value={[currentTime]}
                    max={duration}
                    step={1}
                    className="mb-4"
                    onValueChange={(value) => {
                        if (videoRef.current) {
                            videoRef.current.currentTime = value[0]
                        }
                    }}
                />
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={togglePlay}
                            className="hover:bg-white/20"
                        >
                            {isPlaying ? (
                                <Pause className="h-6 w-6" />
                            ) : (
                                <Play className="h-6 w-6" />
                            )}
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleMute}
                            className="hover:bg-white/20"
                        >
                            {isMuted || volume === 0 ? (
                                <VolumeX className="h-6 w-6" />
                            ) : (
                                <Volume2 className="h-6 w-6" />
                            )}
                        </Button>
                        <div className="w-24">
                            <Slider
                                value={[volume]}
                                max={1}
                                step={0.1}
                                onValueChange={handleVolumeChange}
                            />
                        </div>
                        <span className="text-sm">
                            {formatTime(currentTime)} / {formatTime(duration)}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="hover:bg-white/20">
                            <SkipForward className="h-6 w-6" />
                        </Button>
                        <Button variant="ghost" size="icon" className="hover:bg-white/20">
                            <Settings className="h-6 w-6" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="hover:bg-white/20"
                            onClick={toggleFullscreen}
                        >
                            <Maximize className="h-6 w-6" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}