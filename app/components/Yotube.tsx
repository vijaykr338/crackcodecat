"use client";
import { YouTubeEmbed } from '@next/third-parties/google'

interface VideoSectionProps {
  videoId: string;
}

export default function VideoSection({ videoId }: VideoSectionProps) {
  return (
    <div className="min-h-screen w-full grid place-items-center py-0">
      <div className="w-full max-w-4xl px-0">
        <div className="aspect-video w-full">
          <YouTubeEmbed
            videoid={videoId}
            style="width: 100%; height: 100%; display: block; margin: 0 auto;"
          />
        </div>
      </div>
    </div>
  );
}
