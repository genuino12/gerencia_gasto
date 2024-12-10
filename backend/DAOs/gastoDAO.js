const pool = require('../config/db.js');  
class gastoDAO {
    async inserir(gasto) {
        const query = `INSERT INTO despesas (tipo_despesa_id, valor, data_vencimento, responsavel_nome, observacao)
                       VALUES (?, ?, ?, ?, ?)`;
    
        // Verifique se todos os campos necessários são fornecidos
        const tipo_despesa_id = gasto.tipo_despesa_id;
        const valor = gasto.valor;
        const data_vencimento = gasto.data_vencimento;
        const responsavel_nome = gasto.responsavel_nome;
        const observacao = gasto.observacao;

        console.log('Dados recebidos para inserção:', {
            tipo_despesa_id, 
            valor, 
            data_vencimento, 
            responsavel_nome, 
            observacao
        });
    
        // Verifique se tipo_despesa_id e valor não são null ou undefined
        if (!tipo_despesa_id || !valor || !data_vencimento || !responsavel_nome || !observacao) {
            throw new Error('todos campos são obrigatórios.');
        }
    
        try {
            
            // Execute a query para inserir os dados no banco de dados
            const [result] = await pool.execute(query, [
                tipo_despesa_id || null,
                valor || null,
                data_vencimento || null,
                responsavel_nome || null, 
                observacao || null        
            ]);
    
            
            return result.insertId;
        } catch (error) {
            console.error('Erro ao inserir gasto:', {
                mensagem: error.message,
                stack: error.stack,
                dados: { tipo_despesa_id, valor, data_vencimento, responsavel_nome, observacao }
            });
            
            throw error;
        }
         
    }
    
    async BuscarPorTermo(termo){

        if (!termo || termo.trim()===""){
            const query = `SELECT * FROM despesas`;
            const [rows] = await pool.execute(query);
            return rows;

        }else {
            const query = `SELECT * FROM despesas WHERE id LIKE ?`;
            const  [rows] = await pool.execute(query, [`%${termo}%`]);
            return rows;
        }
    }
    async BuscaPorID(id){
        const query = `SELECT * FROM despesas WHERE id = ?`;
        const [rows] = await pool.execute(query, [id]);
        return rows[0];
    }

    async Deletar(id){
        const query = `DELETE FROM despesas WHERE id = ?`;
        const [rows] = await pool.execute(query, [id]);
        return rows;
    }

    async Atualizar(id, gasto) {
        let { tipo_despesa_id, valor, data_vencimento, responsavel_nome, observacao } = gasto;
    
        // Verificação de valores
        if (valor === undefined || isNaN(valor)) {
            throw new Error('Valor inválido');
        }
    
        if (data_vencimento === undefined || !Date.parse(data_vencimento)) {
            throw new Error('Data de vencimento inválida');
        }
    
        tipo_despesa_id = tipo_despesa_id !== undefined ? tipo_despesa_id : gasto.tipo_despesa_id;
        responsavel_nome = responsavel_nome !== undefined ? responsavel_nome : gasto.responsavel_nome;
        observacao = observacao !== undefined ? observacao : gasto.observacao;
        valor = valor !== undefined ? valor : gasto.valor;
        data_vencimento = data_vencimento !== undefined ? data_vencimento : gasto.data_vencimento;
    
        const query = `
            UPDATE despesas 
            SET tipo_despesa_id = ?, valor = ?, data_vencimento = ?, responsavel_nome = ?, observacao = ? 
            WHERE id = ?
        `;
    
        const [result] = await pool.execute(query, [tipo_despesa_id, valor, data_vencimento, responsavel_nome, observacao, id]);
    
        if (result.affectedRows === 0) {
            throw new Error('Despesa não encontrada ou não foi possível atualizar');
        }
    
        return result;
    }
    


}

module.exports = gastoDAO;
