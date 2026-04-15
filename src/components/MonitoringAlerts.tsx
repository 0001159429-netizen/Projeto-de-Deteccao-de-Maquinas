import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Activity, BatteryWarning, Radio } from "lucide-react";

interface Alert {
  id: number;
  icon: React.ElementType;
  message: string;
  severity: "warning" | "critical" | "info";
  time: string;
}

const ALERTS: Alert[] = [
  { id: 1, icon: AlertTriangle, message: "Consumo 30% acima do esperado", severity: "critical", time: "Agora" },
  { id: 2, icon: BatteryWarning, message: "Máquina operando sem carga", severity: "warning", time: "2 min atrás" },
  { id: 3, icon: Activity, message: "Possível desperdício energético detectado", severity: "warning", time: "5 min atrás" },
  { id: 4, icon: Radio, message: "Vibração anormal detectada no eixo principal", severity: "critical", time: "8 min atrás" },
  { id: 5, icon: AlertTriangle, message: "Temperatura acima do limite operacional", severity: "critical", time: "12 min atrás" },
];

const severityStyles = {
  critical: "border-l-destructive bg-destructive/5",
  warning: "border-l-yellow-500 bg-yellow-500/5",
  info: "border-l-primary bg-primary/5",
};

const severityDot = {
  critical: "bg-destructive",
  warning: "bg-yellow-500",
  info: "bg-primary",
};

const MonitoringAlerts = () => {
  const [visible, setVisible] = useState<Alert[]>([]);

  useEffect(() => {
    ALERTS.forEach((alert, i) => {
      setTimeout(() => setVisible((p) => [...p, alert]), i * 600);
    });
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Radio className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-bold text-foreground">Monitoramento Inteligente</h3>
        </div>
        <span className="industrial-badge bg-destructive/10 text-destructive">
          <span className="h-2 w-2 rounded-full bg-destructive animate-pulse" />
          {ALERTS.filter((a) => a.severity === "critical").length} alertas críticos
        </span>
      </div>

      <div className="space-y-2">
        <AnimatePresence>
          {visible.map((alert) => {
            const Icon = alert.icon;
            return (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className={`industrial-card flex items-center gap-4 border-l-4 px-5 py-4 ${severityStyles[alert.severity]}`}
              >
                <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg ${alert.severity === "critical" ? "bg-destructive/10" : "bg-yellow-500/10"}`}>
                  <Icon className={`h-5 w-5 ${alert.severity === "critical" ? "text-destructive" : "text-yellow-600"}`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{alert.message}</p>
                  <p className="text-xs text-muted-foreground">{alert.time}</p>
                </div>
                <span className={`h-2.5 w-2.5 rounded-full ${severityDot[alert.severity]} animate-pulse`} />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default MonitoringAlerts;
