import { motion } from "framer-motion";
import { Zap, Flame, Gauge, Factory, TrendingDown, BarChart3 } from "lucide-react";

interface DiagnosticData {
  machineType: string;
  powerKW: number;
  annualConsumption: number;
  co2Emission: number;
  efficiencyLevel: "Baixo" | "Médio" | "Alto";
}

interface Props {
  data: DiagnosticData;
}

const efficiencyColor = {
  Baixo: "bg-destructive text-destructive-foreground",
  Médio: "bg-yellow-500 text-foreground",
  Alto: "bg-primary text-primary-foreground",
};

const DiagnosticResults = ({ data }: Props) => {
  const cards = [
    { icon: Factory, label: "Tipo da Máquina", value: data.machineType, unit: "" },
    { icon: Zap, label: "Potência Estimada", value: data.powerKW.toFixed(1), unit: "kW" },
    { icon: BarChart3, label: "Consumo Anual", value: data.annualConsumption.toLocaleString("pt-BR"), unit: "kWh" },
    { icon: Flame, label: "Emissão de CO₂", value: data.co2Emission.toFixed(2), unit: "ton/ano" },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Gauge className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-bold text-foreground">Resultado do Diagnóstico</h3>
        </div>
        <span className={`industrial-badge ${efficiencyColor[data.efficiencyLevel]}`}>
          <TrendingDown className="h-3.5 w-3.5" />
          Eficiência: {data.efficiencyLevel}
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(({ icon: Icon, label, value, unit }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="industrial-card p-5"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <p className="text-xs font-medium text-muted-foreground">{label}</p>
            <p className="mt-1 text-xl font-bold text-foreground">
              {value} <span className="text-sm font-normal text-muted-foreground">{unit}</span>
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default DiagnosticResults;
