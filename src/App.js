import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { useState } from 'react';
import CadastrarGasto from './Publico/Cadastrar_gasto';
import ListaDespesa from './Publico/lista_gasto';

function App() {
  
  const [despesas, setDespesas] = useState([]);


  const adicionarDespesa = (novaDespesa) => {
    setDespesas([...despesas, novaDespesa]);
  };

  
  const removerDespesa = (id) => {
    setDespesas(despesas.filter(despesa => despesa.id !== id));
  };

  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">Gerenciar Gasto</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/cadastrar-gasto">Cadastrar Gasto</Nav.Link>
              <Nav.Link as={Link} to="/lista-gasto">Lista de Despesas</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Routes>
          
          <Route path="/cadastrar-gasto" element={<CadastrarGasto adicionarDespesa={adicionarDespesa} />} />

          
          <Route path="/lista-gasto" element={<ListaDespesa despesas={despesas} removerDespesa={removerDespesa} />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
