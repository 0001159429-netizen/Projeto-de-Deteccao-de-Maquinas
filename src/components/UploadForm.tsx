import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Image, X, Clock, Factory, Calendar, ArrowRight, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface UploadFormProps {
  onSubmit: (data: {
    files: File[];
    hoursPerDay: number;
    machineType: string;
    year: string;
  }) => void;
}

const MACHINE_TYPES = [
  "Motor Elétrico Industrial",
  "Compressor de Ar",
  "Bomba Hidráulica",
  "Ventilador Industrial",
  "Torno Mecânico",
  "Prensa Hidráulica",
  "Esteira Transportadora",
  "Gerador Elétrico",
  "Outro",
];

const YEAR_RANGES = [
  "Anterior a 1980",
  "1980–1990",
  "1990–2000",
  "2000–2010",
  "2010–2020",
  "Posterior a 2020",
];

const UploadForm = ({ onSubmit }: UploadFormProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [hoursPerDay, setHoursPerDay] = useState<string>("8");
  const [machineType, setMachineType] = useState("");
  const [year, setYear] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (newFiles: FileList | null) => {
    if (!newFiles) return;
    const arr = Array.from(newFiles);
    setFiles((p) => [...p, ...arr]);
    arr.forEach((f) => {
      if (f.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => setPreviews((p) => [...p, e.target?.result as string]);
        reader.readAsDataURL(f);
      } else {
        setPreviews((p) => [...p, ""]);
      }
    });
  };

  const removeFile = (i: number) => {
    setFiles((p) => p.filter((_, idx) => idx !== i));
    setPreviews((p) => p.filter((_, idx) => idx !== i));
  };

  const canSubmit = files.length > 0 && hoursPerDay && machineType && year;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-3xl"
    >
      <div className="industrial-card overflow-hidden">
        <div className="industrial-gradient px-6 py-5">
          <h2 className="text-xl font-bold text-primary-foreground">Nova Análise de Máquina</h2>
          <p className="mt-1 text-sm text-primary-foreground/70">Envie imagens e dados para diagnóstico inteligente</p>
        </div>

        <div className="space-y-6 p-6">
          {/* Upload area */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-foreground">
              <Image className="mr-1.5 inline h-4 w-4 text-primary" />
              Imagens ou Vídeos da Máquina
            </label>
            <div
              onClick={() => inputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => { e.preventDefault(); handleFiles(e.dataTransfer.files); }}
              className="group cursor-pointer rounded-lg border-2 border-dashed border-industrial-border bg-secondary/50 p-8 text-center transition-colors hover:border-primary hover:bg-primary/5"
            >
              <Upload className="mx-auto mb-3 h-10 w-10 text-muted-foreground transition-colors group-hover:text-primary" />
              <p className="font-medium text-foreground">Envie uma ou mais imagens da máquina</p>
              <p className="mt-1 text-sm text-muted-foreground">Arraste arquivos ou clique para selecionar</p>
              <input
                ref={inputRef}
                type="file"
                multiple
                accept="image/*,video/*"
                className="hidden"
                onChange={(e) => handleFiles(e.target.files)}
              />
            </div>
            <div className="mt-3 flex items-start gap-2 rounded-md bg-secondary p-3">
              <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
              <div className="text-xs text-muted-foreground">
                <p className="font-medium text-foreground">Para melhor precisão, envie:</p>
                <ul className="mt-1 list-inside list-disc space-y-0.5">
                  <li>Visão geral da máquina</li>
                  <li>Placa de identificação (se disponível)</li>
                  <li>Componentes internos (opcional)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* File previews */}
          <AnimatePresence>
            {files.length > 0 && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="flex flex-wrap gap-3">
                {files.map((f, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="relative h-20 w-20 overflow-hidden rounded-lg border bg-secondary"
                  >
                    {previews[i] ? (
                      <img src={previews[i]} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                        {f.name.slice(0, 8)}
                      </div>
                    )}
                    <button
                      onClick={(e) => { e.stopPropagation(); removeFile(i); }}
                      className="absolute right-1 top-1 rounded-full bg-foreground/70 p-0.5 text-background hover:bg-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form fields */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-foreground">
                <Clock className="h-4 w-4 text-primary" /> Horas de uso/dia
              </label>
              <Input
                type="number"
                min={1}
                max={24}
                value={hoursPerDay}
                onChange={(e) => setHoursPerDay(e.target.value)}
                className="bg-secondary/50"
              />
            </div>
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-foreground">
                <Factory className="h-4 w-4 text-primary" /> Tipo de máquina
              </label>
              <Select value={machineType} onValueChange={setMachineType}>
                <SelectTrigger className="bg-secondary/50">
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  {MACHINE_TYPES.map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-foreground">
                <Calendar className="h-4 w-4 text-primary" /> Ano aproximado
              </label>
              <Select value={year} onValueChange={setYear}>
                <SelectTrigger className="bg-secondary/50">
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  {YEAR_RANGES.map((y) => (
                    <SelectItem key={y} value={y}>{y}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            disabled={!canSubmit}
            onClick={() => onSubmit({ files, hoursPerDay: Number(hoursPerDay), machineType, year })}
            className="w-full gap-2 bg-primary py-6 text-base font-bold text-primary-foreground hover:bg-industrial-green-dark"
          >
            Iniciar Diagnóstico com IA
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default UploadForm;
