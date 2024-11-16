import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';

const CadastrarGasto = ({ adicionarDespesa }) => {
  const [formData, setFormData] = useState({
    Tipo: '', 
    Valor: '',
    DataVencimento: '',
    Responsavel: '' 
  });

  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState(false);

  const formatarValor = (valor) => {
    const valorFormatado = valor.replace(/\D/g, '');
    return valorFormatado.length > 2
      ? 'R$ ' + valorFormatado.slice(0, valorFormatado.length - 2) + ',' + valorFormatado.slice(valorFormatado.length - 2)
      : 'R$ ' + valorFormatado;
  };

  const validarFormulario = () => {
    if (!formData.Tipo || !formData.Valor || !formData.DataVencimento || !formData.Responsavel) {
      setErro('Todos os campos são obrigatórios!');
      return false;
    }

    if (formData.Valor === 'R$ ') {
      setErro('O valor deve ser válido.');
      return false;
    }

    const dataAtual = new Date();
    const dataInserida = new Date(formData.DataVencimento);

    if (isNaN(dataInserida.getTime())) {
      setErro('A data de vencimento é inválida.');
      return false;
    }

    if (dataInserida < dataAtual.setHours(0, 0, 0, 0)) {
      setErro('A data de vencimento não pode ser anterior a hoje.');
      return false;
    }

    setErro('');
    return true;
  };

  const Envio = (e) => {
    e.preventDefault();
    if (validarFormulario()) {
      const novaDespesa = {
        id: Date.now(),
        Tipo: formData.Tipo,
        Valor: formData.Valor,
        DataVencimento: formData.DataVencimento,
        Responsavel: formData.Responsavel 
      };
      adicionarDespesa(novaDespesa);
      setFormData({ Tipo: '', Valor: '', DataVencimento: '', Responsavel: '' });
      setErro('');
      setSucesso(true);
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

      {erro && <Alert variant="danger">{erro}</Alert>}
      {sucesso && <Alert variant="success">Despesa cadastrada com sucesso!</Alert>}

      <Form onSubmit={Envio}>
        <Form.Group controlId="formTipo">
          <Form.Label>Tipo de Despesa:</Form.Label>
          <Form.Control
            as="select"
            value={formData.Tipo}
            onChange={(e) => setFormData({ ...formData, Tipo: e.target.value })}
            required
          >
            <option value="">Selecionar a despesa</option>
            <option value="água">Água</option>
            <option value="luz">Luz</option>
            <option value="aluguel">Aluguel</option>
            <option value="material">Gastos de Materiais</option>
            <option value="Funcionarios">Pagamento dos Funcionários</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formValor">
          <Form.Label>Valor:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o valor"
            value={formData.Valor}
            onChange={Identificar_Valor}
          />
        </Form.Group>

        <Form.Group controlId="formDataVencimento">
          <Form.Label>Data de Vencimento:</Form.Label>
          <Form.Control
            type="date"
            value={formData.DataVencimento}
            onChange={Identificar_DataVencimento}
          />
        </Form.Group>

        <Form.Group controlId="formResponsavel">
          <Form.Label>Nome do Responsável:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o nome Completo do responsável Pelo Registro de Despesa"
            value={formData.Responsavel}
            onChange={(e) => setFormData({ ...formData, Responsavel: e.target.value })}
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
