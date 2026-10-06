# Página de vendas — Playbook Yuri Soares

Site estático: página de vendas → quiz → diagnóstico → checkout Lastlink.
Os dois botões da página de vendas levam ao quiz. O checkout está em `config.js`.

## Desenvolvimento local

Requer Node.js. Sem dependências para instalar:

```sh
npm run dev
```

Abra http://localhost:5173. Atualize o navegador após editar os arquivos.

## Publicar no EasyPanel

1. Crie um serviço **App** para a página de vendas.
2. Em **Fonte → GitHub**, configure:
   - Repositório: `yunknet/pg-vendas-playbook-yuri`
   - Ramo: `main`
   - Caminho de build: `/`
3. Na construção, selecione **Dockerfile**, arquivo `Dockerfile`.
4. Salve e clique em **Implantar**.
5. Em **Domínios**, adicione o domínio da página de vendas e configure a porta interna **80**, protocolo HTTP. Ative HTTPS para o domínio público.
6. Aponte o DNS do domínio para a VPS e confira a emissão do certificado.

Não precisa de variáveis de ambiente, banco de dados ou volume. O Nginx serve os arquivos estáticos na porta 80. O Playbook comprado continua no serviço separado `playbook-yuri`.

## Verificação após publicar

- Abra a página inicial e confira imagem e estilos.
- Teste os dois botões de acesso: ambos devem abrir `quiz.html`.
- Conclua o quiz e confirme que o diagnóstico abre o checkout correto.
- A carteira Lastlink ainda estava em análise na preparação desta versão; valide a liberação da oferta antes de aceitar compras.

## Docker local (opcional)

```sh
docker build -t pg-vendas-playbook-yuri .
docker run --rm -p 8080:80 pg-vendas-playbook-yuri
```

Abra http://localhost:8080.

## Cartões ilustrativos

A página exibe 20 exemplos de compra e 20 exemplos de feedback, com nomes e textos fictícios. Todos os cartões trazem a identificação visível “EXEMPLO ILUSTRATIVO”; não representam compradores, depoimentos ou transações reais. O botão “Prévia: próximo exemplo” aparece apenas em localhost com `?popup-demo=1`.

Cada cartão aparece após 30 segundos, desaparece em 5 segundos e não se repete durante o carregamento. O botão de fechar encerra as notificações daquela visita.

Substitua os exemplos por depoimentos autorizados e compras verificadas antes de apresentar os cartões como resultados reais. Não divulgue e-mails, identificadores de pagamento ou outros dados pessoais.