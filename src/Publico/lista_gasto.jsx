import React from "react";

const ListaDespesa = ({ despesas, removerDespesa }) => {
  if (!despesas || despesas.length === 0) {
    return <p>Não há despesas registradas.</p>;
  }

  return (
    <ul className="list-group">
      {despesas.map((despesa) => (
        <li key={despesa.id} className="list-group-item d-flex justify-content-between align-items-center">
          <span>{despesa.Tipo} - {despesa.Valor} -  {despesa.DataVencimento} - {despesa.Responsavel} </span>
          <button className="btn btn-danger btn-sm" onClick={() => removerDespesa(despesa.id)}>Excluir</button>
        </li>
      ))}
    </ul>
  );
};

export default ListaDespesa;
