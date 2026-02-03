import { useRef, useState, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface VideoComment {
  id: string;
  timestamp_seconds: number;
  content: string;
  user_id: string;
  is_resolved: boolean;
}

interface ProVideoPlayerProps {
  videoUrl: string;
  comments?: VideoComment[];
  onTimeClick?: (time: number) => void;
  onCommentClick?: (comment: VideoComment) => void;
  showWatermark?: boolean;
  currentTime?: number;
}

export const ProVideoPlayer = ({
  videoUrl,
  comments = [],
  onTimeClick,
  onCommentClick,
  showWatermark = false,
  currentTime: externalCurrentTime
}: ProVideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [volume, setVolume] = useState(1);

  // Sync external currentTime (when comment is clicked)
  useEffect(() => {
    if (externalCurrentTime !== undefined && videoRef.current) {
      videoRef.current.currentTime = externalCurrentTime;
      setCurrentTime(externalCurrentTime);
    }
  }, [externalCurrentTime]);

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      containerRef.current.requestFullscreen();
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || !progressRef.current) return;

    const rect = progressRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * duration;

    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);

    // Notify parent for comment creation
    onTimeClick?.(newTime);
  };

  const handleMarkerClick = (comment: VideoComment, e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.currentTime = comment.timestamp_seconds;
      setCurrentTime(comment.timestamp_seconds);
    }
    onCommentClick?.(comment);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-black rounded-lg overflow-hidden group"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onContextMenu={(e) => showWatermark && e.preventDefault()}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full aspect-video"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        controlsList="nodownload"
      />

      {/* Watermark Overlay */}
      {showWatermark && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            className="text-white/30 text-4xl font-bold rotate-[-30deg] select-none"
            style={{
              textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
              userSelect: "none"
            }}
          >
            PREVIEW ONLY - GIGGO
          </motion.div>
        </div>
      )}

      {/* Custom Controls Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovering || !isPlaying ? 1 : 0 }}
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: isHovering || !isPlaying ? 1 : 0,
          y: isHovering || !isPlaying ? 0 : 20
        }}
        transition={{ duration: 0.2 }}
        className="absolute bottom-0 left-0 right-0 p-4 pointer-events-auto"
      >
        {/* Progress Bar with Markers */}
        <div className="mb-4">
          <div
            ref={progressRef}
            className="relative h-2 bg-white/20 rounded-full cursor-pointer hover:h-3 transition-all"
            onClick={handleProgressClick}
          >
            {/* Progress */}
            <motion.div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
              style={{ width: `${progress}%` }}
              initial={false}
              animate={{ width: `${progress}%` }}
            />

            {/* Comment Markers */}
            {comments.map((comment) => {
              const position = (comment.timestamp_seconds / duration) * 100;
              return (
                <motion.div
                  key={comment.id}
                  className={cn(
                    "absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full cursor-pointer",
                    "hover:scale-150 transition-transform z-10",
                    comment.is_resolved
                      ? "bg-green-500 border-2 border-green-300"
                      : "bg-red-500 border-2 border-red-300 animate-pulse"
                  )}
                  style={{ left: `${position}%` }}
                  onClick={(e) => handleMarkerClick(comment, e)}
                  whileHover={{ scale: 1.5 }}
                  title={comment.content}
                />
              );
            })}

            {/* Playhead */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg border-2 border-cyan-400"
              style={{ left: `${progress}%` }}
              initial={false}
              animate={{ left: `${progress}%` }}
            />
          </div>

          {/* Time Display */}
          <div className="flex justify-between mt-2 text-xs text-white/80 font-mono">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center gap-4">
          <button
            onClick={togglePlay}
            className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors backdrop-blur-sm"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 text-white" />
            ) : (
              <Play className="w-5 h-5 text-white ml-0.5" />
            )}
          </button>

          <button
            onClick={toggleMute}
            className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-white" />
            ) : (
              <Volume2 className="w-4 h-4 text-white" />
            )}
          </button>

          <div className="flex-1" />

          <button
            onClick={toggleFullscreen}
            className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors"
          >
            <Maximize className="w-4 h-4 text-white" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
