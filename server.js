const express = require('express');
const server = express();
const data = require('./data.json');

server.use(express.json());

server.use((req, res, next) => {
  console.log(`Método ${req.method}, URL ${req.url} `);

  return next();
});

function checkdID(req, res,next) {
  const { id } = req.params;

  const client = data.find(cli => cli.id == id);
  
  if(!client) {
    return res.status(400).json({error: "Cliente não cadastrado"});
  }

  
  return next();

}

server.get('/clients', (req, res) => {
  return res.json(data);
});

server.get('/clients/:id', checkdID, (req, res) => {
  const { id } = req.params;

  const client = data.find(cli => cli.id == id)

  return res.json(client);

});

server.post('/clients', (req, res) => {
    const { name, email } = req.body;

    const clientCads = [
      name,
      email
    ];

    data.push(clientCads);

    return res.json(clientCads);
    

});

server.put('/clients/:id', checkdID, (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  
  const client = data.find(cli => cli.id == id)

  client.name = name;


  return res.json(client);
  
});


server.delete('/clients/:id', checkdID, (req, res) => {
  const { id } = req.params;

  const client = data.find(cli => cli.id == id);

  data.splice(client);

  return res.send('Usuário excluído');
  
});



server.listen(3333);