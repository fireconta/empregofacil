import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2, Upload, User, MapPin, FileText, ArrowRight, ArrowLeft, Loader2, Search } from "lucide-react";
import Layout from "@/components/Layout";
import { toast } from "sonner";
import { GOOGLE_SCRIPT_URL } from "@/config";

// Schema de validação
const formSchema = z.object({
  nome: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Email inválido"),
  telefone: z.string().min(14, "Telefone inválido"), // (XX) XXXXX-XXXX
  cep: z.string().min(9, "CEP inválido"), // XXXXX-XXX
  cidade: z.string().min(2, "Cidade é obrigatória"),
  estado: z.string().length(2, "Use a sigla do estado (ex: SP)"),
  cargo: z.string().min(2, "Cargo pretendido é obrigatório"),
});

type FormData = z.infer<typeof formSchema>;

// Funções de máscara
const maskPhone = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/g, "($1) $2")
    .replace(/(\d)(\d{4})$/, "$1-$2")
    .slice(0, 15);
};

const maskCEP = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/^(\d{5})(\d)/, "$1-$2")
    .slice(0, 9);
};

export default function Cadastro() {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingCEP, setIsLoadingCEP] = useState(false);
  const [, setLocation] = useLocation();

  const { register, handleSubmit, formState: { errors }, trigger, watch, setValue } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange"
  });

  // Monitorar mudanças para aplicar máscaras
  const telefoneValue = watch("telefone");
  const cepValue = watch("cep");

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("telefone", maskPhone(e.target.value));
  };

  const handleCEPChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const maskedCEP = maskCEP(e.target.value);
    setValue("cep", maskedCEP);

    // Buscar endereço se tiver 9 caracteres (XXXXX-XXX)
    if (maskedCEP.length === 9) {
      setIsLoadingCEP(true);
      try {
        const cleanCEP = maskedCEP.replace("-", "");
        const response = await fetch(`https://viacep.com.br/ws/${cleanCEP}/json/`);
        const data = await response.json();

        if (!data.erro) {
          setValue("cidade", data.localidade);
          setValue("estado", data.uf);
          toast.success("Endereço encontrado!");
        } else {
          toast.error("CEP não encontrado.");
        }
      } catch (error) {
        console.error("Erro ao buscar CEP:", error);
        toast.error("Erro ao buscar CEP.");
      } finally {
        setIsLoadingCEP(false);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== "application/pdf") {
        toast.error("Por favor, envie apenas arquivos PDF.");
        return;
      }
      if (selectedFile.size > 5 * 1024 * 1024) { // 5MB
        toast.error("O arquivo deve ter no máximo 5MB.");
        return;
      }
      setFile(selectedFile);
      toast.success("Currículo anexado com sucesso!");
    }
  };

  const nextStep = async () => {
    let isValid = false;
    if (step === 1) {
      isValid = await trigger(["nome", "email", "telefone"]);
    } else if (step === 2) {
      isValid = await trigger(["cep", "cidade", "estado", "cargo"]);
    }
    
    if (isValid) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const onSubmit = async (data: FormData) => {
    if (!file) {
      toast.error("Por favor, anexe seu currículo em PDF.");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Converter arquivo para Base64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = async () => {
        const base64File = (reader.result as string).split(',')[1];
        
        const payload = {
          ...data,
          fileData: base64File,
          fileName: file.name,
          fileType: file.type
        };

        if (GOOGLE_SCRIPT_URL) {
          await fetch(GOOGLE_SCRIPT_URL, {
            method: "POST",
            mode: "no-cors", 
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });
        } else {
          console.warn("URL do Google Script não configurada. Simulando envio.");
          await new Promise(resolve => setTimeout(resolve, 1500));
        }

        toast.success("Cadastro realizado com sucesso!");
        setIsSubmitting(false);
        setLocation("/sucesso");
      };

      reader.onerror = () => {
        toast.error("Erro ao processar o arquivo.");
        setIsSubmitting(false);
      };

    } catch (error) {
      console.error("Erro no envio:", error);
      toast.error("Ocorreu um erro ao enviar seus dados. Tente novamente.");
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] bg-muted/30 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between relative">
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-border -z-10"></div>
              <div className={`flex flex-col items-center gap-2 bg-background p-2 rounded-full z-10 ${step >= 1 ? "text-primary" : "text-muted-foreground"}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step >= 1 ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground bg-background"}`}>
                  <User className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium hidden sm:block">Dados Pessoais</span>
              </div>
              <div className={`flex flex-col items-center gap-2 bg-background p-2 rounded-full z-10 ${step >= 2 ? "text-primary" : "text-muted-foreground"}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step >= 2 ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground bg-background"}`}>
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium hidden sm:block">Localização</span>
              </div>
              <div className={`flex flex-col items-center gap-2 bg-background p-2 rounded-full z-10 ${step >= 3 ? "text-primary" : "text-muted-foreground"}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step >= 3 ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground bg-background"}`}>
                  <FileText className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium hidden sm:block">Currículo</span>
              </div>
            </div>
          </div>

          <Card className="border-border/50 shadow-lg">
            <CardHeader className="space-y-1 text-center pb-8">
              <CardTitle className="text-2xl font-bold text-primary">
                {step === 1 && "Vamos começar pelo básico"}
                {step === 2 && "Onde você está localizado?"}
                {step === 3 && "Quase lá! Envie seu currículo"}
              </CardTitle>
              <CardDescription>
                {step === 1 && "Preencha seus dados de contato para que as empresas possam te encontrar."}
                {step === 2 && "Informe seu CEP para preenchimento automático."}
                {step === 3 && "Anexe seu currículo em PDF para completar seu perfil."}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                
                {/* Step 1: Dados Pessoais */}
                {step === 1 && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="space-y-2">
                      <Label htmlFor="nome">Nome Completo</Label>
                      <Input 
                        id="nome" 
                        placeholder="Ex: João da Silva" 
                        {...register("nome")} 
                        className={errors.nome ? "border-destructive" : ""}
                      />
                      {errors.nome && <span className="text-xs text-destructive">{errors.nome.message}</span>}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Profissional</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="Ex: joao@email.com" 
                        {...register("email")}
                        className={errors.email ? "border-destructive" : ""}
                      />
                      {errors.email && <span className="text-xs text-destructive">{errors.email.message}</span>}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="telefone">Telefone / WhatsApp</Label>
                      <Input 
                        id="telefone" 
                        placeholder="(11) 99999-9999" 
                        {...register("telefone")}
                        onChange={handlePhoneChange}
                        className={errors.telefone ? "border-destructive" : ""}
                      />
                      {errors.telefone && <span className="text-xs text-destructive">{errors.telefone.message}</span>}
                    </div>
                  </div>
                )}

                {/* Step 2: Localização */}
                {step === 2 && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                    
                    <div className="space-y-2">
                      <Label htmlFor="cep">CEP</Label>
                      <div className="relative">
                        <Input 
                          id="cep" 
                          placeholder="00000-000" 
                          {...register("cep")}
                          onChange={handleCEPChange}
                          className={errors.cep ? "border-destructive pr-10" : "pr-10"}
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                          {isLoadingCEP ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                        </div>
                      </div>
                      {errors.cep && <span className="text-xs text-destructive">{errors.cep.message}</span>}
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-2 space-y-2">
                        <Label htmlFor="cidade">Cidade</Label>
                        <Input 
                          id="cidade" 
                          placeholder="Ex: São Paulo" 
                          {...register("cidade")}
                          className={errors.cidade ? "border-destructive" : ""}
                        />
                        {errors.cidade && <span className="text-xs text-destructive">{errors.cidade.message}</span>}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="estado">Estado</Label>
                        <Select onValueChange={(val) => setValue("estado", val)} value={watch("estado")}>
                          <SelectTrigger className={errors.estado ? "border-destructive" : ""}>
                            <SelectValue placeholder="UF" />
                          </SelectTrigger>
                          <SelectContent>
                            {["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"].map((uf) => (
                              <SelectItem key={uf} value={uf}>{uf}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.estado && <span className="text-xs text-destructive">{errors.estado.message}</span>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cargo">Cargo Pretendido</Label>
                      <Input 
                        id="cargo" 
                        placeholder="Ex: Analista Administrativo" 
                        {...register("cargo")}
                        className={errors.cargo ? "border-destructive" : ""}
                      />
                      {errors.cargo && <span className="text-xs text-destructive">{errors.cargo.message}</span>}
                    </div>
                  </div>
                )}

                {/* Step 3: Currículo */}
                {step === 3 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:bg-muted/30 transition-colors cursor-pointer relative">
                      <input 
                        type="file" 
                        accept=".pdf" 
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="flex flex-col items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          <Upload className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Clique para selecionar ou arraste aqui</p>
                          <p className="text-sm text-muted-foreground mt-1">Apenas arquivos PDF (máx. 5MB)</p>
                        </div>
                      </div>
                    </div>

                    {file && (
                      <div className="flex items-center gap-3 p-3 bg-primary/5 border border-primary/20 rounded-lg">
                        <FileText className="h-5 w-5 text-primary" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{file.name}</p>
                          <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                      </div>
                    )}
                  </div>
                )}
              </form>
            </CardContent>
            
            <CardFooter className="flex justify-between pt-4">
              {step > 1 ? (
                <Button variant="outline" onClick={prevStep} disabled={isSubmitting}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
                </Button>
              ) : (
                <div></div>
              )}
              
              {step < 3 ? (
                <Button onClick={nextStep} className="bg-primary text-primary-foreground">
                  Próximo <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={handleSubmit(onSubmit)} disabled={isSubmitting || !file} className="bg-primary text-primary-foreground min-w-[140px]">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enviando...
                    </>
                  ) : (
                    <>
                      Finalizar Cadastro <CheckCircle2 className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              )}
            </CardFooter>
          </Card>
          
          <p className="text-center text-sm text-muted-foreground mt-8">
            Ao se cadastrar, você concorda com nossos Termos de Uso e Política de Privacidade.
          </p>
        </div>
      </div>
    </Layout>
  );
}
