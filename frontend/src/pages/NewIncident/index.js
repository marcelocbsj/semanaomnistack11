import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';


export default function NewIncident(){
const[title, setTitle]=useState('');
const[description, setDescription]=useState('');
const[value, setValue]=useState('');

const ongId = localStorage.getItem('ongId')
const history = useHistory();

async function handleNewIncident(e){
  e.preventDefault();

  const data = {
    title,
    description,
    value,
  };

  try{
    await api.post('incidents', data, {
      headers:{
        Authorization: ongId,
      }
    });

    history.push('/profile');
    
  } catch(err){
    alert('Não foi possível cadastrar caso')
  }
}

  return(
  <div className="new-incident-container">
  <div className="content">
    <section>
      <img src={logoImg} alt="Be The Hero"/>

      <h1>Cadastrar Novo Caso</h1>
      <p>Descreva o caso detalhadamente para encontrar um herói para ajuda-lo!</p>
      <Link className="back-link " to ="/profile"> 
      <FiArrowLeft size={16} color="e02041"/>
      Voltar para Home
      </Link>
    </section>
    <form>
      <input 
        placeholder = "Titulo do Caso"
        value={title}
        onChange={e=> setTitle(e.target.value)}

      />
      <textarea 
        placeholder= "Descrição do Caso"
        value={description}
        onChange={e=> setDescription(e.target.value)}

      />
      <input 
        placeholder="Valor em reais"
        value={value}
        onChange={e=> setValue(e.target.value)}

      />

      <button className="button" onClick={handleNewIncident} type="submit">Cadastrar</button>
              
    </form>
  </div>
</div>
  );
}