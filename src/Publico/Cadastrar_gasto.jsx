import React, { useState, useEffect } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';

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
    const inteiro = valorNumerico.slice(0, -2);
    const centavos = valorNumerico.slice(-2).padStart(2); 
    return `R$ ${inteiro},${centavos}`;
  };

  const validarFormulario = () => {
    const novosErros = {};

    // Validações
    if (!formData.Tipo) novosErros.Tipo = 'Selecione o tipo de despesa.';
    if (!formData.Valor || formData.Valor === 'R$ 0,00') novosErros.Valor = 'Digite um valor válido.';
    if (!formData.DataVencimento) novosErros.DataVencimento = 'Selecione uma data de vencimento.';
    if (!formData.Observacoes || formData.Observacoes.trim().length < 10) {
      novosErros.Observacoes = 'As observações devem conter pelo menos 10 caracteres.';
    }

    const dataAtual = new Date();
    const dataInserida = new Date(formData.DataVencimento);

    if (formData.DataVencimento && (isNaN(dataInserida.getTime()) || dataInserida < dataAtual.setHours(0, 0, 0, 0))) {
      novosErros.DataVencimento = 'A data de vencimento deve ser válida e não pode ser anterior a hoje.';
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const Envio = (e) => {
    e.preventDefault();
    if (validarFormulario()) {
      const novaDespesa = {
        id: Date.now(),
        Tipo: formData.Tipo,
        Valor: parseFloat(formData.Valor.replace(/[^\d]/g, '')) / 100, 
        DataVencimento: formData.DataVencimento, 
        Responsavel: formData.Responsavel,
        Observacoes: formData.Observacoes,
      };

      
      adicionarDespesa(novaDespesa);

      
      setFormData({
        Tipo: '',
        Valor: '',
        DataVencimento: '',
        Responsavel: usuarioLogado?.nome || 'Lucas Genuíno de Jesus',
        Observacoes: '',
      });
      setErros({});
      setSucesso(true);

      setTimeout(() => setSucesso(false), 3000);
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
    <div>
      <h2>Cadastrar Gasto</h2>

      {sucesso && <Alert variant="success">Despesa cadastrada com sucesso.</Alert>}

      <Form onSubmit={Envio}>
        <Form.Group controlId="formTipo">
          <Form.Label>Tipo de Despesa:</Form.Label>
          <Form.Control
            as="select"
            value={formData.Tipo}
            onChange={(e) => setFormData({ ...formData, Tipo: e.target.value })}
          >
            <option value="">Selecionar a despesa</option>
            <option value="água">Água</option>
            <option value="luz">Luz</option>
            <option value="aluguel">Aluguel</option>
            <option value="material">Gastos de Materiais</option>
            <option value="funcionarios">Pagamento dos Funcionários</option>
          </Form.Control>
          {erros.Tipo && <Alert variant="danger">{erros.Tipo}</Alert>}
        </Form.Group>

        <Form.Group controlId="formValor">
          <Form.Label>Valor:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o valor"
            value={formData.Valor}
            onChange={Identificar_Valor}
          />
          {erros.Valor && <Alert variant="danger">{erros.Valor}</Alert>}
        </Form.Group>

        <Form.Group controlId="formDataVencimento">
          <Form.Label>Data de Vencimento:</Form.Label>
          <Form.Control
            type="date"
            value={formData.DataVencimento}
            onChange={Identificar_DataVencimento}
          />
          {erros.DataVencimento && <Alert variant="danger">{erros.DataVencimento}</Alert>}
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
          />
          {erros.Observacoes && <Alert variant="danger">{erros.Observacoes}</Alert>}
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
