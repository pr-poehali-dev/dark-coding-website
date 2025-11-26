import { useEffect, useState } from 'react';

const Index = () => {
  const [matrixColumns, setMatrixColumns] = useState<JSX.Element[]>([]);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const columns = [];
    const columnCount = Math.floor(window.innerWidth / 30);
    
    for (let i = 0; i < columnCount; i++) {
      const delay = Math.random() * 5;
      const duration = 8 + Math.random() * 10;
      
      columns.push(
        <div
          key={i}
          className="absolute top-0 text-primary/40 font-mono text-sm animate-matrix-fall"
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
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none">
        {matrixColumns}
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

      <div className="relative z-20 min-h-screen flex flex-col items-center justify-center px-6 md:px-12">
        <div className={`text-center space-y-8 transition-all duration-1000 ${showMessage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-4xl md:text-7xl font-bold text-primary animate-glitch" style={{ fontFamily: 'Cinzel, serif' }}>
            ТАЙНА
          </h1>
          
          <div className="space-y-4 text-foreground/80">
            <p className="text-lg md:text-2xl font-mono tracking-widest">
              01010100 01000001 01001010 01001110 01000001
            </p>
            
            <p className="text-base md:text-xl opacity-70" style={{ fontFamily: 'Cinzel, serif' }}>
              Не всё, что скрыто, должно быть найдено
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12 max-w-2xl mx-auto">
            {[
              { symbol: '⧉', text: 'Портал', code: '0x4A7B' },
              { symbol: '⌬', text: 'Врата', code: '0x232C' },
              { symbol: '⍟', text: 'Знак', code: '0x235F' },
              { symbol: '⎔', text: 'Печать', code: '0x2394' },
              { symbol: '⧈', text: 'Ключ', code: '0x29C8' },
              { symbol: '◬', text: 'Код', code: '0x25EC' },
            ].map((item, idx) => (
              <div
                key={idx}
                className="group bg-card/30 backdrop-blur-sm border border-primary/20 p-6 rounded-lg hover:border-primary/60 hover:bg-card/50 transition-all duration-300 cursor-pointer"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="text-4xl text-primary mb-2 group-hover:animate-glitch">
                  {item.symbol}
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

          <div className="mt-12 space-y-2">
            <p className="text-xs md:text-sm text-muted-foreground font-mono opacity-50">
              [СИСТЕМА АКТИВИРОВАНА]
            </p>
            <p className="text-xs md:text-sm text-muted-foreground font-mono opacity-50">
              [ОЖИДАНИЕ КОМАНДЫ...]
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 text-primary/30 font-mono text-xs animate-pulse">
        v0.0.1-alpha
      </div>
    </div>
  );
};

export default Index;
