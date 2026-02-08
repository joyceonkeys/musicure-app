import React, { useState, useEffect } from 'react';

// --- 1. 自動注入樣式與字體 (Auto-inject Styles) ---
// 這段會自動幫您把漂亮的字體和 Tailwind CSS 載入，解決 "畫面好醜" (素顏) 的問題
const StyleInjector = () => {
  useEffect(() => {
    // 1. 載入 Tailwind CSS
    if (!document.getElementById('tailwind-script')) {
      const script = document.createElement('script');
      script.id = 'tailwind-script';
      script.src = "https://cdn.tailwindcss.com";
      script.onload = () => {
        // 設定自定義顏色
        window.tailwind.config = {
          theme: {
            extend: {
              colors: {
                paper: '#FdfcF8',      // 米宣紙白
                card: '#F2F0E9',       // 卡片底色
                primary: '#8F9E8B',    // 鼠尾草綠
                primaryDark: '#7A8B76',
                textMain: '#4A4A4A',   // 暖炭灰
                textSub: '#8C8C8C',    // 淺灰
                accent: '#D8C3C3',     // 乾燥玫瑰粉
              },
              fontFamily: {
                serif: ['"Noto Serif TC"', 'serif'], // 宋體
                sans: ['"Noto Sans TC"', 'sans-serif'], // 黑體
              },
              animation: {
                'bounce-gentle': 'bounce-gentle 2s infinite',
                'float': 'float 3s ease-in-out infinite',
              },
              keyframes: {
                'bounce-gentle': {
                  '0%, 100%': { transform: 'translateY(0)' },
                  '50%': { transform: 'translateY(-5%)' },
                },
                'float': {
                  '0%, 100%': { transform: 'translateY(0)' },
                  '50%': { transform: 'translateY(-5px)' },
                }
              }
            }
          }
        };
      };
      document.head.appendChild(script);
    }

    // 2. 載入 Google Fonts (思源宋體/黑體)
    if (!document.getElementById('google-fonts')) {
      const link = document.createElement('link');
      link.id = 'google-fonts';
      link.rel = 'stylesheet';
      link.href = "https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500&family=Noto+Serif+TC:wght@400;700&display=swap";
      document.head.appendChild(link);
    }
  }, []);
  return null;
};

// --- 2. 簡易圖示元件 ---
const Icon = ({ name, size = 24, fill = "none", className = "" }) => {
  const icons = {
    play: <polygon points="5 3 19 12 5 21 5 3" />,
    pause: <g><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></g>,
    skipBack: <g><polygon points="19 20 9 12 19 4 19 20" /><line x1="5" y1="19" x2="5" y2="5" /></g>,
    skipForward: <g><polygon points="5 4 15 12 5 20 5 4" /><line x1="19" y1="5" x2="19" y2="19" /></g>,
    home: <g><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></g>,
    search: <g><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></g>,
    heart: <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />,
    user: <g><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></g>,
    wind: <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />,
    zap: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />,
    coffee: <path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3" />,
    moon: <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  };

  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill={fill} 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className={className}
    >
      {icons[name] || <circle cx="12" cy="12" r="10"/>}
    </svg>
  );
};

// --- 3. 資料庫 ---
const DATABASE = [
  {
    id: '001',
    category: '職場壓力',
    symptom: '練琴暴躁想搥琴',
    title: 'Rondo a Capriccio',
    composer: 'Beethoven, Op. 129',
    story: '你知道嗎？樂聖貝多芬的脾氣出了名的壞。這首《丟失一分錢的憤怒》據說是他弄丟了一枚硬幣，翻箱倒櫃找不到，氣急敗壞之下寫出來的。聽聽那急促的旋律，是不是很像你現在想翻桌的心情？',
    dosage: '💡 處方：跟著音樂用力深呼吸三次，笑一笑再開始。',
    tagIcon: 'zap',
    color: 'bg-red-50 text-red-700'
  },
  {
    id: '002',
    category: '嚴重焦慮',
    symptom: '上台前緊張手抖',
    title: 'Sonata for Two Pianos',
    composer: 'Mozart, K. 448',
    story: '莫札特寫這首曲子是為了跟他的女學生一起快樂地彈琴。他心裡想的不是「我要表現完美」，而是「我們來玩遊戲吧！」。這首曲子被證實能讓大腦α波增加，讓你變聰明又放鬆喔！',
    dosage: '💡 處方：告訴自己：「這只是一場遊戲，不是刑場。」',
    tagIcon: 'wind',
    color: 'bg-blue-50 text-blue-700'
  },
  {
    id: '003',
    category: '自我懷疑',
    symptom: '覺得自己沒有天份',
    title: 'Intermezzo in A Major',
    composer: 'Brahms, Op. 118 No. 2',
    story: '布拉姆斯因為太害怕被拿來跟貝多芬比較，整整花了21年才敢發表第一號交響曲！這首晚年的間奏曲，是他終於放下外界眼光，選擇與自己和解的溫柔獨白。你不需要完美，只需要真實。',
    dosage: '💡 處方：閉上眼聽完一次，擁抱那個很努力的自己。',
    tagIcon: 'moon',
    color: 'bg-indigo-50 text-indigo-700'
  },
  {
    id: '010',
    category: '過度疲勞',
    symptom: '累到只想攤平',
    title: 'Farewell Symphony Finale',
    composer: 'Haydn',
    story: '海頓的老闆不讓樂團放假。海頓寫了《告別交響曲》，在演出最後，讓樂手一個接一個吹熄蠟燭離場，只剩兩個人。老闆看懂了暗示，隔天立刻放假。適時的「告別」，是為了走更長遠的路。',
    dosage: '💡 處方：現在就放下手機/琴蓋，去睡個覺吧。',
    tagIcon: 'coffee',
    color: 'bg-amber-50 text-amber-700'
  }
];

