

import React, { useState, useEffect } from 'react';
// FIX: Add UseFormReturn, Path, and Resolver to the import from react-hook-form for stronger typing.
import { useForm, Controller, UseFormReturn, Path, Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// --- EMBEDDED ASSETS ---
const docesMomentosLogoBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABQAAAAGdCAYAAADu855DAAAEaklEQVR4nOzdX2/bNhgA8H+q9v9IO99De5ZgW3v3VlsAQxYdO/ZlEHjYtve+JCD449kDfO+/uwf4/s/v//8FABDA3+f/DwCAfv43AAD9/B8AgH7+DwBA//8EAAAggAACCCCAAAIIXACAABDAHx+///g5m/v/8+frt38/Pz97+fGr5dvf3/78/f7l1y/f/v7/+8/fX37/+uvX77/9/v3r669ffv/+9fvvr1+/ffn5/evX169fv/769fO/fwD/mwYAAQQQQAABBBBAAAEEPAG//fXb//rzz58/f/3169dvv3/99fv3X3/++vP3r1+/ffn5/evX16+/f//66/fvr69ff/369fO3X7/9+v23f//t76+/fv/6+8+vv/38+fvXX3/99uuvX79+ffvt11+/fvn121+//vrz999+/3P79ffvv//+8/cvv37/7e9fv3779eu3v3/59fP3r1+//vvj9+9ff/3+219fv/76/es//vb3b3/++fPXXz+//uP3b39/++23v3/9+vXXX3/8+ftf//v/6/fP//r99+8///L779++//j925//8/cvf3z9+evX3/7y+/ev33//+furX7/8/e3XX3/98fr167c//+f3f//x+/ff//nrtz9//f3Xn//5+/dfv/74/dff/vj9l9+++/2vb39+f/3+7a/f//j996+/f/3169c//vb1//+v3/79P//5++9ffv/t29/f//n7169ffv/1+7dvf379/euvv/74/fdffv7t73/+/u3P37/+8vvrz99///j9t29///7rr19+/fbH719/+/Xf//71+6+/ffv1x2/ffv3+7fevX799++2v3/78+u33n7/++vX377/9+euv33//8/frt79+/+2vv3/98frt12///euv//0f//+3f/v7DwD8Px4AAggggAACCCCAAAIIIIAAAggggAAC/wN8AP/nDQABBBBAAAEEEEAAAQQAQAABBBBAAAEEEEAAAQQAQAABBBBAAAEEEEAAAQQQQAABBHwB+PfX119//+1P3/78+u33n7/++vX377/9+euv33//8/frt79+/+2vv3/98frt12///euv//0f//+3f/v7DwD8Px4AAggggAACCCCAAAIIIIAAAggggAACCCDgD8B/+/XXb3/9/etvX7/+fv329++/ffvr96+/f//19++/fff7n79++/3PX7/9+ftvv/5+/ff7r7/9+/XHb9/+ev32m9/+/e3Xr19++3b79evX3379+fv3X79++f3L719+/3P79u+///L796+/f/3t119/+/Xn77/+8vrtr6/fvvz9+fO3r1+/fvv76/dff//5+vXrr9+++//+7dff/v5/+8/f//v/6/ev//3/9T+//uP38/8HAP6bB4AAAggggAACCCCAAAIIIIAAAggggAAC/wMQAEEAAAQQQAABBBBAAAEEEEAAAQQQAABBBBAAP/3B4AAAggg8Bv/A+mF/oI47y/AAAAAAElFTkSuQmCC";

// --- ICONS ---
const SendIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
);
const CheckCircleIcon = ({className}: {className?: string}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
);
const XIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);
const WhatsAppIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="white">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.462.13-.611.13-.149.297-.37.446-.544.149-.174.198-.298.297-.497.099-.198.05-.37-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871-.118.571-.355 1.016-.93 1.165-1.804.149-.873.149-1.612.1-1.804-.049-.198-.247-.322-.52-.42z"/>
    </svg>
);


