import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Container, Navbar, Nav, Col, Image } from 'react-bootstrap';
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
        const dados = await gastoServico.buscarDespesas();
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

  return (
    <Router>
     
      <Container>
        <Col className="d-flex justify-content-center">
        <Image
          src="/img/logo1.jpg"
          roundedCircle
           style={{ width: '250px', height: '250px' }}
            />
        </Col>
      </Container>

      <Navbar bg="dark" variant="dark" >
        <Container>
          <Navbar.Brand as={Link} to="/cadastrar-gasto">
              <h3 >Planeta Verde</h3>
          </Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/doador">
                Doador
              </Nav.Link>
              <Nav.Link as={Link} to="/doacao">
                Doaçao 
              </Nav.Link>
              <Nav.Link as={Link} to="/projetos">
                Projetos 
              </Nav.Link>
              <Nav.Link as={Link} to="/atividades">
                Atividade
              </Nav.Link>
              <Nav.Link as={Link} to="/pedidos">
                Pedido
              </Nav.Link>
              <Nav.Link as={Link} to="/Registro de Despesas">
                Registro de Despesas
              </Nav.Link>
              <Nav.Link as={Link} to="/sobre_nos">
                Sobre nós
              </Nav.Link>
            </Nav>
        </Container>
      </Navbar>
           
      <Container className="mt-4">
        <Routes>
          
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
