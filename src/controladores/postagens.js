const knex = require('../conexao');

const criarPostagem = async (req, res) => {
    const { texto, imagens } = req.body;
    if (!imagens || imagens.length === 0) {
        return res.status(404).json('Ao menos uma imagem precisa ser informada!')
    }
    try {
        const novaPostagem = await knex('postagens')
            .insert({
                usuario_id: req.usuario.id,
                texto
            }).returning('*');

        if (!novaPostagem) {
            return res.status(400).json('Não foi possível concluir a postagem');
        }

        for (const imagem of imagens) {
            imagem.postagem_id = novaPostagem[0].id;
        }

        const postagemImagem = await knex('postagem_fotos').insert(
            imagens).returning('*');

        if (!postagemImagem) {
            await knex('postagens').where({ id: novaPostagem[0].id }).del();
            return res.status(400).json('Não foi possível concluir a postagem');
        }

        return res.status(200).json('Postagem realizada com sucesso!')
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