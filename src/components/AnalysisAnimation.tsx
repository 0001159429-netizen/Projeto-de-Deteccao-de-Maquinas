import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ScanLine, Cpu, Gauge, Zap } from "lucide-react";

const STEPS = [
  { icon: ScanLine, text: "Analisando imagem da máquina...", duration: 2000 },
  { icon: Cpu, text: "Identificando tipo e componentes...", duration: 2500 },
  { icon: Gauge, text: "Estimando idade e eficiência...", duration: 2000 },
  { icon: Zap, text: "Calculando consumo energético...", duration: 1500 },
];

interface Props {
  onComplete: () => void;
}

const AnalysisAnimation = ({ onComplete }: Props) => {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (step >= STEPS.length) {
      onComplete();
      return;
    }
    const duration = STEPS[step].duration;
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setStep((s) => s + 1);
            setProgress(0);
          }, 300);
          return 100;
        }
        return p + 100 / (duration / 50);
      });
    }, 50);
    return () => clearInterval(interval);
  }, [step, onComplete]);

  if (step >= STEPS.length) return null;

  const Icon = STEPS[step].icon;
  const totalProgress = ((step + progress / 100) / STEPS.length) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="mx-auto max-w-lg"
    >
      <div className="industrial-card glow-green p-10 text-center">
        <motion.div
          key={step}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10"
        >
          <Icon className="h-10 w-10 text-primary" />
        </motion.div>

        <motion.p
          key={`text-${step}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 text-lg font-semibold text-foreground"
        >
          {STEPS[step].text}
        </motion.p>

        <div className="mb-3 h-2 overflow-hidden rounded-full bg-secondary">
          <motion.div
            className="h-full rounded-full bg-primary"
            style={{ width: `${totalProgress}%` }}
            transition={{ ease: "easeOut" }}
          />
        </div>

        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Etapa {step + 1} de {STEPS.length}</span>
          <span>{Math.round(totalProgress)}%</span>
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-2 w-2 rounded-full transition-colors ${
                i <= step ? "bg-primary" : "bg-secondary"
              }`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default AnalysisAnimation;
