import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface Riddle {
  symbol: string;
  text: string;
  code: string;
  riddle: string;
  hint: string;
  answer: string;
}

const Index = () => {
  const [matrixColumns, setMatrixColumns] = useState<JSX.Element[]>([]);
  const [showMessage, setShowMessage] = useState(false);
  const [activeRiddle, setActiveRiddle] = useState<number | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [solvedRiddles, setSolvedRiddles] = useState<number[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [wrongAnswer, setWrongAnswer] = useState(false);
  const [floatingCreature, setFloatingCreature] = useState({ x: 50, y: 50 });

  const riddles: Riddle[] = [
    {
      symbol: '⧉',
      text: 'Portal',
      code: '0x4A7B',
      riddle: 'I am always hungry, I must always be fed. The finger I touch will soon turn red. What am I?',
      hint: 'It consumes everything, leaves only ash',
      answer: 'fire'
    },
    {
      symbol: '⌬',
      text: 'Gateway',
      code: '0x232C',
      riddle: 'I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?',
      hint: 'You use it to find your way',
      answer: 'map'
    },
    {
      symbol: '⍟',
      text: 'Sigil',
      code: '0x235F',
      riddle: 'The more you take, the more you leave behind. What are they?',
      hint: 'You make them when you walk',
      answer: 'footsteps'
    },
    {
      symbol: '⎔',
      text: 'Seal',
      code: '0x2394',
      riddle: 'I speak without a mouth and hear without ears. I have no body, but come alive with wind. What am I?',
      hint: 'Mountains know me well',
      answer: 'echo'
    },
    {
      symbol: '⧈',
      text: 'Key',
      code: '0x29C8',
      riddle: 'What can travel around the world while staying in a corner?',
      hint: 'You put it on letters',
      answer: 'stamp'
    },
    {
      symbol: '◬',
      text: 'Cipher',
      code: '0x25EC',
      riddle: 'I am not alive, but I grow. I do not have lungs, but I need air. What am I?',
      hint: 'Water is my enemy',
      answer: 'fire'
    }
  ];

  useEffect(() => {
    const columns = [];
    const columnCount = Math.floor(window.innerWidth / 30);
    
    for (let i = 0; i < columnCount; i++) {
      const delay = Math.random() * 5;
      const duration = 8 + Math.random() * 10;
      
      columns.push(
        <div
          key={i}
          className="absolute top-0 text-primary/40 font-mono text-sm animate-matrix-fall whitespace-pre"
          style={{
            left: `${(i * 100) / columnCount}%`,
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`,
          }}
        >
          {Array.from({ length: 20 }, () => 
            Math.random() > 0.5 ? Math.floor(Math.random() * 10) : String.fromCharCode(65 + Math.floor(Math.random() * 26))
          ).join('\n')}
        </div>
      );
    }
    
    setMatrixColumns(columns);
    
    setTimeout(() => setShowMessage(true), 1000);

    const moveCreature = () => {
      setFloatingCreature({
        x: 20 + Math.random() * 60,
        y: 20 + Math.random() * 60
      });
    };

    const interval = setInterval(moveCreature, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleRiddleClick = (idx: number) => {
    if (solvedRiddles.includes(idx)) return;
    setActiveRiddle(idx);
    setUserAnswer('');
    setShowHint(false);
    setWrongAnswer(false);
  };

  const handleSubmitAnswer = () => {
    if (activeRiddle === null) return;
    
    const correctAnswer = riddles[activeRiddle].answer.toLowerCase();
    const userAnswerLower = userAnswer.toLowerCase().trim();
    
    if (userAnswerLower === correctAnswer) {
      setSolvedRiddles([...solvedRiddles, activeRiddle]);
      setActiveRiddle(null);
      setUserAnswer('');
      setShowHint(false);
      setWrongAnswer(false);
    } else {
      setWrongAnswer(true);
      setTimeout(() => setWrongAnswer(false), 500);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmitAnswer();
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {matrixColumns}
      </div>

      <div 
        className="absolute z-30 transition-all duration-[4000ms] ease-in-out pointer-events-none"
        style={{
          left: `${floatingCreature.x}%`,
          top: `${floatingCreature.y}%`,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div className="relative animate-pulse-eyes">
          <svg
            viewBox="0 0 100 120"
            className="w-16 h-20 md:w-24 md:h-32"
            style={{ filter: 'drop-shadow(0 0 30px rgba(0, 212, 255, 0.6))' }}
          >
            <ellipse cx="50" cy="40" rx="25" ry="35" fill="rgba(0, 0, 0, 0.8)" opacity="0.9" />
            
            <ellipse cx="50" cy="40" rx="20" ry="30" fill="none" stroke="rgba(0, 212, 255, 0.4)" strokeWidth="1" />
            
            <ellipse cx="42" cy="30" rx="6" ry="10" fill="white" opacity="0.9" className="animate-pulse-eyes" />
            <ellipse cx="58" cy="30" rx="6" ry="10" fill="white" opacity="0.9" className="animate-pulse-eyes" style={{ animationDelay: '0.2s' }} />
            
            <ellipse cx="42" cy="32" rx="2" ry="4" fill="cyan" />
            <ellipse cx="58" cy="32" rx="2" ry="4" fill="cyan" />
            
            <path d="M 35 55 Q 50 65 65 55" stroke="rgba(0, 212, 255, 0.3)" strokeWidth="2" fill="none" strokeLinecap="round" />
            
            <path d="M 30 50 Q 25 60 30 70 Q 35 75 30 85" fill="rgba(0, 0, 0, 0.6)" opacity="0.7" />
            <path d="M 70 50 Q 75 60 70 70 Q 65 75 70 85" fill="rgba(0, 0, 0, 0.6)" opacity="0.7" />
            
            <ellipse cx="50" cy="100" rx="15" ry="8" fill="rgba(0, 0, 0, 0.4)" opacity="0.5" />
          </svg>
          
          <div className="absolute -top-2 -right-2 w-2 h-2 bg-primary rounded-full animate-pulse" />
          <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>
      </div>

      <div className="absolute left-0 top-0 bottom-0 w-32 md:w-48 z-10">
        <div className="relative h-full">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent">
            <svg
              viewBox="0 0 200 800"
              className="h-full w-full"
              style={{ filter: 'drop-shadow(0 0 20px rgba(0, 212, 255, 0.3))' }}
            >
              <path
                d="M 50 0 L 50 200 Q 45 250 50 300 L 50 500 Q 55 550 50 600 L 50 800"
                stroke="none"
                fill="black"
                opacity="0.95"
              />
              
              <path
                d="M 30 150 Q 20 180 30 210"
                stroke="none"
                fill="black"
                opacity="0.9"
              />
              
              <path
                d="M 40 450 Q 30 480 40 510"
                stroke="none"
                fill="black"
                opacity="0.9"
              />
              
              <ellipse cx="45" cy="100" rx="8" ry="12" fill="white" opacity="0.95" className="animate-pulse-eyes" />
              <ellipse cx="45" cy="140" rx="8" ry="12" fill="white" opacity="0.95" className="animate-pulse-eyes" style={{ animationDelay: '0.3s' }} />
              
              <ellipse cx="43" cy="100" rx="3" ry="5" fill="black" />
              <ellipse cx="43" cy="140" rx="3" ry="5" fill="black" />
            </svg>
          </div>
        </div>
      </div>

      <div className="relative z-20 min-h-screen flex flex-col items-center justify-center px-6 md:px-12 py-12">
        <div className={`text-center space-y-8 transition-all duration-1000 ${showMessage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-4xl md:text-7xl font-bold text-primary animate-glitch" style={{ fontFamily: 'Cinzel, serif' }}>
            THE MYSTERY
          </h1>
          
          <div className="space-y-4 text-foreground/80">
            <p className="text-lg md:text-2xl font-mono tracking-widest">
              01001101 01011001 01010011 01010100 01000101 01010010 01011001
            </p>
            
            <p className="text-base md:text-xl opacity-70" style={{ fontFamily: 'Cinzel, serif' }}>
              Not all that is hidden should be found
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12 max-w-2xl mx-auto">
            {riddles.map((item, idx) => (
              <div
                key={idx}
                onClick={() => handleRiddleClick(idx)}
                className={`group bg-card/30 backdrop-blur-sm border p-6 rounded-lg transition-all duration-300 cursor-pointer ${
                  solvedRiddles.includes(idx)
                    ? 'border-primary bg-primary/20'
                    : 'border-primary/20 hover:border-primary/60 hover:bg-card/50'
                }`}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className={`text-4xl mb-2 ${solvedRiddles.includes(idx) ? 'text-primary' : 'text-primary group-hover:animate-glitch'}`}>
                  {solvedRiddles.includes(idx) ? '✓' : item.symbol}
                </div>
                <p className="text-sm text-foreground/60 mb-1" style={{ fontFamily: 'Cinzel, serif' }}>
                  {item.text}
                </p>
                <p className="text-xs text-primary/50 font-mono">
                  {item.code}
                </p>
              </div>
            ))}
          </div>

          {solvedRiddles.length === 6 && (
            <div className="mt-8 p-6 bg-primary/20 border border-primary rounded-lg animate-fade-in">
              <p className="text-xl text-primary font-bold mb-2" style={{ fontFamily: 'Cinzel, serif' }}>
                THE SEALS ARE BROKEN
              </p>
              <p className="text-sm text-foreground/70 font-mono">
                You have proven yourself worthy. The ancient knowledge is now yours.
              </p>
            </div>
          )}

          <div className="mt-12 space-y-2">
            <p className="text-xs md:text-sm text-muted-foreground font-mono opacity-50">
              [SYSTEM ACTIVATED]
            </p>
            <p className="text-xs md:text-sm text-muted-foreground font-mono opacity-50">
              [{solvedRiddles.length}/6 SEALS BROKEN]
            </p>
          </div>
        </div>
      </div>

      {activeRiddle !== null && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-primary/40 rounded-lg p-6 md:p-8 max-w-lg w-full animate-fade-in">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <span className="text-4xl text-primary">{riddles[activeRiddle].symbol}</span>
                <div>
                  <p className="text-lg font-bold text-foreground" style={{ fontFamily: 'Cinzel, serif' }}>
                    {riddles[activeRiddle].text}
                  </p>
                  <p className="text-xs text-muted-foreground font-mono">
                    {riddles[activeRiddle].code}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setActiveRiddle(null);
                  setUserAnswer('');
                  setShowHint(false);
                }}
                className="text-foreground/60 hover:text-foreground"
              >
                <Icon name="X" size={20} />
              </Button>
            </div>

            <div className={`mb-6 p-4 bg-secondary/30 rounded-lg border border-primary/20 ${wrongAnswer ? 'animate-glitch' : ''}`}>
              <p className="text-foreground/90 text-base leading-relaxed">
                {riddles[activeRiddle].riddle}
              </p>
            </div>

            <div className="space-y-4">
              <Input
                type="text"
                placeholder="Enter your answer..."
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyPress={handleKeyPress}
                className={`bg-background/50 border-primary/30 text-foreground placeholder:text-muted-foreground ${
                  wrongAnswer ? 'border-red-500' : ''
                }`}
                autoFocus
              />

              <div className="flex gap-2">
                <Button
                  onClick={handleSubmitAnswer}
                  className="flex-1 bg-primary hover:bg-primary/80 text-primary-foreground"
                >
                  Submit Answer
                </Button>
                <Button
                  onClick={() => setShowHint(!showHint)}
                  variant="outline"
                  className="border-primary/30 text-foreground hover:bg-primary/10"
                >
                  <Icon name="Lightbulb" size={18} />
                </Button>
              </div>

              {showHint && (
                <div className="p-3 bg-primary/10 border border-primary/30 rounded text-sm text-foreground/80 animate-fade-in">
                  <span className="text-primary font-mono">HINT:</span> {riddles[activeRiddle].hint}
                </div>
              )}

              {wrongAnswer && (
                <p className="text-red-400 text-sm font-mono text-center">
                  [ACCESS DENIED]
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="absolute bottom-4 right-4 text-primary/30 font-mono text-xs animate-pulse">
        v0.0.1-alpha
      </div>
    </div>
  );
};

export default Index;