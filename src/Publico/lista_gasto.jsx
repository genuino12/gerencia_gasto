import React, { useState } from "react";
import { Modal, Button, Table, Form, InputGroup } from "react-bootstrap";

const ListaDespesa = ({ despesas, removerDespesa, atualizarDespesa }) => {
  const [showModalExcluir, setShowModalExcluir] = useState(false);
  const [showModalEditar, setShowModalEditar] = useState(false);
  const [despesaSelecionada, setDespesaSelecionada] = useState(null);
  const [busca, setBusca] = useState("");
  const [despesaEditando, setDespesaEditando] = useState(null);

  const confirmarExclusao = (id) => {
    setDespesaSelecionada(id);
    setShowModalExcluir(true);
  };

  const excluirDespesa = () => {
    if (despesaSelecionada !== null) {
      removerDespesa(despesaSelecionada);
      setDespesaSelecionada(null);
      setShowModalExcluir(false);
    }
  };

  const iniciarEdicao = (despesa) => {
    setDespesaEditando({ ...despesa });
    setShowModalEditar(true);
  };

  const salvarEdicao = () => {
    if (despesaEditando) {
      atualizarDespesa(despesaEditando);
      setDespesaEditando(null);
      setShowModalEditar(false);
    }
  };

  const formatarData = (data) => {
    if (!data) return "";
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
  };

  const despesasFiltradas = despesas.filter(
    (despesa) =>
      despesa.Tipo.toLowerCase().includes(busca.toLowerCase()) ||
      despesa.Responsavel.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Buscar por tipo ou responsável"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </InputGroup>

      {despesasFiltradas.length === 0 ? (
        <p>Não há despesas correspondentes à busca.</p>
      ) : (
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
            {despesasFiltradas.map((despesa) => (
              <tr key={despesa.id}>
                <td>{despesa.Tipo}</td>
                <td>{despesa.Valor}</td>
                <td>{formatarData(despesa.DataVencimento)}</td>
                <td>{despesa.Responsavel}</td>
                <td>{despesa.Observacoes || "Sem observações"}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => iniciarEdicao(despesa)}
                  >
                    Alterar
                  </Button>{" "}
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
      )}

      {/* Modal de exclusão */}
      <Modal show={showModalExcluir} onHide={() => setShowModalExcluir(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>Tem certeza de que deseja excluir esta despesa?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModalExcluir(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={excluirDespesa}>
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de edição */}
      <Modal show={showModalEditar} onHide={() => setShowModalEditar(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Despesa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {despesaEditando && (
            <Form>
              <Form.Group controlId="formTipoEditar">
                <Form.Label>Tipo:</Form.Label>
                <Form.Control
                  as="select"
                  value={despesaEditando.Tipo}
                  onChange={(e) =>
                    setDespesaEditando({ ...despesaEditando, Tipo: e.target.value })
                  }
                >
                  <option value="">Selecionar tipo</option>
                  <option value="água">Água</option>
                  <option value="luz">Luz</option>
                  <option value="aluguel">Aluguel</option>
                  <option value="material">Gastos de Materiais</option>
                  <option value="Funcionarios">Pagamento dos Funcionários</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formValorEditar">
                <Form.Label>Valor:</Form.Label>
                <Form.Control
                  type="text"
                  value={despesaEditando.Valor}
                  onChange={(e) =>
                    setDespesaEditando({ ...despesaEditando, Valor: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group controlId="formDataEditar">
                <Form.Label>Data de Vencimento:</Form.Label>
                <Form.Control
                  type="date"
                  value={despesaEditando.DataVencimento}
                  onChange={(e) =>
                    setDespesaEditando({
                      ...despesaEditando,
                      DataVencimento: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group controlId="formObservacoesEditar">
                <Form.Label>Observações:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={despesaEditando.Observacoes}
                  onChange={(e) =>
                    setDespesaEditando({
                      ...despesaEditando,
                      Observacoes: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModalEditar(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={salvarEdicao}>
            Salvar Alterações
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ListaDespesa;
