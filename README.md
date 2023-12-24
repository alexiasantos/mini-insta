# Nosso Mini insta

## o que o usuário pode fazer

- Fazer login
- Fazer cadastro
- Visualizar dados do seu perfil
- Editar perfil
- Visualizar posts de outros
    - Visualizar comentários em um post
    - Visualizar quantidade de curtidas
    - Visualizar usuário verificado ou não em um post
    - Visualizar data de publicação de um post
- Curtir posts de outros
- Comentar nos posts de outros



## O que o usuário não pode fazer

- Visualizar a localização de um post
- Visualizar pessoas que curtiram um post
- Curtir comentário
- Comentar em outros comentários
- Editar comentários
- Excluir comentários

## Endpoints

### Login - POST

#### Dados enviados
- Username
- senha

#### Dados retornados

- Sucesso / Erro
- token

#### Objetivos gerais

- Validar username e senha
- Buscar usuario no banco de dados
- Verificar se a senha informada está correta
- Gerar token de acesso
- Retornar os dados do user e o token

---

### Cadastro - POST

#### Dados enviados
- username
- senha

#### Dados retornados

- Sucesso / Erro

#### Objetivos gerais

- Validar username e senha
- Verificar se o username ja existe no banco
- Criptografar senha
- Cadastrar usuario no banco de dados
- Retornar sucesso ou erro

---

### Perfil - GET

#### Dados enviados
- token (terá id ou username)

#### Dados retornados
- URL foto
- nome
- username
- site
- bio
- email
- tel
- genero

#### Objetivos gerais
- Validar o token do usuário
- Buscar o cadastro do usuário com a info do token
- Retornar os dados do usuario

---

### Editar perfil - PUT

#### Dados enviados
- token (terá id ou username)
- URL foto
- nome
- username
- site
- bio
- email
- tel
- genero
#### Dados retornados
- Sucesso / Erro

#### Objetivos gerais
- Validar o token do usuário
- Buscar o cadastro do usuário com a info do token
- Exigir ao menos um campo para atualizar
- Criptografara senha se for informada
- Verificar se o email e o username já existe no banco de dados se informado
- Atualizar o registro do usuario no banco de dados
---

### postagens - POST

#### Dados enviados
- token
- Texto
- array com fotos
#### Dados retornados
- sucesso ou erro

#### Objetivos gerais

- Validar o token do usuário
- Buscar o cadastro do usuário com a info do token
- Exigir qeseja informado ao menos uma foto no array
- Cadastrar postagem para o usuário logado
- Cadastr das fotos dapostagem
- Retornar sucesso ou erro

---

### curtir posts - POST

#### Dados enviados
- token (contem username ou id do user)
- id do post

#### Dados retornados
- Sucesso / Erro


#### Objetivos geriais

- Validar token do usuário
- Buscar o cadastro do usuario com a informação do token
- Buscar o cadastro da postagem com o id informado
- Verificar se o usuário já curtiu a postagem
- Cadastrar curtida da postagem no banco de dados
- Retornar sucesso ou erro
---

### comentar posts - post

#### Dados enviados
- token
- id do post
- texto do comentario

#### Dados retornados
- Sucesso / Erro

#### Objetivos gerais
- Validar o token do usuario
- Buscar o cadastro do usuario com a informação do token
- Validar o texto
- Buscar apostagem peloid informado
- Cadastrar comentario da postagem
- Retornar sucesso ou erro