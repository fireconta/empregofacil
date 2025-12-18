import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Share2, CheckCircle2, AlertCircle, Lock, Smartphone } from "lucide-react";
import Layout from "@/components/Layout";
import { WHATSAPP_FINISH_REGISTRATION_LINK } from "@/consts";
import { toast } from "sonner";

export default function Sucesso() {
  const [whatsappClicked, setWhatsappClicked] = useState(false);
  const [shareCount, setShareCount] = useState(0);

  const handleWhatsappClick = () => {
    setWhatsappClicked(true);
    window.open(WHATSAPP_FINISH_REGISTRATION_LINK, "_blank");
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Emprego Fácil',
      text: 'Encontrei várias vagas de emprego no Emprego Fácil! Cadastre seu currículo também:',
      url: window.location.origin,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        setShareCount(prev => prev + 1);
        toast.success("Obrigado por compartilhar!");
      } catch (err) {
        console.log("Erro ao compartilhar", err);
      }
    } else {
      // Fallback para copiar link
      navigator.clipboard.writeText(window.location.origin);
      setShareCount(prev => prev + 1);
      toast.success("Link copiado! Envie para seus amigos.");
    }
  };

  const isShared = shareCount >= 2;
  const isCompleted = whatsappClicked && isShared;

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-3xl w-full">
          
          <div className="bg-card border border-border shadow-xl rounded-2xl overflow-hidden">
            <div className="bg-destructive p-8 text-center">
              <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-white/10 text-white mb-6 backdrop-blur-sm animate-pulse">
                <AlertCircle className="h-10 w-10" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Cadastro Pendente!
              </h1>
              <p className="text-white/90 text-lg max-w-xl mx-auto font-medium">
                Seu currículo <strong>AINDA NÃO FOI ENVIADO</strong>. Para finalizar o envio e garantir que as empresas recebam seus dados, você precisa concluir as etapas abaixo obrigatoriamente.
              </p>
            </div>

            <div className="p-8 md:p-12 space-y-8">
              
              {/* Passo 1: Compartilhar (Obrigatório Primeiro) */}
              <div className={`flex flex-col md:flex-row gap-6 items-start p-6 rounded-xl border-2 transition-all ${isShared ? "border-green-500/20 bg-green-50/50" : "border-primary/10 bg-muted/20"}`}>
                <div className={`h-12 w-12 rounded-full flex items-center justify-center shrink-0 text-lg font-bold ${isShared ? "bg-green-500 text-white" : "bg-primary text-white"}`}>
                  {isShared ? <CheckCircle2 className="h-6 w-6" /> : "1"}
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-1">Compartilhe com 2 Amigos</h3>
                    <p className="text-muted-foreground">
                      Para liberar o download do aplicativo, compartilhe esta oportunidade com 2 amigos que também precisam de emprego.
                    </p>
                    <div className="mt-2 flex items-center gap-2 text-sm font-medium">
                      <span className={shareCount >= 1 ? "text-green-600" : "text-muted-foreground"}>1º Amigo {shareCount >= 1 && "✓"}</span>
                      <span className="text-muted-foreground">•</span>
                      <span className={shareCount >= 2 ? "text-green-600" : "text-muted-foreground"}>2º Amigo {shareCount >= 2 && "✓"}</span>
                    </div>
                  </div>
                  <Button 
                    onClick={handleShare}
                    variant={isShared ? "outline" : "default"}
                    size="lg" 
                    className={`w-full md:w-auto ${isShared ? "border-green-500 text-green-600" : ""}`}
                  >
                    {isShared ? <CheckCircle2 className="mr-2 h-5 w-5" /> : <Share2 className="mr-2 h-5 w-5" />}
                    {isShared ? "Compartilhado com Sucesso" : "Compartilhar Agora"}
                  </Button>
                </div>
              </div>

              {/* Passo 2: Baixar App (Bloqueado até compartilhar) */}
	              <div className={`relative flex flex-col md:flex-row gap-6 items-start p-6 rounded-xl border-2 transition-all ${!isShared ? "opacity-50 grayscale border-muted" : whatsappClicked ? "border-green-500/20 bg-green-50/50" : "border-primary/10 bg-muted/20"}`}>
	                
	                {!isShared && (
	                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/50 backdrop-blur-[1px] rounded-xl">
	                    <div className="bg-background border border-border px-4 py-2 rounded-full shadow-lg flex items-center gap-2 text-sm font-medium text-muted-foreground">
	                      <Lock className="h-4 w-4" /> Bloqueado - Compartilhe primeiro
	                    </div>
	                  </div>
	                )}
	
	                <div className={`h-12 w-12 rounded-full flex items-center justify-center shrink-0 text-lg font-bold ${whatsappClicked ? "bg-green-500 text-white" : "bg-primary text-white"}`}>
	                  {whatsappClicked ? <CheckCircle2 className="h-6 w-6" /> : "2"}
	                </div>
	                <div className="flex-1 space-y-4">
	                  <div>
	                    <h3 className="text-xl font-bold text-foreground mb-1">Concluir Cadastro via WhatsApp</h3>
	                    <p className="text-muted-foreground">
	                      O link para download do aplicativo está em manutenção. Para finalizar o envio do seu currículo, **chame nosso suporte no WhatsApp**.
	                    </p>
	                    <p className="text-sm text-yellow-700 mt-2 flex items-center gap-1">
	                      <Smartphone className="h-4 w-4" /> **Importante:** Seu currículo só será enviado após a confirmação via WhatsApp.
	                    </p>
	                  </div>
	                  <Button 
	                    onClick={handleWhatsappClick}
	                    disabled={!isShared}
	                    size="lg" 
	                    className={`w-full md:w-auto ${whatsappClicked ? "bg-green-600 hover:bg-green-700" : ""}`}
	                  >
	                    <Smartphone className="mr-2 h-5 w-5" />
	                    {whatsappClicked ? "Aguardando Contato..." : "Chamar WhatsApp para Concluir"}
	                  </Button>
	                </div>
	              </div>

              {/* Status Final */}
              <div className="pt-4 text-center">
                {isCompleted ? (
	                  <div className="animate-in zoom-in duration-500 p-6 bg-green-50 rounded-xl border border-green-200">
	                    <h3 className="text-2xl font-bold text-green-700 mb-2">Aguardando Contato no WhatsApp... ⏳</h3>
	                    <p className="text-green-800 font-medium">
	                      Detectamos o clique no WhatsApp. Seu currículo será enviado após a confirmação de finalização do cadastro com nosso suporte.
	                    </p>
	                    <p className="text-sm text-green-700 mt-2">
	                      Não se preocupe, o suporte é rápido!
	                    </p>
	                  </div>
                ) : (
                  <p className="text-sm text-destructive font-medium">
                    ⚠️ Atenção: Não feche esta página até concluir as duas etapas acima.
                  </p>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
