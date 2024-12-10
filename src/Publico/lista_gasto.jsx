import { useEffect, useState } from "react";
import { Table, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { format } from 'date-fns';
import DespesaService from "../serviços/gastoServico.js"; 

function ListaDespesa() {
    const [despesas, setDespesas] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
      const fetchDespesas = async () => {
          const storedDespesas = new DespesaService();
          try {
              const despesaArma = await storedDespesas.buscarDespesas();
              setDespesas(despesaArma); 
          } catch (error) {
              console.error("Erro ao buscar despesas:", error);
          }
      };
      fetchDespesas(); 
    }, []);
  

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Deseja confirmar a exclusão desta despesa?");

        if (confirmDelete) {
            const despesaEx = new DespesaService();
            try {
                await despesaEx.delete(id); // Chama o método para excluir a despesa
                // Atualiza o estado após a exclusão
                setDespesas(despesas.filter(despesa => despesa.id !== id));
            } catch (error) {
                console.error("Erro ao excluir despesa:", error);
            }
        }
    };

    const handleEditar = async (id) => {
        localStorage.setItem('despesaId', id); 
        navigate('/editar-despesa'); 
    };

   
    const filteredDespesas = Array.isArray(despesas)
    ? despesas.filter((despesa) => {
        const searchValue = parseInt(searchTerm, 10); 
        return !isNaN(searchValue) && despesa.Tipo === searchValue; 
      })
    : []; 

  
      return (
        <>
          <h2>Lista de Despesas</h2>
    
          <Form.Group className="mb-3">
            <Form.Control
              type="number"  
              placeholder="Pesquisar despesa por tipo (número)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
          </Form.Group>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Tipo</th>
                        <th>Valor</th>
                        <th>Data de Vencimento</th>
                        <th>Responsável</th>
                        <th>Observações</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredDespesas.length > 0 ? (
                        filteredDespesas.map((despesa) => (
                            <tr key={despesa.id}>
                                <td>{despesa.id}</td>
                                <td>{despesa.Tipo}</td>
                                <td>{despesa.Valor}</td>
                                <td>{format(new Date(despesa.DataVencimento), 'dd/MM/yyyy')}</td>
                                <td>{despesa.Responsavel}</td>
                                <td>{despesa.Observacoes}</td>
                                <td>
                                    <Button variant="primary" className="me-1" onClick={() => handleEditar(despesa.id)}>
                                        Editar
                                    </Button>
                                    <Button variant="danger" onClick={() => handleDelete(despesa.id)}>
                                        Excluir
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="text-center">
                                Não há despesas cadastradas ou nenhum resultado para sua pesquisa.
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </>
    );
}

export default ListaDespesa;
