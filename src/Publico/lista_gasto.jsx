import React, { useState } from "react";
import { Modal, Button, Table } from "react-bootstrap";

const ListaDespesa = ({ despesas, removerDespesa }) => {
  const [showModal, setShowModal] = useState(false);
  const [despesaSelecionada, setDespesaSelecionada] = useState(null);

  const confirmarExclusao = (id) => {
    setDespesaSelecionada(id);
    setShowModal(true);
  };

  const excluirDespesa = () => {
    if (despesaSelecionada !== null) {
      removerDespesa(despesaSelecionada);
      setDespesaSelecionada(null);
      setShowModal(false);
    }
  };

  const formatarData = (data) => {
    if (!data) return '';
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
  };

  if (!despesas || despesas.length === 0) {
    return <p>Não há despesas registradas.</p>;
  }

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Valor</th>
            <th>Data de Vencimento</th>
            <th>Responsável</th>
            <th>Observações</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {despesas.map((despesa) => (
            <tr key={despesa.id}>
              <td>{despesa.Tipo}</td>
              <td>{despesa.Valor}</td>
              <td>{formatarData(despesa.DataVencimento)}</td>
              <td>{despesa.Responsavel}</td>
              <td>{despesa.Observacoes || "Sem observações"}</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => confirmarExclusao(despesa.id)}
                >
                  Excluir
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>Tem certeza de que deseja excluir esta despesa?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={excluirDespesa}>
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ListaDespesa;
