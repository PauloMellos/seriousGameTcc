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
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  Instagram,
  Linkedin,
  Twitter,
  Mail,
  Phone,
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
  hotspot?: { x: number; y: number; label?: string };
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
    { name: 'Tutoriais', href: '#tutorials' },
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
    <section id="home" className="relative h-96 w-full flex items-center justify-center overflow-hidden">
  <div className="absolute inset-0 z-0">
    <img src="/assets/background.png" alt="Escola em meio a cidade" className="w-full h-full object-cover"
      referrerPolicy="no-referrer"/>
    <div className="absolute inset-0 bg-gradient-to-b from-brand-bg/90 via-brand-bg/40 to-brand-bg z-10" />
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
  const [gameState, setGameState] = useState<'start' | 'selection' | 'playing' | 'feedback' | 'finished' | 'gameover'>('start');
  const [currentStoryId, setCurrentStoryId] = useState<string | null>(null);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(35);
  const [feedback, setFeedback] = useState<{ correct: boolean; message: string; explanation: string } | null>(null);
  const [storiesCompleted, setStoriesCompleted] = useState<string[]>([]);
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
      // High-quality piercing electronic fire alarm
      alarmAudio.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
      alarmAudio.current.loop = true;
      alarmAudio.current.volume = 0.5;
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

  // Audio effect for explosion on Game Over
  useEffect(() => {
    if (gameState === 'gameover' && !isMuted) {
      if (!explosionAudio.current) {
        explosionAudio.current = new Audio('https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3');
        explosionAudio.current.volume = 0.5;
      }
      explosionAudio.current.play().catch(e => console.log("Explosion audio blocked", e));
    }
  }, [gameState, isMuted]);

  // stories data
  const stories: Story[] = [
    {
      id: 'student',
      name: 'O Aluno',
      scenario: 'Escola',
      description: 'Um dia comum vira um teste de sobrevivência. Saia rápido!',
      icon: <GraduationCap size={40} />,
      bg: 'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&q=80&w=1200',
      timeLimit: 35,
      phases: [
        {
          type: 'scene',
          title: 'Alarme!',
          description: 'Sinal dispara. Corredor com fumaça.',
          goal: 'Sair da sala pela rota segura.',
          image: 'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&q=80&w=1200',
          btnText: 'Avançar'
        },
        {
          type: 'enigma',
          id: 'extinguisher',
          title: 'O Extintor',
          question: 'Extintor ideal para papel e madeira?',
          options: [
            { id: '1', name: 'Água (Resfriamento)', isCorrect: true, icon: <Droplets /> },
            { id: '2', name: 'Pó Químico', isCorrect: false, icon: <Zap /> },
            { id: '3', name: 'CO2', isCorrect: false, icon: <Wind /> }
          ],
          explanation: 'Papel e madeira (Classe A) pedem água.',
          image: 'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&q=80&w=1200',
          targetIcon: <FireExtinguisher className="text-red-600 animate-bounce" size={64} />,
          hotspot: { x: 50, y: 50, label: 'Extintor' }
        },
        {
          type: 'enigma',
          id: 'door',
          title: 'A Porta',
          question: 'Fumaça densa: como se deslocar?',
          options: [
            { id: '1', name: 'Correr rápido', isCorrect: false, icon: <PlayCircle /> },
            { id: '2', name: 'Agachado ou rastejando', isCorrect: true, icon: <Users /> },
            { id: '3', name: 'Subir em cadeira', isCorrect: false, icon: <Construction /> }
          ],
          explanation: 'O ar puro e frio fica próximo ao chão.',
          image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&q=80&w=1200',
          hotspot: { x: 70, y: 60, label: 'Corredor' }
        },
        {
          type: 'code',
          id: 'final',
          title: 'Código de Escape',
          question: 'Cores da sinalização?',
          hint: 'Verde (1) e Branco (2). Digite a sequência.',
          correctCode: '1-2-1-2',
          image: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&q=80&w=800',
          hotspot: { x: 80, y: 30, label: 'Placa' }
        }
      ]
    },
    {
      id: 'worker',
      name: 'O Operário',
      scenario: 'Indústria',
      description: 'Curto-circuito inicia um fogo elétrico. Saia!',
      icon: <Factory size={40} />,
      bg: 'https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&q=80&w=1200',
      timeLimit: 35,
      phases: [
        {
          type: 'scene',
          title: 'Painel em Chamas',
          description: 'Alarme piscando. Máquinas ligadas.',
          goal: 'Sair do pátio agora.',
          image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1200',
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
          explanation: 'Água conduz energia e causa eletrocussão.',
          image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=800',
          targetIcon: <FireExtinguisher className="text-red-600 animate-bounce" size={64} />,
          hotspot: { x: 40, y: 45, label: 'Painel' }
        },
        {
          type: 'enigma',
          id: 'door',
          title: 'Porta Corta-Fogo',
          question: 'Qual a função desta porta?',
          options: [
            { id: '1', name: 'Decoração', isCorrect: false, icon: <Briefcase /> },
            { id: '2', name: 'Antifurto', isCorrect: false, icon: <Lock /> },
            { id: '3', name: 'Conter chamas e fumaça', isCorrect: true, icon: <Shield /> }
          ],
          explanation: 'PCF isola setores e garante tempo de fuga.',
          image: 'https://images.unsplash.com/photo-1504194140026-63e8a4d2e7eb?auto=format&fit=crop&q=80&w=800',
          hotspot: { x: 60, y: 55, label: 'Porta' }
        },
        {
          type: 'ppe',
          id: 'final',
          title: 'Checklist EPI',
          question: 'Selecione 4 EPIs essenciais de risco.',
          correctSet: ['helmet', 'gloves', 'boots', 'glasses'],
          options: [
            { id: 'helmet', name: 'Capacete', icon: <Construction /> },
            { id: 'gloves', name: 'Luvas', icon: <Droplets /> },
            { id: 'boots', name: 'Botas', icon: <Lock /> },
            { id: 'glasses', name: 'Óculos', icon: <Shield /> },
            { id: 'mask', name: 'Mascara', icon: <Wind /> },
            { id: 'hat', name: 'Boné', icon: <Moon /> }
          ],
          image: 'https://images.unsplash.com/photo-1531940909569-45e3ba93dc65?auto=format&fit=crop&q=80&w=800',
          hotspot: { x: 50, y: 70, label: 'EPIs' }
        }
      ]
    },
    {
      id: 'resident',
      name: 'O Morador',
      scenario: 'Apartamento',
      description: 'Fogo na cozinha! Escape do 5º andar.',
      icon: <Home size={40} />,
      bg: 'https://images.unsplash.com/photo-1448630305452-945717327376?auto=format&fit=crop&q=80&w=1200',
      timeLimit: 35,
      phases: [
        {
          type: 'scene',
          title: 'Fogo na Cozinha!',
          description: 'Fumaça densa do fogão. Saia agora.',
          goal: 'Sair do prédio imediatamente.',
          image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1200',
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
          explanation: 'Gorduras vegetais/animais são Classe K.',
          image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1200',
          targetIcon: <FireExtinguisher className="text-red-600 animate-bounce" size={64} />,
          hotspot: { x: 45, y: 40, label: 'Fogão' }
        },
        {
          type: 'enigma',
          id: 'door',
          title: 'Elevador?',
          question: 'Por que não usar o elevador?',
          options: [
            { id: '1', name: 'Muito lento', isCorrect: false, icon: <Clock /> },
            { id: '2', name: 'Pane e fumaça', isCorrect: true, icon: <Wind /> },
            { id: '3', name: 'Reservado', isCorrect: false, icon: <Briefcase /> }
          ],
          explanation: 'Risco de ficar preso no andar do fogo.',
          image: 'https://images.unsplash.com/photo-1551033406-611cf9a28f67?auto=format&fit=crop&q=80&w=800',
          hotspot: { x: 75, y: 50, label: 'Elevador' }
        },
        {
          type: 'map',
          id: 'final',
          title: 'Mapa de Evacuação',
          question: 'Código da escadaria no mapa?',
          hint: 'Código de 4 dígitos na legenda (Dica: 5102)',
          correctCode: '5102',
          image: 'https://images.unsplash.com/photo-1524334228333-0f6db392f8a1?auto=format&fit=crop&q=80&w=1200',
          hotspot: { x: 30, y: 40, label: 'Mapa' }
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

    if (isCorrect) {
      setScore(prev => prev + 25);
      setShowEnigma(false);
      setFeedback({
        correct: true,
        message: 'Bom trabalho!',
        explanation: currentPhase.explanation || ''
      });
      setGameState('feedback');
    } else {
      setFeedback({
        correct: false,
        message: 'Atenção!',
        explanation: 'Revise a segurança e tente de novo.'
      });
      // Don't change game state to block progression but allow retry
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

    if (isCorrect) {
      setScore(prev => prev + 50);
      setShowEnigma(false);
      setFeedback({
        correct: true,
        message: 'Acesso Liberado!',
        explanation: 'Você identificou o código correto e conseguiu escapar com segurança!'
      });
      setGameState('feedback');
    } else {
      setFeedback({
        correct: false,
        message: 'Código Inválido!',
        explanation: 'Observe atentamente as cores ou legendas no cenário.'
      });
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
    
    if (isCorrect) {
      setScore(prev => prev + 50);
      setShowEnigma(false);
      setFeedback({
        correct: true,
        message: 'Equipagem Correta!',
        explanation: 'Você selecionou todos os EPIs necessários para realizar a evacuação industrial.'
      });
      setGameState('feedback');
    } else {
      setFeedback({
        correct: false,
        message: 'Equipamento Incorreto!',
        explanation: 'Alguns itens selecionados não pertencem à proteção individual industrial exigida.'
      });
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
             <span className="text-brand-accent font-mono font-bold text-[9px] md:text-[10px] uppercase tracking-[0.4em] mb-2 md:mb-3 block">Fase de Preparação // SELECT_MISSION</span>
             <h3 className="text-xl sm:text-3xl md:text-5xl font-display font-black text-brand-text mb-2 md:mb-3 uppercase leading-none tracking-tighter text-balance">Escolha seu Destino</h3>
             <p className="text-xs md:text-base text-brand-text-muted max-w-lg mx-auto px-4">Cenários críticos que exigem protocolos específicos de segurança.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {stories.map((story, i) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8, scale: 1.01 }}
                onClick={() => startStory(story.id)}
                className={`group relative cursor-pointer rounded-[2.5rem] overflow-hidden border-2 transition-all duration-500 flex flex-col h-full
                  ${storiesCompleted.includes(story.id) ? 'border-brand-accent bg-brand-accent/5' : 'border-brand-border/40 hover:border-brand-accent'}`}
              >
                <div className="absolute inset-0 z-0">
                  <img src={story.bg} className="w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-opacity duration-700" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/60 to-transparent" />
                </div>
                
                <div className="relative z-10 p-6 md:p-8 flex flex-col items-center text-center flex-1">
                  <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl md:rounded-[1.5rem] flex items-center justify-center mb-6 shadow-xl transition-all duration-500 transform group-hover:rotate-6 ${storiesCompleted.includes(story.id) ? 'bg-brand-accent text-white' : 'bg-brand-surface border border-brand-border text-brand-accent'}`}>
                    {React.cloneElement(story.icon as React.ReactElement, { size: 32 })}
                  </div>
                  
                  <span className="text-[9px] font-black text-brand-accent/80 uppercase tracking-widest mb-2 block">{story.scenario}</span>
                  <h4 className="text-xl md:text-2xl font-display font-black text-white mb-3 uppercase tracking-tight leading-tight">{story.name}</h4>
                  
                  <p className="text-[11px] md:text-xs text-brand-text-muted leading-relaxed mb-6 block lg:opacity-60 lg:group-hover:opacity-100 transition-opacity duration-500 line-clamp-2">
                    {story.description}
                  </p>
                  
                  <div className={`mt-auto px-5 py-2 rounded-xl font-black text-[9px] uppercase tracking-widest border transition-all ${storiesCompleted.includes(story.id) ? 'bg-brand-accent text-brand-bg border-brand-accent' : 'bg-white/5 border-white/10 text-white group-hover:bg-brand-accent group-hover:text-brand-bg group-hover:border-brand-accent'}`}>
                    {storiesCompleted.includes(story.id) ? 'Completo' : 'Começar'}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          {storiesCompleted.length > 0 && (
            <div className="mt-12 text-center">
              <button onClick={() => setGameState('start')} className="text-brand-text-muted hover:text-brand-accent font-bold uppercase tracking-widest transition-colors">Voltar ao Início</button>
            </div>
          )}
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
                          <h5 className="text-[8px] font-mono font-bold text-brand-accent uppercase tracking-[0.3em] mb-0.5">Missão // STATUS_ACTIVE</h5>
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
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     className="absolute bottom-1/3 left-1/2 -translate-x-1/2 z-10 px-6 py-3 bg-brand-bg/40 backdrop-blur-md border border-white/10 rounded-full flex items-center gap-3"
                   >
                     <Search size={16} className="text-brand-accent" />
                     <span className="text-xs font-black uppercase tracking-widest text-white/60">Encontre o objeto de interação no cenário</span>
                     <button onClick={nextPhase} className="ml-4 text-[10px] font-black text-brand-accent hover:underline uppercase tracking-widest">Pular para enigma</button>
                   </motion.div>
                )}

                {/* Hotspot Interactions */}
                {currentPhase.type !== 'scene' && !showEnigma && currentPhase.hotspot && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    style={{ left: `${currentPhase.hotspot.x}%`, top: `${currentPhase.hotspot.y}%` }}
                    className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
                  >
                    <button 
                      onClick={() => setShowEnigma(true)}
                      className="relative group/hotspot"
                    >
                      <div className="absolute inset-0 rounded-full bg-brand-accent animate-ping opacity-40" />
                      <div className="w-16 h-16 rounded-full bg-brand-accent border-4 border-white flex items-center justify-center text-white shadow-2xl transition-transform hover:scale-110 active:scale-95 relative z-10">
                        {currentPhase.targetIcon || <ChevronRight size={28} />}
                      </div>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 px-4 py-2 bg-brand-accent text-white text-[10px] font-black uppercase tracking-widest rounded-full opacity-0 group-hover/hotspot:opacity-100 transition-opacity whitespace-nowrap shadow-xl">
                        Interagir com {currentPhase.hotspot.label || 'Objeto'}
                      </div>
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

            {/* Wrong Answer Alert Overlay */}
            <AnimatePresence>
              {feedback && !feedback.correct && (
                 <motion.div 
                   initial={{ opacity: 0, y: 50 }} 
                   animate={{ opacity: 1, y: 0 }} 
                   exit={{ opacity: 0, y: 50 }}
                   className="absolute bottom-4 left-4 right-4 md:bottom-10 md:left-10 md:right-10 z-[50] p-6 md:p-8 bg-red-500/90 backdrop-blur-2xl border-2 border-white/20 rounded-3xl md:rounded-[3rem] shadow-3xl text-center overflow-y-auto max-h-[40vh]"
                 >
                    <div className="flex items-center justify-center gap-3 md:gap-4 mb-3 md:mb-4">
                       <AlertTriangle size={32} className="text-white animate-bounce" />
                       <h5 className="text-3xl font-display font-black text-white uppercase tracking-tighter">{feedback.message}</h5>
                    </div>
                    <p className="text-sm md:text-lg text-white/90 font-bold mb-4 md:mb-6 italic leading-snug">"{feedback.explanation}"</p>
                    <div className="flex justify-center gap-4">
                      <button onClick={() => setFeedback(null)} className="px-10 py-4 bg-white text-red-500 rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-transform">Tentar Novamente</button>
                    </div>
                 </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Story Stage Feedback (Green - Success) */}
      {gameState === 'feedback' && feedback?.correct && (
        <div className="p-6 md:p-12 flex-1 flex flex-col items-center justify-center text-center relative overflow-hidden z-10">
           <div className="absolute inset-0 bg-brand-bg/40 backdrop-blur-[2px]" />
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.1),transparent_70%)]" />
           <motion.div 
             initial={{ scale: 0.8, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             className="w-16 h-16 md:w-24 md:h-24 bg-green-500/20 text-green-500 rounded-2xl md:rounded-3xl flex items-center justify-center mb-6 shadow-2xl border border-green-500/30 relative z-10"
           >
              <CheckCircle2 size={32} className="md:size-[48px]" />
           </motion.div>
           
           <h3 className="text-xl sm:text-3xl md:text-5xl font-display font-black text-brand-text mb-3 tracking-tighter uppercase leading-none relative z-10">{feedback.message}</h3>
           
           <div className="w-full max-w-2xl bg-brand-surface/40 backdrop-blur-md p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-brand-border/50 mb-8 text-center shadow-xl relative z-10">
              <span className="text-[9px] font-mono font-bold text-green-500 uppercase tracking-[0.3em] mb-2 block">Dica de Segurança // PROTOCOLO_OK</span>
              <p className="text-sm md:text-xl text-brand-text/90 leading-tight font-bold italic">
                 "{feedback.explanation}"
              </p>
           </div>
           
           <button onClick={nextPhase} className="btn-primary px-8 md:px-12 py-3 md:py-5 text-sm md:text-lg tracking-widest flex items-center group rounded-xl md:rounded-2xl relative z-10">
              CONTINUAR <ChevronRight size={20} className="md:size-[24px] group-hover:translate-x-2 transition-transform" />
           </button>
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
           <p className="text-lg md:text-2xl text-brand-text-muted mb-12 font-medium relative z-10 text-balance">Você dominou os perigos em <span className="text-brand-accent italic font-black">{currentStory?.name}</span>.</p>
           
           <div className="grid grid-cols-2 gap-4 md:gap-8 mb-8 md:mb-12 w-full max-w-md">
             <div className="bg-brand-surface p-6 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] border border-brand-border shadow-xl">
                <span className="text-[9px] md:text-[10px] font-mono font-bold text-brand-accent uppercase tracking-widest block mb-1">SCORE_PT</span>
                <span className="text-3xl md:text-5xl font-mono font-black text-brand-text">100</span>
             </div>
             <div className="bg-brand-surface p-6 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] border border-brand-border shadow-xl">
                <span className="text-[9px] md:text-[10px] font-mono font-bold text-brand-accent uppercase tracking-widest block mb-1">UNIT_STATUS</span>
                <span className="text-base md:text-2xl font-display font-black text-green-500 uppercase tracking-tighter leading-none">SUCCESS</span>
             </div>
           </div>

           <div className="flex flex-col md:flex-row gap-4 w-full max-w-md">
             <button onClick={() => setGameState('selection')} className="btn-primary w-full justify-center px-6 py-4 font-black uppercase tracking-widest text-xs">Voltar ao Menu</button>
             <button onClick={() => startStory(currentStoryId!)} className="btn-secondary w-full justify-center px-6 py-4 font-black uppercase tracking-widest text-xs">Tentar de Novo</button>
           </div>
           
           {storiesCompleted.length === stories.length && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mt-16 p-8 bg-brand-accent/10 border-2 border-brand-accent/30 rounded-[3rem] max-w-2xl">
                 <h4 className="text-3xl font-display font-black text-brand-accent mb-4 uppercase">Mestre do Escape SOS!</h4>
                 <p className="text-brand-text leading-relaxed font-bold">Parabéns! Você completou as 3 histórias e demonstrou saber exatamente como agir em diferentes cenários de emergência.</p>
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

const SeriousGames = () => {
  return (
    <section id="games" className="py-12 px-6 md:px-12 bg-brand-surface relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-accent/20 to-transparent" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-8">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-text mb-2 tracking-tight italic uppercase">SOS Scape Point</h2>
        </div>

        <div>
          <FireSafetyMasterGame />
        </div>
      </div>
    </section>
  );
};

const Tutorials = () => {
  return (
    <section id="tutorials" className="section-padding bg-brand-bg">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl font-bold text-brand-text mb-6">Tutoriais: Guia de Uso</h2>
            <p className="text-lg text-brand-text-muted mb-8">
              Aprenda a tirar o máximo proveito da nossa plataforma. Do diagnóstico inicial ao feedback personalizado.
            </p>
            
            <div className="space-y-8 mb-10">
              {[
                { step: "01", title: "Diagnóstico Inicial", desc: "Avaliação rápida do seu nível de conhecimento atual." },
                { step: "02", title: "Navegação no Game", desc: "Controles intuitivos e objetivos claros em cada cenário." },
                { step: "03", title: "Feedback Imediato", desc: "Relatórios detalhados após cada partida para melhoria contínua." }
              ].map((item, i) => (
                <div key={i} className="flex gap-6">
                  <span className="text-3xl font-display font-bold text-brand-accent/30">{item.step}</span>
                  <div>
                    <h4 className="text-xl font-bold text-brand-text mb-2">{item.title}</h4>
                    <p className="text-brand-text-muted">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden aspect-video bg-brand-surface border border-brand-border flex items-center justify-center group cursor-pointer"
          >
            <img 
              src="https://images.unsplash.com/photo-1492533212284-7568756571b1?auto=format&fit=crop&q=80&w=1000" 
              alt="Video Tutorial" 
              className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="relative z-10 text-center">
              <PlayCircle size={80} className="text-brand-accent mb-4 mx-auto group-hover:scale-110 transition-transform" />
              <p className="text-brand-text font-bold text-xl">Como navegar no seu Serious Game</p>
              <p className="text-brand-text-muted text-sm">Assistir vídeo (4:20)</p>
            </div>
          </motion.div>
        </div>
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
            <h4 className="text-brand-text font-bold mb-6">Navegação</h4>
            <ul className="space-y-4 text-brand-text-muted">
              <li><a href="#home" className="hover:text-brand-accent transition-colors">Início</a></li>
              <li><a href="#games" className="hover:text-brand-accent transition-colors">Jogos Educativos</a></li>
              <li><a href="#tutorials" className="hover:text-brand-accent transition-colors">Tutoriais</a></li>
            </ul>
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

        <Tutorials />
      </main>

      <Footer />
    </div>
  );
}
