import { useEffect } from 'react';
import { useForm, Controller, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'react-router-dom';
import { pacienteSchema, type PacienteFormData } from '../../schemas/pacienteSchema';
import { createPaciente, updatePaciente, getPacienteById } from '../../services/pacientes';
import { useToastStore } from '../../store/toast';
import { formatCPF, formatCellphone } from '../../utils';

import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, 
  IonButton, IonButtons, IonInput, IonSelect, IonSelectOption, 
  IonItem, IonText, IonIcon, 
  IonGrid, IonRow, IonCol, useIonRouter 
} from '@ionic/react';
import { arrowBackOutline, saveOutline } from 'ionicons/icons';

export const PacienteForm = () => {
  const router = useIonRouter();
  const { id } = useParams<{ id: string }>();
  const showToast = useToastStore((state) => state.showToast);

  const { 
    control, 
    handleSubmit, 
    setValue, 
    reset,    
    formState: { errors, isSubmitting } 
  } = useForm<PacienteFormData>({
    resolver: zodResolver(pacienteSchema),
    defaultValues: { status: 'Ativo' }
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
      router.push('/pacientes', 'back');
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
            <IonButton onClick={() => router.goBack()}>
              <IonIcon slot="icon-only" icon={arrowBackOutline} />
            </IonButton>
          </IonButtons>
          <IonTitle>{id && id !== 'novo' ? 'Editar Paciente' : 'Novo Paciente'}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          
          <IonGrid style={{ maxWidth: '800px', margin: '0 auto' }}>
            
            <IonRow>
              <IonCol size="12" sizeMd="6">
                <IonItem>
                  <Controller
                    name="nome"
                    control={control}
                    render={({ field }) => (
                      <IonInput label="Nome Completo" labelPlacement="floating" value={field.value} onIonInput={e => field.onChange(e.detail.value ?? "")} onIonBlur={field.onBlur} />
                    )}
                  />
                </IonItem>
                {errors.nome && <IonText color="danger"><small className="ion-padding-start">{errors.nome.message}</small></IonText>}
              </IonCol>

              <IonCol size="12" sizeMd="6">
                <IonItem>
                  <Controller
                    name="cpf"
                    control={control}
                    render={({ field }) => (
                      <IonInput label="CPF" labelPlacement="floating" maxlength={14} value={field.value} onIonInput={e => field.onChange(formatCPF((e.detail.value ?? "").toString()))} onIonBlur={field.onBlur} />
                    )}
                  />
                </IonItem>
                {errors.cpf && <IonText color="danger"><small className="ion-padding-start">{errors.cpf.message}</small></IonText>}
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol size="12" sizeMd="6">
                <IonItem>
                  <Controller
                    name="dataNascimento"
                    control={control}
                    render={({ field }) => (
                      <IonInput type="date" label="Data de Nascimento" labelPlacement="floating" value={field.value} onIonInput={e => field.onChange(e.detail.value ?? "")} onIonBlur={field.onBlur} />
                    )}
                  />
                </IonItem>
                {errors.dataNascimento && <IonText color="danger"><small className="ion-padding-start">{errors.dataNascimento.message}</small></IonText>}
              </IonCol>

              <IonCol size="12" sizeMd="6">
                <IonItem>
                  <Controller
                    name="celular"
                    control={control}
                    render={({ field }) => (
                      <IonInput label="Celular" labelPlacement="floating" maxlength={15} value={field.value} onIonInput={e => field.onChange(formatCellphone((e.detail.value ?? "").toString()))} onIonBlur={field.onBlur} />
                    )}
                  />
                </IonItem>
                {errors.celular && <IonText color="danger"><small className="ion-padding-start">{errors.celular.message}</small></IonText>}
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol size="12" sizeMd="6">
                <IonItem>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <IonInput type="email" label="E-mail" labelPlacement="floating" value={field.value} onIonInput={e => field.onChange(e.detail.value ?? "")} onIonBlur={field.onBlur} />
                    )}
                  />
                </IonItem>
                {errors.email && <IonText color="danger"><small className="ion-padding-start">{errors.email.message}</small></IonText>}
              </IonCol>

              <IonCol size="12" sizeMd="3">
                <IonItem>
                  <Controller
                    name="sexo"
                    control={control}
                    render={({ field }) => (
                      <IonSelect label="Sexo" labelPlacement="floating" value={field.value} onIonChange={e => field.onChange(e.detail.value)}>
                        <IonSelectOption value="Feminino">Feminino</IonSelectOption>
                        <IonSelectOption value="Masculino">Masculino</IonSelectOption>
                        <IonSelectOption value="Outro">Outro</IonSelectOption>
                      </IonSelect>
                    )}
                  />
                </IonItem>
              </IonCol>

              <IonCol size="12" sizeMd="3">
                <IonItem>
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <IonSelect label="Status" labelPlacement="floating" value={field.value} onIonChange={e => field.onChange(e.detail.value)}>
                        <IonSelectOption value="Ativo">Ativo</IonSelectOption>
                        <IonSelectOption value="Inativo">Inativo</IonSelectOption>
                      </IonSelect>
                    )}
                  />
                </IonItem>
              </IonCol>
            </IonRow>

            <IonRow className="ion-margin-top">
              <IonCol size="12">
                <IonText color="primary">
                  <h3 className="ion-no-margin ion-padding-start">Endereço</h3>
                </IonText>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol size="12" sizeMd="4">
                <IonItem>
                  <Controller
                    name="cep"
                    control={control}
                    render={({ field }) => (
                      <IonInput label="CEP" labelPlacement="floating" maxlength={9} value={field.value} onIonInput={e => {
                        const val = (e.detail.value ?? "").toString();
                        field.onChange(val);
                        const apenasNumeros = val.replace(/\D/g, '');
                        if (apenasNumeros.length === 8) buscarCepNaApi(apenasNumeros);
                      }} onIonBlur={field.onBlur} />
                    )}
                  />
                </IonItem>
              </IonCol>

              <IonCol size="12" sizeMd="8">
                <IonItem>
                  <Controller name="rua" control={control} render={({ field }) => (
                    <IonInput label="Rua" labelPlacement="floating" value={field.value} onIonInput={e => field.onChange(e.detail.value)} />
                  )} />
                </IonItem>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol size="12" sizeMd="5">
                <IonItem>
                  <Controller name="bairro" control={control} render={({ field }) => (
                    <IonInput label="Bairro" labelPlacement="floating" value={field.value} onIonInput={e => field.onChange(e.detail.value)} />
                  )} />
                </IonItem>
              </IonCol>

              <IonCol size="12" sizeMd="5">
                <IonItem>
                  <Controller name="cidade" control={control} render={({ field }) => (
                    <IonInput label="Cidade" labelPlacement="floating" value={field.value} onIonInput={e => field.onChange(e.detail.value)} />
                  )} />
                </IonItem>
              </IonCol>

              <IonCol size="12" sizeMd="2">
                <IonItem>
                  <Controller name="uf" control={control} render={({ field }) => (
                    <IonInput label="UF" labelPlacement="floating" maxlength={2} value={field.value} onIonInput={e => field.onChange(e.detail.value)} />
                  )} />
                </IonItem>
              </IonCol>
            </IonRow>

            <IonRow className="ion-margin-top">
              <IonCol size="12">
                <IonButton type="submit" expand="block" disabled={isSubmitting}>
                  <IonIcon slot="start" icon={saveOutline} />
                  {isSubmitting ? 'Salvando...' : 'Salvar Paciente'}
                </IonButton>
              </IonCol>
            </IonRow>

          </IonGrid>
        </form>
      </IonContent>
    </IonPage>
  );
};