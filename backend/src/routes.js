//Armazena as rotas da aplicação
const express = require('express');

//Importação do controlador de sessão (Login / Logout
const SessionController = require('./controllers/SessionController');

//Importação do controlador das ONGS
const OngController = require('./controllers/OngController');

//Importação do controlador dos incidentes
const IncidentController = require('./controllers/IncidentController');

//Importação do ProfileController (Perfil de controlador, utilizado para buscar os incidents de uma ong especificamente)
const ProfileController = require ('./controllers/ProfileController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

//Rotas de acesso a tabela Ongs
routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

//Rotas de acesso a tabela incidents
routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);

//Buscar por todos os incidentes de uma ong especifica
routes.get('/Profile', ProfileController.index);



module.exports = routes;
//Realiza a exportação da variavel de um arquivo para que seja acessada por outro
