// É chamada quando o usuário apaga o CEP, digita um CEP inválido ou ocorre um erro.
const limpa_formulario_cep = () => { 
    document.getElementById('rua').value = "";
    document.getElementById('bairro').value = "";
    document.getElementById('cidade').value = "";
    document.getElementById('uf').value = "";
};

// A palavra 'async' avisa o JavaScript que esta função fará tarefas demoradas
// e precisará pausar em alguns momentos esperando respostas.
const pesquisacep = async (valor) => {
    const cep = valor.replace(/\D/g, ''); // Remove tudo o que não é dígito

    if (cep !== "") {
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
                    limpa_formulario_cep();
                    alert("CEP não encontrado.");
                }
            } catch (erro) { // Cai aqui se a internet cair, o servidor do ViaCEP estiver fora do ar, etc.
                limpa_formulario_cep();
                alert("Erro ao buscar o CEP. Verifique sua conexão.");
            }
        } else {
            limpa_formulario_cep();
        }
    };
};

const cepInput = document.getElementById('cep');

// O 'blur' é disparado assim que o usuário clica fora do campo de input (perde o foco).
// Quando isso acontece, ele pega o que está escrito (event.target.value) e manda para a função pesquisacep
cepInput.addEventListener('blur', (event) => {
    pesquisacep(event.target.value);
});
