const API = "http://localhost:4000";

class TipoServico {
  // Método para obter todos os tipos de despesa
  async obterTodosTipos() {
    try {
      const response = await fetch(`${API}/tipo_despesa`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ao buscar tipos de despesa: ${response.statusText}`);
      }

      const dados = await response.json();
      return dados;
    } catch (error) {
      console.error("Erro ao obter tipos de despesa:", error);
      throw error;
    }
  }

  // Método para obter um tipo de despesa por ID
  async obterTipoPorId(id) {
    try {
      const response = await fetch(`${API}/tipos/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ao buscar tipo de despesa: ${response.statusText}`);
      }

      const tipo = await response.json();
      return tipo;
    } catch (error) {
      console.error(`Erro ao obter tipo de despesa com ID ${id}:`, error);
      throw error;
    }
  }

  // Método para adicionar um novo tipo de despesa
  async inserirTipo(novoTipo) {
    try {
      const response = await fetch(`${API}/tipo_despesa`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novoTipo),
      });

      console.log("Dados enviados para a API:", novoTipo);

      if (!response.ok) {
        const errorDetails = await response.json();
        console.error("Detalhes do erro da API:", errorDetails);
        throw new Error(`Erro ao adicionar tipo de despesa: ${errorDetails.message || response.statusText}`);
      }

      const tipoCriado = await response.json();
      return tipoCriado;
    } catch (error) {
      console.error("Erro ao adicionar tipo de despesa:", error);
      throw error;
    }
  }

  // Método para atualizar um tipo de despesa
  async atualizarTipo(id, tipoAtualizado) {
    try {
      const response = await fetch(`${API}/tipo_despesa/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tipoAtualizado),
      });

      if (!response.ok) {
        throw new Error(`Erro ao atualizar tipo de despesa: ${response.statusText}`);
      }

      const tipo = await response.json();
      return tipo;
    } catch (error) {
      console.error(`Erro ao atualizar tipo de despesa com ID ${id}:`, error);
      throw error;
    }
  }

  // Método para deletar um tipo de despesa
  async deletarTipo(id) {
    try {
      const response = await fetch(`${API}/tipo_despesa/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ao deletar tipo de despesa: ${response.statusText}`);
      }

      return true; 
    } catch (error) {
      console.error(`Erro ao deletar tipo de despesa com ID ${id}:`, error);
      throw error;
    }
  }
}

export default TipoServico;
