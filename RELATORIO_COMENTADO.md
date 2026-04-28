# Relatório de Código Comentado: Simulador SOS Scape Point

Este relatório apresenta os trechos principais do código do simulador, com explicações detalhadas linha a linha sobre suas funções.

## 1. Definição de Estados (Hooks)
Esta seção controla a memória do jogo, como pontuação, tempo e em que tela o usuário está.

| Linha | Código | Comentário |
| :--- | :--- | :--- |
| 307 | `const [gameState, setGameState] = useState(...)` | Controla qual tela exibir (`start`, `playing`, `gameover`). |
| 309 | `const [phaseIndex, setPhaseIndex] = useState(0)` | Rastreia em qual etapa (fase) da história o jogador está. |
| 311 | `const [timeLeft, setTimeLeft] = useState(35)` | Inicializa o cronômetro com 35 segundos (tempo de missão). |
| 315 | `const [timerActive, setTimerActive] = useState(false)` | Booleano para ligar ou desligar a contagem do cronômetro. |
| 320 | `const alarmAudio = useRef<HTMLAudioElement | null>(null)` | Referência para o arquivo de áudio do alarme (evita recarregamento). |

## 2. Lógica do Temporizador (Timer)
Responsável por reduzir o tempo e disparar a tela de falha.

| Linha | Código | Comentário |
| :--- | :--- | :--- |
| 562 | `if (timerActive && timeLeft > 0) {` | Verifica se o cronômetro deve estar rodando e se ainda há tempo. |
| 563 | `timer = setInterval(() => { ... }, 1000)` | Cria uma função que executa a cada 1 segundo (1000ms). |
| 564 | `setTimeLeft(prev => prev - 1)` | Subtrai 1 segundo do valor atual no estado. |
| 566 | `else if (timeLeft === 0 && timerActive) {` | Se o tempo chegar a zero e o cronômetro estiver ligado: |
| 568 | `setGameState('gameover')` | Muda o estado para 'gameover', abrindo a tela de falha. |

## 3. Sistema de Áudio de Emergência
Controla o som do alarme durante a jogabilidade.

| Linha | Código | Comentário |
| :--- | :--- | :--- |
| 342 | `alarmAudio.current = new Audio('...')` | Carrega o link do som de alarme eletrônico de alta frequência. |
| 343 | `alarmAudio.current.loop = true` | Define que o som deve se repetir infinitamente enquanto ativo. |
| 347 | `if (timerActive && gameState === 'playing' ...)` | Se estivermos jogando e o tempo estiver correndo: |
| 348 | `alarmAudio.current.play()` | Inicia o som do alarme. |
| 350 | `alarmAudio.current.pause()` | Pausa o som (quando o tempo para ou mudamos de fase). |

## 4. Transição de Fases (Story Logic)
Controla como o jogador avança entre os enigmas.

| Linha | Código | Comentário |
| :--- | :--- | :--- |
| 581 | `const startStory = (storyId: string) => {` | Função chamada ao clicar em um cenário (Escola, Indústria, etc). |
| 585 | `setPhaseIndex(0)` | Reinicia as fases para a primeira etapa do cenário escolhido. |
| 586 | `setTimeLeft(story.timeLimit)` | Define o tempo limite específico daquele cenário (35s). |
| 588 | `setTimerActive(true)` | Começa a contagem regressiva da missão. |

## 5. Tela de Falha (Game Over)
A tela que aparece quando a explosão ocorre (pelo tempo esgotado).

| Linha | Código | Comentário |
| :--- | :--- | :--- |
| 1114 | `transition={{ delay: 0.8, ... }}` | Adiciona 0.8s de atraso para o visual aparecer (para que o som de explosão seja o primeiro impacto). |
| 1122 | `text-red-500 text-3xl ... Tempo Esgotado` | Exibe a mensagem de falha com as novas proporções reduzidas. |
| 1126 | `Você não conseguiu! Infelizmente o tempo acabou...` | Mensagem personalizada de feedback pedagógico sobre incêndios. |

---
**Nota Técnica:** O uso de `motion/react` (Framer Motion) é essencial para as animações de entrada e saída, garantindo que a transição para a tela de 'gameover' seja suave e visualmente impactante.
