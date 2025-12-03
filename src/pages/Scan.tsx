import { useState, useRef, useEffect } from "react";
import { Eye, Smile, User, Camera, ArrowLeft, X } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type ScanType = "eye" | "teeth" | "skin" | null;

const scanOptions = [
  {
    id: "eye" as const,
    title: "Eye Scan",
    description: "Scan your eyes for irritation, redness, or early infections.",
    icon: Eye,
    instructions: [
      "Find a well-lit area",
      "Remove glasses if wearing any",
      "Look directly at the camera",
      "Keep your eyes open naturally",
    ],
  },
  {
    id: "teeth" as const,
    title: "Teeth Scan",
    description: "Analyze your teeth for dental health insights.",
    icon: Smile,
    instructions: [
      "Open your mouth wide",
      "Ensure good lighting inside mouth",
      "Capture upper and lower teeth",
      "Include gum line if possible",
    ],
  },
  {
    id: "skin" as const,
    title: "Face/Skin Scan",
    description: "Detect skin issues or inflammation.",
    icon: User,
    instructions: [
      "Remove makeup if possible",
      "Use natural lighting",
      "Capture the affected area clearly",
      "Include surrounding skin for context",
    ],
  },
];

const Scan = () => {
  const [selectedScan, setSelectedScan] = useState<ScanType>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const selectedOption = scanOptions.find((opt) => opt.id === selectedScan);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "user", width: 640, height: 480 } 
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraActive(true);
    } catch {
      toast.error("Unable to access camera. Please check permissions.");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  const handleStartScan = () => {
    setIsScanning(true);
    toast.info("Analyzing your scan...");
    // Simulate scanning process
    setTimeout(() => {
      setIsScanning(false);
      stopCamera();
      toast.success("Scan completed successfully!");
    }, 3000);
  };

  const handleBack = () => {
    stopCamera();
    setSelectedScan(null);
    setIsScanning(false);
  };

  useEffect(() => {
    if (selectedScan && !cameraActive) {
      startCamera();
    }
    return () => {
      stopCamera();
    };
  }, [selectedScan]);

  if (selectedScan && selectedOption) {
    return (
      <MainLayout>
        <div className="max-w-xl mx-auto space-y-6">
          <Button
            variant="ghost"
            onClick={handleBack}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Scan Selection
          </Button>

          {/* Header */}
          <div className="text-center">
            <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-3">
              <selectedOption.icon className="w-7 h-7 text-primary" />
            </div>
            <h1 className="text-xl font-bold text-foreground">{selectedOption.title}</h1>
            <p className="text-sm text-muted-foreground mt-1">{selectedOption.description}</p>
          </div>

          {/* Camera View */}
          <div className="medical-card p-4">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-muted">
              {cameraActive ? (
                <>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                  {isScanning && (
                    <div className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center">
                      <div className="w-14 h-14 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4" />
                      <p className="text-foreground font-medium">Analyzing...</p>
                      <p className="text-sm text-muted-foreground">Please hold still</p>
                    </div>
                  )}
                  {!isScanning && (
                    <button
                      onClick={stopCamera}
                      className="absolute top-3 right-3 p-2 rounded-full bg-background/80 hover:bg-background transition-colors"
                    >
                      <X className="w-4 h-4 text-foreground" />
                    </button>
                  )}
                </>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <Camera className="w-10 h-10 text-muted-foreground mb-3" />
                  <p className="text-sm text-muted-foreground">Initializing camera...</p>
                </div>
              )}
            </div>

            <Button
              className="w-full gradient-medical text-primary-foreground mt-4"
              onClick={handleStartScan}
              disabled={isScanning || !cameraActive}
            >
              <Camera className="w-4 h-4 mr-2" />
              {isScanning ? "Scanning..." : "Capture & Scan"}
            </Button>
          </div>

          {/* Instructions */}
          <div className="medical-card">
            <h3 className="font-semibold text-foreground mb-3">Quick Tips</h3>
            <ul className="space-y-2">
              {selectedOption.instructions.map((instruction, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-accent text-primary text-xs font-medium flex items-center justify-center shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <span className="text-sm text-muted-foreground">{instruction}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Start a Scan</h1>
          <p className="text-muted-foreground mt-1">
            Choose a scan type to analyze your health
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {scanOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setSelectedScan(option.id)}
              className="medical-card-hover text-left group"
            >
              <div className="scan-card-icon mb-4 group-hover:scale-110 transition-transform">
                <option.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {option.title}
              </h3>
              <p className="text-sm text-muted-foreground">{option.description}</p>
            </button>
          ))}
        </div>

        {/* Info Card */}
        <div className="medical-card bg-accent/50 border-primary/20">
          <h3 className="font-semibold text-foreground mb-2">How it works</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Our AI-powered scanning technology analyzes your images to detect potential health issues. 
            Results are generated in seconds and stored securely in your health profile. 
            All scans are for informational purposes and should not replace professional medical advice.
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Scan;
