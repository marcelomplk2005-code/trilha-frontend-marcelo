import { useEffect } from 'react';
import { useForm, Controller, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useHistory, useParams } from 'react-router-dom';
import { pacienteSchema, type PacienteFormData } from '../../schemas/pacienteSchema';
import { createPaciente, updatePaciente, getPacienteById } from '../../services/pacientes';
import { useToastStore } from '../../store/toast';
import { formatCPF, formatCellphone } from '../../utils';

import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, 
  IonButton, IonButtons, IonInput, IonSelect, IonSelectOption, 
  IonItem, IonText, IonIcon
} from '@ionic/react';
import { arrowBackOutline, saveOutline } from 'ionicons/icons';

export const PacienteForm = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  const showToast = useToastStore((state) => state.showToast);

  const { 
    control, // O control substitui o register e gerencia os Controllers
    handleSubmit, 
    setValue, 
    reset,    
    formState: { errors, isSubmitting } 
  } = useForm<PacienteFormData>({
    resolver: zodResolver(pacienteSchema),
    defaultValues: {
      status: 'Ativo'
    }
  });

  useEffect(() => {
    if (id && id !== 'novo') {
      const carregarPaciente = async () => {
        try {
          const dados = await getPacienteById(id);
          reset(dados);
        } catch (error) {
          console.error('Erro ao carregar dados:', error);
          showToast('Erro ao carregar paciente.', 'error');
        }
      };
      carregarPaciente();
    }
  }, [id, reset, showToast]);

  const buscarCepNaApi = async (cepBuscado: string) => {
    setValue('rua', 'Buscando...');
    setValue('bairro', 'Buscando...');
    setValue('cidade', 'Buscando...');
    setValue('uf', '...');

    try {
      const resposta = await fetch(`https://viacep.com.br/ws/${cepBuscado}/json/`);
      const conteudo = await resposta.json();

      if (!("erro" in conteudo)) {
        setValue('rua', conteudo.logradouro);
        setValue('bairro', conteudo.bairro);
        setValue('cidade', conteudo.localidade);
        setValue('uf', conteudo.uf);
      } else {
        showToast('CEP não encontrado.', 'error');
        setValue('rua', '');
        setValue('bairro', '');
        setValue('cidade', '');
        setValue('uf', '');
      }
    } catch (erro) {
      console.error(erro);
      showToast('Erro ao buscar o CEP.', 'error');
    }
  };

  const onSubmit: SubmitHandler<PacienteFormData> = async (data) => {
    try {
      if (id && id !== 'novo') {
        await updatePaciente(id, data);
        showToast('Paciente atualizado com sucesso!', 'success');
      } else {
        await createPaciente(data);
        showToast('Paciente cadastrado com sucesso!', 'success');
      }
      history.push('/pacientes');
    } catch (error) {
      console.error('Erro ao salvar o paciente:', error);
      showToast('Erro ao salvar. Verifique os dados.', 'error');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonButton onClick={() => history.push('/pacientes')}>
              <IonIcon slot="icon-only" icon={arrowBackOutline} />
            </IonButton>
          </IonButtons>
          <IonTitle>{id && id !== 'novo' ? 'Editar Paciente' : 'Novo Paciente'}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <form onSubmit={handleSubmit(onSubmit)} noValidate style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', maxWidth: '800px', margin: '0 auto' }}>
          
          {/* NOME */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <IonItem>
              <Controller
                name="nome"
                control={control}
                render={({ field }) => (
                  <IonInput
                    label="Nome Completo"
                    labelPlacement="floating"
                    value={field.value}
                    onIonInput={e => field.onChange(e.detail.value ?? "")}
                    onIonBlur={field.onBlur}
                  />
                )}
              />
            </IonItem>
            {errors.nome && <IonText color="danger"><small>{errors.nome.message}</small></IonText>}
          </div>

          {/* CPF */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <IonItem>
              <Controller
                name="cpf"
                control={control}
                render={({ field }) => (
                  <IonInput
                    label="CPF"
                    labelPlacement="floating"
                    maxlength={14}
                    value={field.value}
                    onIonInput={e => {
                      // Pega o que o usuário digitou, formata e só então manda para o form
                      const mascarado = formatCPF((e.detail.value ?? "").toString());
                      field.onChange(mascarado);
                    }}
                    onIonBlur={field.onBlur}
                  />
                )}
              />
            </IonItem>
            {errors.cpf && <IonText color="danger"><small>{errors.cpf.message}</small></IonText>}
          </div>

          {/* DATA DE NASCIMENTO */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <IonItem>
              <Controller
                name="dataNascimento"
                control={control}
                render={({ field }) => (
                  <IonInput
                    type="date"
                    label="Data de Nascimento"
                    labelPlacement="floating"
                    value={field.value}
                    onIonInput={e => field.onChange(e.detail.value ?? "")}
                    onIonBlur={field.onBlur}
                  />
                )}
              />
            </IonItem>
            {errors.dataNascimento && <IonText color="danger"><small>{errors.dataNascimento.message}</small></IonText>}
          </div>

          {/* CELULAR */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <IonItem>
              <Controller
                name="celular"
                control={control}
                render={({ field }) => (
                  <IonInput
                    label="Celular"
                    labelPlacement="floating"
                    maxlength={15}
                    value={field.value}
                    onIonInput={e => {
                      const mascarado = formatCellphone((e.detail.value ?? "").toString());
                      field.onChange(mascarado);
                    }}
                    onIonBlur={field.onBlur}
                  />
                )}
              />
            </IonItem>
            {errors.celular && <IonText color="danger"><small>{errors.celular.message}</small></IonText>}
          </div>

          {/* E-MAIL */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <IonItem>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <IonInput
                    type="email"
                    label="E-mail"
                    labelPlacement="floating"
                    value={field.value}
                    onIonInput={e => field.onChange(e.detail.value ?? "")}
                    onIonBlur={field.onBlur}
                  />
                )}
              />
            </IonItem>
            {errors.email && <IonText color="danger"><small>{errors.email.message}</small></IonText>}
          </div>

          {/* SEXO */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <IonItem>
              <Controller
                name="sexo"
                control={control}
                render={({ field }) => (
                  <IonSelect
                    label="Sexo"
                    labelPlacement="floating"
                    value={field.value}
                    onIonChange={e => field.onChange(e.detail.value)}
                  >
                    <IonSelectOption value="Feminino">Feminino</IonSelectOption>
                    <IonSelectOption value="Masculino">Masculino</IonSelectOption>
                    <IonSelectOption value="Outro">Outro</IonSelectOption>
                  </IonSelect>
                )}
              />
            </IonItem>
          </div>

          {/* STATUS */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <IonItem>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <IonSelect
                    label="Status"
                    labelPlacement="floating"
                    value={field.value}
                    onIonChange={e => field.onChange(e.detail.value)}
                  >
                    <IonSelectOption value="Ativo">Ativo</IonSelectOption>
                    <IonSelectOption value="Inativo">Inativo</IonSelectOption>
                  </IonSelect>
                )}
              />
            </IonItem>
          </div>

          <h3 style={{ gridColumn: 'span 2', marginTop: '10px', marginBottom: '0' }}>Endereço</h3>

          {/* CEP (Com evento de busca na API embutido no onChange) */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <IonItem>
              <Controller
                name="cep"
                control={control}
                render={({ field }) => (
                  <IonInput
                    label="CEP"
                    labelPlacement="floating"
                    maxlength={9}
                    value={field.value}
                    onIonInput={e => {
                      const val = (e.detail.value ?? "").toString();
                      field.onChange(val);
                      
                      const apenasNumeros = val.replace(/\D/g, '');
                      if (apenasNumeros.length === 8) {
                        buscarCepNaApi(apenasNumeros);
                      }
                    }}
                    onIonBlur={field.onBlur}
                  />
                )}
              />
            </IonItem>
          </div>

          {/* RUA */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <IonItem>
              <Controller name="rua" control={control} render={({ field }) => (
                <IonInput label="Rua" labelPlacement="floating" value={field.value} onIonInput={e => field.onChange(e.detail.value)} />
              )} />
            </IonItem>
          </div>

          {/* BAIRRO */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <IonItem>
              <Controller name="bairro" control={control} render={({ field }) => (
                <IonInput label="Bairro" labelPlacement="floating" value={field.value} onIonInput={e => field.onChange(e.detail.value)} />
              )} />
            </IonItem>
          </div>

          {/* CIDADE E UF */}
          <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '10px' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <IonItem>
                <Controller name="cidade" control={control} render={({ field }) => (
                  <IonInput label="Cidade" labelPlacement="floating" value={field.value} onIonInput={e => field.onChange(e.detail.value)} />
                )} />
              </IonItem>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <IonItem>
                <Controller name="uf" control={control} render={({ field }) => (
                  <IonInput label="UF" labelPlacement="floating" maxlength={2} value={field.value} onIonInput={e => field.onChange(e.detail.value)} />
                )} />
              </IonItem>
            </div>
          </div>

          {/* BOTÃO DE SALVAR */}
          <div style={{ gridColumn: 'span 2', marginTop: '20px' }}>
            <IonButton 
              type="submit" 
              expand="block" 
              disabled={isSubmitting}
            >
              <IonIcon slot="start" icon={saveOutline} />
              {isSubmitting ? 'Salvando...' : 'Salvar Paciente'}
            </IonButton>
          </div>
        </form>
      </IonContent>
    </IonPage>
  );
};