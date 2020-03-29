import React, {useState,useEffect} from 'react'; //useEffect utilizada para disparar uma função em qualquer lugar do componente
import {Link, useHistory} from 'react-router-dom';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

export default function Profile(){
  const history = useHistory();
  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');
  const [incidents, setIncidents] = useState([]);


  useEffect(() => {
    api.get('profile',{
      headers: {
        Authorization: ongId,
      }
    }).then(response => {
        setIncidents(response.data);
    })
  }, [ongId]);  //{} qual função será executada, [] quando a função será executada

  async function handleDeleteIncident(id){
    try{
      await api.delete(`incidents/${id}`,{
        headers:{
          Authorization: ongId,
        }
      });

      setIncidents(incidents.filter(incident => incident.id !== id));
      /* Automaticamente, assim que o usuario apertar em deletar, ele já irá realizar um filtro retirando aquele que foi
         deletado */
    }catch(err){
      alert('Erro ao deletar caso, tente novamente');
    }
  }

  function handleLogout(){
    localStorage.clear();
    history.push('/');
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero"/>
        <span> Bem Vinda, {ongName}</span>
        <Link className="button" to="/incidents/new">Cadastrar novo caso </Link>

        <button onClick={handleLogout} type="button">
          <FiPower size = {18} color ="#e02041"/>
        </button>
      </header>

      <h1>Casos Cadastrados</h1>
      <ul>
        {incidents.map(incident => (
          // utilizamos a Key, para ser o identificador de cada caso.
          <li key={incident.id}> 
          <strong>Caso: </strong>
          <p>{incident.title}</p>

          <strong>DESCRIÇÃO: </strong>
          <p>{incident.description}</p>

          <strong>Valor: </strong>
          <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>
          {/* a Classe a cima é utilizada para formatar valores, datas, entre outras formas pelo JavaScript */}

          {/* desta forma, o que estamos passando para o on click é uma função, se passassemos sómente
              o handleDeleteIncident(incident.id) , o que seria passado para o on click seria todo o retorno da função
              o que iria apagar todas as informações */}
          <button onClick={() => handleDeleteIncident(incident.id)} type="button">
            <FiTrash2 size= {20} color="#a8a8b3"/>
          </button>
        </li>
        ))}
      </ul>
    </div>
  );
}