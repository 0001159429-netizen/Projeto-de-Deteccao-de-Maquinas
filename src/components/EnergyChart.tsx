import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";

const data = [
  { month: "Jan", atual: 4200, otimizado: 2940 },
  { month: "Fev", atual: 3800, otimizado: 2660 },
  { month: "Mar", atual: 4500, otimizado: 3150 },
  { month: "Abr", atual: 4100, otimizado: 2870 },
  { month: "Mai", atual: 3900, otimizado: 2730 },
  { month: "Jun", atual: 4300, otimizado: 3010 },
];

const EnergyChart = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
    <div className="flex items-center gap-2">
      <BarChart3 className="h-5 w-5 text-primary" />
      <h3 className="text-lg font-bold text-foreground">Projeção de Consumo Energético</h3>
    </div>
    <div className="industrial-card p-5">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 75% / 0.3)" />
          <XAxis dataKey="month" tick={{ fill: "hsl(0 0% 45%)", fontSize: 12 }} />
          <YAxis tick={{ fill: "hsl(0 0% 45%)", fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(0 0% 100%)",
              border: "1px solid hsl(0 0% 75%)",
              borderRadius: 8,
              fontSize: 12,
            }}
          />
          <Legend />
          <Bar dataKey="atual" name="Consumo Atual (kWh)" fill="hsl(0 0% 75%)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="otimizado" name="Com Retrofit (kWh)" fill="hsl(134 55% 52%)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </motion.div>
);

export default EnergyChart;
