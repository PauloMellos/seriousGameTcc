# Relatório Técnico: Simulador SOS Scape Point

Este documento detalha as principais funcionalidades e a lógica de programação implementada no componente `FireSafetyMasterGame` do projeto.

---

## 1. Gerenciamento de Estado (`useState`)

O jogo utiliza diversos estados para controlar o fluxo da simulação:
- `gameState`: Controla a tela atual (`start`, `playing`, `gameover`, etc.).
- `timeLeft`: Cronômetro regressivo (configurado para 35 segundos).
- `phaseIndex`: Controla em qual fase da história o jogador se encontra.
- `timerActive`: Booleano que pausa ou inicia a contagem regressiva.

---

## 2. Sistema de Áudio Dinâmico

### Alarme de Incêndio
Utiliza um `useEffect` vinculado ao estado do cronômetro. O som é carregado uma única vez via `useRef` para evitar recriações desnecessárias.
```typescript
// Lógica do Alarme
if (timerActive && gameState === 'playing' && !isMuted) {
  alarmAudio.current.play(); // Toca enquanto o tempo corre
} else {
  alarmAudio.current.pause(); // Pausa ao finalizar ou silenciar
}
```

### Efeito de Explosão
Acionado especificamente na transição para o estado `gameover`. Existe um atraso visual na interface para que o áudio seja percebido antes do texto.

---

## 3. Estrutura de Dados das Histórias (`stories`)

As missões são definidas como objetos contendo fases (`phases`). Existem 3 tipos principais:
1. **Scene**: Introdução narrativa que avança automaticamente após 8 segundos.
2. **Enigma**: Questões de múltipla escolha que exigem interação com um ícone (Ex: Extintor).
3. **Code/Map**: Desafios que utilizam inputs numéricos ou consulta a mapas.

---

## 4. Lógica do Cronômetro

Implementada com `setInterval`, a lógica garante que o jogo termine e a explosão sonorize a falha assim que os 35 segundos se esgotam.
```typescript
useEffect(() => {
  if (timerActive && timeLeft > 0) {
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  } else if (timeLeft === 0 && timerActive) {
    setGameState('gameover'); // Transição para tela de falha
  }
}, [timerActive, timeLeft]);
```

---

## 5. Interface e Experiência do Usuário (UX)

- **Botão Estilo Placa:** O botão "INICIAR" foi estilizado como uma placa de saída de emergência (verde, caixa alta, ícones de direção).
- **Cenários Visuais:** Uso de imagens do Unsplash com fumaça e ambientes acadêmicos para imersão.
- **Responsividade:** Ajuste de tamanhos de fonte e paddings para garantir que a interface funcione bem em dispositivos móveis.
