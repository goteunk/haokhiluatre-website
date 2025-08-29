import { useEffect, useRef } from 'react';
import { Expand, RotateCcw, Home } from 'lucide-react';

interface ModelViewerProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ModelViewer({ src, alt, className = '' }: ModelViewerProps) {
  const viewerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Dynamically import model-viewer to avoid SSR issues
    const loadModelViewer = async () => {
      if (typeof window !== 'undefined') {
        await import('@google/model-viewer');
      }
    };
    loadModelViewer();
  }, []);

  const handleReset = () => {
    const viewer = viewerRef.current as any;
    if (viewer && viewer.resetTurntableRotation) {
      viewer.resetTurntableRotation();
      viewer.jumpCameraToGoal();
    }
  };

  const handleFullscreen = () => {
    const viewer = viewerRef.current as any;
    if (viewer && viewer.requestFullscreen) {
      viewer.requestFullscreen();
    }
  };

  const toggleAutoRotate = () => {
    const viewer = viewerRef.current as any;
    if (viewer) {
      const isRotating = viewer.hasAttribute('auto-rotate');
      if (isRotating) {
        viewer.removeAttribute('auto-rotate');
      } else {
        viewer.setAttribute('auto-rotate', '');
      }
    }
  };

  return (
    <div className={`relative ${className}`}>
      <model-viewer
        ref={viewerRef}
        src={src}
        alt={alt}
        camera-controls
        auto-rotate
        auto-rotate-delay="3000"
        rotation-per-second="30deg"
        environment-image="https://modelviewer.dev/shared-assets/environments/music_hall_01_1k.hdr"
        exposure="1"
        shadow-intensity="1"
        className="w-full h-full bg-muted rounded-lg"
        data-testid="model-viewer"
      >
        <div className="absolute inset-0 flex items-center justify-center bg-muted rounded-lg">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="text-muted-foreground">Đang tải mô hình 3D...</p>
          </div>
        </div>
      </model-viewer>

      {/* Controls */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-between">
        <div className="flex gap-2">
          <button
            onClick={toggleAutoRotate}
            className="bg-black/50 text-white p-2 rounded hover:bg-black/70 transition-colors"
            title="Xoay tự động"
            data-testid="button-auto-rotate"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={handleReset}
            className="bg-black/50 text-white p-2 rounded hover:bg-black/70 transition-colors"
            title="Reset camera"
            data-testid="button-reset-camera"
          >
            <Home className="w-4 h-4" />
          </button>
        </div>
        <button
          onClick={handleFullscreen}
          className="bg-black/50 text-white p-2 rounded hover:bg-black/70 transition-colors"
          title="Toàn màn hình"
          data-testid="button-fullscreen"
        >
          <Expand className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
