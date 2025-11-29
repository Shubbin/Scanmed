import { useState } from "react";
import { Eye, Smile, User, Camera, Upload, ArrowLeft } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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

  const selectedOption = scanOptions.find((opt) => opt.id === selectedScan);

  const handleStartScan = () => {
    setIsScanning(true);
    // Simulate scanning process
    setTimeout(() => {
      setIsScanning(false);
      // Navigate to results or show results
    }, 3000);
  };

  if (selectedScan && selectedOption) {
    return (
      <MainLayout>
        <div className="max-w-2xl mx-auto space-y-6">
          <Button
            variant="ghost"
            onClick={() => setSelectedScan(null)}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Scan Selection
          </Button>

          <div className="medical-card text-center">
            <div className="w-16 h-16 rounded-xl bg-accent flex items-center justify-center mx-auto mb-4">
              <selectedOption.icon className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              {selectedOption.title}
            </h1>
            <p className="text-muted-foreground">{selectedOption.description}</p>
          </div>

          {/* Camera/Upload Area */}
          <div className="medical-card">
            <div
              className={cn(
                "aspect-video rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center bg-muted/50 transition-colors",
                isScanning && "border-primary bg-accent"
              )}
            >
              {isScanning ? (
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full border-4 border-primary border-t-transparent animate-spin mx-auto mb-4" />
                  <p className="text-foreground font-medium">Analyzing...</p>
                  <p className="text-sm text-muted-foreground">Please wait while we process your scan</p>
                </div>
              ) : (
                <>
                  <Camera className="w-12 h-12 text-muted-foreground mb-4" />
                  <p className="text-foreground font-medium mb-2">
                    Ready to scan
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Position your camera and click scan to begin
                  </p>
                </>
              )}
            </div>

            <div className="flex gap-3 mt-4">
              <Button
                className="flex-1 gradient-medical text-primary-foreground"
                onClick={handleStartScan}
                disabled={isScanning}
              >
                <Camera className="w-4 h-4 mr-2" />
                {isScanning ? "Scanning..." : "Start Scan"}
              </Button>
              <Button variant="outline" className="flex-1" disabled={isScanning}>
                <Upload className="w-4 h-4 mr-2" />
                Upload Image
              </Button>
            </div>
          </div>

          {/* Instructions */}
          <div className="medical-card">
            <h3 className="font-semibold text-foreground mb-4">Scan Instructions</h3>
            <ul className="space-y-3">
              {selectedOption.instructions.map((instruction, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-accent text-primary text-sm font-medium flex items-center justify-center flex-shrink-0">
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
