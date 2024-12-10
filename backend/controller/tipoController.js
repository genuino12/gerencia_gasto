const tipoDespesaModel = require('../model/tipoModel.js');

class tipoDespesaController {
    
    // Método para inserir um novo tipo de despesa
    async inserir(req, res) {
        try {
            const { nome } = req.body;

            if (!nome || nome.trim() === '') {
                return res.status(400).json({
                    message: 'O nome do tipo de despesa é obrigatório.',
                });
            }

            const tipoDespesaData = { nome };
            const tipoDespesa = await tipoDespesaModel.criar(tipoDespesaData);
            res.status(201).json({
                message: 'Tipo de despesa inserido com sucesso',
                data: tipoDespesa,
            });
        } catch (error) {
            res.status(500).json({
                message: 'Não foi possível inserir o tipo de despesa',
                error: error.message,
            });
        }
    }

    // Método para deletar um tipo de despesa
    async Deletar(req, res) {
        try {
            const { id } = req.params;
            const tipoDespesa = await tipoDespesaModel.BuscaPorID(id);

            if (!tipoDespesa) {
                return res.status(404).json({
                    message: 'Tipo de despesa não encontrado',
                });
            }

            await tipoDespesa.Deletar();

            res.status(200).json({
                message: 'Tipo de despesa excluído com sucesso',
            });
        } catch (error) {
            console.error('Erro ao excluir tipo de despesa:', error);
            res.status(500).json({
                message: 'Erro ao excluir tipo de despesa',
                error: error.message,
            });
        }
    }

    // Método para buscar um tipo de despesa por ID
    async BuscaPorID(req, res) {
        try {
            const { id } = req.params;
            const tipoDespesa = await tipoDespesaModel.BuscaPorID(id);

            if (!tipoDespesa) {
                return res.status(404).json({
                    message: 'Tipo de despesa não encontrado',
                });
            }

            res.status(200).json({
                message: 'Tipo de despesa encontrado com sucesso',
                data: tipoDespesa.toJSON(),
            });

        } catch (error) {
            console.error('Erro ao buscar tipo de despesa por ID', error);
            res.status(500).json({
                message: 'Erro ao buscar tipo de despesa por ID',
                error: error.message,
            });
        }
    }

    // Método para buscar tipos de despesa por filtro
    async BuscarPorFiltro(req, res) {
        try {
            const { termo } = req.query;
            const tiposDespesa = await tipoDespesaModel.BuscarPorFiltro(termo);

            if (tiposDespesa.length === 0) {
                return res.status(404).json({
                    message: 'Nenhum tipo de despesa encontrado',
                });
            }

            res.status(200).json({
                message: 'Tipos de despesa encontrados com sucesso',
                data: tiposDespesa.map((tipo) => tipo.toJSON()),
            });

        } catch (error) {
            console.error('Erro ao buscar tipos de despesa por filtro', error);
            res.status(500).json({
                message: 'Erro ao buscar tipos de despesa por filtro',
                error: error.message,
            });
        }
    }

    // Método para atualizar um tipo de despesa
    async Atualizar(req, res) {
        try {
            const { id } = req.params;
            const { nome } = req.body;

            if (!nome || nome.trim() === '') {
                return res.status(400).json({
                    message: 'O nome do tipo de despesa é obrigatório.',
                });
            }

            const tipoDespesa = await tipoDespesaModel.BuscaPorID(id);

            if (!tipoDespesa) {
                return res.status(404).json({
                    message: 'Tipo de despesa não encontrado.',
                });
            }

            tipoDespesa.nome = nome;

            const resultadoAtualizacao = await tipoDespesa.Atualizar();

            if (resultadoAtualizacao) {
                return res.status(200).json({
                    message: 'Tipo de despesa atualizado com sucesso.',
                    data: tipoDespesa.toJSON(),
                });
            } else {
                return res.status(500).json({
                    message: 'Erro ao tentar atualizar o tipo de despesa no banco de dados.',
                });
            }

        } catch (error) {
            console.error('Erro ao atualizar tipo de despesa:', error);
            return res.status(500).json({
                message: 'Erro ao atualizar tipo de despesa',
                error: error.message,
            });
        }
    }
}

module.exports = new tipoDespesaController();
