import { useState } from "react";

const Cadastrar_gasto = ({Cadastrar_gasto}) => {
    const [nome, SetNome] = useState('');
    const [valor, SetValor] = useState('');
    const [data, SetData] = useState('');

    const Envio = (e) => {
        e.preventDefault();
        if (nome && valor && data){
            const nova_Despesa = {nome,valor,data, id: Date.now()};
            Cadastrar_gasto(nova_Despesa);
            SetNome('');
            SetValor('');
            SetData('');
        } else {
            alert('Preencha Todos os Campos! Por Favor.');
        }
    };
    return (
<form onsubmit={Envio}>
    <div className="mb-3">
        <label>Nome Da Despessa:</label>
        <input type="text" className="form-control" value={nome}  onChange={(e) => SetNome(e.target.value)}></input>
    </div>
    <div className="mb-3">
        <label>Valor Da Despessa:</label>
        <input type="text" className="form-control" value={valor}  onChange={(e) => SetValor(e.target.value)}></input>
    </div>
    <div className="mb-3">
        <label>Data Da Despessa:</label>
        <input type="text" className="form-control" value={data}  onChange={(e) => SetData(e.target.value)}></input>
    </div>
    <button type="submit" className="btn btn-primary">Registrar Despessa</button>
</form>
    );
};

export default Cadastrar_gasto;