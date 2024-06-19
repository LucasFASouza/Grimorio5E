
# Grimório 5e

O Grimório 5e é um projeto desenvolvido para jogadores e mestres de Dungeons & Dragons (D&D) 5ª edição, oferecendo uma ferramenta prática e fácil de usar para acessar feitiços permitidos pelo System Reference Document (SRD). Com uma interface intuitiva, o Grimório 5e permite aos usuários filtrar feitiços por classe e adicionar feitiços aos favoritos, facilitando o acesso durante as sessões de jogo.

## Características

-**Filtro por Classe:** Escolha feitiços baseados na classe do seu personagem para visualizar apenas o que é relevante para você.

-**Bookmark de Feitiços:** Marque seus feitiços favoritos para fácil acesso, ideal para planejar suas sessões de jogo ou durante o calor do momento.

-**Detalhes Completos:** Cada feitiço vem com todos os detalhes necessários, incluindo descrição, nível, tempo de conjuração, alcance, componentes e duração.

-**Interface Amigável:** Projetado para ser fácil de navegar, permitindo que você encontre rapidamente as informações que precisa.

## Tecnologias Utilizadas

- React
- Next.js
- NextUI
- JSON para armazenamento de dados dos feitiços

## Dados dos Feitiços

Os dados dos feitiços são armazenados em arquivos JSON, seguindo as regras do SRD de D&D 5ª edição. Isso inclui uma lista abrangente de feitiços básicos disponíveis para personagens, permitindo uma experiência de jogo rica e variada.

É possível adicionar feitiços homebrew ou conteúdo pago, adicionando ao arquivo `public/data/spell-details` e adicionando o id nas respectivas classes em `public/data/class-spells.json`

## Como Usar

1.**Instalação:** Clone o repositório e instale as dependências com `npm install`.

2.**Execução:** Inicie o servidor de desenvolvimento com `npm run dev`.

3.**Navegação:** Abra seu navegador e acesse `http://localhost:3000` para começar a explorar os feitiços.

## Contribuições

Contribuições são bem-vindas! Se você tem sugestões para melhorar o aplicativo ou quer adicionar novas funcionalidades, sinta-se à vontade para criar um pull request ou abrir uma issue.

## Licença

Este projeto é distribuído sob a licença OGL.

---

Desenvolvido com ❤ para meus aventureiros, Anna & Pedro.
