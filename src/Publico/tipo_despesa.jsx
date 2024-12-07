import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";

const CadastrarTipoDespesa = () => {
  const [nome, setNome] = useState(""); 
  const [sucesso] = useState(false); 
  const [erro, setErro] = useState(""); 

  const handleSubmit = (e) => {
    e.preventDefault();

    if (nome.trim().length === 0) {
      setErro("O nome do tipo de despesa é obrigatório.");
      return;
    }
  };

  return (
    <div>
      <h2>Cadastrar Tipo de Despesa</h2>

      {sucesso && <Alert variant="success">Tipo de despesa cadastrado com sucesso.</Alert>}
      {erro && <Alert variant="danger">{erro}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formNome">
          <Form.Label>Nome do Tipo de Despesa:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o nome do tipo de despesa"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </Form.Group>
        <br />
        <Button variant="primary" type="submit">
          Cadastrar Tipo de Despesa
        </Button>
      </Form>
    </div>
  );
};

export default CadastrarTipoDespesa;
