import { useState, useCallback } from "react";
import Header from "@/components/Header";
import UploadForm from "@/components/UploadForm";
import AnalysisAnimation from "@/components/AnalysisAnimation";
import HybridReview from "@/components/HybridReview";
import DiagnosticResults from "@/components/DiagnosticResults";
import RetrofitRecommendations from "@/components/RetrofitRecommendations";
import MonitoringAlerts from "@/components/MonitoringAlerts";
import EnergyChart from "@/components/EnergyChart";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

type Phase = "upload" | "analyzing" | "review" | "results";

interface FormData {
  files: File[];
  hoursPerDay: number;
  machineType: string;
  year: string;
}

interface AISuggestion {
  machineType: string;
  yearEstimated: string;
  powerKW: number;
  hoursPerDay: number;
}

interface DiagnosticData {
  machineType: string;
  powerKW: number;
  annualConsumption: number;
  co2Emission: number;
  efficiencyLevel: "Baixo" | "Médio" | "Alto";
}

function generateSuggestion(form: FormData): AISuggestion {
  const powerMap: Record<string, number> = {
    "Motor Elétrico Industrial": 22,
    "Compressor de Ar": 37,
    "Bomba Hidráulica": 15,
    "Ventilador Industrial": 11,
    "Torno Mecânico": 7.5,
    "Prensa Hidráulica": 45,
    "Esteira Transportadora": 5.5,
    "Gerador Elétrico": 50,
    Outro: 18,
  };
  return {
    machineType: form.machineType,
    yearEstimated: form.year,
    powerKW: powerMap[form.machineType] ?? 18,
    hoursPerDay: form.hoursPerDay,
  };
}

function computeDiagnostic(s: AISuggestion): DiagnosticData {
  const annualHours = s.hoursPerDay * 365;
  const annualConsumption = Math.round(s.powerKW * annualHours * 0.85);
  const co2Emission = annualConsumption * 0.000082;
  let efficiencyLevel: DiagnosticData["efficiencyLevel"] = "Alto";
  if (s.yearEstimated.includes("198") || s.yearEstimated.includes("Anterior")) efficiencyLevel = "Baixo";
  else if (s.yearEstimated.includes("199") || s.yearEstimated.includes("200")) efficiencyLevel = "Médio";

  return {
    machineType: s.machineType,
    powerKW: s.powerKW,
    annualConsumption,
    co2Emission,
    efficiencyLevel,
  };
}

const Index = () => {
  const [phase, setPhase] = useState<Phase>("upload");
  const [suggestion, setSuggestion] = useState<AISuggestion | null>(null);
  const [diagnostic, setDiagnostic] = useState<DiagnosticData | null>(null);

  const handleUpload = (data: FormData) => {
    const s = generateSuggestion(data);
    setSuggestion(s);
    setPhase("analyzing");
  };

  const handleAnalysisComplete = useCallback(() => setPhase("review"), []);

  const handleConfirm = (data: AISuggestion) => {
    setDiagnostic(computeDiagnostic(data));
    setPhase("results");
  };

  const reset = () => {
    setPhase("upload");
    setSuggestion(null);
    setDiagnostic(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 sm:px-6">
        {phase === "upload" && <UploadForm onSubmit={handleUpload} />}
        {phase === "analyzing" && <AnalysisAnimation onComplete={handleAnalysisComplete} />}
        {phase === "review" && suggestion && (
          <HybridReview suggestion={suggestion} onConfirm={handleConfirm} />
        )}
        {phase === "results" && diagnostic && (
          <div className="space-y-10">
            <DiagnosticResults data={diagnostic} />
            <EnergyChart />
            <RetrofitRecommendations />
            <MonitoringAlerts />

            <div className="flex justify-center pt-4">
              <Button
                onClick={reset}
                variant="outline"
                className="gap-2 border-primary text-primary hover:bg-primary/10"
              >
                <RotateCcw className="h-4 w-4" /> Nova Análise
              </Button>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t bg-secondary/50 py-6 text-center text-xs text-muted-foreground">
        Sistema Inteligente de Diagnóstico de Máquinas Industriais — Simulação com IA © {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default Index;
