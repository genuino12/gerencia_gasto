import React, { useState, useEffect } from 'react';
import { Button, Form, Alert, Nav, Container, Navbar, Col } from 'react-bootstrap';
import {Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


const CadastrarGasto = ({ adicionarDespesa, usuarioLogado }) => {
  const [formData, setFormData] = useState({
    Tipo: '',
    Valor: '',
    DataVencimento: '',
    Responsavel: usuarioLogado?.nome || 'Lucas Genuíno de Jesus',
    Observacoes: '',
  });

  const [erros, setErros] = useState({});
  const [sucesso, setSucesso] = useState(false);

  useEffect(() => {
    if (usuarioLogado?.nome) {
      setFormData((prevData) => ({ ...prevData, Responsavel: usuarioLogado.nome }));
    }
  }, [usuarioLogado]);

  // Formata valores monetários no estilo "R$ 0,00"
  const formatarValor = (valor) => {
    const valorNumerico = valor.replace(/\D/g, '');
    const inteiro = valorNumerico.slice(0, -2) || '0';
    const centavos = valorNumerico.slice(-2).padStart(2, '0');
    return `R$ ${parseInt(inteiro).toLocaleString('pt-BR')},${centavos}`;
  };

  const validarFormulario = () => {
    const novosErros = {};

    if (!formData.Tipo) novosErros.Tipo = 'Selecione o tipo de despesa.';
    if (!formData.Valor || formData.Valor === 'R$ 0,00') novosErros.Valor = 'Digite um valor válido.';
    if (!formData.DataVencimento) novosErros.DataVencimento = 'Selecione uma data de vencimento.';
    if (!formData.Observacoes || formData.Observacoes.trim().length < 10) {
      novosErros.Observacoes = 'As observações devem conter pelo menos 10 caracteres.';
    }

    const dataAtual = new Date();
    dataAtual.setHours(0, 0, 0, 0);
    const dataInserida = new Date(formData.DataVencimento);

    if (formData.DataVencimento && (isNaN(dataInserida.getTime()) || dataInserida < dataAtual)) {
      novosErros.DataVencimento = 'A data de vencimento deve ser válida e não pode ser anterior a hoje.';
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const limparFormulario = () => {
    setFormData({
      Tipo: '',
      Valor: '',
      DataVencimento: '',
      Responsavel: usuarioLogado?.nome || 'Lucas Genuíno de Jesus',
      Observacoes: '',
    });
    setErros({});
  };

  const Envio = async (e) => {
    e.preventDefault();

    if (validarFormulario()) {
      try {
        const novaDespesa = {
          tipo_despesa_id: formData.Tipo,
          valor: parseFloat(formData.Valor.replace('R$', '').replace('.', '').replace(',', '.')),
          data_vencimento: formData.DataVencimento,
          responsavel_nome: formData.Responsavel,
          observacao: formData.Observacoes,
        };

        await adicionarDespesa(novaDespesa);
        limparFormulario();
        setSucesso(true);
        setTimeout(() => setSucesso(false), 3000);
      } catch (error) {
        console.error('Erro ao adicionar despesa:', error);
      }
    }
  };

  const Identificar_Valor = (e) => {
    const valor = e.target.value;
    setFormData({ ...formData, Valor: formatarValor(valor) });
  };

  const Identificar_DataVencimento = (e) => {
    setFormData({ ...formData, DataVencimento: e.target.value });
  };

  return (
  
    <div className="container mt-4">
      <h2>Cadastrar Gasto</h2>
      <Navbar bg="" variant=""  className="justify-content-center">
  <Container>
  <Col className="d-flex justify-content-center">
    <Nav className="me-auto">
      <Nav.Link as={Link} to="/tipo-despesa">
      <Button variant="dark">Tipo de Despesas</Button>
      </Nav.Link>
      <Nav.Link as={Link} to="/lista-gasto">
      <Button variant="dark">Lista de Gasto</Button>
      </Nav.Link>
    </Nav>
    </Col>
  </Container>
</Navbar>

      {sucesso && <Alert variant="success">Despesa cadastrada com sucesso!</Alert>}
      {Object.keys(erros).length > 0 && (
        <Alert variant="danger">Corrija os erros antes de enviar o formulário.</Alert>
      )}

      <Form onSubmit={Envio} >
        <Form.Group controlId="formTipo">
          <Form.Label>Tipo de Despesa:</Form.Label>
          <Form.Control
            as="select"
            value={formData.Tipo}
            onChange={(e) => setFormData({ ...formData, Tipo: e.target.value })}
            required
          >
            <option value="">Selecionar a despesa</option>
            <option value="1">Água</option>
            <option value="2">Luz</option>
            <option value="3">Aluguel</option>
            <option value="4">Gastos de Materiais</option>
            <option value="5">Pagamento dos Funcionários</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formValor">
          <Form.Label>Valor:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o valor"
            value={formData.Valor}
            onChange={Identificar_Valor}
            required
          />
        </Form.Group>

        <Form.Group controlId="formDataVencimento">
          <Form.Label>Data de Vencimento:</Form.Label>
          <Form.Control
            type="date"
            value={formData.DataVencimento}
            onChange={Identificar_DataVencimento}
            required
          />
        </Form.Group>

        <Form.Group controlId="formResponsavel">
          <Form.Label>Nome do Responsável:</Form.Label>
          <Form.Control type="text" value={formData.Responsavel} readOnly />
        </Form.Group>

        <Form.Group controlId="formObservacoes">
          <Form.Label>Observações:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Adicione observações sobre a despesa (mínimo 10 caracteres)"
            value={formData.Observacoes}
            onChange={(e) => setFormData({ ...formData, Observacoes: e.target.value })}
            required
          />
        </Form.Group>

        <br />
        <Button variant="primary" type="submit">
          Cadastrar Despesa
        </Button>
      </Form>
    </div>
  );
};

export default CadastrarGasto;