// --- 4. 元件：Mori 吉祥物 ---
const MoriMascot = ({ isPlaying, progress }) => {
  return (
    <div 
      className="absolute top-1/2 transform -translate-x-1/2 transition-all duration-300 ease-out z-10 pointer-events-none"
      style={{ 
        left: `${progress}%`,
        marginTop: isPlaying ? '-26px' : '-20px'
      }}
    >
      <svg width="40" height="40" viewBox="0 0 100 100" className="overflow-visible filter drop-shadow-sm">
        {isPlaying ? (
          <g className="animate-bounce-gentle">
            <path d="M40 85 L35 95 M60 85 L65 95" stroke="#4A4A4A" strokeWidth="4" strokeLinecap="round" />
            <path d="M50 10 C30 10 15 35 15 60 C15 80 30 90 50 90 C70 90 85 80 85 60 C85 35 70 10 50 10" fill="#8F9E8B" />
            <path d="M50 35 C35 35 25 50 25 65 C25 80 35 88 50 88 C65 88 75 80 75 65 C75 50 65 35 50 35" fill="#FFF" />
            <circle cx="30" cy="40" r="8" fill="white" opacity="0.6" />
            <circle cx="38" cy="35" r="4" fill="#222" />
            <circle cx="39" cy="34" r="1.5" fill="#fff" />
            <path d="M85 35 L95 38 L85 41 Z" fill="#D8C3C3" />
            <path d="M20 50 Q10 65 25 70" stroke="#8C8C8C" strokeWidth="2" fill="none" />
          </g>
        ) : (
          <g className="transition-all duration-500 transform scale-110 origin-bottom">
            <ellipse cx="50" cy="75" rx="45" ry="25" fill="#8F9E8B" />
            <ellipse cx="50" cy="80" rx="35" ry="18" fill="#FFF" />
            <path d="M30 70 Q35 75 40 70" stroke="#222" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M85 70 L92 73 L85 76 Z" fill="#D8C3C3" />
            <text x="80" y="50" fontSize="20" fill="#8C8C8C" className="animate-pulse">zZ</text>
          </g>
        )}
      </svg>
    </div>
  );
};