// --- CONFETTI COMPONENT ---
const Confetti = () => {
    const colors = ['#D4AF37', '#FBBF24', '#F59E0B', '#FFFFFF', '#A16207'];
    const pieces = Array.from({ length: 150 }).map((_, i) => {
        const style: React.CSSProperties = {
            left: '50%',
            top: '50%',
            // @ts-ignore
            '--translateX': `${Math.random() * 100 - 50}vw`,
            '--translateY': `${Math.random() * 100 - 50}vh`,
            '--rotate': `${Math.random() * 1000 - 500}deg`,
            animation: `explode ${1.5 + Math.random() * 1.5}s ease-out forwards`,
            backgroundColor: colors[i % colors.length],
            opacity: 0,
        };
        return <div key={i} className="absolute w-2 h-4 rounded-full" style={style}></div>;
    });

    return (
        <>
            <style>{`
                @keyframes explode {
                    0% {
                        transform: translate(-50%, -50%) rotate(0deg) scale(1);
                        opacity: 1;
                    }
                    100% {
                        transform: translate(var(--translateX), var(--translateY)) rotate(var(--rotate)) scale(0);
                        opacity: 1;
                    }
                }
            `}</style>
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-50">{pieces}</div>
        </>
    );
};


// --- CONSTANTS ---
const tiposEvento = ["Aniversário Infantil", "Casamento", "Corporativo", "Data Comemorativa"];
const servicos = ["Churros Tradicional", "Churros Gourmet", "Pipoca", "Algodão Doce", "Batata Chips", "Crepes Salgados", "Crepe Doces", "Açaí", "Pastel", "Pizza", "Cachorro Quente", "Hambúrguer"];
const DRAFT_KEY = 'docesMomentosFormDraft';

// --- ZOD SCHEMA ---
const formSchema = z.object({
  nomeCompleto: z.string().min(3, "Nome completo é obrigatório.").regex(/^[\p{L}\s'-]+$/u, "Nome deve conter apenas letras."),
  tipoDocumento: z.enum(["CPF", "CNPJ"]),
  nomeInstituicao: z.string().optional(),
  cpf: z.string().min(14, "CPF é obrigatório."),
  cnpj: z.string().optional(),
  enderecoCnpj: z.string().optional(),
  enderecoResidencial: z.string().min(5, "Endereço do responsável é obrigatório."),
  tipoEvento: z.string().min(1, "Selecione o tipo de evento."),
  dataEvento: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, "Data inválida. Use o formato DD/MM/AAAA."),
  horarioInicio: z.string().min(1, "Horário de início é obrigatório.").regex(/^\d{2}:\d{2}$/, "Formato deve ser HH:MM"),
  quantidadeConvidados: z.string().min(1, "Quantidade de convidados é obrigatória.").regex(/^\d+$/, "Apenas números."),
  enderecoEvento: z.string().min(5, "Endereço completo do evento é obrigatório."),
  modeloContratacao: z.string().min(1, "Selecione o modelo de contratação.").pipe(z.enum(["À vontade", "Cento", "À vontade + Cento"])),
  servicosContratados: z.array(z.string()).min(1, "Selecione pelo menos um serviço."),
  servicosQuantidades: z.record(z.string(), z.string()).optional(),
  servicosQuantidadesCento: z.record(z.string(), z.string()).optional(),
  observacoesUsuario: z.string().max(500, "Máximo de 500 caracteres.").optional(),
  cupomDesconto: z.string().max(6, "Cupom deve ter no máximo 6 caracteres.").regex(/^[A-Z0-9]*$/, "Cupom deve conter apenas letras maiúsculas e números.").optional(),
  cupomValidado: z.boolean().optional(),
  whatsapp: z.string().min(15, "WhatsApp inválido. Lembre-se do DDD e do 9º dígito."),
}).superRefine((data, ctx) => {
  if (data.tipoDocumento === "CNPJ") {
    if (!data.nomeInstituicao || data.nomeInstituicao.trim().length < 3) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["nomeInstituicao"], message: "Nome da Instituição é obrigatório." });
    }
    if (!data.cnpj || data.cnpj.length < 18) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["cnpj"], message: "CNPJ é obrigatório e deve ser válido." });
    }
    if (!data.enderecoCnpj || data.enderecoCnpj.trim().length < 5) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["enderecoCnpj"], message: "Endereço da Instituição é obrigatório." });
    }
  }
});

