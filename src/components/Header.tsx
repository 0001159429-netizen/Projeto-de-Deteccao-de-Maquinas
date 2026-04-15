import { Cpu, Zap } from "lucide-react";

const Header = () => (
  <header className="industrial-gradient text-primary-foreground">
    <div className="container mx-auto flex items-center justify-between px-6 py-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-foreground/15 backdrop-blur-sm">
          <Cpu className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-tight">Diagnóstico Inteligente</h1>
          <p className="text-xs font-medium text-primary-foreground/70">Máquinas Industriais • IA</p>
        </div>
      </div>
      <div className="flex items-center gap-2 rounded-full bg-primary-foreground/10 px-4 py-2 text-xs font-semibold backdrop-blur-sm">
        <Zap className="h-3.5 w-3.5 text-primary" />
        <span>Sistema Ativo</span>
        <span className="ml-1 h-2 w-2 rounded-full bg-primary animate-pulse" />
      </div>
    </div>
  </header>
);

export default Header;
