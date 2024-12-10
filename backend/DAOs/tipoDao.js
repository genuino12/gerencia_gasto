const pool = require('../config/db.js');

class tipoDespesaDAO {
    async inserir(tipoDespesa) {
        const query = `INSERT INTO tipo_despesa (nome) VALUES (?)`;

        // Verifique se o campo nome é fornecido
        const { nome } = tipoDespesa;

        if (!nome || nome.trim() === "") {
            throw new Error('O campo nome é obrigatório.');
        }

        try {
            // Execute a query para inserir os dados no banco de dados
            const [result] = await pool.execute(query, [nome]);
            return result.insertId;
        } catch (error) {
            console.error('Erro ao inserir tipo de despesa:', {
                mensagem: error.message,
                stack: error.stack,
                dados: { nome }
            });
            throw error;
        }
    }

    async buscarPorTermo(termo) {
        if (!termo || termo.trim() === "") {
            const query = `SELECT * FROM tipo_despesa`;
            const [rows] = await pool.execute(query);
            return rows;
        } else {
            const query = `SELECT * FROM tipo_despesa WHERE nome LIKE ?`;
            const [rows] = await pool.execute(query, [`%${termo}%`]);
            return rows;
        }
    }

    async buscaPorID(id) {
        const query = `SELECT * FROM tipo_despesa WHERE id = ?`;
        const [rows] = await pool.execute(query, [id]);
        return rows[0];
    }

    async deletar(id) {
        const query = `DELETE FROM tipo_despesa WHERE id = ?`;
        const [result] = await pool.execute(query, [id]);

        if (result.affectedRows === 0) {
            throw new Error('Tipo de despesa não encontrado ou não foi possível deletar');
        }

        return result;
    }

    async atualizar(id, tipoDespesa) {
        const { nome } = tipoDespesa;

        // Verifique se o campo nome é fornecido
        if (!nome || nome.trim() === "") {
            throw new Error('O campo nome é obrigatório.');
        }

        const query = `UPDATE tipo_despesa SET nome = ? WHERE id = ?`;

        const [result] = await pool.execute(query, [nome, id]);

        if (result.affectedRows === 0) {
            throw new Error('Tipo de despesa não encontrado ou não foi possível atualizar');
        }

        return result;
    }
}

module.exports = tipoDespesaDAO;
