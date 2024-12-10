const API = "http://localhost:4000";

class GastoServico {
  async buscarDespesas() {
    try {
      const response = await fetch(`${API}/despesas`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ao buscar despesas: ${response.statusText}`);
      }

      const dados = await response.json();
      return dados;
    } catch (error) {
      console.error("Erro ao obter despesas:", error);
      throw error;
    }
  }

  async obterDespesaPorId(id) {
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
      return despesa;
    } catch (error) {
      console.error(`Erro ao obter despesa com ID ${id}:`, error);
      throw error;
    }
  }

  async inserirDespesa(novaDespesa) {
    try {
      const response = await fetch(`${API}/despesas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novaDespesa),
        
      });
        console.log("Dados enviados para a API:", novaDespesa);

      if (!response.ok) {
        const errorDetails = await response.json();
        console.error("Detalhes do erro da API:", errorDetails);
        throw new Error(`Erro ao adicionar despesa: ${errorDetails.message || response.statusText}`);
      }
      

      const despesaCriada = await response.json();
      return despesaCriada;
    } catch (error) {
      console.error("Erro ao adicionar despesa:", error);
      throw error;
    }
  }

  async atualizarDespesa(id, despesaAtualizada) {
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
      return despesa;
    } catch (error) {
      console.error(`Erro ao atualizar despesa com ID ${id}:`, error);
      throw error;
    }
  }

  async deletarDespesa(id) {
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

      return true; 
    } catch (error) {
      console.error(`Erro ao deletar despesa com ID ${id}:`, error);
      throw error;
    }
  }
}

export default GastoServico;
