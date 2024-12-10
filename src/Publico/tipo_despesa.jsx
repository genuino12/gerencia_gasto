import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";

const CadastrarTipoDespesa = () => {
  const [nome, setNome] = useState(""); 
  const [sucesso, setSucesso] = useState(false); 
  const [erro, setErro] = useState(""); 

  const handleSubmit = (e) => {
    e.preventDefault();

    if (nome.trim().length === 0) {
      setErro("O nome do tipo de despesa é obrigatório.");
      setSucesso(false);
      return;
    }

   
    setErro(""); 
    setSucesso(true);
    setNome("");
  };

  return (
    <div>
      <h2>Cadastrar Tipo de Despesa</h2>

      {sucesso && (
        <Alert variant="success" onClose={() => setSucesso(false)} dismissible>
          Tipo de despesa cadastrado com sucesso.
        </Alert>
      )}
      {erro && <Alert variant="danger">{erro}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formNome">
          <Form.Label>Nome do Tipo de Despesa:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o nome do tipo de despesa"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required 
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
