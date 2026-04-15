import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Edit3, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AISuggestion {
  machineType: string;
  yearEstimated: string;
  powerKW: number;
  hoursPerDay: number;
}

interface Props {
  suggestion: AISuggestion;
  onConfirm: (data: AISuggestion) => void;
}

const HybridReview = ({ suggestion, onConfirm }: Props) => {
  const [data, setData] = useState(suggestion);

  const fields: { key: keyof AISuggestion; label: string; type: string }[] = [
    { key: "machineType", label: "Tipo da Máquina", type: "text" },
    { key: "yearEstimated", label: "Ano Estimado", type: "text" },
    { key: "powerKW", label: "Potência Estimada (kW)", type: "number" },
    { key: "hoursPerDay", label: "Horas de Uso/dia", type: "number" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-2xl"
    >
      <div className="industrial-card overflow-hidden">
        <div className="flex items-center gap-3 bg-primary/10 px-6 py-4">
          <Sparkles className="h-5 w-5 text-primary" />
          <div>
            <h3 className="font-bold text-foreground">Sugestões da IA</h3>
            <p className="text-xs text-muted-foreground">Revise e edite os dados antes do cálculo final</p>
          </div>
        </div>

        <div className="space-y-4 p-6">
          {fields.map(({ key, label, type }) => (
            <div key={key} className="flex items-center gap-4">
              <label className="w-44 flex-shrink-0 text-sm font-medium text-foreground">{label}</label>
              <div className="relative flex-1">
                <Input
                  type={type}
                  value={data[key]}
                  onChange={(e) =>
                    setData((p) => ({
                      ...p,
                      [key]: type === "number" ? Number(e.target.value) : e.target.value,
                    }))
                  }
                  className="bg-secondary/50 pr-8"
                />
                <Edit3 className="absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>
          ))}

          <Button
            onClick={() => onConfirm(data)}
            className="mt-4 w-full gap-2 bg-primary py-5 font-bold text-primary-foreground hover:bg-industrial-green-dark"
          >
            <Check className="h-5 w-5" /> Confirmar e Gerar Diagnóstico
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default HybridReview;
