const gastoModel = require('../model/gastoModel.js');

class gastoController {
    
    async inserir(req, res) {
        try {
            const { tipo_despesa_id, valor, data_vencimento, responsavel_nome, observacao } = req.body;
            const gastoData = { tipo_despesa_id, valor, data_vencimento, responsavel_nome, observacao };
            const gasto = await gastoModel.criar(gastoData);
            res.status(201).json({
                message: 'Despesa inserida com sucesso',
                data: gasto
            });
        } catch (error) {
            res.status(500).json({
                message: 'Não foi possível inserir a despesa',
                error: error.message
            });
        }
    }

    // Método para deletar uma despesa
    async Deletar(req, res) {
        try {
            console.log('ID recebido para exclusão:', req.params.id);
            const { id } = req.params;
            const gasto = await gastoModel.BuscaPorID(id);

            if (!gasto) {
                console.log('Gasto não encontrado:', id);
                return res.status(404).json({
                    message: 'Despesa não encontrada',
                });
            }

            
            await gasto.Deletar();
            console.log('Despesa excluída com sucesso:', id);

            res.status(200).json({
                message: 'Despesa excluída com sucesso',
            });
        } catch (error) {
            console.error('Erro ao excluir despesa:', error);
            res.status(500).json({
                message: 'Erro ao excluir despesa',
                error: error.message,
            });
        }
    }

    // Método para buscar uma despesa por ID
    async BuscaPorID(req, res) {
        try {
            const { id } = req.params;
            const gasto = await gastoModel.BuscaPorID(id);

            if (!gasto) {
                return res.status(404).json({
                    message: 'Despesa não encontrada',
                });
            }

            res.status(200).json({
                message: 'Despesa encontrada com sucesso',
                data: gasto.toJSON(),
            });

        } catch (error) {
            console.error('Erro ao buscar despesa por ID', error);
            res.status(500).json({
                message: 'Erro ao buscar despesa por ID',
                error: error.message
            });
        }
    }

    // Método para buscar despesas por filtro
    async BuscarPorFiltro(req, res) {
        try {
            const { termo } = req.query;
            const gasto = await gastoModel.BuscarPorFiltro(termo);

            if (gasto.length === 0) {
                return res.status(404).json({
                    message: 'Nenhuma despesa encontrada',
                });
            }

            res.status(200).json({
                message: 'Despesas encontradas com sucesso',
                data: gasto.map(g => g.toJSON()),
            });

        } catch (error) {
            console.error('Erro ao buscar despesas por filtro', error);
            res.status(500).json({
                message: 'Erro ao buscar despesas por filtro',
                erro: error.message,
            });
        }
    }

    // Método para atualizar uma despesa
    async Atualizar(req, res) {
        try {
            
            const { id } = req.params;
            const { tipo_despesa_id, valor, data_vencimento, responsavel_nome, observacao } = req.body;
    
            
            if (!valor || isNaN(valor)) {
                return res.status(400).json({
                    message: 'Valor inválido.',
                });
            }
    
            if (!data_vencimento || !Date.parse(data_vencimento)) {
                return res.status(400).json({
                    message: 'Data de vencimento inválida.',
                });
            }
    
            // Buscar a despesa existente no banco de dados
            const gasto = await gastoModel.BuscaPorID(id);
    
            if (!gasto) {
                return res.status(404).json({
                    message: 'Despesa não encontrada.',
                });
            }
    
            // Atualizar os campos da despesa
            gasto.tipo_despesa_id = tipo_despesa_id ?? gasto.tipo_despesa_id;  
            gasto.valor = valor ?? gasto.valor;  
            gasto.data_vencimento = data_vencimento ?? gasto.data_vencimento;
            gasto.responsavel_nome = responsavel_nome ?? gasto.responsavel_nome;
            gasto.observacao = observacao ?? gasto.observacao;
    
        
            const resultadoAtualizacao = await gasto.Atualizar();
    
            
            if (resultadoAtualizacao) {
                return res.status(200).json({
                    message: 'Despesa atualizada com sucesso.',
                    data: gasto.toJSON(),  
                });
            } else {
                return res.status(500).json({
                    message: 'Erro ao tentar atualizar a despesa no banco de dados.',
                });
            }
    
        } catch (error) {
            
            console.error('Erro ao atualizar despesa:', error);
            return res.status(500).json({
                message: 'Erro ao atualizar despesa',
                erro: error.message,
            });
        }
    }
    
}

module.exports = new gastoController();
