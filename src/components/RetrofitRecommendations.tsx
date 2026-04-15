import { motion } from "framer-motion";
import { Wrench, TrendingDown, DollarSign, Clock, Cpu, Thermometer, Activity } from "lucide-react";

interface Recommendation {
  name: string;
  icon: React.ElementType;
  savingsPercent: number;
  co2Reduction: number;
  roiMonths: number;
  description: string;
}

const recommendations: Recommendation[] = [
  {
    name: "Inversor de Frequência (VFD)",
    icon: Cpu,
    savingsPercent: 30,
    co2Reduction: 2.4,
    roiMonths: 14,
    description: "Controle preciso de velocidade do motor, reduzindo consumo em cargas parciais",
  },
  {
    name: "Sensor de Corrente",
    icon: Activity,
    savingsPercent: 12,
    co2Reduction: 0.9,
    roiMonths: 6,
    description: "Monitoramento em tempo real para detectar sobrecargas e perdas elétricas",
  },
  {
    name: "Sensor de Vibração",
    icon: Activity,
    savingsPercent: 8,
    co2Reduction: 0.6,
    roiMonths: 8,
    description: "Detecção antecipada de falhas mecânicas e desalinhamentos",
  },
  {
    name: "Sensor de Temperatura",
    icon: Thermometer,
    savingsPercent: 10,
    co2Reduction: 0.8,
    roiMonths: 5,
    description: "Prevenção de superaquecimento e otimização de ciclos térmicos",
  },
];

const RetrofitRecommendations = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
    <div className="flex items-center gap-2">
      <Wrench className="h-5 w-5 text-primary" />
      <h3 className="text-lg font-bold text-foreground">Recomendações de Retrofit</h3>
    </div>

    <div className="grid gap-4 sm:grid-cols-2">
      {recommendations.map((rec, i) => {
        const Icon = rec.icon;
        return (
          <motion.div
            key={rec.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="industrial-card overflow-hidden"
          >
            <div className="flex items-center gap-3 bg-primary/5 px-5 py-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground">{rec.name}</h4>
            </div>
            <div className="space-y-3 p-5">
              <p className="text-sm text-muted-foreground">{rec.description}</p>
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-md bg-secondary p-2.5 text-center">
                  <TrendingDown className="mx-auto mb-1 h-4 w-4 text-primary" />
                  <p className="text-base font-bold text-foreground">{rec.savingsPercent}%</p>
                  <p className="text-[10px] text-muted-foreground">Economia</p>
                </div>
                <div className="rounded-md bg-secondary p-2.5 text-center">
                  <DollarSign className="mx-auto mb-1 h-4 w-4 text-industrial-green-dark" />
                  <p className="text-base font-bold text-foreground">{rec.co2Reduction}t</p>
                  <p className="text-[10px] text-muted-foreground">CO₂ reduzido</p>
                </div>
                <div className="rounded-md bg-secondary p-2.5 text-center">
                  <Clock className="mx-auto mb-1 h-4 w-4 text-accent" />
                  <p className="text-base font-bold text-foreground">{rec.roiMonths}m</p>
                  <p className="text-[10px] text-muted-foreground">ROI</p>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  </motion.div>
);

export default RetrofitRecommendations;