type FormData = z.infer<typeof formSchema>;


// --- HELPER FUNCTIONS ---
const formatCPF = (value: string) => {
    let raw = value.replace(/\D/g, '').slice(0, 11);
    return raw
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
};
const formatCNPJ = (value: string) => {
    let raw = value.replace(/\D/g, '').slice(0, 14);
    return raw
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1/$2')
        .replace(/(\d{4})(\d{1,2})$/, '$1-$2');
};
const formatWhatsApp = (value: string) => value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d)/, '$1-$2').slice(0, 15);
const formatCoupon = (value: string) => value.replace(/[^A-Z0-9]/gi, '').toUpperCase().slice(0, 6);
const formatDate = (value: string) => {
    let raw = value.replace(/\D/g, '').slice(0, 8);
    if (raw.length > 4) return raw.replace(/(\d{2})(\d{2})(\d{1,4})/, '$1/$2/$3');
    if (raw.length > 2) return raw.replace(/(\d{2})(\d{1,2})/, '$1/$2');
    return raw;
};
const formatCapitalize = (value: string) => {
    if (!value) return '';
    return value.charAt(0).toUpperCase() + value.slice(1);
}

const formatServicesForWebhook = (data: FormData) => {
    if (!data.servicosContratados || data.servicosContratados.length === 0) {
        return "Nenhum serviço selecionado.";
    }

    return data.servicosContratados.map(servico => {
        const horas = data.servicosQuantidades?.[servico];
        const centos = data.servicosQuantidadesCento?.[servico];
        let details = [];

        switch (data.modeloContratacao) {
            case 'À vontade':
                if (horas && parseInt(horas) > 0) details.push(`à vontade por ${horas} ${parseInt(horas) === 1 ? 'hora' : 'horas'}`);
                break;
            case 'Cento':
                if (centos && parseInt(centos) > 0) details.push(`${centos} ${parseInt(centos) === 1 ? 'cento' : 'centos'}`);
                break;
            case 'À vontade + Cento':
                if (horas && parseInt(horas) > 0) details.push(`à vontade por ${horas} ${parseInt(horas) === 1 ? 'hora' : 'horas'}`);
                if (centos && parseInt(centos) > 0) details.push(`${centos} ${parseInt(centos) === 1 ? 'cento' : 'centos'}`);
                break;
        }
        
        if (details.length > 0) return `${servico}: ${details.join(' + ')}`;
        return null;
    }).filter(Boolean).join(', ');
};

