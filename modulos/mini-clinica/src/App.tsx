import { useState } from 'react';
import { pacientes } from './pacientes';
import { filterByName } from './utils';
import { Button } from './components/Button';
import './App.css';


export function App() {
  const [busca, setBusca] = useState('');
  const [pagina, setPagina] = useState(1);
  const itensPorPagina = 5;

  const listaFiltrada = filterByName(pacientes, busca);

  const totalPaginas = Math.ceil(listaFiltrada.length / itensPorPagina);
  const indiceInicio = (pagina - 1) * itensPorPagina;
  const pacientesDaPagina = listaFiltrada.slice(indiceInicio, indiceInicio + itensPorPagina);

  const handleBusca = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBusca(e.target.value);
    setPagina(1); // Critério atendido: Buscar volta pra página 1
};
return (
    <main className="painel">
      <h1 className="painel__titulo">Lista de Pacientes</h1>

      <div className="painel__busca">
        <label htmlFor="busca-paciente">Buscar Paciente:</label>
        <input 
          type="search" 
          id="busca-paciente"
          className="painel__input"
          placeholder="Digite o nome do paciente"
          value={busca}
          onChange={handleBusca}
        />
      </div>

      {listaFiltrada.length === 0 ? (
        <p style={{ textAlign: 'center', marginTop: '20px' }}>
          Nenhum paciente encontrado com esse nome.
        </p>
      ) : (
        <section className="lista-de-pacientes">
          {pacientesDaPagina.map((paciente) => (
            <div 
              key={paciente.id} 
              className={`card-do-paciente ${paciente.status === 'Inativo' ? 'card-do-paciente--inativo' : ''}`}
            >
              <h2 className="card-do-paciente__nome">{paciente.nome}</h2>
              <p className="card-do-paciente__cidade-uf">{paciente.cidade} / {paciente.uf}</p>
              <p className="card-do-paciente__cpf">CPF: {paciente.cpf}</p>
              <p className="card-do-paciente__nascimento">Data de Nasc.: {paciente.dataNascimento}</p>
              <p className="card-do-paciente__status">{paciente.status}</p>
            </div>
          ))}
        </section>
      )}

      {/* Controles de Paginação */}
      {listaFiltrada.length > 0 && (
        <div className="paginacao">
          <Button.Outline 
            onClick={() => setPagina(pagina - 1)} 
            disabled={pagina === 1}
          >
            Anterior
          </Button.Outline>
          
          <span style={{ fontWeight: 'bold', color: '#555' }}>
            Página {pagina} de {totalPaginas || 1}
          </span>
          
          <Button.Default 
            onClick={() => setPagina(pagina + 1)} 
            disabled={pagina === totalPaginas}
          >
            Próxima
          </Button.Default>
        </div>
      )}
    </main>
  );
}

export default App;