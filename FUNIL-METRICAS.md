# Eventos do funil

Eventos personalizados enviados ao Pixel já instalado:

| Evento | Momento |
|---|---|
| LandingPageView | Página de vendas pronta |
| LandingCtaClick | Clique no botão; button_position = hero ou final |
| QuizStart | Perguntas do quiz disponíveis (abertura, não primeira resposta) |
| QuizQuestionAnswered | Primeira resposta a cada pergunta; question_number = 1 a 5 |
| QuizComplete | Confirmação da última pergunta |
| DiagnosisView | Resultado válido apresentado |
| CheckoutClick | Clique para abrir o checkout configurado |

Cada evento é limitado a uma ocorrência por carregamento de página. Cliques da página são separados por posição e respostas por número de pergunta. Atualizar a página inicia uma nova contagem; não são métricas de pessoas únicas. Não enviamos respostas, perfis, e-mails ou nomes como parâmetros dos novos eventos.

PageView permanece nas páginas. LandingPageView é um evento personalizado da página de vendas, não a métrica nativa “Visualizações da página de destino”. InitiateCheckout e Purchase continuam sob responsabilidade da integração Lastlink, sem novos disparos no site.

## Ativação

1. Publicar esta versão da página no EasyPanel. O Dockerfile já inclui os arquivos alterados.
2. No Gerenciador de Eventos, selecionar o conjunto de dados correto e abrir Testar eventos.
3. Percorrer página, quiz e diagnóstico até clicar no checkout. Verificar nomes e parâmetros. Repetir com respostas incompletas: não deve haver QuizComplete nem DiagnosisView.
4. Depois que os eventos forem recebidos, configurar conversões personalizadas correspondentes na conta e disponibilizá-las nas colunas do Gerenciador, conforme as opções atuais da interface.
5. Validar separadamente a compra no checkout. Nunca contar Pix gerado como pagamento aprovado.

Os eventos novos só medem ações futuras após publicação. Bloqueadores, consentimento, conectividade e fechamento da aba podem impedir envio. O intervalo de 200 ms antes de sair da página melhora a oportunidade de envio, mas não confirma recebimento pela Meta.

Contagens atribuídas no Gerenciador não equivalem a uma análise sequencial de usuários: podem ter diferenças de atribuição e de período. Para medir jornadas individuais, usar uma ferramenta de análise com sessões e eventos devidamente configurados. GA4 não foi instalado nesta alteração; falta definir a propriedade e sua configuração.
