const gastoDAO = require('../DAOs/gastoDAO.js');

class gastoModel {
    #id;
    #tipo_despesa_id;
    #valor;
    #data_vencimento;
    #responsavel_nome;
    #observacao;

    constructor(id, tipo_despesa_id, valor, data_vencimento, responsavel_nome, observacao) {
        this.#id = id;
        this.#tipo_despesa_id = tipo_despesa_id;
        this.#valor = valor;
        this.#data_vencimento = data_vencimento;
        this.#responsavel_nome = responsavel_nome;
        this.#observacao = observacao;
    }

    // Getters
    get id() {
        return this.#id;
    }

    get tipo_despesa_id() {
        return this.#tipo_despesa_id;
    }

    get valor() {
        return this.#valor;
    }

    get data_vencimento() {
        return this.#data_vencimento;
    }

    get responsavel_nome() {
        return this.#responsavel_nome;
    }

    get observacao() {
        return this.#observacao;
    }

    // Setters
    set id(value) {
        this.#id = value;
    }

    set tipo_despesa_id(value) {
        this.#tipo_despesa_id = value;
    }

    set valor(value) {
        this.#valor = value;
    }

    set data_vencimento(value) {
        this.#data_vencimento = value;
    }

    set responsavel_nome(value) {
        this.#responsavel_nome = value;
    }

    set observacao(value) {
        this.#observacao = value;
    }

    // Converte para formato JSON
    toJSON() {
        return {
            id: this.#id,
            tipo_despesa_id: this.#tipo_despesa_id, 
            valor: this.#valor,
            data_vencimento: this.#data_vencimento,
            responsavel_nome: this.#responsavel_nome,
            observacao: this.#observacao
        };
    }

    // Método estático para criar um novo gasto
    static async criar(gastoData) {
        const dao = new gastoDAO();
        const gasto = new gastoModel(
            gastoData.id,
            gastoData.tipo_despesa_id,
            gastoData.valor,
            gastoData.data_vencimento,
            gastoData.responsavel_nome,
            gastoData.observacao
        );

        const insertedId = await dao.inserir(gasto);
        gasto.id = insertedId;  

        return gasto.toJSON();  
    }

    // Método estático para buscar por filtro
    static async BuscarPorFiltro(termo) {
        const dao = new gastoDAO();
        const rows = await dao.BuscarPorTermo(termo);
        return rows.map((row) => new gastoModel(
            row.id,
            row.tipo_despesa_id,
            row.valor,
            row.data_vencimento,
            row.responsavel_nome,
            row.observacao
        ));
    }

    // Método de instância para deletar
    async Deletar() {
        const dao = new gastoDAO();
        return await dao.Deletar(this.#id);  
    }

    // Método de instância para atualizar
    async Atualizar() {
        const dao = new gastoDAO();
        return await dao.Atualizar(this.#id, this);  
    }

    // Método estático para buscar por ID
    static async BuscaPorID(id) {
        const dao = new gastoDAO();
        const data = await dao.BuscaPorID(id);  
        if (!data) return null;  
        return new gastoModel(
            data.id,
            data.tipo_despesa_id,
            data.valor,
            data.data_vencimento,
            data.responsavel_nome,
            data.observacao
        );
    }
}

module.exports = gastoModel;
