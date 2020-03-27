const connection = require('../database/connection');

module.exports={
  async index(req,res){
    //Informa a quantidade total de registros existentes
    const [count] = await connection('incidents')
      .count();

    res.header('X-Total-Count', count['count(*)'])  

    //Construção de paginação
    const {page = 1} = req.query;
    const incidents = await connection('incidents')
    .join('ongs', 'ongs.id', '=', 'incidents.ong_id') //Utilizado para relacionar dados de tabelas diferentes
    .limit(5) //limita os campos que serão devidamente apresentados
    .offset((page-1)*5) //Offset, informa que de quantos em quantos resultados serão mostrados
    .select([
      'incidents.*',
      'ongs.name',
      'ongs.email',
      'ongs.whatsapp',
      'ongs.city',
      'ongs.uf'
    ]);

    return res.json(incidents);
  },


  async create(req, res){
    const{title, description, value} = req.body;
    const ong_id = req.headers.authorization;

    const [id] = await connection('incidents').insert({
      title,
      description,
      value,
      ong_id

    })

    return res.json({id});
  },

  async delete(req,res){
    const {id} = req.params;
    const ong_id = req.headers.authorization;

    const incident = await connection('incidents')
      .where('id', id)
      .select('ong_id')
      .first(); 

      if(incident.ong_id != ong_id){
        return res.status(401).json({ error: "O Usuário não está autorizado."});
      }

      await connection('incidents').where('id', id).delete();

      return res.status(204).send();
  }
}