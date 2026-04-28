import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Flame, 
  Map, 
  Users, 
  BookOpen, 
  Gamepad2, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  ChevronDown, 
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Instagram,
  Linkedin,
  Twitter,
  Mail,
  Phone,
  PlayIcon,
  RotateCcw,
  PlayCircle,
  Download,
  BarChart3,
  Clock,
  Trophy,
  Award,
  Droplets,
  Wind,
  Zap,
  Lightbulb,
  LogOut,
  GraduationCap,
  Briefcase,
  Home,
  Construction,
  Info,
  Lock,
  Unlock,
  AlertTriangle,
  Factory,
  Search,
  FireExtinguisher
} from 'lucide-react';

// --- Types ---
interface GamePhase {
  type: 'scene' | 'enigma' | 'code' | 'ppe' | 'map';
  id?: string;
  title: string;
  description?: string;
  goal?: string;
  image: string;
  btnText?: string;
  question?: string;
  hint?: string;
  correctCode?: string;
  correctSet?: string[];
  explanation?: string;
  options?: { id: string; name: string; isCorrect?: boolean; icon?: React.ReactNode }[];
  targetIcon?: React.ReactNode;
  hotspot?: { x: number; y: number; label?: string; width?: number; height?: number; hideVisual?: boolean };
}

interface Story {
  id: string;
  name: string;
  scenario: string;
  description: string;
  icon: React.ReactNode;
  bg: string;
  timeLimit: number;
  phases: GamePhase[];
}

interface SafetyTip {
  title: string;
  description: string;
  icon: React.ReactNode;
}

// --- Components ---

const Logo = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <div className="relative w-9 h-9">
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_0_20px_rgba(0,166,80,0.6)]">
        {/* Stylized Modern Location Pin */}
        <path 
          d="M24 44C24 44 40 30 40 18C40 9.16344 32.8366 2 24 2C15.1634 2 8 9.16344 8 18C8 30 24 44 24 44Z" 
          stroke="url(#logo-grad)" 
          strokeWidth="3" 
          strokeLinejoin="round"
          className="animate-[pulse_4s_ease-in-out_infinite]"
        />
        
        {/* Inner Stylized Core */}
        <circle cx="24" cy="18" r="6" stroke="currentColor" className="text-brand-accent" strokeWidth="2.5" />
        <circle cx="24" cy="18" r="12" stroke="currentColor" className="text-brand-accent/20" strokeWidth="1" strokeDasharray="4 4" />
        
        {/* Accent Lines for "Movement/Signal" */}
        <path d="M24 2V6" stroke="currentColor" className="text-brand-accent" strokeWidth="2" strokeLinecap="round" />
        <path d="M40 18H36" stroke="currentColor" className="text-brand-accent" strokeWidth="2" strokeLinecap="round" />
        <path d="M8 18H12" stroke="currentColor" className="text-brand-accent" strokeWidth="2" strokeLinecap="round" />
        
        <defs>
          <linearGradient id="logo-grad" x1="24" y1="2" x2="24" y2="44" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--color-brand-accent)"/>
            <stop offset="1" stopColor="#008f45"/>
          </linearGradient>
        </defs>
      </svg>
    </div>
    <div className="flex flex-col leading-none">
      <span className="font-display font-black text-xl tracking-tighter text-brand-text italic uppercase">SOS SCAPE</span>
      <span className="font-display font-bold text-[8px] tracking-[0.4em] text-brand-accent uppercase ml-1">Point</span>
    </div>
  </div>
);

