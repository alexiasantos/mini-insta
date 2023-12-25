const express = require('express');
const { cadastrarUsuario, obterPerfil, atualizarPerfil } = require('./controladores/usuarios');
const { login } = require('./controladores/login');
const verificaLogin = require('./filtros/verificaLogin');
const { criarPostagem, curtirPostagem, comentarPostagem, feed } = require('./controladores/postagens');

const rotas = express();

rotas.post('/cadastro', cadastrarUsuario);

rotas.post('/login', login);

rotas.use(verificaLogin);

rotas.get('/perfil', obterPerfil);
rotas.put('/perfil', atualizarPerfil);

rotas.post('/postagem', criarPostagem);
rotas.get('/postagem', feed);
rotas.post('/curtidas/:postagem_id', curtirPostagem);
rotas.post('/comentar/:postagem_id', comentarPostagem);
module.exports = rotas;