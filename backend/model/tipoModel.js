const tipoDespesaDAO = require('../DAOs/tipoDao.js');

class tipoDespesaModel {
    #id;
    #nome;

    constructor(id, nome) {
        this.#id = id;
        this.#nome = nome;
    }

    // Getters
    get id() {
        return this.#id;
    }

    get nome() {
        return this.#nome;
    }

    // Setters
    set id(value) {
        this.#id = value;
    }

    set nome(value) {
        this.#nome = value;
    }

    // Converte para formato JSON
    toJSON() {
        return {
            id: this.#id,
            nome: this.#nome
        };
    }

    // Método estático para criar um novo tipo de despesa
    static async criar(tipoDespesaData) {
        const dao = new tipoDespesaDAO();
        const tipoDespesa = new tipoDespesaModel(
            tipoDespesaData.id,
            tipoDespesaData.nome
        );

        const insertedId = await dao.inserir(tipoDespesa);
        tipoDespesa.id = insertedId;

        return tipoDespesa.toJSON();
    }

    // Método estático para buscar por filtro
    static async BuscarPorFiltro(termo) {
        const dao = new tipoDespesaDAO();
        const rows = await dao.buscarPorTermo(termo);
        return rows.map((row) => new tipoDespesaModel(
            row.id,
            row.nome
        ));
    }

    // Método de instância para deletar
    async Deletar() {
        const dao = new tipoDespesaDAO();
        return await dao.deletar(this.#id);
    }

    // Método de instância para atualizar
    async Atualizar() {
        const dao = new tipoDespesaDAO();
        return await dao.atualizar(this.#id, this);
    }

    // Método estático para buscar por ID
    static async BuscaPorID(id) {
        const dao = new tipoDespesaDAO();
        const data = await dao.buscaPorID(id);
        if (!data) return null;
        return new tipoDespesaModel(data.id, data.nome);
    }
}

module.exports = tipoDespesaModel;
