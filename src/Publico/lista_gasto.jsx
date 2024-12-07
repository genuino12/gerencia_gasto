import React, { useState } from "react";
import { Modal, Button, Table, Form, InputGroup } from "react-bootstrap";

const ListaDespesa = ({ despesas, removerDespesa, atualizarDespesa, adicionarDespesa }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalTipo, setModalTipo] = useState(""); // 'excluir', 'editar' ou 'inserir'
  const [despesaSelecionada, setDespesaSelecionada] = useState(null);
  const [filtro, setFiltro] = useState(""); // Estado para o filtro
  const [novaDespesa, setNovaDespesa] = useState({
    Tipo: "",
    Valor: "",
    DataVencimento: "",
    Observacoes: "",
  });

  // Abrir modal genérico
  const abrirModal = (tipo, despesa = null) => {
    setModalTipo(tipo);
    setDespesaSelecionada(despesa);
    setShowModal(true);
  };

  const fecharModal = () => {
    setShowModal(false);
    setDespesaSelecionada(null);
    setNovaDespesa({
      Tipo: "",
      Valor: "",
      DataVencimento: "",
      Observacoes: "",
    }); // Limpa o formulário de inserção
  };

  const confirmarExclusao = () => {
    if (despesaSelecionada?.id) {
      console.log("Despesa Excluída:", despesaSelecionada);  // Log para verificar a exclusão
      removerDespesa(despesaSelecionada.id);
      fecharModal();
    }
  };

  const salvarEdicao = () => {
    if (despesaSelecionada) {
      console.log("Despesa Editada:", despesaSelecionada);  // Log para verificar os dados antes de editar
      atualizarDespesa(despesaSelecionada);
      fecharModal();
    }
  };

  const salvarInsercao = () => {
    console.log("Nova Despesa Inserida:", novaDespesa);  // Log para verificar os dados antes de inserir
    adicionarDespesa(novaDespesa);
    fecharModal();
  };

  const formatarData = (data) => {
    if (!data) return "Data não especificada";
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
  };

  // Filtrar despesas com base no filtro digitado
  const despesasFiltradas = despesas.filter((despesa) =>
    despesa.Tipo?.toLowerCase().includes(filtro.toLowerCase()) // Filtro para o tipo da despesa
  );

  return (
    <div>
      {/* Campo de filtro */}
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Filtrar por tipo de despesa"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)} // Atualiza o estado do filtro conforme a digitação
        />
      </InputGroup>

      {despesasFiltradas.length === 0 ? (
        <p>Não há despesas cadastradas.</p>
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
            {despesasFiltradas.map((despesa, index) => (
              <tr key={despesa.id || index}>
                <td>{despesa.Tipo ? despesa.Tipo : "Tipo não especificado"}</td>
                <td>{despesa.Valor ? despesa.Valor : "Valor não especificado"}</td>
                <td>{formatarData(despesa.DataVencimento)}</td>
                <td>{despesa.Responsavel ? despesa.Responsavel : "Responsável não especificado"}</td>
                <td>{despesa.Observacoes ? despesa.Observacoes : "Sem observações"}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => abrirModal("editar", { ...despesa })}
                  >
                    Alterar
                  </Button>{" "}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => abrirModal("excluir", despesa)}
                  >
                    Excluir
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Modal Genérico */}
      <Modal show={showModal} onHide={fecharModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalTipo === "excluir" ? "Confirmar Exclusão" : modalTipo === "editar" ? "Editar Despesa" : "Inserir Nova Despesa"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalTipo === "excluir" ? (
            <p>Tem certeza de que deseja excluir esta despesa?</p>
          ) : modalTipo === "editar" ? (
            <Form>
              <Form.Group controlId="formTipoEditar">
                <Form.Label>Tipo:</Form.Label>
                <Form.Control
                  as="select"
                  value={despesaSelecionada?.Tipo || ""}
                  onChange={(e) =>
                    setDespesaSelecionada({
                      ...despesaSelecionada,
                      Tipo: e.target.value,
                    })
                  }
                >
                  <option value="">Selecionar tipo</option>
                  <option value="1">Água</option>
                  <option value="2">Luz</option>
                  <option value="3">Aluguel</option>
                  <option value="4">Gastos de Materiais</option>
                  <option value="5">Pagamento dos Funcionários</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formValorEditar">
                <Form.Label>Valor:</Form.Label>
                <Form.Control
                  type="text"
                  value={despesaSelecionada?.Valor || ""}
                  onChange={(e) =>
                    setDespesaSelecionada({
                      ...despesaSelecionada,
                      Valor: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group controlId="formDataEditar">
                <Form.Label>Data de Vencimento:</Form.Label>
                <Form.Control
                  type="date"
                  value={despesaSelecionada?.DataVencimento || ""}
                  onChange={(e) =>
                    setDespesaSelecionada({
                      ...despesaSelecionada,
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
                  value={despesaSelecionada?.Observacoes || ""}
                  onChange={(e) =>
                    setDespesaSelecionada({
                      ...despesaSelecionada,
                      Observacoes: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Form>
          ) : (
            <Form>
              <Form.Group controlId="formTipoInserir">
                <Form.Label>Tipo:</Form.Label>
                <Form.Control
                  as="select"
                  value={novaDespesa.Tipo}
                  onChange={(e) =>
                    setNovaDespesa({
                      ...novaDespesa,
                      Tipo: e.target.value,
                    })
                  }
                >
                  <option value="">Selecionar tipo</option>
                  <option value="1">Água</option>
                  <option value="2">Luz</option>
                  <option value="3">Aluguel</option>
                  <option value="4">Gastos de Materiais</option>
                  <option value="5">Pagamento dos Funcionários</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formValorInserir">
                <Form.Label>Valor:</Form.Label>
                <Form.Control
                  type="text"
                  value={novaDespesa.Valor}
                  onChange={(e) =>
                    setNovaDespesa({
                      ...novaDespesa,
                      Valor: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group controlId="formDataInserir">
                <Form.Label>Data de Vencimento:</Form.Label>
                <Form.Control
                  type="date"
                  value={novaDespesa.DataVencimento}
                  onChange={(e) =>
                    setNovaDespesa({
                      ...novaDespesa,
                      DataVencimento: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group controlId="formObservacoesInserir">
                <Form.Label>Observações:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={novaDespesa.Observacoes}
                  onChange={(e) =>
                    setNovaDespesa({
                      ...novaDespesa,
                      Observacoes: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={fecharModal}>
            Cancelar
          </Button>
          {modalTipo === "excluir" ? (
            <Button variant="danger" onClick={confirmarExclusao}>
              Excluir
            </Button>
          ) : modalTipo === "editar" ? (
            <Button variant="primary" onClick={salvarEdicao}>
              Salvar
            </Button>
          ) : (
            <Button variant="success" onClick={salvarInsercao}>
              Inserir
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ListaDespesa;
