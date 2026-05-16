# Experiência Mobile de Pátio - AJB AutoFlow

Este documento define a visão de UX operacional do AJB AutoFlow para mecânicos, lavadores, recepcionistas e funcionários de produção usando celular ou tablet no pátio.

## Princípio Central

O AJB AutoFlow deve reduzir digitação e transformar o trabalho operacional em ações visuais rápidas.

> Menos texto, mais botões grandes, ícones claros, câmera, voz, toque e automação.

---

## Dois Ambientes do Produto

### 1. Desktop Gerencial

Usado por:

- Dono da oficina/lava-jato
- Gerente
- Recepção
- Administrativo

Funções principais:

- Kanban completo
- Financeiro
- Cadastros
- Estoque
- Ordens de serviço
- Fornecedores
- Relatórios
- Configurações

### 2. Mobile Operacional

Usado por:

- Mecânico
- Lavador
- Recepcionista de pátio
- Funcionário de produção

Funções principais:

- Ver carros do dia
- Iniciar atendimento
- Finalizar atendimento
- Tirar fotos
- Registrar checklist
- Atualizar status
- Evitar digitação

---

## Interface Estilo Aplicativo de Entrega

A interface mobile deve ser parecida com apps de entrega/trabalho de campo:

- Botões enormes
- Pouco texto
- Ícones claros
- Cards grandes
- Feedback visual forte
- Fluxo em poucos cliques
- Design preparado para celular barato ou tablet simples

### Regras de UX

- O funcionário não deve procurar função em menu complexo.
- A ação principal precisa estar visível imediatamente.
- Em produção, o usuário precisa atualizar status com 1 toque.
- Digitação deve ser exceção, não regra.

---

## Modo Escuro Operacional

Oficinas e lava-jatos têm graxa, água, poeira e sujeira.

Por isso, telas operacionais devem ter modo escuro como padrão.

Benefícios:

- Menos reflexo
- Menos cansaço visual
- Disfarça marcas de dedo
- Melhor para ambiente de pátio
- Aparência mais robusta

---

## Regra dos 3 Cliques

O funcionário não deve levar mais de 3 cliques para atualizar o status de um carro.

Fluxo ideal:

1. Abre o app e vê os carros do dia.
2. Clica no carro.
3. Clica em Iniciar ou Finalizar.

Ao iniciar:

- Status muda para Em andamento
- Cronômetro começa
- Gerente vê a mudança no Kanban

Ao finalizar:

- Status muda para Controle de qualidade ou Pronto para entrega
- O card muda de coluna no desktop
- O cliente pode receber aviso automático

---

## Botões Gigantes

Exemplos de ações:

- Iniciar
- Pausar
- Finalizar
- Chamar responsável
- Tirar foto
- Registrar problema
- Avisar pronto

Os botões devem usar:

- Cores fortes
- Ícones grandes
- Texto curto
- Área grande de toque

---

## Teclado Otimizado

Campos devem abrir o teclado correto:

- Placa: maiúsculas, sem autocorreção
- KM: teclado numérico
- Telefone: teclado telefônico
- Valores: teclado decimal
- CNPJ/CPF: teclado numérico

---

## Substituir Digitação por Hardware

### Leitor de Placa por Câmera

Ideia futura:

- Recepcionista aponta câmera para a placa.
- Sistema reconhece a placa.
- Busca cliente e veículo automaticamente.

Observação:

- Pode começar manual no MVP.
- OCR/LPR entra como módulo avançado.

### Checklist Visual com Fotos

Fluxo ideal:

- Mostra desenho do veículo.
- Usuário toca na área com dano.
- Câmera abre.
- Foto fica vinculada à vistoria.

Áreas possíveis:

- Frente
- Traseira
- Lateral esquerda
- Lateral direita
- Capô
- Teto
- Porta esquerda
- Porta direita
- Para-choque
- Rodas

### Áudio para Texto

Para mecânicos:

- Gravar áudio descrevendo problema.
- IA transcreve para texto na OS.

Exemplo:

> Barulho intermitente na suspensão dianteira ao passar por ondulações.

Fase futura, com integração de IA.

---

## Painel da Recepção

A recepção deve operar em desktop com Kanban arrasta-e-solta.

Funções:

- Ver todos os veículos no pátio
- Arrastar card entre etapas
- Acompanhar status em tempo real
- Identificar atrasos
- Ver veículos prontos
- Ver gargalos por etapa

Quando o funcionário finaliza no mobile:

- Card muda de coluna automaticamente
- Card pode piscar em verde
- Recepção sabe que o veículo está pronto

---

## Experiência Ideal

### Entrada do veículo

1. Carro chega.
2. Recepcionista aponta o celular para a placa.
3. Sistema reconhece placa e cliente.
4. Recepcionista registra fotos/checklist.
5. OS é aberta.

Tempo ideal: menos de 1 minuto.

### Execução no pátio

1. Funcionário olha tablet/celular.
2. Vê próximo veículo da fila.
3. Clica em Iniciar.
4. Ao terminar, clica em Finalizar.

Tempo ideal: poucos segundos.

### Entrega

1. Status muda para pronto.
2. Cliente recebe aviso.
3. Link de pagamento/Pix pode ser enviado futuramente.

---

## Priorização Técnica

### Implementar agora

1. Tela mobile de pátio em modo escuro.
2. Cards grandes com veículos do dia.
3. Botões grandes: Iniciar e Finalizar.
4. Status visual claro.
5. Link rápido para detalhe da OS.

### Implementar depois

1. Atualização real de status.
2. Cronômetro por atendimento.
3. Checklist de entrada.
4. Fotos da vistoria.
5. Kanban com arrasta-e-solta.
6. Notificações automáticas.

### Implementar em fase avançada

1. OCR/LPR de placa por câmera.
2. Áudio para texto.
3. WhatsApp oficial.
4. Pix no checkout.
5. Integração fiscal.

---

## Mensagem Comercial

> O AJB AutoFlow foi pensado para o pátio: o funcionário vê o próximo carro, toca em iniciar, toca em finalizar e a recepção acompanha tudo em tempo real.
