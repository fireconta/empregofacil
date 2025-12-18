import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, Building2, Users, TrendingUp, Smartphone } from "lucide-react";
import Layout from "@/components/Layout";
import { WHATSAPP_SUPPORT_LINK, WHATSAPP_COMPANY_LINK } from "@/consts";

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero-bg.jpg" 
            alt="Office Background" 
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background"></div>
        </div>

        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
              Mais de 500 novas vagas esta semana
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-primary leading-tight">
              O próximo passo da sua <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">carreira de sucesso</span> começa aqui.
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Conectamos profissionais qualificados às empresas mais inovadoras da região. 
              Cadastre seu currículo gratuitamente e seja visto pelos melhores recrutadores.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/cadastro">
                <Button size="lg" className="w-full sm:w-auto text-lg px-8 h-12 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all">
                  Cadastrar Currículo Agora
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <a href={WHATSAPP_COMPANY_LINK} target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 h-12 border-primary/20 text-primary hover:bg-primary/5 hover:text-primary shadow-lg hover:shadow-xl transition-all">
                  Anunciar Vaga (Empresas)
                </Button>
              </a>
            </div>
	          </div>
	        </div>
	      </section>
	
	      {/* App Maintenance Section */}
	      <section className="py-16 bg-yellow-50/50 border-y border-yellow-200">
	        <div className="container text-center">
	          <Smartphone className="h-10 w-10 text-yellow-600 mx-auto mb-4" />
	          <h2 className="text-2xl font-bold text-yellow-700 mb-3">Link do Aplicativo em Manutenção</h2>
	          <p className="text-lg text-yellow-800 max-w-3xl mx-auto mb-6">
	            Pedimos desculpas pelo inconveniente. O link para download do nosso aplicativo está temporariamente em manutenção para melhorias.
	          </p>
	          <a href={WHATSAPP_SUPPORT_LINK} target="_blank" rel="noopener noreferrer">
	            <Button size="lg" className="bg-yellow-600 hover:bg-yellow-700 text-white shadow-md">
	              Chamar Suporte no WhatsApp (62) 99577-1104
	            </Button>
	          </a>
	        </div>
	      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background p-8 rounded-xl border border-border/50 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-primary">Melhores Empresas</h3>
              <p className="text-muted-foreground leading-relaxed">
                Parceria direta com as empresas líderes de mercado em diversos setores da região.
              </p>
            </div>
            
            <div className="bg-background p-8 rounded-xl border border-border/50 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-primary">Visibilidade Total</h3>
              <p className="text-muted-foreground leading-relaxed">
                Seu perfil em destaque para recrutadores que buscam exatamente as suas competências.
              </p>
            </div>
            
            <div className="bg-background p-8 rounded-xl border border-border/50 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-primary">Acelere sua Carreira</h3>
              <p className="text-muted-foreground leading-relaxed">
                Ferramentas exclusivas e alertas de vagas para você não perder nenhuma oportunidade.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-border/40">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">5k+</div>
              <div className="text-sm text-muted-foreground font-medium">Vagas Ativas</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">1.2k</div>
              <div className="text-sm text-muted-foreground font-medium">Empresas Parceiras</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">15k+</div>
              <div className="text-sm text-muted-foreground font-medium">Contratações/Mês</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">98%</div>
              <div className="text-sm text-muted-foreground font-medium">Satisfação</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
        <div className="container relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Pronto para transformar sua carreira?</h2>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-10">
            Não perca mais tempo procurando em vários lugares. Tudo o que você precisa está aqui.
          </p>
          <Link href="/cadastro">
            <Button size="lg" variant="secondary" className="text-primary font-bold text-lg px-10 h-14 shadow-xl hover:bg-white">
              Cadastrar Gratuitamente
            </Button>
          </Link>
          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-blue-100">
            <span className="flex items-center"><CheckCircle2 className="h-4 w-4 mr-2" /> Sem custos ocultos</span>
            <span className="flex items-center"><CheckCircle2 className="h-4 w-4 mr-2" /> Dados protegidos</span>
            <span className="flex items-center"><CheckCircle2 className="h-4 w-4 mr-2" /> Processo simplificado</span>
          </div>
        </div>
      </section>
    </Layout>
  );
}