const Navbar = ({ isDark, toggleTheme }: { isDark: boolean; toggleTheme: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', href: '#home' },
    { name: 'Jogos Educativos', href: '#games' },
    { name: 'Contato', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-brand-bg/80 backdrop-blur-xl py-4 border-b border-brand-border shadow-lg' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        
        {/* Logo (Left) */}
        <Logo />

        {/* Desktop Nav (Right/Center) */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-semibold text-brand-text/80 hover:text-brand-accent transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-accent transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
          
          <button 
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-brand-surface border border-brand-border text-brand-accent hover:scale-110 transition-all duration-300 shadow-sm"
            aria-label="Alternar tema"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Mobile Toggle (Right on mobile) */}
        <div className="md:hidden flex items-center gap-4">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-brand-surface border border-brand-border text-brand-accent"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button 
            onClick={() => setIsOpen(true)}
            className="text-brand-text p-1"
          >
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-brand-bg z-[60] md:hidden"
          >
            <div className="flex flex-col p-8 gap-6 h-full">
              <div className="flex justify-between items-center mb-8">
                <Logo />
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl bg-brand-surface border border-brand-border text-brand-text"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="flex flex-col gap-4">
                {navLinks.map((link, i) => (
                  <motion.a 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={link.name} 
                    href={link.href} 
                    onClick={() => setIsOpen(false)}
                    className="text-2xl font-display font-bold text-brand-text hover:text-brand-accent transition-colors flex items-center justify-between group"
                  >
                    {link.name}
                    <ChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity text-brand-accent" />
                  </motion.a>
                ))}
              </div>
              
              <div className="mt-auto pt-8 border-t border-brand-border">
                <p className="text-brand-text-muted text-sm mb-4">Segurança em primeiro lugar.</p>
                <div className="flex gap-4">
                  <a href="#" className="p-3 bg-brand-surface border border-brand-border rounded-xl text-brand-text hover:text-brand-accent transition-colors"><Instagram size={20} /></a>
                  <a href="#" className="p-3 bg-brand-surface border border-brand-border rounded-xl text-brand-text hover:text-brand-accent transition-colors"><Linkedin size={20} /></a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
         <div className="absolute inset-0 bg-gradient-to-b from-brand-bg/90 via-brand-bg/40 to-brand-bg z-10" />
         <img src="/assets/background.png" alt="Porta de Saída de Emergência Sinalizada" className="w-full h-full object-cover scale-105 animate-slow-zoom" referrerPolicy="no-referrer"/>
        </div>
    </section>
  );
};

const SafetyTips = () => {
  const tips: SafetyTip[] = [
    {
      title: "Identificação de Riscos",
      description: "Aprenda a perceber princípios de incêndio e identificar pontos de calor ou fumaça antes que se tornem incontroláveis.",
      icon: <Flame className="w-8 h-8" />
    },
    {
      title: "Rotas de Fuga",
      description: "A importância da sinalização clara e desobstruída. Conheça os caminhos mais rápidos para uma evacuação segura.",
      icon: <Map className="w-8 h-8" />
    },
    {
      title: "Equipamentos de Combate",
      description: "Uso correto de extintores (PQS, CO2, Água) e hidrantes. Saiba qual equipamento usar para cada classe de incêndio.",
      icon: <Shield className="w-8 h-8" />
    }
  ];

  return (
    <section className="py-16 px-6 md:px-12 lg:px-24 bg-brand-bg relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-accent/30 to-transparent" />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-black text-brand-text mb-4 tracking-tighter">Protocolos de Segurança</h2>
          <p className="text-brand-text-muted max-w-2xl mx-auto text-base">Conhecimento fundamental para agir com precisão nos primeiros segundos de uma emergência.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {tips.map((tip, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-8 rounded-[2rem] bg-brand-surface/40 border border-brand-border hover:border-brand-accent/30 transition-all duration-500 hover:shadow-[0_15px_30px_rgba(0,0,0,0.4)]"
            >
              <div className="bg-brand-accent/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-brand-accent group-hover:bg-brand-accent group-hover:text-brand-bg transition-all duration-500">
                {React.cloneElement(tip.icon as React.ReactElement, { size: 24 })}
              </div>
              <h3 className="text-xl font-display font-bold text-brand-text mb-3 tracking-tight">{tip.title}</h3>
              <p className="text-brand-text-muted text-sm leading-relaxed">{tip.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Fire Safety Master Game (Comprehensive Training) ---
// --- Fire Safety Master Game (Escape Room: SOS Scape Point) ---
const FireSafetyMasterGame = () => {
  const [gameState, setGameState] = useState<'start' | 'selection' | 'playing' | 'feedback' | 'finished' | 'gameover' | 'show'>('start');
  const [currentStoryId, setCurrentStoryId] = useState<string | null>(null);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(40);
  const [feedback, setFeedback] = useState<{ correct: boolean; message: string; explanation: string } | null>(null);
  const [storiesCompleted, setStoriesCompleted] = useState<string[]>([]);
  const [gameExplanations, setGameExplanations] = useState<{title: string, explanation: string}[]>([]);
  const [finalCodeInput, setFinalCodeInput] = useState<string[]>(['', '', '', '']);
  const [timerActive, setTimerActive] = useState(false);
  const [showStoryDetail, setShowStoryDetail] = useState<string | null>(null);
  const [showEnigma, setShowEnigma] = useState(false);
  const [showSceneIntro, setShowSceneIntro] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const alarmAudio = useRef<HTMLAudioElement | null>(null);
  const explosionAudio = useRef<HTMLAudioElement | null>(null);

  // Scene Intro logic
  useEffect(() => {
    if (gameState === 'playing' && currentPhase?.type === 'scene') {
      setShowSceneIntro(true);
      const timer = setTimeout(() => {
        setShowSceneIntro(false);
        // Auto-advance to the first interactive enigma after the info disappears
        nextPhase();
      }, 8000);
      return () => clearTimeout(timer);
    } else {
      setShowSceneIntro(false);
    }
  }, [gameState, phaseIndex]);

  // Audio effect for alarm
  useEffect(() => {
    if (!alarmAudio.current) {
      // Tenta carregar o arquivo local alarme.mp3. Caso não exista, usa o link do Mixkit.
      const localAlarm = '/assets/alarme.mp3';
      alarmAudio.current = new Audio(localAlarm);
      
      // Fallback para o link público se o local falhar (onError do elemento de áudio)
      alarmAudio.current.addEventListener('error', () => {
        if (alarmAudio.current) {
          alarmAudio.current.src = 'https://assets.mixkit.co/active_storage/sfx/1004/1004-preview.mp3';
          if (timerActive && gameState === 'playing' && !isMuted) {
             alarmAudio.current.play().catch(e => console.log("Alarm fallback audio blocked", e));
          }
        }
      }, { once: true });

      alarmAudio.current.loop = true;
      alarmAudio.current.volume = 0.3;
    }

    if (timerActive && gameState === 'playing' && !isMuted) {
      alarmAudio.current.play().catch(e => console.log("Audio play blocked by browser", e));
    } else {
      alarmAudio.current.pause();
    }

    return () => {
      if (alarmAudio.current) {
        alarmAudio.current.pause();
      }
    };
  }, [timerActive, gameState, isMuted]);

  // Audio effect for explosion on Game Over or Failure (< 70%)
  useEffect(() => {
    const shouldPlayExplosion = () => {
      if (isMuted) return false;
      if (gameState === 'gameover') return true;
      if (gameState === 'finished') {
        const currentStoryForMax = stories.find(s => s.id === currentStoryId);
        const maxScore = currentStoryForMax?.phases.reduce((acc: number, phase) => {
          if (phase.type === 'enigma') return acc + 25;
          if (phase.type === 'ppe' || phase.type === 'map') return acc + 50;
          return acc;
        }, 0) || 100;
        return (score / maxScore) * 100 < 70;
      }
      return false;
    };

    if (shouldPlayExplosion()) {
      if (!explosionAudio.current) {
        // Usando arquivo público para a explosão
        explosionAudio.current = new Audio('https://assets.mixkit.co/active_storage/sfx/1018/1018-preview.mp3');
        explosionAudio.current.volume = 0.5;
      }
      explosionAudio.current.play().catch(e => console.log("Explosion audio blocked", e));
    }
  }, [gameState, isMuted, score, currentStoryId]);

  // stories data
  const stories: Story[] = [
    {
      id: 'student',
      name: 'Aluno',
      scenario: 'Escola',
      description: 'Um dia comum vira um teste de sobrevivência. Saia rápido!',
      icon: <GraduationCap size={40} />,
      bg: '/assets/escola.png',
      timeLimit: 40,
      phases: [
        {
          type: 'scene',
          title: 'Alarme!',
          description: 'Sinal dispara. Corredor com fumaça.',
          goal: 'Sair da sala pela rota segura.',
          image: '/assets/escola.png',
          btnText: 'Avançar'
        },
        {
          type: 'enigma',
          id: 'extinguisher',
          title: 'Extintor',
          question: 'Extintor ideal para papel e madeira?',
          options: [
            { id: '1', name: 'Água', isCorrect: true, icon: <Droplets /> },
            { id: '2', name: 'Pó Químico', isCorrect: false, icon: <Zap /> },
            { id: '3', name: 'CO2', isCorrect: false, icon: <Wind /> }
          ],
          explanation: 'Incêndio Classe A ocorre em materiais sólidos (papel, madeira) que deixam brasas e cinzas. O resfriamento com água é o método mais eficaz.',
          image: '/assets/escola.png',
          hotspot: { x: 65, y: 65, label: 'Extintor', width: 150, height: 150, hideVisual: true }
        },
        {
          type: 'enigma',
          id: 'door',
          title: 'A Porta',
          question: 'Fumaça densa: por que devemos se deslocar agachado?',
          options: [
            { id: '1', name: 'Para ir mais rápido', isCorrect: false, icon: <PlayCircle /> },
            { id: '2', name: 'Ar frio é mais denso e fica no chão', isCorrect: true, icon: <Users /> },
            { id: '3', name: 'Para não ser visto', isCorrect: false, icon: <Construction /> }
          ],
          explanation: 'O calor torna a fumaça menos densa, fazendo-a subir. O ar mais frio, limpo e rico em oxigênio permanece próximo ao chão.',
          image: '/assets/escolaInicio.png',
          hotspot: { x: 70, y: 60, label: 'Corredor', width: 200, height: 200, hideVisual: true }
        },
        {
          type: 'enigma',
          id: 'exit_bar',
          title: 'Saída de Emergência',
          question: 'Como utilizar a barra antipânico na porta de saída?',
          options: [
            { id: '1', name: 'Puxar com as duas mãos', isCorrect: false, icon: <Lock /> },
            { id: '2', name: 'Empurrar no sentido da fuga', isCorrect: true, icon: <ArrowRight /> },
            { id: '3', name: 'Girar a maçaneta lateral', isCorrect: false, icon: <Unlock /> }
          ],
          explanation: 'A barra antipânico deve ser empurrada. Ela é projetada para abrir instantaneamente com o peso do corpo, facilitando a evacuação rápida.',
          image: '/assets/escolaSaida.png',
          hotspot: { x: 80, y: 30, label: 'Porta', width: 150, height: 150, hideVisual: true }
        }
      ]
    },
    {
      id: 'worker',
      name: 'Operário',
      scenario: 'Indústria',
      description: 'Curto-circuito inicia um fogo elétrico. Saia!',
      icon: <Factory size={40} />,
      bg: '/assets/industriaInicio.png',
      timeLimit: 40,
      phases: [
        {
          type: 'scene',
          title: 'Painel em Chamas',
          description: 'Alarme piscando. Máquinas ligadas.',
          goal: 'Sair do pátio agora.',
          image: '/assets/industriaInicio.png',
          btnText: 'Fugir'
        },
        {
          type: 'enigma',
          id: 'extinguisher',
          title: 'Curto-Circuito',
          question: 'Água em fogo elétrico? Por quê evitar?',
          options: [
            { id: '1', name: 'Risco de choque', isCorrect: true, icon: <Zap /> },
            { id: '2', name: 'Água é cara', isCorrect: false, icon: <Phone /> },
            { id: '3', name: 'Enferruja tudo', isCorrect: false, icon: <Construction /> }
          ],
          explanation: 'Incêndios Classe C envolvem equipamentos elétricos energizados. Jamais utilize água, pois ela é condutora e causará eletrocussão grave.',
          image: '/assets/industriaFogo.png',
          hotspot: { x: 40, y: 45, label: 'Painel', width: 150, height: 150, hideVisual: true }
        },
        {
          type: 'enigma',
          id: 'door',
          title: 'Porta Corta-Fogo',
          question: 'Qual a função desta porta em um incêndio?',
          options: [
            { id: '1', name: 'Nenhuma, é apenas decorativa', isCorrect: false, icon: <Briefcase /> },
            { id: '2', name: 'Impedir a entrada de estranhos', isCorrect: false, icon: <Lock /> },
            { id: '3', name: 'Conter chamas e fumaça em setores', isCorrect: true, icon: <Shield /> }
          ],
          explanation: 'As portas corta-fogo isolam setores do prédio, retardando a propagação das chamas e impedindo a passagem de fumaça tóxica para as rotas de fuga.',
          image: '/assets/industriaFogo.png',
          hotspot: { x: 60, y: 55, label: 'Porta', width: 200, height: 200, hideVisual: true }
        },
        {
          type: 'ppe',
          id: 'final',
          title: 'Checklist EPI',
          question: 'Selecione 4 EPIs essenciais para riscos industriais.',
          explanation: 'O uso correto de Equipamentos de Proteção Individual (EPI) é a última barreira de proteção física do trabalhador contra agentes nocivos e acidentes.',
          correctSet: ['helmet', 'gloves', 'boots', 'glasses'],
          options: [
            { id: 'helmet', name: 'Capacete', icon: <Construction /> },
            { id: 'gloves', name: 'Luvas', icon: <Droplets /> },
            { id: 'boots', name: 'Botas', icon: <Lock /> },
            { id: 'glasses', name: 'Óculos', icon: <Shield /> },
            { id: 'mask', name: 'Mascara', icon: <Wind /> },
            { id: 'hat', name: 'Boné', icon: <Moon /> }
          ],
          image: '/assets/industriaEpi.png',
          hotspot: { x: 50, y: 70, label: 'EPIs', width: 300, height: 300, hideVisual: true }
        }
      ]
    },
    {
      id: 'resident',
      name: 'Morador',
      scenario: 'Apartamento',
      description: 'Fogo na cozinha! Escape do 5º andar.',
      icon: <Home size={40} />,
      bg: '/assets/apartamentoInicio.png',
      timeLimit: 40,
      phases: [
        {
          type: 'scene',
          title: 'Fogo na Cozinha!',
          description: 'Fumaça densa do fogão. Saia agora.',
          goal: 'Sair do prédio imediatamente.',
          image: '/assets/apartamentoInicio.png',
          btnText: 'Sair'
        },
        {
          type: 'enigma',
          id: 'extinguisher',
          title: 'Óleo em Chamas',
          question: 'Classe de fogo em óleos de cozinha?',
          options: [
            { id: '1', name: 'Classe A', isCorrect: false, icon: <BookOpen /> },
            { id: '2', name: 'Classe B', isCorrect: false, icon: <Droplets /> },
            { id: '3', name: 'Classe K', isCorrect: true, icon: <AlertTriangle /> }
          ],
          explanation: 'Incêndios Classe K envolvem óleos de cozinha e gorduras. Exigem extintores especiais e nunca devem ser combatidos com água, que causa explosão de gordura (boilover).',
          image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1200',
          hotspot: { x: 45, y: 40, label: 'Fogão', width: 200, height: 200, hideVisual: true }
        },
        {
          type: 'enigma',
          id: 'door',
          title: 'Elevador?',
          question: 'Por que é proibido usar o elevador em incêndios?',
          options: [
            { id: '1', name: 'A energia é cortada por segurança', isCorrect: true, icon: <Zap /> },
            { id: '2', name: 'O elevador é reservado para bombeiros', isCorrect: false, icon: <Briefcase /> },
            { id: '3', name: 'As escadas são mais rápidas', isCorrect: false, icon: <Clock /> }
          ],
          explanation: 'O poço do elevador atua como uma chaminé, sugando fumaça. Além disso, a energia é cortada, podendo deixar as pessoas presas em andares em chamas.',
          image: 'https://images.unsplash.com/photo-1551033406-611cf9a28f67?auto=format&fit=crop&q=80&w=800',
          hotspot: { x: 75, y: 50, label: 'Elevador', width: 200, height: 200, hideVisual: true }
        },
        {
          type: 'map',
          id: 'final',
          title: 'Mapa de Evacuação',
          question: 'Qual o código da escada pressurizada no mapa?',
          hint: 'Consulte a legenda do mapa de risco (Dica: 5102)',
          explanation: 'Mapas de risco e plantas de emergência são cruciais para localizar escadas pressurizadas e pontos de encontro seguros fora da edificação.',
          correctCode: '5102',
          image: 'https://images.unsplash.com/photo-1524334228333-0f6db392f8a1?auto=format&fit=crop&q=80&w=1200',
          hotspot: { x: 30, y: 40, label: 'Mapa', width: 250, height: 250, hideVisual: true }
        }
      ]
    }
  ];

  const currentStory = stories.find(s => s.id === currentStoryId);
  const currentPhase = currentStory?.phases[phaseIndex];

  // Timer logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timerActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && timerActive) {
      setTimerActive(false);
      setGameState('gameover');
    }
    return () => clearInterval(timer);
  }, [timerActive, timeLeft]);

  const resetToStoryStart = () => {
    setPhaseIndex(0);
    if (currentStory) setTimeLeft(currentStory.timeLimit);
    setTimerActive(true);
    setGameState('playing');
    setFeedback(null);
  };

  const startStory = (storyId: string) => {
    const story = stories.find(s => s.id === storyId);
    if (story) {
      setCurrentStoryId(storyId);
      setPhaseIndex(0);
      setScore(0); // Reset score for new story
      setTimeLeft(story.timeLimit);
      setGameState('playing');
      setTimerActive(true);
      setFeedback(null);
      setFinalCodeInput(['', '', '', '']);
    }
  };

  const handleAnswer = (optionId: string) => {
    if (!currentPhase || currentPhase.type !== 'enigma') return;

    const option = currentPhase.options?.find(o => o.id === optionId);
    const isCorrect = option?.isCorrect || false;

    // Play sounds
    const correctAudio = new Audio('https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3');
    const wrongAudio = new Audio('https://assets.mixkit.co/active_storage/sfx/894/894-preview.mp3');
    
    if (isCorrect) {
      if (!isMuted) correctAudio.play().catch(e => console.log('Audio play failed:', e));
      setScore(prev => prev + 25);
      setGameExplanations(prev => {
        const alreadyExists = prev.some(exp => exp.title === currentPhase.title);
        if (alreadyExists) return prev;
        return [...prev, { title: currentPhase.title, explanation: currentPhase.explanation || '' }];
      });
      setFeedback({
        correct: true,
        message: 'Correto!',
        explanation: ''
      });
      setTimeout(() => {
        nextPhase();
      }, 1500);
    } else {
      if (!isMuted) wrongAudio.play().catch(e => console.log('Audio play failed:', e));
      setFeedback({
        correct: false,
        message: 'Tente de novo!',
        explanation: 'Resposta incorreta. Analise a situação e escolha outra opção.'
      });
      setTimeout(() => setFeedback(null), 2000);
    }
  };

  const nextPhase = () => {
    setFeedback(null);
    setShowEnigma(false);
    if (currentStory && phaseIndex < currentStory.phases.length - 1) {
      setPhaseIndex(prev => prev + 1);
      setGameState('playing');
    } else {
      // Completed story
      setTimerActive(false);
      if (currentStoryId && !storiesCompleted.includes(currentStoryId)) {
        setStoriesCompleted(prev => [...prev, currentStoryId]);
      }
      setGameState('finished');
    }
  };

  const handleCodeSubmit = (type: 'code' | 'map') => {
    const code = finalCodeInput.join(type === 'code' ? '-' : '');
    const isCorrect = code === currentPhase?.correctCode;

    // Play sounds
    const correctAudio = new Audio('https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3');
    const wrongAudio = new Audio('https://assets.mixkit.co/active_storage/sfx/894/894-preview.mp3');

    if (isCorrect) {
      if (!isMuted) correctAudio.play().catch(e => console.log('Audio play failed:', e));
      setScore(prev => prev + 50);
      setGameExplanations(prev => {
        const alreadyExists = prev.some(exp => exp.title === currentPhase.title);
        if (alreadyExists) return prev;
        return [...prev, { title: currentPhase.title, explanation: currentPhase.explanation || '' }];
      });
      setFeedback({
        correct: true,
        message: 'Código Aceito!',
        explanation: ''
      });
      setTimeout(() => {
        nextPhase();
      }, 1500);
    } else {
      if (!isMuted) wrongAudio.play().catch(e => console.log('Audio play failed:', e));
      setFeedback({
        correct: false,
        message: 'Código Incorreto!',
        explanation: 'Tente de novo seguindo a dica visual.'
      });
      setTimeout(() => setFeedback(null), 2000);
    }
  };

  const [selectedPPEs, setSelectedPPEs] = useState<string[]>([]);
  const togglePPE = (id: string) => {
    if (selectedPPEs.includes(id)) {
      setSelectedPPEs(prev => prev.filter(p => p !== id));
    } else {
      setSelectedPPEs(prev => [...prev, id]);
    }
  };

  const handlePPESubmit = () => {
    if (!currentPhase) return;
    const isCorrect = selectedPPEs.length === currentPhase.correctSet?.length && 
                      selectedPPEs.every(p => currentPhase.correctSet?.includes(p));
    
    // Play sounds
    const correctAudio = new Audio('https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3');
    const wrongAudio = new Audio('https://assets.mixkit.co/active_storage/sfx/894/894-preview.mp3');

    if (isCorrect) {
      if (!isMuted) correctAudio.play().catch(e => console.log('Audio play failed:', e));
      setScore(prev => prev + 50);
      setGameExplanations(prev => {
        const alreadyExists = prev.some(exp => exp.title === currentPhase.title);
        if (alreadyExists) return prev;
        return [...prev, { title: currentPhase.title, explanation: currentPhase.explanation || '' }];
      });
      setFeedback({
        correct: true,
        message: 'Equipado!',
        explanation: ''
      });
      setTimeout(() => {
        nextPhase();
      }, 1500);
    } else {
      if (!isMuted) wrongAudio.play().catch(e => console.log('Audio play failed:', e));
      setFeedback({
        correct: false,
        message: 'Tente de novo!',
        explanation: 'Faltam itens ou itens incorretos selecionados.'
      });
      setTimeout(() => setFeedback(null), 2000);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-brand-surface rounded-[3rem] md:rounded-[4rem] border border-brand-border/50 overflow-hidden shadow-3xl min-h-[700px] flex flex-col font-sans relative">
      {/* Game Content Area */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        {/* Persistent Scenario Background for in-game states */}
        {(gameState === 'playing' || gameState === 'feedback' || gameState === 'finished' || gameState === 'gameover') && currentPhase && (
          <div className="absolute inset-0 z-0">
             <img 
               src={currentPhase.image} 
               className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${showEnigma ? 'scale-105 opacity-50 blur-[1px]' : 'scale-100 opacity-90'}`} 
               referrerPolicy="no-referrer" 
             />
             <div className="absolute inset-0 bg-brand-bg/20 backdrop-blur-[1px]" />
          </div>
        )}

        {/* Start Screen */}
      {gameState === 'start' && (
        <div className="relative flex-1 p-6 md:p-14 text-center flex flex-col items-center justify-center overflow-hidden min-h-[400px]">
          <div className="absolute inset-0 opacity-15 pointer-events-none scale-110 animate-slow-zoom">
             <img src="https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-transparent to-brand-bg/80" />
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10"
          >
            <div className="w-16 h-16 md:w-24 md:h-24 bg-brand-accent/20 rounded-2xl md:rounded-[2rem] flex items-center justify-center mb-6 text-brand-accent shadow-xl shadow-brand-accent/10 mx-auto border border-brand-accent/20 transition-transform hover:rotate-12 duration-500">
               <Gamepad2 size={40} className="md:size-[48px]" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-black text-brand-text mb-4 tracking-tighter uppercase leading-[0.95] text-balance">
              <span className="text-brand-accent drop-shadow-[0_0_15px_rgba(0,166,80,0.4)]">SOS Scape Point</span>
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-brand-text-muted mb-6 max-w-lg mx-auto font-medium leading-relaxed px-4">
              Domine as técnicas de evacuação em cenários críticos. <br className="hidden md:block" /> Resolva enigmas e lidere a saída segura.
            </p>
            <button 
              onClick={() => setGameState('selection')} 
              className="group relative inline-flex items-center gap-5 px-7 py-3 bg-[#00a650] text-white border-[3px] border-white/20 rounded-sm shadow-[0_0_25px_rgba(0,166,80,0.3)] hover:shadow-[0_0_40px_rgba(0,166,80,0.5)] transition-all duration-300 active:scale-95"
            >
              {/* Backlight effect */}
              <div className="absolute inset-x-0 top-0 h-[1px] bg-white/40" />
              <div className="absolute inset-x-0 bottom-0 h-[1px] bg-black/20" />
              
              <div className="flex items-center gap-3">
                <span className="text-2xl md:text-3xl font-black tracking-[-0.05em] font-sans italic">INICIAR</span>
              </div>

              <div className="w-[1px] h-8 bg-white/20 mx-1" />

              <div className="relative">
                <ArrowRight size={24} className="transition-transform group-hover:translate-x-1.5 duration-300 drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]" />
                {/* Glow behind arrow */}
                <div className="absolute inset-0 bg-white blur-md opacity-0 group-hover:opacity-20 transition-opacity" />
              </div>
            </button>
          </motion.div>
        </div>
      )}

      {/* Selection Screen */}
      {gameState === 'selection' && (
        <div className="p-6 md:p-20 flex-1 bg-brand-bg/50 overflow-y-auto custom-scrollbar">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8 md:mb-16"
          >
             <h3 className="text-xl sm:text-3xl md:text-5xl font-display font-black text-brand-text mb-2 md:mb-3 uppercase leading-none tracking-tighter text-balance">Escolha seu Destino</h3>
             <p className="text-xs md:text-base text-brand-text-muted max-w-lg mx-auto px-4">Cenários críticos que exigem protocolos específicos de segurança.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8">
            {stories.map((story, i) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8, scale: 1.01 }}
                onClick={() => startStory(story.id)}
                className={`group relative cursor-pointer rounded-[2.5rem] overflow-hidden border-2 transition-all duration-500 flex flex-col h-full
                  ${story.id === 'student' 
                    ? (storiesCompleted.includes(story.id) ? 'border-yellow-500 bg-yellow-500/5' : 'border-yellow-500/40 hover:border-yellow-500')
                    : (story.id === 'worker' || story.id === 'resident')
                      ? (storiesCompleted.includes(story.id) ? 'border-green-500 bg-green-500/5' : 'border-green-500/40 hover:border-green-500')
                      : (storiesCompleted.includes(story.id) ? 'border-brand-accent bg-brand-accent/5' : 'border-brand-border/40 hover:border-brand-accent')
                  }`}
              >
                <div className="absolute inset-0 z-0">
                  <img src={story.bg} className="w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-opacity duration-700" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/60 to-transparent" />
                </div>
                
                <div className="relative z-10 p-6 md:p-8 flex flex-col items-center text-center flex-1">
                  <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl md:rounded-[1.5rem] flex items-center justify-center mb-6 shadow-xl transition-all duration-500 transform group-hover:rotate-6 
                    ${story.id === 'student' ? 'bg-yellow-500 text-black' : (story.id === 'worker' || story.id === 'resident') ? 'bg-green-500 text-white' : (storiesCompleted.includes(story.id) ? 'bg-brand-accent text-white' : 'bg-brand-surface border border-brand-border text-brand-accent')}`}
                  >
                    {React.cloneElement(story.icon as React.ReactElement, { size: 32 })}
                  </div>
                  
                  <span className={`text-[9px] font-black uppercase tracking-widest mb-2 block ${story.id === 'student' ? 'text-yellow-500' : (story.id === 'worker' || story.id === 'resident') ? 'text-green-500' : 'text-brand-accent/80'}`}>{story.id === 'student' ? 'Desempenho' : story.scenario}</span>
                  <h4 className="text-xl md:text-2xl font-display font-black text-white mb-3 uppercase tracking-tight leading-tight">{story.name}</h4>
                  
                  <p className="text-[11px] md:text-xs text-brand-text-muted leading-relaxed mb-6 block lg:opacity-60 lg:group-hover:opacity-100 transition-opacity duration-500 line-clamp-2">
                    {story.description}
                  </p>
                  
                  <div className={`mt-auto px-5 py-2 rounded-xl font-black text-[9px] uppercase tracking-widest border transition-all 
                    ${story.id === 'student' 
                      ? (storiesCompleted.includes(story.id) ? 'bg-yellow-500 text-black border-yellow-500' : 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500 group-hover:bg-yellow-500 group-hover:text-black group-hover:border-yellow-500')
                      : (story.id === 'worker' || story.id === 'resident')
                        ? (storiesCompleted.includes(story.id) ? 'bg-green-500 text-white border-green-500' : 'bg-green-500/10 border-green-500/20 text-green-500 group-hover:bg-green-500 group-hover:text-white group-hover:border-green-500')
                        : (storiesCompleted.includes(story.id) ? 'bg-brand-accent text-brand-bg border-brand-accent' : 'bg-white/5 border-white/10 text-white group-hover:bg-brand-accent group-hover:text-brand-bg group-hover:border-brand-accent')
                    }`}
                  >
                    {storiesCompleted.includes(story.id) ? 'Completo' : 'Começar'}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Scape Quiz Block */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: stories.length * 0.1 }}
              whileHover={{ y: -8, scale: 1.01 }}
              onClick={() => setGameState('show')}
              className="group relative cursor-pointer rounded-[2.5rem] overflow-hidden border-2 border-yellow-500/40 hover:border-yellow-500 transition-all duration-500 flex flex-col h-full bg-yellow-500/5"
            >
              <div className="absolute inset-0 z-0">
                <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-opacity duration-700" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/60 to-transparent" />
              </div>
              
              <div className="relative z-10 p-6 md:p-8 flex flex-col items-center text-center flex-1">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl md:rounded-[1.5rem] flex items-center justify-center mb-6 shadow-xl transition-all duration-500 transform group-hover:rotate-6 bg-yellow-500 text-black">
                  <Trophy size={32} />
                </div>
                
                <span className="text-[9px] font-black text-yellow-500 uppercase tracking-widest mb-2 block">Desempenho</span>
                <h4 className="text-xl md:text-2xl font-display font-black text-white mb-3 uppercase tracking-tight leading-tight">Scape Quiz</h4>
                
                <p className="text-[11px] md:text-xs text-brand-text-muted leading-relaxed mb-6 block lg:opacity-60 lg:group-hover:opacity-100 transition-opacity duration-500 line-clamp-2">
                  Só quem tem conhecimento chega até a saida, será que você consegue chegar ao final?
                </p>
                
                <div className="mt-auto px-5 py-2 rounded-xl font-black text-[9px] uppercase tracking-widest border border-yellow-500/20 bg-yellow-500/10 text-yellow-500 group-hover:bg-yellow-500 group-hover:text-black transition-all">
                  Começar
                </div>
              </div>
            </motion.div>
          </div>
          {storiesCompleted.length > 0 && (
            <div className="mt-12 text-center">
              <button onClick={() => setGameState('start')} className="text-brand-text-muted hover:text-brand-accent font-bold uppercase tracking-widest transition-colors">Voltar ao Início</button>
            </div>
          )}
        </div>
      )}

      {/* Scape Quiz Screen */}
      {gameState === 'show' && (
        <div className="flex-1 flex flex-col min-h-[700px]">
          <div className="p-4 bg-brand-bg border-b border-brand-border flex justify-between items-center">
            <button 
              onClick={() => setGameState('selection')}
              className="flex items-center gap-2 text-brand-text-muted hover:text-brand-accent transition-colors font-bold uppercase text-[10px] tracking-widest"
            >
              <ChevronLeft size={16} /> Voltar para Missões
            </button>
            <div className="text-yellow-500 font-display font-black italic uppercase tracking-tighter">Scape Quiz</div>
          </div>
          <div className="flex-1 flex flex-col">
            <SegurancaShowGame />
          </div>
        </div>
      )}

      {/* Playing Screen */}
      {gameState === 'playing' && currentPhase && (
        <div className="flex-1 flex flex-col h-full relative overflow-hidden z-10">
          {/* HUD Overlay */}
          <div className="absolute top-0 left-0 w-full z-30 bg-gradient-to-b from-black/50 to-transparent p-4 md:p-6 flex justify-between items-center">
             <div className="flex items-center gap-3 md:gap-6">
               <div className="flex flex-col">
                  <span className="text-[8px] md:text-[10px] font-mono font-bold text-brand-accent uppercase tracking-[0.2em] mb-0.5 md:mb-1">{currentStory?.name}</span>
                  <h4 className="text-sm md:text-xl font-display font-black text-white shadow-sm truncate max-w-[100px] sm:max-w-[150px] md:max-w-none uppercase tracking-tight">{currentPhase.title}</h4>
               </div>
               <div className="h-6 md:h-8 w-[1px] bg-white/20 hidden sm:block" />
               <div className="hidden lg:flex gap-2">
                 {currentStory?.phases.map((_, i) => (
                   <div key={i} className={`h-1 w-6 md:h-1.5 md:w-8 rounded-full ${i <= phaseIndex ? 'bg-brand-accent' : 'bg-white/20'}`} />
                 ))}
               </div>
             </div>
             
             <div className="flex items-center gap-2 md:gap-4">
                <div className={`flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 rounded-2xl md:rounded-3xl border transition-all shadow-xl backdrop-blur-xl ${timeLeft < 10 ? 'bg-red-500/30 border-red-500 text-red-500 animate-pulse' : 'bg-black/60 border-white/20 text-white'}`}>
                   <Clock size={20} className={timeLeft < 10 ? 'animate-spin-slow' : ''} />
                   <span className="text-xl md:text-3xl font-mono font-black tracking-tighter">00:{timeLeft.toString().padStart(2, '0')}</span>
                </div>
                
                <button 
                  onClick={() => setIsMuted(prev => !prev)}
                  className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-white/60 hover:text-white transition-all shadow-xl backdrop-blur-md"
                >
                  {isMuted ? <Wind size={20} /> : <Zap size={20} className="animate-pulse" />}
                </button>
                
                <button 
                 onClick={() => {
                   setGameState('selection');
                   setTimerActive(false);
                 }}
                 className="flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3.5 bg-red-600 hover:bg-red-700 border border-white/20 rounded-2xl md:rounded-3xl text-white font-black uppercase text-[9px] md:text-xs tracking-[0.2em] transition-all shadow-xl shadow-red-600/20"
                >
                  <span className="hidden sm:inline">Abortar</span> <LogOut size={16} className="md:size-[18px]" />
                </button>
             </div>
          </div>

          {/* Main Visual Arena */}
          <div className="flex-1 relative overflow-hidden group">
            {/* The background is now persistent outside this block */}
            
            <AnimatePresence>
                {/* Scene Description (Automatic Popup) */}
                {currentPhase.type === 'scene' && showSceneIntro && !showEnigma && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9, y: 20 }} 
                    animate={{ opacity: 1, scale: 1, y: 0 }} 
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="absolute bottom-4 left-4 right-4 md:bottom-10 md:left-1/2 md:-translate-x-1/2 z-20 p-4 md:p-6 bg-brand-bg/95 backdrop-blur-3xl border border-brand-accent/40 rounded-2xl md:rounded-[2.5rem] w-auto md:w-[90%] md:max-w-3xl shadow-3xl text-center"
                  >
                     <div className="flex items-center gap-4 text-left">
                       <div className="shrink-0 w-10 h-10 md:w-14 md:h-14 bg-brand-accent/20 rounded-xl flex items-center justify-center text-brand-accent">
                          <Info size={20} className="animate-bounce md:size-[28px]" />
                       </div>
                       <div className="flex-1 min-w-0">
                          <h4 className="text-base md:text-xl font-display font-black text-brand-text uppercase truncate leading-tight tracking-tight">{currentPhase.goal}</h4>
                          <p className="text-[10px] md:text-sm text-brand-text-muted font-medium italic line-clamp-2">{currentPhase.description}</p>
                       </div>
                       <button onClick={() => setShowSceneIntro(false)} className="btn-primary px-4 py-2 text-[9px] md:text-xs uppercase tracking-widest shrink-0">
                          OK
                       </button>
                     </div>
                  </motion.div>
                )}

                {/* Help Prompt (When scene intro is gone but user hasn't found hotspot) */}
                {currentPhase.type === 'scene' && !showSceneIntro && !showEnigma && (
                   <motion.div 
                     initial={{ opacity: 0, x: -20 }}
                     animate={{ opacity: 1, x: 0 }}
                     className="absolute bottom-6 left-6 z-30 px-5 py-2.5 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center gap-3 shadow-2xl"
                   >
                     <div className="w-8 h-8 bg-brand-accent/20 rounded-lg flex items-center justify-center text-brand-accent">
                        <Search size={18} />
                     </div>
                     <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-white">Encontre o objeto no cenário</span>
                   </motion.div>
                )}

                {/* Hotspot Interactions */}
                {currentPhase.type !== 'scene' && !showEnigma && currentPhase.hotspot && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    style={{ 
                      left: `${currentPhase.hotspot.x}%`, 
                      top: `${currentPhase.hotspot.y}%`,
                      width: currentPhase.hotspot.hideVisual ? (currentPhase.hotspot.width ? `${currentPhase.hotspot.width}px` : '100px') : 'auto',
                      height: currentPhase.hotspot.hideVisual ? (currentPhase.hotspot.height ? `${currentPhase.hotspot.height}px` : '100px') : 'auto',
                    }}
                    className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
                  >
                    <button 
                      onClick={() => setShowEnigma(true)}
                      className={`relative group/hotspot w-full h-full ${currentPhase.hotspot.hideVisual ? 'cursor-pointer' : ''}`}
                    >
                      {!currentPhase.hotspot.hideVisual && (
                        <>
                          <div className="absolute inset-0 rounded-full bg-brand-accent animate-ping opacity-40" />
                          <div className="w-16 h-16 rounded-full bg-brand-accent border-4 border-white flex items-center justify-center text-white shadow-2xl transition-transform hover:scale-110 active:scale-95 relative z-10">
                            {currentPhase.targetIcon || <ChevronRight size={28} />}
                          </div>
                          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 px-4 py-2 bg-brand-accent text-white text-[10px] font-black uppercase tracking-widest rounded-full opacity-0 group-hover/hotspot:opacity-100 transition-opacity whitespace-nowrap shadow-xl">
                            Interagir com {currentPhase.hotspot.label || 'Objeto'}
                          </div>
                        </>
                      )}
                      {currentPhase.hotspot.hideVisual && (
                        <div className="w-full h-full bg-transparent hover:bg-white/10 border-2 border-dashed border-white/0 hover:border-white/20 transition-all rounded-lg" />
                      )}
                    </button>
                  </motion.div>
                )}

                {/* Enigma Overlays */}
                {showEnigma && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 30 }}
                    className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-1/2 md:-translate-x-1/2 z-40 w-auto md:w-[95%] md:max-w-3xl bg-brand-surface/95 backdrop-blur-3xl border border-brand-border rounded-xl md:rounded-[2rem] p-3 md:p-5 shadow-3xl flex flex-col overflow-hidden"
                  >
                    <div className="flex justify-between items-center mb-2 md:mb-3 shrink-0 px-2">
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-3 bg-brand-accent rounded-full" />
                        <h4 className="text-[10px] md:text-sm font-display font-black text-brand-text uppercase tracking-widest">{currentPhase.title}</h4>
                      </div>
                      <button 
                        onClick={() => setShowEnigma(false)}
                        className="p-1.5 md:p-2 bg-white/5 hover:bg-white/10 rounded-lg text-brand-text-muted transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    <div className="flex-1 overflow-y-auto pr-1 md:pr-2 custom-scrollbar">
                      {currentPhase.type === 'enigma' && (
                        <div className="flex flex-col items-center text-center">
                          <p className="text-[12px] md:text-base text-brand-text font-bold mb-3 md:mb-4 leading-tight max-w-lg">{currentPhase.question}</p>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-3 w-full">
                            {currentPhase.options?.map(opt => (
                              <button 
                                key={opt.id}
                                onClick={() => handleAnswer(opt.id)}
                                className="w-full p-2 md:p-3 text-center rounded-lg md:rounded-xl bg-brand-bg/60 border border-brand-border hover:border-brand-accent hover:bg-brand-accent/5 transition-all group flex sm:flex-col items-center gap-2 md:gap-3"
                              >
                                <div className="w-7 h-7 md:w-10 md:h-10 shrink-0 rounded-md md:rounded-lg bg-brand-surface border border-brand-border flex items-center justify-center text-brand-text group-hover:text-brand-accent group-hover:scale-105 transition-all">
                                  {opt.icon && React.isValidElement(opt.icon) ? React.cloneElement(opt.icon as React.ReactElement, { size: 14 }) : <ChevronRight size={14} />}
                                </div>
                                <span className="text-[9px] md:text-xs text-brand-text font-bold leading-tight flex-1">{opt.name}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {(currentPhase.type === 'code' || currentPhase.type === 'map') && (
                        <div className="flex flex-col items-center text-center">
                          <p className="text-[12px] md:text-base text-brand-text font-bold mb-3">{currentPhase.question}</p>
                          <div className="p-1.5 md:p-3 bg-brand-accent/5 border border-brand-accent/20 rounded-lg mb-3 flex gap-2 items-center max-w-sm">
                             <Info size={14} className="shrink-0 text-brand-accent" />
                             <p className="text-[9px] md:text-[11px] text-brand-text/70 font-medium text-left">{currentPhase.hint}</p>
                          </div>
                          <div className="flex justify-center gap-1.5 mb-3">
                             {finalCodeInput.map((val, idx) => (
                               <input 
                                 key={idx}
                                 type="text"
                                 maxLength={1}
                                 value={val}
                                 onChange={(e) => {
                                   const newVal = e.target.value.replace(/[^0-9]/g, '');
                                   const updated = [...finalCodeInput];
                                   updated[idx] = newVal;
                                   setFinalCodeInput(updated);
                                   if (newVal && idx < 3) (e.target.nextElementSibling as HTMLInputElement)?.focus();
                                 }}
                                 className="w-8 h-10 md:w-12 md:h-16 text-center text-lg md:text-2xl font-mono font-black border-2 border-brand-border bg-brand-bg rounded-md md:rounded-lg focus:border-brand-accent outline-none"
                               />
                             ))}
                          </div>
                          <button onClick={() => handleCodeSubmit(currentPhase.type as 'code' | 'map')} className="btn-primary py-1.5 md:py-2.5 text-[9px] md:text-[11px] uppercase tracking-widest rounded-lg w-full max-w-xs justify-center">Validar <Lock size={12} className="ml-2" /></button>
                        </div>
                      )}

                      {currentPhase.type === 'ppe' && (
                        <div className="flex flex-col items-center">
                          <p className="text-[12px] md:text-base text-brand-text font-bold mb-3 text-center">{currentPhase.question}</p>
                          <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 md:gap-2 mb-3 w-full">
                             {currentPhase.options?.map(opt => (
                               <button
                                 key={opt.id}
                                 onClick={() => togglePPE(opt.id)}
                                 className={`p-1.5 md:p-2.5 rounded-lg md:rounded-xl border transition-all flex flex-col items-center gap-1 text-center
                                   ${selectedPPEs.includes(opt.id) ? 'bg-brand-accent/10 border-brand-accent text-brand-accent' : 'bg-brand-bg border-brand-border text-brand-text-muted'}`}
                               >
                                 <div className="scale-75 md:scale-95">{opt.icon}</div>
                                 <span className="text-[7px] md:text-[9px] font-black uppercase tracking-tighter truncate w-full">{opt.name}</span>
                               </button>
                             ))}
                          </div>
                          <button onClick={handlePPESubmit} className="btn-primary py-1.5 md:py-2.5 text-[9px] md:text-[11px] uppercase tracking-widest rounded-lg w-full max-w-xs justify-center">Equipar</button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
            </AnimatePresence>
                 {/* Success Feedback Overlay */}
            <AnimatePresence>
              {feedback && feedback.correct && (
                 <motion.div 
                   initial={{ opacity: 0 }} 
                   animate={{ opacity: 1 }} 
                   exit={{ opacity: 0 }}
                   className="absolute inset-0 z-[100] bg-green-500/20 backdrop-blur-sm flex items-center justify-center pointer-events-none"
                 >
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="bg-brand-bg/90 border-2 border-green-500 rounded-full p-8 shadow-2xl flex flex-col items-center gap-2"
                    >
                      <CheckCircle2 size={64} className="text-green-500" />
                      <span className="text-xl font-display font-black text-white uppercase tracking-widest">{feedback.message}</span>
                    </motion.div>
                 </motion.div>
              )}
            </AnimatePresence>

            {/* Wrong Answer Alert Overlay */}
            <AnimatePresence>
              {feedback && !feedback.correct && (
                 <motion.div 
                   initial={{ opacity: 0, y: 50 }} 
                   animate={{ opacity: 1, y: 0 }} 
                   exit={{ opacity: 0, y: 50 }}
                   className="absolute bottom-4 left-4 right-4 md:bottom-10 md:left-1/2 md:-translate-x-1/2 z-[50] p-4 md:p-6 bg-red-600/90 backdrop-blur-xl border border-white/20 rounded-2xl md:rounded-3xl shadow-3xl text-center flex items-center gap-4 max-w-sm"
                 >
                    <AlertTriangle size={24} className="text-white shrink-0" />
                    <div className="text-left">
                       <h5 className="text-sm font-display font-black text-white uppercase tracking-tighter">{feedback.message}</h5>
                       <p className="text-[10px] text-white/80 font-bold leading-tight">{feedback.explanation}</p>
                    </div>
                 </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Finished Screen */}
      {gameState === 'finished' && (
        <div className="p-8 md:p-20 flex-1 flex flex-col items-center justify-center text-center overflow-y-auto custom-scrollbar relative z-10">
           <div className="absolute inset-0 bg-brand-bg/50 backdrop-blur-[3px]" />
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,166,80,0.15),transparent_70%)] animate-pulse" />
           <motion.div 
             initial={{ y: -50, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             className="w-24 h-24 md:w-32 md:h-32 bg-brand-accent/20 text-brand-accent rounded-[2.5rem] md:rounded-[3.5rem] flex items-center justify-center mb-10 shadow-3xl shadow-brand-accent/30 animate-bounce shrink-0 border-2 border-brand-accent/30 relative z-10"
           >
              <Trophy size={56} className="md:size-[64px]" />
           </motion.div>
           
           <h3 className="text-2xl sm:text-5xl md:text-7xl font-display font-black text-brand-text mb-2 uppercase tracking-tighter leading-none relative z-10 text-balance">Missão Cumprida!</h3>
           <p className="text-lg md:text-2xl text-brand-text-muted mb-8 font-medium relative z-10 text-balance">Você dominou os perigos em <span className="text-brand-accent italic font-black">{currentStory?.name}</span>.</p>
           
           <div className="w-full max-w-4xl bg-brand-surface/60 backdrop-blur-md p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] border border-brand-border/50 mb-8 text-left shadow-xl relative z-10">
               <h4 className="text-brand-accent font-black text-xs uppercase tracking-widest mb-6 flex items-center gap-2">
                 <BookOpen size={16} /> Feedback
               </h4>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {gameExplanations.map((exp, idx) => (
                    <div key={idx} className="p-4 bg-brand-bg/40 rounded-2xl border border-white/5">
                      <span className="text-[10px] font-black text-brand-accent uppercase mb-1 block">{exp.title}</span>
                      <p className="text-xs md:text-sm text-brand-text/80 leading-relaxed font-bold italic">"{exp.explanation}"</p>
                    </div>
                  ))}
                  {gameExplanations.length === 0 && (
                    <p className="text-brand-text font-bold italic col-span-full">Nenhum feedback disponível.</p>
                  )}
               </div>
            </div>

           <div className="flex flex-col md:flex-row gap-3 w-full max-w-lg relative z-10 px-4">
             {(() => {
                const currentIndex = stories.findIndex(s => s.id === currentStoryId);
                const nextStory = stories[currentIndex + 1];
                
                if (nextStory) {
                  return (
                    <button 
                      onClick={() => {
                        setGameExplanations([]);
                        startStory(nextStory.id);
                      }} 
                      className="btn-primary flex-1 justify-center px-6 py-4 font-black uppercase tracking-widest text-[10px] md:text-xs bg-brand-accent hover:bg-brand-accent-hover shadow-[0_0_20px_rgba(0,166,80,0.3)] transition-all hover:scale-105"
                    >
                      Próxima Missão: {nextStory.name} <ArrowRight size={16} className="ml-2" />
                    </button>
                  );
                }
                return null;
             })()}

             <button 
               onClick={() => {
                 setGameState('selection');
                 setGameExplanations([]);
               }} 
               className="btn-secondary flex-1 justify-center px-6 py-4 font-black uppercase tracking-widest text-[10px] md:text-xs border-white/10 hover:bg-white/5"
             >
               {stories.findIndex(s => s.id === currentStoryId) === stories.length - 1 ? 'Voltar ao Início' : 'Menu de Missões'}
             </button>
             
             <button 
               onClick={() => {
                 setGameExplanations([]);
                 startStory(currentStoryId!);
               }} 
               className="btn-secondary flex-1 justify-center px-6 py-4 font-black uppercase tracking-widest text-[10px] md:text-xs border-white/10 hover:bg-white/5"
             >
               Reiniciar
             </button>
           </div>
           
           {storiesCompleted.length === stories.length && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mt-16 p-8 bg-brand-accent/10 border-2 border-brand-accent/30 rounded-[3rem] max-w-2xl">
                 <h4 className="text-3xl font-display font-black text-brand-accent mb-4 uppercase">Mestre do Escape SOS!</h4>
                 <p className="text-brand-text leading-relaxed font-bold">Parabéns! Você completou todas as histórias e demonstrou saber exatamente como agir em diferentes cenários de emergência.</p>
              </motion.div>
           )}
        </div>
      )}

      {/* Game Over Screen */}
      {gameState === 'gameover' && (
        <div className="p-8 md:p-24 flex-1 flex flex-col items-center justify-center text-center overflow-y-auto relative z-10">
           <div className="absolute inset-0 bg-brand-bg/90 backdrop-blur-[8px]" />
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.25),transparent_70%)] animate-pulse" />
           
           <motion.div 
             initial={{ scale: 0, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             transition={{ delay: 0.8, type: 'spring', damping: 10 }}
             className="relative z-10 flex flex-col items-center"
           >
             <div className="w-16 h-16 md:w-24 md:h-24 bg-red-600/20 rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-center mb-6 text-red-500 shadow-xl shadow-red-600/20 animate-pulse border-2 border-red-500/30">
                <AlertTriangle size={32} className="md:size-[48px]" />
             </div>
             
             <h3 className="text-xl sm:text-3xl md:text-5xl font-display font-black text-brand-text mb-3 uppercase tracking-tighter leading-[0.9] text-balance">
                Tempo <br /><span className="text-red-500 text-2xl sm:text-4xl md:text-5xl">Esgotado</span>
             </h3>
             
             <p className="text-sm md:text-lg text-brand-text-muted mb-8 font-medium max-w-xl mx-auto leading-relaxed text-balance">
               Você não conseguiu! Infelizmente o tempo acabou. Em situações de incêndio, cada segundo é vital. Revisite os protocolos e tente novamente!
             </p>
             
             <button onClick={() => currentStoryId && startStory(currentStoryId)} className="btn-primary bg-red-600 hover:bg-red-700 px-8 py-3 md:px-10 md:py-4 text-sm md:text-base tracking-[0.2em] uppercase flex items-center gap-3 rounded-xl md:rounded-2xl shadow-xl shadow-red-600/20">
                REINICIAR MISSÃO <Clock size={20} className="animate-spin-slow" />
             </button>
           </motion.div>
        </div>
      )}
      </div>
    </div>
  );
};

interface TriviaQuestion {
  id: number;
  question: string;
  image: string;
  options: { id: string; text: string; isCorrect: boolean }[];
}

const triviaQuestions: TriviaQuestion[] = [
  {
    id: 1,
    question: "Segundo o Anexo B, qual o significado deste símbolo circular com uma barra diagonal e um cigarro?",
    image: "/assets/proibidofumar.jpg",
    options: [
      { id: "A", text: "Área de fumantes", isCorrect: false },
      { id: "B", text: "Proibido fumar (Código P1)", isCorrect: true },
      { id: "C", text: "Cuidado: Gases inflamáveis", isCorrect: false },
      { id: "D", text: "Venda de tabaco proibida", isCorrect: false }
    ]
  },
  {
    id: 2,
    question: "O símbolo triangular com uma chama preta (Código A2) alerta para:",
    image: "https://images.unsplash.com/photo-1504194140026-63e8a4d2e7eb?auto=format&fit=crop&q=80&w=400",
    options: [
      { id: "A", text: "Risco de explosão", isCorrect: false },
      { id: "B", text: "Ponto de encontro", isCorrect: false },
      { id: "C", text: "Cuidado, risco de incêndio", isCorrect: true },
      { id: "D", text: "Equipamento de combate a incêndio", isCorrect: false }
    ]
  },
  {
    id: 3,
    question: "A placa retangular verde com a inscrição 'SAÍDA' (Código S12) indica:",
    image: "https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&q=80&w=400",
    options: [
      { id: "A", text: "Saída de serviço", isCorrect: false },
      { id: "B", text: "Atenção: Porta de vidro", isCorrect: false },
      { id: "C", text: "Saída de emergência", isCorrect: true },
      { id: "D", text: "Entrada proibida", isCorrect: false }
    ]
  },
  {
    id: 4,
    question: "O que indica o símbolo quadrado vermelho com um telefone branco (Código E4)?",
    image: "https://images.unsplash.com/photo-1520923642038-b4259ace9439?auto=format&fit=crop&q=80&w=400",
    options: [
      { id: "A", text: "Telefone público", isCorrect: false },
      { id: "B", text: "Telefone ou interfone de emergência", isCorrect: true },
      { id: "C", text: "Proibido usar celular", isCorrect: false },
      { id: "D", text: "Central de atendimento", isCorrect: false }
    ]
  },
  {
    id: 5,
    question: "O código S24, com setas apontando para o centro de um quadrado verde, representa:",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=400",
    options: [
      { id: "A", text: "Ponto de encontro", isCorrect: true },
      { id: "B", text: "Elevador de emergência", isCorrect: false },
      { id: "C", text: "Área de resgate", isCorrect: false },
      { id: "D", text: "Saída para deficientes", isCorrect: false }
    ]
  },
  {
    id: 6,
    question: "A placa P4, afixada em elevadores comuns, traz qual mensagem obrigatória?",
    image: "https://images.unsplash.com/photo-1551033406-611cf9a28f67?auto=format&fit=crop&q=80&w=400",
    options: [
      { id: "A", text: "USE APENAS EM EMERGÊNCIAS", isCorrect: false },
      { id: "B", text: "CAPACIDADE MÁXIMA 10 PESSOAS", isCorrect: false },
      { id: "C", text: "DESCER PELAS ESCADAS", isCorrect: false },
      { id: "D", text: "PROIBIDO UTILIZAR O ELEVADOR EM CASO DE INCÊNDIO", isCorrect: true }
    ]
  },
  {
    id: 7,
    question: "O símbolo triangular com um raio (Código A5) é utilizado em:",
    image: "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&q=80&w=400",
    options: [
      { id: "A", text: "Painéis de disjuntores e subestações", isCorrect: true },
      { id: "B", text: "Áreas de radiação", isCorrect: false },
      { id: "C", text: "Depósitos de inflamáveis", isCorrect: false },
      { id: "D", text: "Locais com piso molhado", isCorrect: false }
    ]
  },
  {
    id: 8,
    question: "O código E5 (quadrado vermelho com cilindro branco) indica a localização de:",
    image: "https://images.unsplash.com/photo-1621360841013-c7683c659ec6?auto=format&fit=crop&q=80&w=400",
    options: [
      { id: "A", text: "Mangotinho", isCorrect: false },
      { id: "B", text: "Hidrante", isCorrect: false },
      { id: "C", text: "Extintor de incêndio", isCorrect: true },
      { id: "D", text: "Alarme sonoro", isCorrect: false }
    ]
  },
  {
    id: 9,
    question: "A sinalização C2 (faixa amarela e preta) é utilizada para indicar:",
    image: "https://images.unsplash.com/photo-1533038590840-1cde6e668a91?auto=format&fit=crop&q=80&w=400",
    options: [
      { id: "A", text: "Saída final das rotas de fuga", isCorrect: false },
      { id: "B", text: "Indicação de obstáculos ou riscos", isCorrect: true },
      { id: "C", text: "Área de hidrantes", isCorrect: false },
      { id: "D", text: "Sentido da saída", isCorrect: false }
    ]
  },
  {
    id: 10,
    question: "O símbolo S25 (coração branco com raio em fundo verde) identifica o:",
    image: "https://images.unsplash.com/photo-1516670428252-df97bba108d1?auto=format&fit=crop&q=80&w=400",
    options: [
      { id: "A", text: "Posto de Primeiros Socorros", isCorrect: false },
      { id: "B", text: "Desfibrilador Externo Automático (DEA)", isCorrect: true },
      { id: "C", text: "Farmácia de emergência", isCorrect: false },
      { id: "D", text: "Área de resgate médico", isCorrect: false }
    ]
  },
  {
    id: 11,
    question: "Placas com o código E8 mostram a letra 'H' branca em fundo vermelho para indicar:",
    image: "https://images.unsplash.com/photo-1596522354195-e84935836893?auto=format&fit=crop&q=80&w=400",
    options: [
      { id: "A", text: "Hospital próximo", isCorrect: false },
      { id: "B", text: "Heliponto", isCorrect: false },
      { id: "C", text: "Hidrante de incêndio", isCorrect: true },
      { id: "D", text: "Hangar de extintores", isCorrect: false }
    ]
  },
  {
    id: 12,
    question: "O que indica o símbolo P2 (círculo vermelho com chama cruzada)?",
    image: "https://images.unsplash.com/photo-1502472545336-6136fa5c05d0?auto=format&fit=crop&q=80&w=400",
    options: [
      { id: "A", text: "Proibido produzir chama", isCorrect: true },
      { id: "B", text: "Proibido fumar", isCorrect: false },
      { id: "C", text: "Área de alta temperatura", isCorrect: false },
      { id: "D", text: "Proibido usar água", isCorrect: false }
    ]
  },
  {
    id: 13,
    question: "O sinal E19 (retângulo vermelho com borda amarela) serve para sinalizar o:",
    image: "https://images.unsplash.com/photo-1473186578172-c141e6798ee4?auto=format&fit=crop&q=80&w=400",
    options: [
      { id: "A", text: "Extintor de pó químico", isCorrect: false },
      { id: "B", text: "Corte de energia", isCorrect: true },
      { id: "C", text: "Gerador elétrico", isCorrect: false },
      { id: "D", text: "Acionador de alarme", isCorrect: false }
    ]
  },
  {
    id: 14,
    question: "Segundo o Anexo B, o código S17 identifica o:",
    image: "https://images.unsplash.com/photo-1551033406-611cf9a28f67?auto=format&fit=crop&q=80&w=400",
    options: [
      { id: "A", text: "Número do pavimento", isCorrect: true },
      { id: "B", text: "Número do apartamento", isCorrect: false },
      { id: "C", text: "Saída de deficientes", isCorrect: false },
      { id: "D", text: "Capacidade da escada", isCorrect: false }
    ]
  },
  {
    id: 15,
    question: "O símbolo triangular com uma caveira (Código A7) indica cuidado com:",
    image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&q=80&w=400",
    options: [
      { id: "A", text: "Risco de morte por queda", isCorrect: false },
      { id: "B", text: "Produtos tóxicos / veneno", isCorrect: true },
      { id: "C", text: "Radiação ionizante", isCorrect: false },
      { id: "D", text: "Substâncias corrosivas", isCorrect: false }
    ]
  },
  {
    id: 16,
    question: "A placa E2 (quadrada vermelha com círculo branco) identifica o:",
    image: "https://images.unsplash.com/photo-1506302393653-2c1b0ad06431?auto=format&fit=crop&q=80&w=400",
    options: [
      { id: "A", text: "Avisador sonoro", isCorrect: false },
      { id: "B", text: "Detector de fumaça", isCorrect: false },
      { id: "C", text: "Acionador manual de alarme de incêndio", isCorrect: true },
      { id: "D", text: "Painel de controle", isCorrect: false }
    ]
  },
  {
    id: 17,
    question: "O símbolo P3 (círculo vermelho com balde cruzado sobre chama) significa:",
    image: "https://images.unsplash.com/photo-1542382257-80dedb725088?auto=format&fit=crop&q=80&w=400",
    options: [
      { id: "A", text: "Proibido utilizar água para apagar o fogo", isCorrect: true },
      { id: "B", text: "Local sem abastecimento de água", isCorrect: false },
      { id: "C", text: "Perigo: Reação com água", isCorrect: false },
      { id: "D", text: "Uso obrigatório de extintor de água", isCorrect: false }
    ]
  },
  {
    id: 18,
    question: "A sinalização S27 (boneco na cadeira de rodas em fundo azul) indica:",
    image: "https://images.unsplash.com/photo-1536709082155-276ceb6a67f0?auto=format&fit=crop&q=80&w=400",
    options: [
      { id: "A", text: "Vaga de estacionamento", isCorrect: false },
      { id: "B", text: "Elevador PCD", isCorrect: false },
      { id: "C", text: "Indicação de área de resgate", isCorrect: true },
      { id: "D", text: "Rampeamento obrigatório", isCorrect: false }
    ]
  },
  {
    id: 19,
    question: "O código E1 identifica o símbolo de quadrada vermelha com corneta branca, que é o:",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=400",
    options: [
      { id: "A", text: "Avisador sonoro do alarme de incêndio", isCorrect: true },
      { id: "B", text: "Alto-falante de avisos", isCorrect: false },
      { id: "C", text: "Sirene de evacuação civil", isCorrect: false },
      { id: "D", text: "Telefone de emergência", isCorrect: false }
    ]
  },
  {
    id: 20,
    question: "O que indica a placa N1 com pictogramas verdes e vermelhos?",
    image: "https://images.unsplash.com/photo-1502127271810-708092496a79?auto=format&fit=crop&q=80&w=400",
    options: [
      { id: "A", text: "Instruções de abandono de área", isCorrect: false },
      { id: "B", text: "Indicação do tipo de agente extintor e classes de fogo", isCorrect: true },
      { id: "C", text: "Mapa de riscos do pavimento", isCorrect: false },
      { id: "D", text: "Locais de armazenamento de EPIs", isCorrect: false }
    ]
  }
];

const SegurancaShowGame = () => {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'result'>('start');
  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<{ id: string; correct: boolean } | null>(null);
  const explosionAudio = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (gameState === 'result') {
      const percentage = (score / triviaQuestions.length) * 100;
      if (percentage < 70) {
        if (!explosionAudio.current) {
          explosionAudio.current = new Audio('https://assets.mixkit.co/active_storage/sfx/1018/1018-preview.mp3');
          explosionAudio.current.volume = 0.5;
        }
        explosionAudio.current.play().catch(e => console.log("Explosion audio blocked", e));
      }
    }
  }, [gameState, score]);

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (gameState === 'playing' && timeLeft <= 0) {
      setGameState('result');
    }
  }, [gameState, timeLeft]);

  const startGame = () => {
    const shuffled = [...triviaQuestions].sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
    setCurrentIndex(0);
    setTimeLeft(20);
    setScore(0);
    setGameState('playing');
    setFeedback(null);
  };

  const handleAnswer = (optionId: string, isCorrect: boolean) => {
    if (feedback) return;

    // Play sounds
    const correctAudio = new Audio('https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3');
    const wrongAudio = new Audio('https://assets.mixkit.co/active_storage/sfx/2959/2959-preview.mp3');
    
    if (isCorrect) {
      correctAudio.play().catch(e => console.log('Audio play failed:', e));
    } else {
      wrongAudio.play().catch(e => console.log('Audio play failed:', e));
    }

    setFeedback({ id: optionId, correct: isCorrect });
    
    if (isCorrect) {
      setScore(prev => prev + 1);
      setTimeLeft(prev => prev + 10);
    } else {
      setTimeLeft(prev => Math.max(0, prev - 5));
    }

    setTimeout(() => {
      setFeedback(null);
      if (currentIndex < questions.length - 1 && timeLeft > 0) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setGameState('result');
      }
    }, 1500);
  };

  const currentQuestion = questions[currentIndex];

  return (
    <div className="w-full max-w-4xl mx-auto bg-gradient-to-br from-[#000046] to-[#1CB5E0] rounded-[3rem] p-8 md:p-12 shadow-2xl border-4 border-yellow-500 relative overflow-hidden min-h-[600px] flex flex-col justify-center items-center text-white">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {gameState === 'start' && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center relative z-10 flex flex-col items-center">
          <div className="w-24 h-24 bg-yellow-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_50px_rgba(234,179,8,0.5)] border-4 border-white animate-pulse">
            <Trophy size={48} className="text-blue-900" />
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-black mb-4 tracking-tighter uppercase italic">Scape <span className="text-yellow-400">Quiz</span></h2>
          <p className="text-lg md:text-xl text-white/80 max-w-lg mb-8 font-medium">Só quem tem conhecimento chega até a saida, será que você consegue chegar ao final?</p>
          <div className="grid grid-cols-2 gap-4 mb-10 w-full max-w-sm">
             <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20">
                <span className="block text-[10px] font-black text-yellow-400 uppercase mb-1">Acerto</span>
                <span className="text-sm font-bold">+10s</span>
             </div>
             <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20">
                <span className="block text-[10px] font-black text-red-400 uppercase mb-1">Erro</span>
                <span className="text-sm font-bold">-5s</span>
             </div>
          </div>
          <button 
            onClick={startGame} 
            className="flex items-center justify-center gap-3 px-10 py-5 bg-yellow-400 hover:bg-yellow-500 text-black font-display font-black text-2xl italic uppercase tracking-tighter rounded-2xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:scale-105 active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
          >
            <PlayIcon size={28} fill="currentColor" />
            VAMOS JOGAR!
          </button>
        </motion.div>
      )}

      {gameState === 'playing' && currentQuestion && (
        <div className="w-full flex-1 flex flex-col relative z-10">
          <div className="flex justify-between items-center mb-8">
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-yellow-400 uppercase tracking-widest mb-1">Pergunta {currentIndex + 1} de {questions.length}</span>
              <div className="h-1.5 w-48 bg-white/10 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }} className="h-full bg-yellow-500" />
              </div>
            </div>
            <div className={`px-6 py-3 rounded-2xl border-2 backdrop-blur-xl flex items-center gap-3 shadow-xl transition-colors ${timeLeft < 10 ? 'bg-red-500/30 border-red-500 text-red-500 animate-pulse' : 'bg-white/10 border-white/20'}`}>
              <Clock size={24} className={timeLeft < 10 ? 'animate-spin-slow' : ''} />
              <span className="text-2xl md:text-4xl font-mono font-black italic">00:{timeLeft.toString().padStart(2, '0')}</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center flex-1">
            <motion.div key={currentIndex} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="aspect-square bg-white rounded-[2rem] overflow-hidden shadow-2xl relative border-4 border-white/20">
               <img src={currentQuestion.image} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </motion.div>

            <div className="space-y-4">
              <h3 className="text-xl md:text-2xl font-display font-black leading-tight mb-6">{currentQuestion.question}</h3>
              <div className="grid grid-cols-1 gap-3">
                {currentQuestion.options.map((opt) => {
                  const isSelected = feedback?.id === opt.id;
                  const isCorrect = opt.isCorrect;
                  const showResult = feedback !== null;
                  
                  let bgColor = "bg-white/10 hover:bg-white/20 border-white/20";
                  if (showResult) {
                    if (isCorrect) bgColor = "bg-green-500 border-green-300 shadow-[0_0_20px_rgba(34,197,94,0.4)]";
                    else if (isSelected) bgColor = "bg-red-500 border-red-300 shadow-[0_0_20px_rgba(239,68,68,0.4)]";
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleAnswer(opt.id, isCorrect)}
                      disabled={showResult}
                      className={`w-full p-4 md:p-5 rounded-2xl border-2 text-left flex items-center gap-4 transition-all duration-300 group ${bgColor} ${!showResult && 'hover:-translate-y-1'}`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black italic ${showResult && isCorrect ? 'bg-white text-green-600' : 'bg-yellow-500 text-blue-900'}`}>
                        {opt.id}
                      </div>
                      <span className="text-sm md:text-base font-bold flex-1">{opt.text}</span>
                      {showResult && isCorrect && <CheckCircle2 size={24} className="text-white" />}
                      {showResult && isSelected && !isCorrect && <X size={24} className="text-white" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {gameState === 'result' && (() => {
        const percentage = Math.round((score / triviaQuestions.length) * 100);
        return (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center relative z-10 flex flex-col items-center">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-2xl border-4 border-white ${percentage >= 70 ? 'bg-green-500' : 'bg-red-500'}`}>
              {percentage >= 70 ? (percentage === 100 ? <Award size={56} className="text-white" /> : <CheckCircle2 size={56} className="text-white" />) : <XCircle size={56} className="text-white" />}
            </div>
            
            <h2 className="text-4xl md:text-6xl font-display font-black mb-2 uppercase tracking-tighter italic">
              {percentage === 100 ? 'EXCELÊNCIA TOTAL!' : (percentage >= 70 ? 'PARABÉNS!' : 'FIM DE JOGO')}
            </h2>
            
            {percentage >= 70 && (
              <p className="text-xl md:text-2xl font-bold text-yellow-300 mb-4 uppercase italic tracking-tighter">
                {percentage === 100 ? 'Incrível! Você é um mestre da segurança!' : 'Muito bem! Você conhece os protocolos!'}
              </p>
            )}

            <p className="text-lg md:text-xl font-bold mb-8 text-white/90">
              Você acertou <span className="text-yellow-400 text-3xl md:text-4xl px-2">{score}</span> de {triviaQuestions.length} perguntas!
            </p>
            
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-[2rem] border border-white/20 mb-10 w-full max-w-sm">
               <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-black uppercase text-white/50 tracking-widest">Desempenho</span>
                  <span className="text-lg font-bold">{percentage}%</span>
               </div>
               <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${percentage}%` }} className={`h-full ${percentage >= 70 ? 'bg-green-500' : 'bg-red-500'}`} />
               </div>
            </div>

            <div className="flex flex-wrap gap-6 w-full justify-center px-4">
              <button 
                onClick={startGame} 
                className="flex items-center justify-center gap-2 px-8 py-4 bg-yellow-400 hover:bg-yellow-500 text-black font-black text-sm italic uppercase tracking-tight rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:scale-105 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
              >
                <RotateCcw size={20} strokeWidth={3} />
                TENTAR DE NOVO
              </button>
              <button 
                onClick={() => setGameState('start')} 
                className="flex items-center justify-center gap-2 px-8 py-4 bg-yellow-400 hover:bg-yellow-500 text-black font-black text-sm italic uppercase tracking-tight rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:scale-105 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
              >
                <Home size={20} strokeWidth={3} />
                MENU
              </button>
            </div>
          </motion.div>
        );
      })()}
    </div>
  );
};

const SeriousGames = () => {
  return (
    <section id="games" className="py-12 px-6 md:px-12 bg-brand-surface relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-accent/20 to-transparent" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
           <h2 className="font-display text-4xl md:text-5xl font-black text-brand-text mb-4 tracking-tighter uppercase italic">SOS <span className="text-brand-accent">Scape Point</span></h2>
           <p className="text-brand-text-muted max-w-xl mx-auto">Enfrente cenários reais de emergência e aprenda as rotas de fuga corretas através de desafios interativos.</p>
        </div>

        <div>
          <FireSafetyMasterGame />
        </div>
      </div>
    </section>
  );
};

const SegurancaShow = () => {
  return (
    <section id="show" className="py-20 px-6 md:px-12 bg-brand-bg relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent" />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
           <h2 className="font-display text-4xl md:text-5xl font-black text-brand-text mb-4 tracking-tighter uppercase italic">SOS Scape <span className="text-yellow-500">Point Show</span></h2>
           <p className="text-brand-text-muted max-w-xl mx-auto">Coloque seu conhecimento à prova em um formato de auditório eletrizante. Responda rápido ou perca tempo!</p>
        </div>
        <SegurancaShowGame />
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="contact" className="bg-brand-bg border-t border-brand-border pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-1">
            <Logo className="mb-6" />
            <p className="text-brand-text-muted mb-6">
              Capacitando pessoas para salvar vidas através da tecnologia e inovação em segurança contra incêndio.
            </p>
            <div className="flex gap-4 mb-8">
              <a href="#" className="p-3 bg-brand-surface border border-brand-border rounded-xl text-brand-text hover:text-brand-accent transition-colors"><Instagram size={20} /></a>
              <a href="#" className="p-3 bg-brand-surface border border-brand-border rounded-xl text-brand-text hover:text-brand-accent transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="p-3 bg-brand-surface border border-brand-border rounded-xl text-brand-text hover:text-brand-accent transition-colors"><Twitter size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-brand-text font-bold mb-6">Suporte</h4>
            <ul className="space-y-4 text-brand-text-muted">
              <li><a href="#" className="hover:text-brand-accent transition-colors">Privacidade</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">Termos de Uso</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-brand-text font-bold mb-6">Contato</h4>
            <ul className="space-y-4 text-brand-text-muted">
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-brand-accent" />
                <span>contato@sosscapepoint.com.br</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-brand-accent" />
                <span>(51) 99999-9999</span>
              </li>
              <li className="flex items-start gap-3">
                <Map size={18} className="text-brand-accent" />
                <span>Porto Alegre, RS - Brasil</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-brand-border flex flex-col md:flex-row justify-between items-center gap-4 text-brand-text-muted text-[10px] font-mono uppercase tracking-widest">
          <p>© {new Date().getFullYear()} SOS SCAPE POINT // BUILD_2026.4.20</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-brand-accent transition-colors">Privacy_Policy</a>
            <a href="#" className="hover:text-brand-accent transition-colors">Terms_Usage</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('light');
  };

  return (
    <div className={`min-h-screen selection:bg-brand-accent selection:text-brand-bg`}>
      <Navbar isDark={isDark} toggleTheme={toggleTheme} />
      
      <main>
        <Hero />
        
        <SafetyTips />
        
        <SeriousGames />
      </main>

      <Footer />
    </div>
  );
}
