// É chamada quando o usuário apaga o CEP, digita um CEP inválido ou ocorre um erro.
const limpaFormularioCep = () => { 
    document.getElementById('rua').value = "";
    document.getElementById('bairro').value = "";
    document.getElementById('cidade').value = "";
    document.getElementById('uf').value = "";
};

// A palavra 'async' avisa o JavaScript que esta função fará tarefas demoradas
// e precisará pausar em alguns momentos esperando respostas.
export const pesquisacep = async (valor) => {
    const cep = valor.replace(/\D/g, ''); // Remove tudo o que não é dígito

    if (cep.length === 8) { //Verifica se o CEP tem 8 dígitos
        const validacep = /^[0-9]{8}$/;

        if (validacep.test(cep)) { //Testa se o CEP passa na regra de validação
            document.getElementById('rua').value = "Buscando...";
            document.getElementById('bairro').value = "Buscando...";
            document.getElementById('cidade').value = "Buscando...";
            document.getElementById('uf').value = "Buscando...";

            try {
                //'await' pausa o código aqui até o servidor do ViaCEP responder com os dados.
                //'fetch' é uma função nativa do JavaScript para buscar dados fora do site.
                const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                //Pausa de novo até que o servidor do ViaCEP responda com os dados em formato JSON.
                const conteudo = await resposta.json();

                // Checa se o ViaCEP retornou um erro
                if (!("erro" in conteudo)) {
                    // Se tudo estiver certo, preenche os campos do formulário com os valores retornados.
                    document.getElementById('rua').value = conteudo.logradouro;
                    document.getElementById('bairro').value = conteudo.bairro;
                    document.getElementById('cidade').value = conteudo.localidade;
                    document.getElementById('uf').value = conteudo.uf;
                } else {
                    //O CEP tem 8 números, mas não existe, limpa a tela e avisa o usuário.
                    limpaFormularioCep();
                    console.warn("CEP não encontrado.");
                    alert("CEP não encontrado. Por favor, verifique o número digitado.");
                }
            } catch (erro) { // Cai aqui se a internet cair, o servidor do ViaCEP estiver fora do ar, etc.
                limpaFormularioCep();
                console.error(erro, "Erro ao buscar o CEP. Verifique sua conexão.");
                alert("Erro ao buscar o CEP. Verifique sua conexão.");
            }
        } else {
            limpaFormularioCep();
        }
    };

};
