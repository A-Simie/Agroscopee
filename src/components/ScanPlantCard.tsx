import React, { useRef, useState } from "react";
import { Upload, Camera, RefreshCcw, Microscope, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export const ScanPlantCard = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const cameraInputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const navigate = useNavigate();

  const handleFileUpload = () => fileInputRef.current?.click();
  const handleCameraOpen = () => cameraInputRef.current?.click();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
    setFileName(file.name.replace(/\.[^/.]+$/, ""));
  };

  const handleReset = () => {
    setPreview(null);
    setFileName(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (cameraInputRef.current) cameraInputRef.current.value = "";
  };

  const handleScan = () => {
    if (!fileName) return;
    setIsScanning(true);

    const slug = fileName
      .trim()
      .replace(/\s+/g, "-")
      .replace(/_+/g, "-")
      .toLowerCase();

    setTimeout(() => {
      setIsScanning(false);
      navigate(`/disease-analysis?disease=${slug}`);
    }, 5000);
  };

  return (
    <>
      {isScanning && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm text-white">
          <Loader2 className="w-16 h-16 animate-spin mb-4 text-green-400" />
          <p className="text-lg font-semibold animate-pulse">
            Scanning your plant image...
          </p>
        </div>
      )}

      <Card className="relative p-8 border-2 border-dashed border-border hover:border-primary/50 transition-colors dark:bg-gray-900">
        <div className="flex flex-col items-center text-center">
          {/* Preview or Placeholder */}
          <div className="mb-4 p-4 bg-primary/10 rounded-lg flex items-center justify-center w-40 h-40">
            {preview ? (
              <img
                src={preview}
                alt="Plant preview"
                className="w-full h-full object-cover rounded-md border border-gray-300 dark:border-gray-700 shadow-sm"
              />
            ) : (
              <div className="w-12 h-12 text-primary">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
                </svg>
              </div>
            )}
          </div>

          <h2 className="text-2xl font-semibold text-foreground mb-2">
            {preview ? "Preview your crop image" : "Scan a crop for disease"}
          </h2>

          <p className="text-muted-foreground mb-6 max-w-md">
            {preview
              ? "If this looks like the correct leaf or crop, start a health scan to detect diseases and nutrient issues."
              : "Upload or snap a clear photo of a plant leaf to run an instant disease analysis powered by AgroScope."}
          </p>

          {/* Hidden Inputs */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={handleFileChange}
          />

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            {!preview ? (
              <>
                <Button
                  className="gap-2 bg-green-700 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-700 text-white font-medium"
                  size="lg"
                  onClick={handleFileUpload}
                >
                  <Upload className="h-4 w-4" />
                  Upload from…
                </Button>

                <Button
                  variant="outline"
                  className="gap-2"
                  size="lg"
                  onClick={handleCameraOpen}
                >
                  <Camera className="h-4 w-4" />
                  Open Camera
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  className="gap-2 text-red-500 border-red-400 hover:bg-red-50 dark:hover:bg-red-900/10"
                  size="lg"
                  onClick={handleReset}
                >
                  <RefreshCcw className="h-4 w-4" />
                  Retake / Upload Again
                </Button>

                <Button
                  disabled={isScanning}
                  className="gap-2 bg-green-700 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-700 text-white font-medium"
                  size="lg"
                  onClick={handleScan}
                >
                  <Microscope className="h-4 w-4" />
                  Scan Crop
                </Button>
              </>
            )}
          </div>
        </div>
      </Card>
    </>
  );
};
