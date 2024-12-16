const API = "http://localhost:4000";

class GastoServico {
  async buscarDespesas(despesas) {
    console.log("Buscando despesas com filtro:", despesas);

    try {
      const response = await fetch(`${API}/despesas/BuscarPorFiltro`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      const dados = await response.json();
      console.log("Despesas obtidas:", dados);
      return dados;
    } catch (error) {
      console.error("Erro ao buscar despesas:", error);
      throw error;
    }
  }

  async obterDespesaPorId(id) {
    console.log(`Buscando despesa com ID ${id}`);
    
    try {
      const response = await fetch(`${API}/despesas/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ao buscar despesa: ${response.statusText}`);
      }

      const despesa = await response.json();
      console.log("Despesa obtida:", despesa);
      return despesa;
    } catch (error) {
      console.error(`Erro ao obter despesa com ID ${id}:`, error);
      throw error;
    }
  }

  async inserirDespesa(novaDespesa) {
    console.log("Inserindo nova despesa:", novaDespesa);

    try {
      const response = await fetch(`${API}/despesas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novaDespesa),
      });

      if (!response.ok) {
        try {
          const errorDetails = await response.json();
          console.error("Detalhes do erro da API:", errorDetails);
          throw new Error(`Erro ao adicionar despesa: ${errorDetails.message || response.statusText}`);
        } catch {
          throw new Error(`Erro ao adicionar despesa: ${response.statusText}`);
        }
      }

      const despesaCriada = await response.json();
      console.log("Despesa criada:", despesaCriada);
      return despesaCriada;
    } catch (error) {
      console.error("Erro ao adicionar despesa:", error);
      throw error;
    }
  }

  async atualizarDespesa(id, despesaAtualizada) {
    console.log(`Atualizando despesa com ID ${id}:`, despesaAtualizada);

    try {
      const response = await fetch(`${API}/despesas/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(despesaAtualizada),
      });

      if (!response.ok) {
        throw new Error(`Erro ao atualizar despesa: ${response.statusText}`);
      }

      const despesa = await response.json();
      console.log("Despesa atualizada:", despesa);
      return despesa;
    } catch (error) {
      console.error(`Erro ao atualizar despesa com ID ${id}:`, error);
      throw error;
    }
  }

  async deletarDespesa(id) {
    console.log(`Deletando despesa com ID ${id}`);

    try {
      const response = await fetch(`${API}/despesas/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ao deletar despesa: ${response.statusText}`);
      }

      console.log(`Despesa com ID ${id} deletada com sucesso.`);
      return true;
    } catch (error) {
      console.error(`Erro ao deletar despesa com ID ${id}:`, error);
      throw error;
    }
  }
}

export default GastoServico;
