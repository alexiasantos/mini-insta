const express = require('express');
const usuarios = require('./controladores/usuarios');
const login = require('./controladores/login');
const verificaLogin = require('./filtros/verificaLogin');
const { criarPostagem, curtirPostagem, comentarPostagem } = require('./controladores/postagens');

const rotas = express();

rotas.post('/cadastro', usuarios.cadastrarUsuario);

rotas.post('/login', login.login);

rotas.use(verificaLogin);

rotas.get('/perfil', usuarios.obterPerfil);
rotas.put('/perfil', usuarios.atualizarPerfil);

rotas.post('/postagem', criarPostagem)
rotas.post('/curtidas', curtirPostagem);
rotas.post('/comentar', comentarPostagem)
module.exports = rotas;