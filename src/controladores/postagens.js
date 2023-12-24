const knex = require('../conexao');

const criarPostagem = async (req, res) => {
    const { texto, imagem } = req.body;

    try {
        const novaPostagem = await knex('postagens')
            .insert({
                usuario_id: req.usuario.id,
                data: new Date(),
                texto
            }).returning('*');


        const postagemImagem = await knex('postagem_fotos').insert({
            postagem_id: novaPostagem[0].id,
            imagem
        }).returning('*')

        return res.status(200).json({ novaPostagem: novaPostagem[0], postagemImagem: postagemImagem[0] })
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const curtirPostagem = async (req, res) => {
    const { postagem_id } = req.body;
    try {
        const postagemExiste = await knex('postagens').where('id', postagem_id).first();

        if (!postagemExiste) {
            return res.status(404).json('Postagem informada não existe!');
        }

        const curtidaExiste = await knex('postagem_curtidas').where('usuario_id', req.usuario.id).andWhere('postagem_id', postagem_id).first();

        if (curtidaExiste) {
            const postagemDescurtida = await knex('postagem_curtidas').del().where('usuario_id', req.usuario.id).andWhere('postagem_id', postagem_id).returning('*');

            return res.status(200).json({ postagem: postagemDescurtida[0], status: "Postagem descurtida!" })
        }

        const postagemCurtida = await knex('postagem_curtidas').insert({
            usuario_id: req.usuario.id,
            postagem_id,
            data: new Date()
        }).returning('*');
        return res.status(200).json({ postagem: postagemCurtida[0], status: "Postagem curtida" })
    } catch (error) {
        return res.status(500).json(error.message);
    }

}

const comentarPostagem = async (req, res) => {
    const { texto, postagem_id } = req.body;
    if (texto.trim().length < 1) {
        return res.status(400).json('Texto não pode ser vazio!')
    }
    const postagemExiste = await knex('postagens').where('id', postagem_id).first();

    if (!postagemExiste) {
        return res.status(404).json('Postagem informada não existe!');
    }
    try {
        const postagemComentario = await knex('postagem_comentarios').insert({
            texto,
            data: new Date(),
            usuario_id: req.usuario.id,
            postagem_id
        }).returning('*');
        return res.status(200).json(postagemComentario)
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

module.exports = {
    criarPostagem,
    curtirPostagem,
    comentarPostagem
}