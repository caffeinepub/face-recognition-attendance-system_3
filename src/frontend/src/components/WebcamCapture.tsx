import { useCamera } from '../camera/useCamera';
import { Button } from '@/components/ui/button';
import { Camera, CameraOff, SwitchCamera, RotateCcw, Aperture } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useEffect } from 'react';

interface WebcamCaptureProps {
  onCapture: (file: File) => void;
  capturedImage?: string;
  onRetake?: () => void;
}

export function WebcamCapture({ onCapture, capturedImage, onRetake }: WebcamCaptureProps) {
  const {
    isActive,
    isSupported,
    error,
    isLoading,
    currentFacingMode,
    startCamera,
    stopCamera,
    capturePhoto,
    switchCamera,
    retry,
    videoRef,
    canvasRef,
  } = useCamera({
    facingMode: 'user',
    width: 1280,
    height: 720,
    quality: 0.95,
    format: 'image/jpeg',
  });

  useEffect(() => {
    return () => {
      if (isActive) {
        stopCamera();
      }
    };
  }, [isActive, stopCamera]);

  const handleCapture = async () => {
    const file = await capturePhoto();
    if (file) {
      onCapture(file);
      await stopCamera();
    }
  };

  const handleRetake = async () => {
    if (onRetake) {
      onRetake();
    }
    await startCamera();
  };

  if (isSupported === false) {
    return (
      <Alert variant="destructive" className="animate-slideIn">
        <AlertDescription className="text-base font-medium">
          Camera is not supported in your browser. Please use a modern browser with camera support.
        </AlertDescription>
      </Alert>
    );
  }

  if (capturedImage) {
    return (
      <div className="space-y-4">
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl border-2 border-primary/30 bg-muted shadow-lg">
          <img
            src={capturedImage}
            alt="Captured face"
            className="w-full h-full object-cover"
          />
        </div>
        <Button
          onClick={handleRetake}
          variant="outline"
          className="w-full h-11 font-semibold shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          disabled={isLoading}
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Retake Photo
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl border-2 border-border/60 bg-slate-900 shadow-lg" style={{ minHeight: '300px' }}>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
          style={{ transform: currentFacingMode === 'user' ? 'scaleX(-1)' : 'none' }}
        />
        <canvas ref={canvasRef} className="hidden" />
        
        {!isActive && !error && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900/90 backdrop-blur-sm">
            <div className="text-center text-white">
              <div className="inline-flex p-4 bg-primary/20 rounded-2xl mb-4">
                <Camera className="w-16 h-16 opacity-70" />
              </div>
              <p className="text-base font-medium">Camera preview will appear here</p>
            </div>
          </div>
        )}
      </div>

      {error && (
        <Alert variant="destructive" className="animate-slideIn">
          <AlertDescription className="text-base">
            <span className="font-semibold block mb-1">{error.message}</span>
            {error.type === 'permission' && (
              <span className="block text-sm opacity-90">
                Please allow camera access in your browser settings and try again.
              </span>
            )}
          </AlertDescription>
        </Alert>
      )}

      <div className="flex gap-3">
        {!isActive ? (
          <Button
            onClick={error ? retry : startCamera}
            disabled={isLoading}
            className="flex-1 h-11 font-semibold shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Camera className="w-4 h-4 mr-2" />
            {error ? 'Retry' : 'Start Camera'}
          </Button>
        ) : (
          <>
            <Button
              onClick={handleCapture}
              disabled={isLoading || !isActive}
              className="flex-1 h-11 font-semibold shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Aperture className="w-4 h-4 mr-2" />
              Capture Photo
            </Button>
            <Button
              onClick={stopCamera}
              disabled={isLoading}
              variant="outline"
              className="flex-1 h-11 font-semibold shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              <CameraOff className="w-4 h-4 mr-2" />
              Stop Camera
            </Button>
            {typeof window !== 'undefined' && !window.navigator.userAgent.includes('Mobile') && (
              <Button
                onClick={() => switchCamera()}
                disabled={isLoading}
                variant="outline"
                size="icon"
                className="h-11 w-11 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <SwitchCamera className="w-4 h-4" />
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
