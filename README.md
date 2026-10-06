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

## Pop-ups de depoimentos e compras

Prévia local: `http://localhost:5173/?popup-demo=1`. Os nomes e comentários dessa demonstração são fictícios, identificados no cartão e disponíveis somente em localhost.

A lista `socialProofItems`, em `landing.js`, começa vazia. Preencha apenas com depoimentos autênticos autorizados ou compras reais com data e nome autorizado para divulgação. Não publique e-mails, identificadores de pagamento ou dados pessoais adicionais.

Um cartão aparece a cada 30 segundos e permanece por 5 segundos; cada item aparece uma vez por carregamento. O botão de fechar encerra as notificações da visita. A exibição pausa em abas ocultas ou durante navegação por teclado. Compras com mais de uma hora são descartadas e os minutos são calculados pela data original. A integração automática com compras não está conectada.