// --- MAIN APP COMPONENT ---
export default function App() {
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [sameAsEventAddress, setSameAsEventAddress] = useState(false);
    const [cupomStatus, setCupomStatus] = useState<'idle' | 'valid' | 'invalid'>('idle');

    const defaultFormValues = {
        nomeCompleto: "",
        tipoDocumento: "CPF" as "CPF" | "CNPJ",
        cpf: "",
        cnpj: "",
        nomeInstituicao: "",
        enderecoCnpj: "",
        enderecoResidencial: "",
        tipoEvento: "",
        dataEvento: "",
        horarioInicio: "",
        quantidadeConvidados: "",
        enderecoEvento: "",
        modeloContratacao: "" as any,
        servicosContratados: [],
        servicosQuantidades: {},
        servicosQuantidadesCento: {},
        whatsapp: "",
        observacoesUsuario: "",
        cupomDesconto: "",
        cupomValidado: false,
    };
    
    const form = useForm<FormData>({
        // FIX: Cast the zodResolver to Resolver<FormData> to resolve the type mismatch issue.
        resolver: zodResolver(formSchema) as Resolver<FormData>,
        mode: "onSubmit",
        defaultValues: defaultFormValues,
    });

    const watchedModelo = form.watch("modeloContratacao");
    const watchedTipoDocumento = form.watch("tipoDocumento");
    const watchedEnderecoEvento = form.watch("enderecoEvento");
    const cupomValidadoChecked = form.watch("cupomValidado");

    useEffect(() => {
        const savedDraft = localStorage.getItem(DRAFT_KEY);
        if (savedDraft) {
            try {
                form.reset(JSON.parse(savedDraft));
            } catch (e) {
                localStorage.removeItem(DRAFT_KEY);
            }
        }
    }, []);

    useEffect(() => {
        const subscription = form.watch((value) => {
            localStorage.setItem(DRAFT_KEY, JSON.stringify(value));
        });
        return () => subscription.unsubscribe();
    }, [form.watch]);
    
    // Simulate coupon validation for styling
    useEffect(() => {
       if (cupomValidadoChecked) {
         // In the future, this will come from a Supabase call
         setCupomStatus('valid'); 
       } else {
         setCupomStatus('idle');
       }
    }, [cupomValidadoChecked]);

    const onSubmit = async (data: FormData) => {
        setIsLoading(true);
        const webhookUrl = "https://chatboy-n8n.9ejo0r.easypanel.host/webhook/docemomentos";

        const payload = {
            ...data,
            whatsapp: `55${data.whatsapp.replace(/\D/g, '')}`,
            servicosDetalhes: formatServicesForWebhook(data),
        };
        delete (payload as any).servicosQuantidades;
        delete (payload as any).servicosQuantidadesCento;

        try {
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            if (!response.ok) throw new Error('Falha ao enviar os dados.');
            
            setShowSuccessModal(true);
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 4000); // Confetti lasts 4 seconds
            localStorage.removeItem(DRAFT_KEY);
            document.body.style.overflow = 'hidden';

        } catch (error) {
            alert("Ocorreu um erro ao enviar seu formulário. Tente novamente.");
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleCloseModal = () => {
        setShowSuccessModal(false);
        form.reset(defaultFormValues);
        setSameAsEventAddress(false);
        setCupomStatus('idle');
        document.body.style.overflow = 'unset';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleIndicar = () => {
        const mensagem = "😋 *Olha que delícia que vai ter no meu evento!*\n\nhttps://wa.me/c/556285302334\n\nFala com eles que eu indiquei você para ganhar *5% de desconto* no pacote básico!";
        window.open("https://wa.me/?text=" + encodeURIComponent(mensagem), "_blank");
    };

    const handleClearForm = () => {
        if (window.confirm("Tem certeza? Todo o progresso será perdido.")) {
            localStorage.removeItem(DRAFT_KEY);
            form.reset(defaultFormValues);
            setSameAsEventAddress(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const renderServiceQuantitySelector = (servico: string) => {
        const isChecked = form.watch("servicosContratados", []).includes(servico);
        if (!watchedModelo) return null;
        const baseSelectClass = "h-9 text-xs rounded-md border-2 border-[#E9E5DD] focus:ring-amber-500 focus:border-amber-500 disabled:opacity-50 disabled:bg-gray-100 w-full";
        
        const HourSelect = ({name}: {name: string}) => ( <Controller name={name as any} control={form.control} defaultValue="0" render={({ field }) => ( <select {...field} disabled={!isChecked} className={baseSelectClass}>{Array.from({ length: 5 }, (_, i) => (<option key={i} value={i}>{`${i} hr${i !== 1 ? 's' : ''}`}</option>))}</select> )} /> );
        const CentoSelect = ({name}: {name: string}) => ( <Controller name={name as any} control={form.control} defaultValue="0" render={({ field }) => ( <select {...field} disabled={!isChecked} className={baseSelectClass}>{Array.from({ length: 11 }, (_, i) => (<option key={i} value={i}>{`${i} cento${i !== 1 ? 's' : ''}`}</option>))}</select> )} /> );

        switch (watchedModelo) {
            case 'À vontade': return ( <Controller name={`servicosQuantidades.${servico}` as any} control={form.control} defaultValue="1" render={({ field }) => ( <select {...field} disabled={!isChecked} className={baseSelectClass}>{Array.from({ length: 4 }, (_, i) => i + 1).map(h => <option key={h} value={h}>{`${h} hr${h > 1 ? 's' : ''}`}</option>)}</select> )} /> );
            case 'Cento': return ( <Controller name={`servicosQuantidadesCento.${servico}` as any} control={form.control} defaultValue="1" render={({ field }) => ( <select {...field} disabled={!isChecked} className={baseSelectClass}>{Array.from({ length: 10 }, (_, i) => i + 1).map(c => <option key={c} value={c}>{`${c} cento${c > 1 ? 's' : ''}`}</option>)}</select> )} /> );
            case 'À vontade + Cento': return ( <div className="flex items-center gap-2"> <div className="w-[35%]"><HourSelect name={`servicosQuantidades.${servico}`} /></div> <span className="font-medium">+</span> <div className="flex-1"><CentoSelect name={`servicosQuantidadesCento.${servico}`} /></div> </div> );
            default: return null;
        }
    };

    return (
        <>
            <style>{`
              @keyframes pop-in { 
                  0% { transform: scale(0.5); opacity: 0; } 
                  100% { transform: scale(1); opacity: 1; } 
              }
              .animate-pop-in { animation: pop-in 0.5s ease-out forwards; }
              .animate-button-pulse { animation: pulse 2s infinite; }
            `}</style>

            <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">DADOS DO CONTRATO</h1>
                        <img src={docesMomentosLogoBase64} alt="Doces Momentos Logo" className="h-28 md:h-32 w-auto mx-auto my-4 max-w-full object-contain" />
                        <p className="text-sm text-gray-500 max-w-md mx-auto">Preencha <strong className="text-gray-700">corretamente</strong> o formulário abaixo e em seguida <strong className="text-gray-700">enviaremos o contrato para o seu WhatsApp.</strong></p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10 border-2 border-[#E9E5DD]">
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputField label="Nome Completo" name="nomeCompleto" placeholder="Nome de quem vai assinar" form={form} autoComplete="name" />
                                <SelectField label="Tipo de Documento" name="tipoDocumento" form={form} options={[{value: "CPF", label: "CPF"}, {value: "CNPJ", label: "CNPJ"}]} />
                            </div>

                            {watchedTipoDocumento === 'CNPJ' && (
                                <div className="space-y-6">
                                    <InputField label="Nome da Instituição" name="nomeInstituicao" placeholder="Nome completo da instituição" form={form} autoComplete="organization" />
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <InputField label="CNPJ" name="cnpj" placeholder="00.000.000/0000-00" form={form} formatter={formatCNPJ} autoComplete="off" />
                                        <InputField label="CPF (Responsável)" name="cpf" placeholder="CPF de quem vai assinar" form={form} formatter={formatCPF} autoComplete="off" />
                                    </div>
                                    <InputField label="Endereço da Instituição (conforme CNPJ)" name="enderecoCnpj" placeholder="Endereço Completo" form={form} autoComplete="street-address" />
                                </div>
                            )}

                            {watchedTipoDocumento === 'CPF' && ( <InputField label="CPF" name="cpf" placeholder="000.000.000-00" form={form} formatter={formatCPF} autoComplete="off" /> )}
                            
                            <InputField label="Endereço do Evento" name="enderecoEvento" placeholder="Endereço Completo" form={form} autoComplete="address-line1" />
                            <div>
                                <InputField label="Endereço do Responsável" name="enderecoResidencial" placeholder="Endereço pessoal" form={form} disabled={sameAsEventAddress} value={sameAsEventAddress ? watchedEnderecoEvento : form.watch('enderecoResidencial')} autoComplete="address-line1" />
                                <div className="flex items-center mt-2">
                                    <CustomCheckbox 
                                        id="same-address"
                                        label="O mesmo do Evento"
                                        checked={sameAsEventAddress} 
                                        onChange={(e) => { 
                                            const checked = e.target.checked; 
                                            setSameAsEventAddress(checked); 
                                            form.setValue("enderecoResidencial", checked ? watchedEnderecoEvento : "", { shouldValidate: true }); 
                                        }} 
                                    />
                                </div>
                            </div>
                            
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-200">
                                <SelectField label="Tipo do Evento" name="tipoEvento" form={form} options={tiposEvento.map(t => ({value: t, label: t}))} placeholder="Selecione o tipo" />
                                <InputField label="Data do Evento" name="dataEvento" placeholder="DD/MM/AAAA" form={form} formatter={formatDate} autoComplete="off" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputField label="Horário de Início" name="horarioInicio" placeholder="Ex: 15:30" type="time" form={form} />
                                <InputField label="Quantidade de Convidados" name="quantidadeConvidados" placeholder="Ex: 100" type="number" form={form} />
                            </div>

                            <div className="pt-4 border-t border-gray-200">
                                <SelectField label="Modelo de Contratação" name="modeloContratacao" form={form} options={[{value: "À vontade", label:"À vontade"}, {value: "Cento", label: "Cento"}, {value: "À vontade + Cento", label: "À vontade + Cento"}]} placeholder="Selecione o modelo" />
                            </div>

                            {watchedModelo && (
                                <div className="space-y-4 pt-4 border-t border-gray-200">
                                     <div className="grid grid-cols-2 gap-x-4 gap-y-1 items-center font-medium text-sm text-gray-800">
                                        <label>Serviços: <span className="text-red-500">*</span></label>
                                        {watchedModelo === 'À vontade + Cento' ? (
                                            <div className="flex items-center gap-2">
                                                <div className="w-[35%] text-left">Horas:</div>
                                                <div className="font-medium">+</div>
                                                <div className="flex-1 text-left pl-2">Cento:</div>
                                            </div>
                                        ) : <label>Quantidade:</label> }
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                                        {servicos.map((servico) => (
                                            <div key={servico} className="grid grid-cols-2 gap-x-4 items-center">
                                                <Controller
                                                  name="servicosContratados"
                                                  control={form.control}
                                                  render={({ field }) => (
                                                    <CustomCheckbox
                                                      id={servico}
                                                      label={servico}
                                                      checked={field.value.includes(servico)}
                                                      onChange={(e) => {
                                                        const newSelection = e.target.checked
                                                          ? [...field.value, servico]
                                                          : field.value.filter((s) => s !== servico);
                                                        field.onChange(newSelection);
                                                      }}
                                                    />
                                                  )}
                                                />
                                                <div>{renderServiceQuantitySelector(servico)}</div>
                                            </div>
                                        ))}
                                    </div>
                                     {form.formState.errors.servicosContratados && <p className="text-sm text-red-600 mt-1">{form.formState.errors.servicosContratados.message}</p>}
                                </div>
                            )}

                            <div className="pt-4 border-t border-gray-200">
                                <TextAreaField label="Observações" name="observacoesUsuario" optional placeholder="Há alguma informação adicional para nossa equipe analisar?" form={form} formatter={formatCapitalize} />
                            </div>
                            <div className="space-y-2">
                                <InputField label="Tenho um Cupom de Desconto" name="cupomDesconto" optional placeholder="INSIRA SEU CUPOM" form={form} formatter={formatCoupon} />
                                {!!form.watch("cupomDesconto") && ( 
                                    <Controller
                                        name="cupomValidado"
                                        control={form.control}
                                        render={({ field }) => (
                                            <CustomCheckbox
                                                id="validate-coupon"
                                                label="Validar Cupom"
                                                checked={!!field.value}
                                                onChange={(e) => field.onChange(e.target.checked)}
                                                status={cupomStatus}
                                            />
                                        )}
                                    />
                                )}
                            </div>
                            
                             <div className="!mt-8 bg-amber-50/50 p-4 rounded-lg border border-amber-300">
                                <InputField label="WhatsApp que vai receber o contrato" name="whatsapp" placeholder="DDD + 9" form={form} formatter={formatWhatsApp} autoComplete="tel" />
                                <p className="text-xs text-center text-gray-600 mt-2">Confira com atenção. O contrato será enviado para este número.</p>
                            </div>
                            
                            <div className="pt-4 border-t border-gray-200 space-y-4">
                                <button type="submit" disabled={isLoading} className="w-full flex justify-center items-center gap-3 py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-semibold text-white bg-[#D4AF37] hover:bg-[#c5a132] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4AF37] transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                                    {isLoading ? ( <><div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>Enviando...</> ) : ( <><WhatsAppIcon className="h-6 w-6" />Receber Contrato</> )}
                                </button>
                                 <button type="button" onClick={handleClearForm} className="w-full flex justify-center items-center gap-3 py-3 px-4 border border-gray-300 rounded-md shadow-sm text-base font-semibold text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all">Limpar Formulário</button>
                                <p className="text-xs text-gray-500 text-center">Seu progresso é salvo automaticamente como rascunho.</p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            
             {showSuccessModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md text-center transform transition-all scale-100 opacity-100 relative overflow-hidden" >
                        {showConfetti && <Confetti />}
                        <div className="p-8 relative">
                            <button onClick={handleCloseModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition z-10"><XIcon /></button>
                            <div className="mx-auto flex items-center justify-center h-24 w-24"><CheckCircleIcon className="text-green-500 animate-pop-in" /></div>
                            <h3 className="text-2xl font-bold text-gray-900 mt-4">Parabéns! 🥳</h3>
                            <p className="text-gray-600 mt-2">Você receberá o contrato em minutos no seu WhatsApp para analisar e assinar.</p>
                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <h4 className="text-xl font-bold text-gray-900">Indique seus amigos!</h4>
                                <p className="text-gray-600 mt-2">Ele ganha 5% de desconto no pacote básico e você <span className="font-bold text-[#D4AF37]">GANHA UMA BARCA DE CHURROS GRÁTIS</span> caso ele feche!</p>
                                <button onClick={handleIndicar} className="w-full mt-6 flex justify-center items-center gap-3 py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-semibold text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all animate-button-pulse"><SendIcon />Indicar Amigos!</button>
                                <button onClick={handleCloseModal} className="text-sm text-gray-500 hover:text-gray-700 mt-4 underline">Voltar ao formulário</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

// --- REUSABLE FORM COMPONENTS ---
// FIX: Refactor InputField to be strongly-typed and use the Controller's render prop to access field-specific errors.
const InputField = ({ label, name, form, type = "text", placeholder, formatter, optional = false, ...props }: {
    label: string;
    name: Path<FormData>;
    form: UseFormReturn<FormData>;
    type?: string;
    placeholder?: string;
    formatter?: (value: string) => string;
    optional?: boolean;
} & Omit<React.ComponentProps<'input'>, 'name'>) => {
    return (
        <Controller
            name={name}
            control={form.control}
            render={({ field, fieldState: { error } }) => (
                <div>
                    <label htmlFor={name} className="block text-sm font-normal text-gray-700">{label}: {!optional && <span className="text-red-500">*</span>}</label>
                    <input {...field} {...props} id={name} type={type} placeholder={placeholder} onChange={(e) => field.onChange(formatter ? formatter(e.target.value) : e.target.value)} className={`mt-1 block w-full px-3 py-2 bg-white border-2 ${error ? 'border-red-500' : 'border-[#E9E5DD]'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm disabled:bg-gray-100`} />
                    {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
                </div>
            )}
        />
    );
};

// FIX: Refactor SelectField to be strongly-typed and use the Controller's render prop to access field-specific errors.
const SelectField = ({ label, name, form, options, placeholder, optional = false, ...props }: {
    label: string;
    name: Path<FormData>;
    form: UseFormReturn<FormData>;
    options: { value: string, label: string }[];
    placeholder?: string;
    optional?: boolean;
} & Omit<React.ComponentProps<'select'>, 'name'>) => {
    return (
        <Controller
            name={name}
            control={form.control}
            render={({ field, fieldState: { error } }) => (
                <div>
                    <label htmlFor={name} className="block text-sm font-normal text-gray-700">{label}: {!optional && <span className="text-red-500">*</span>}</label>
                    <select {...field} {...props} id={name} className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border-2 ${error ? 'border-red-500' : 'border-[#E9E5DD]'} focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm rounded-md`}>
                        {placeholder && <option value="" disabled hidden>{placeholder}</option>}
                        {options.map((option: any) => (<option key={option.value} value={option.value}>{option.label}</option>))}
                    </select>
                    {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
                </div>
            )}
        />
    );
};

// FIX: Refactor TextAreaField to be strongly-typed and use the Controller's render prop to access field-specific errors.
const TextAreaField = ({ label, name, form, placeholder, optional = false, formatter, ...props }: {
    label: string;
    name: Path<FormData>;
    form: UseFormReturn<FormData>;
    placeholder?: string;
    optional?: boolean;
    formatter?: (value: string) => string;
} & Omit<React.ComponentProps<'textarea'>, 'name'>) => {
    const value = form.watch(name) || "";
    return (
        <Controller
            name={name}
            control={form.control}
            render={({ field, fieldState: { error } }) => (
                <div>
                    <label htmlFor={name} className="block text-sm font-normal text-gray-700">{label}: {optional && <span className="font-normal">(Opcional)</span>}</label>
                    <textarea {...field} {...props} id={name} placeholder={placeholder} rows={4} maxLength={500} onChange={(e) => field.onChange(formatter ? formatter(e.target.value) : e.target.value)} className={`mt-1 block w-full px-3 py-2 bg-white border-2 ${error ? 'border-red-500' : 'border-[#E9E5DD]'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm`} />
                    <div className="text-right text-xs text-gray-500 mt-1">{value.length}/500</div>
                    {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
                </div>
            )}
        />
    );
};

const CustomCheckbox = ({ id, label, checked, onChange, status = 'idle' }: { id: string; label: string; checked: boolean; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; status?: 'idle' | 'valid' | 'invalid' }) => {
    const borderColor = {
        'idle': 'border-[#D4AF37]',
        'valid': 'border-green-500',
        'invalid': 'border-red-500',
    }[status];

    const bgColor = {
        'idle': 'bg-[#D4AF37]',
        'valid': 'bg-green-500',
        'invalid': 'bg-red-500',
    }[status];

    return (
        <label htmlFor={id} className="flex items-center cursor-pointer">
            <div className="relative">
                <input
                    type="checkbox"
                    id={id}
                    className="sr-only" // Hide default checkbox
                    checked={checked}
                    onChange={onChange}
                />
                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${checked ? `${bgColor} ${borderColor}` : `${borderColor} bg-transparent`}`}>
                    {checked && (
                        <svg className="w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    )}
                </div>
            </div>
            {label && <span className="ml-2 block text-sm text-gray-700 select-none">{label}</span>}
        </label>
    );
};