import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { WHATSAPP_COMPANY_LINK, WHATSAPP_SUPPORT_LINK } from "@/consts";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/">
              <div className="flex items-center gap-2 cursor-pointer">
                <div className="h-8 w-8 rounded bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">
                  E
                </div>
                <span className="text-xl font-bold text-primary tracking-tight">Emprego Fácil</span>
              </div>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link href="/"><span className="hover:text-primary transition-colors cursor-pointer">Início</span></Link>

            <Link href="/#sobre"><span className="hover:text-primary transition-colors cursor-pointer">Sobre</span></Link>
          </nav>

          <div className="flex items-center gap-4">
            <a href={WHATSAPP_COMPANY_LINK} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="hidden sm:flex border-primary/20 text-primary hover:bg-primary/5 hover:text-primary">
                Anunciar Vaga
              </Button>
            </a>
            <Link href="/cadastro">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm">
                Cadastrar Currículo
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-muted/30 py-12">
        <div className="container grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                E
              </div>
              <span className="text-lg font-bold text-primary">Emprego Fácil</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Conectando os melhores talentos às maiores empresas da região. Sua carreira começa aqui.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-primary">Candidatos</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/cadastro"><span className="hover:text-primary cursor-pointer">Cadastrar Currículo</span></Link></li>
              <li><a href={WHATSAPP_SUPPORT_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-primary">Suporte App (Manutenção)</a></li>

            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-primary">Empresas</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
	              <li><a href={WHATSAPP_COMPANY_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-primary">Anunciar Vaga (Grátis)</a></li>
              <li><span className="cursor-pointer hover:text-primary">Buscar Talentos</span></li>
              <li><span className="cursor-pointer hover:text-primary">Parcerias</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-primary">Contato</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>contato@empregofacil.com.br</li>
              <li>0800 123 4567</li>
              <li>São Paulo, SP</li>
            </ul>
          </div>
        </div>
        <div className="container mt-12 pt-8 border-t border-border/20 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Emprego Fácil. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}