// --- 5. 主應用程式 ---
export default function MusicureApp() {
  const [currentTab, setCurrentTab] = useState('explore'); 
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [savedTracks, setSavedTracks] = useState([]);
  
  const track = DATABASE[currentTrackIndex];

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 0.2;
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const nextTrack = () => {
    setIsPlaying(false);
    setProgress(0);
    setTimeout(() => {
        setCurrentTrackIndex((prev) => (prev + 1) % DATABASE.length);
    }, 200);
  };

  const prevTrack = () => {
    setIsPlaying(false);
    setProgress(0);
    setTimeout(() => {
        setCurrentTrackIndex((prev) => (prev - 1 + DATABASE.length) % DATABASE.length);
    }, 200);
  };

  const toggleSave = () => {
    if (savedTracks.includes(track.id)) {
      setSavedTracks(savedTracks.filter(id => id !== track.id));
    } else {
      setSavedTracks([...savedTracks, track.id]);
    }
  };

  // --- 畫面元件 ---

  const renderPlayer = () => (
    <div className="flex flex-col h-full px-6 pt-6 pb-24 overflow-y-auto font-sans bg-paper">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-serif text-textMain tracking-wider">Music Prescription</h2>
        <div className="bg-stone-100 p-2 rounded-full text-primary">
          <Icon name="wind" size={20} />
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-xl shadow-stone-200 border border-stone-100 mb-8 relative overflow-hidden transition-all duration-300">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")` }}></div>
        
        <div className="flex justify-between items-start mb-4">
          <span className={`text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 ${track.color}`}>
            <Icon name={track.tagIcon} size={14} />
            {track.symptom}
          </span>
          <button onClick={toggleSave} className="text-accent hover:text-red-300 transition-colors">
            <Icon name="heart" size={24} fill={savedTracks.includes(track.id) ? "#D8C3C3" : "none"} />
          </button>
        </div>

        <h1 className="text-2xl font-serif font-bold text-textMain mb-1 leading-tight">{track.title}</h1>
        <p className="text-sm text-textSub italic mb-6">{track.composer}</p>

        <div className="pl-4 border-l-2 border-accent mb-6">
          <p className="text-sm text-textMain leading-relaxed text-justify font-serif">
            {track.story}
          </p>
        </div>

        <div className="bg-primary/10 rounded-lg p-3 text-center">
          <p className="text-xs text-primaryDark font-medium">
            {track.dosage}
          </p>
        </div>
      </div>

      <div className="mt-auto mb-4">
        <div 
          className="relative h-10 w-full flex items-center cursor-pointer group"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const newProgress = (x / rect.width) * 100;
            setProgress(newProgress);
          }}
        >
          <div className="absolute w-full h-1 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-100 ease-linear" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <MoriMascot isPlaying={isPlaying} progress={progress} />
        </div>

        <div className="flex justify-center items-center gap-8 mt-4">
          <button onClick={prevTrack} className="text-textSub hover:text-primary transition-colors active:scale-95">
            <Icon name="skipBack" size={28} />
          </button>
          
          <button 
            onClick={() => setIsPlaying(!isPlaying)} 
            className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white shadow-lg hover:bg-primaryDark transition-all transform active:scale-95 hover:shadow-xl"
          >
            {isPlaying ? <Icon name="pause" size={32} fill="white" /> : <Icon name="play" size={32} fill="white" className="ml-1" />}
          </button>
          
          <button onClick={nextTrack} className="text-textSub hover:text-primary transition-colors active:scale-95">
            <Icon name="skipForward" size={28} />
          </button>
        </div>
      </div>
    </div>
  );

  const renderHome = () => (
    <div className="p-6 h-full overflow-y-auto pb-24 font-sans bg-paper">
      <div className="mb-8 mt-4">
        <h1 className="text-3xl font-serif text-textMain mb-2 leading-tight">早安, <br/>今天想聽點什麼?</h1>
        <p className="text-textSub text-sm">Mori 已經幫你暖好手指了 🐦</p>
      </div>

      <div className="mb-8">
        <h3 className="text-xs font-bold text-textSub mb-4 uppercase tracking-wider">今日心情掃描</h3>
        <div className="grid grid-cols-2 gap-3">
          <button className="p-4 bg-white rounded-2xl border border-stone-100 shadow-sm hover:border-primary transition-all text-left group hover:shadow-md" onClick={() => setCurrentTab('explore')}>
            <div className="bg-red-50 w-8 h-8 rounded-full flex items-center justify-center text-red-400 mb-2 group-hover:scale-110 transition-transform">
              <Icon name="zap" size={16} />
            </div>
            <span className="text-textMain font-medium text-sm">焦慮暴躁</span>
          </button>
          <button className="p-4 bg-white rounded-2xl border border-stone-100 shadow-sm hover:border-primary transition-all text-left group hover:shadow-md" onClick={() => setCurrentTab('explore')}>
            <div className="bg-blue-50 w-8 h-8 rounded-full flex items-center justify-center text-blue-400 mb-2 group-hover:scale-110 transition-transform">
              <Icon name="coffee" size={16} />
            </div>
            <span className="text-textMain font-medium text-sm">疲勞倦怠</span>
          </button>
        </div>
      </div>

      <div className="bg-primary rounded-3xl p-6 text-white relative overflow-hidden shadow-lg shadow-sage/30">
        <div className="relative z-10">
          <p className="font-serif text-lg leading-relaxed mb-4">"音樂是靈魂的語言，它始於言語盡頭。"</p>
          <p className="text-xs opacity-80 text-right">— 柴可夫斯基</p>
        </div>
        <div className="absolute -bottom-4 -right-4 opacity-10">
           <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>
        </div>
      </div>
    </div>
  );

  const renderNest = () => (
    <div className="p-6 h-full overflow-y-auto pb-24 font-sans bg-paper">
      <h2 className="text-2xl font-serif text-textMain mb-6 mt-4">我的巢</h2>
      
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-100 mb-8 text-center relative overflow-hidden">
        <div className="w-32 h-32 bg-stone-50 rounded-full mx-auto mb-4 flex items-center justify-center border-4 border-card relative z-10">
          <span className="text-4xl">🪺</span>
          {savedTracks.length > 0 && <span className="absolute top-2 right-4 text-xl animate-bounce">✨</span>}
          {savedTracks.length > 2 && <span className="absolute bottom-4 left-4 text-xl animate-pulse">🍂</span>}
        </div>
        <p className="text-textMain font-medium relative z-10">Mori 的收藏進度</p>
        <p className="text-xs text-textSub mt-1 relative z-10">已收集 {savedTracks.length} 帖處方</p>
        {/* 背景裝飾 */}
        <div className="absolute top-0 left-0 w-full h-2 bg-primary/20"></div>
      </div>

      <h3 className="text-xs font-bold text-textSub mb-4 uppercase tracking-wider">已收藏的處方</h3>
      <div className="space-y-3">
        {savedTracks.length === 0 ? (
          <div className="text-center py-12 text-textSub text-sm italic bg-stone-50 rounded-xl border border-dashed border-stone-200">
            <p className="mb-2">巢裡空空的...</p>
            <button onClick={() => setCurrentTab('explore')} className="text-primary underline">去探索一些音樂吧！</button>
          </div>
        ) : (
          savedTracks.map(id => {
            const t = DATABASE.find(track => track.id === id);
            return (
              <div key={id} className="bg-white p-4 rounded-xl border border-stone-100 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${t.color.split(' ')[0]} ${t.color.split(' ')[1]}`}>
                  <Icon name={t.tagIcon} size={14} />
                </div>
                <div className="flex-1">
                  <h4 className="text-textMain font-medium text-sm font-serif">{t.title}</h4>
                  <p className="text-textSub text-xs">{t.composer}</p>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  );

  return (
    <>
      <StyleInjector />
      <div className="flex justify-center items-center min-h-screen bg-stone-200 font-sans p-4">
        {/* 手機外框 */}
        <div className="w-full max-w-sm h-[800px] bg-paper rounded-[40px] shadow-2xl relative overflow-hidden border-[8px] border-white ring-1 ring-stone-900/5">
          
          {/* 狀態列 (模擬) */}
          <div className="h-12 flex justify-between items-center px-6 text-[10px] font-bold text-textMain opacity-40 select-none bg-paper/80 backdrop-blur-sm sticky top-0 z-20">
            <span>9:41</span>
            <div className="flex gap-1">
              <div className="w-4 h-4 bg-current rounded-sm"></div>
              <div className="w-4 h-4 border border-current rounded-sm"></div>
            </div>
          </div>

          {/* 內容區 */}
          <div className="h-full bg-paper">
            {currentTab === 'home' && renderHome()}
            {currentTab === 'explore' && renderPlayer()}
            {currentTab === 'nest' && renderNest()}
            {currentTab === 'profile' && <div className="p-6 text-center text-textSub pt-20">關於頁面開發中...</div>}
          </div>

          {/* 底部導航 */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-white/95 backdrop-blur-md border-t border-stone-100 flex justify-around items-center pb-4 px-2 z-30 shadow-[0_-5px_20px_rgba(0,0,0,0.02)]">
            <button onClick={() => setCurrentTab('home')} className={`flex flex-col items-center gap-1 p-2 w-16 transition-colors ${currentTab === 'home' ? 'text-primary' : 'text-gray-300'}`}>
              <Icon name="home" size={24} />
              <span className="text-[10px] font-medium">棲木</span>
            </button>
            
            <button onClick={() => setCurrentTab('explore')} className={`flex flex-col items-center gap-1 p-2 w-16 transition-colors ${currentTab === 'explore' ? 'text-primary' : 'text-gray-300'}`}>
              <Icon name="search" size={24} />
              <span className="text-[10px] font-medium">處方籤</span>
            </button>
            
            <button onClick={() => setCurrentTab('nest')} className={`flex flex-col items-center gap-1 p-2 w-16 transition-colors ${currentTab === 'nest' ? 'text-primary' : 'text-gray-300'}`}>
              <Icon name="heart" size={24} />
              <span className="text-[10px] font-medium">我的巢</span>
            </button>

            <button onClick={() => setCurrentTab('profile')} className={`flex flex-col items-center gap-1 p-2 w-16 transition-colors ${currentTab === 'profile' ? 'text-primary' : 'text-gray-300'}`}>
              <Icon name="user" size={24} />
              <span className="text-[10px] font-medium">關於</span>
            </button>
          </div>

        </div>
      </div>
    </>
  );
}
