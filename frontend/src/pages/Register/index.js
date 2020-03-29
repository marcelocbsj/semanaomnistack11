import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom'; //O useHistory é utilizado para fazer a navegação via função JS
import {FiArrowLeft} from 'react-icons/fi'
import './styles.css';
import logoImg from '../../assets/logo.svg';

//Importando de lá da API a base url
import api from '../../services/api';

export default function Register(){
  //Para guardarmos os dados oriundos do frontend guardamos cada um dos atributos em estados.
  const[name, setName] = useState('');
  const[email, setEmail] = useState('');
  const[whatsapp, setWhatsapp] = useState('');
  const[city, setCity] = useState('');
  const[uf, setUf] = useState('');

  const history = useHistory();

  //Função que será responsavel por fazer o cadastro do usuario, somente será executada pelo OnSubmit no form
  // E = passado como parâmetro, é o Evento de Submit lá do formulário
  async function handleRegister(e){
    e.preventDefault();
    //Utilizado para previnir o comportamento padrão do usuario
    
    const data = {
      name,
      email,
      whatsapp,
      city,
      uf      
    };

    try{
      const response = await api.post('ongs', data);
      alert(`Seu ID de acesso: ${response.data.id}`);
      history.push('/');
    } catch(err){
      alert('Erro no Cadastro');
    }
  }
  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero"/>

          <h1>Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG. </p>
          <Link className="back-link " to ="/"> 
          <FiArrowLeft size={16} color="e02041"/>
          Já possuo cadastro
          </Link>
        </section>
        <form onSubmit={handleRegister}>
          <input 
            placeholder = "Nome da Ong"
            //Estamos definindo que o valor é Name
            value={name}
            //Estamos guardando oque será digitado dentro do setName
            onChange={e => setName(e.target.value)}

          />
          <input 
            type="email" 
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input 
            placeholder="WhatsApp"
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}
          />

        <div className="input-group">
          <input 
            placeholder="Cidade"
            value={city}
            onChange={e => setCity(e.target.value)}
          />
          <input 
            placeholder="UF" 
            style={{width: 80}}
            value={uf}
            onChange={e => setUf(e.target.value)}/>
        </div>
          <button className="button" type="submit">Cadastrar</button>
                  
        </form>
      </div>
    </div>
  )
}