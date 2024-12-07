import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import CadastrarGasto from './Publico/Cadastrar_gasto';
import ListaDespesa from './Publico/lista_gasto';
import GastoServico from './serviços/gastoServico';
import TipoDespesa from './Publico/tipo_despesa';


const gastoServico = new GastoServico();

function App() {
  const [despesas, setDespesas] = useState([]);

  useEffect(() => {
    const carregarDespesas = async () => {
      try {
        const dados = await gastoServico.obterTodasDespesas();
        setDespesas(Array.isArray(dados) ? dados : []);
      } catch (error) {
        console.error('Erro ao carregar despesas:', error);
      }
    };
    carregarDespesas();
  }, []);

  const adicionarDespesa = async (novaDespesa) => {
    try {
      const despesaAdicionada = await gastoServico.inserirDespesa(novaDespesa);
      if (!despesaAdicionada || Object.keys(despesaAdicionada).length === 0) {
        throw new Error('Resposta da API está vazia ou inválida.');
      }
      setDespesas((prevDespesas) => [...prevDespesas, despesaAdicionada]);
    } catch (error) {
      console.error('Erro ao adicionar despesa:', error);
    }
  };

  const removerDespesa = async (id) => {
    try {
      await gastoServico.deletarDespesa(id);
      setDespesas((prevDespesas) =>
        prevDespesas.filter((despesa) => despesa.id !== id)
      );
    } catch (error) {
      console.error('Erro ao remover despesa:', error);
    }
  };

  const atualizarDespesa = async (id, despesaAtualizada) => {
    try {
      const despesa = await gastoServico.atualizarDespesa(id, despesaAtualizada);
      if (despesa && despesa.id === id) {
        setDespesas((prevDespesas) =>
          prevDespesas.map((d) => (d.id === id ? despesa : d))
        );
      } else {
        console.error('Erro: A despesa retornada não é válida ou o ID não corresponde.');
      }
    } catch (error) {
      console.error('Erro ao atualizar despesa:', error);
    }
  };

  const buscarDespesaPorFiltro = async (filtro) => {
    try {
      const despesasFiltradas = await gastoServico.buscarDespesaPorFiltro(filtro);
      setDespesas(Array.isArray(despesasFiltradas) ? despesasFiltradas : []);
    } catch (error) {
      console.error('Erro ao buscar despesas com filtro:', error);
    }
  };

  return (
    <Router>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">Planeta Verde</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/cadastrar-gasto">Cadastrar Gasto</Nav.Link>
              <Nav.Link as={Link} to="/tipo-despesa">Cadastrar Tipo de Despesas</Nav.Link>
              <Nav.Link as={Link} to="/lista-gasto">Lista de Despesas</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Conteúdo principal */}
      <Container className="mt-4">
        <Routes>
          <Route
            path="/"
            element={<div>Bem-vindo ao Planeta Verde!</div>}
          />
          <Route
            path="/cadastrar-gasto"
            element={<CadastrarGasto adicionarDespesa={adicionarDespesa} />}
          />
          <Route
            path="/lista-gasto"
            element={
              <ListaDespesa
                despesas={despesas}
                removerDespesa={removerDespesa}
                atualizarDespesa={atualizarDespesa}
                buscarDespesaPorFiltro={buscarDespesaPorFiltro}
              />
            }
          />
          <Route path="/tipo-despesa" element={<TipoDespesa />} />
          <Route path="*" element={<div>Página não encontrada!</div>} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
