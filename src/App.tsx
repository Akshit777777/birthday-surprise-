/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Heart,
  Sparkles,
  Music,
  Volume2,
  VolumeX,
  Gift,
  Camera,
  Cake,
  MessageSquare,
  Calendar,
  Check,
  Plus,
  Trash,
  ChevronLeft,
  ChevronRight,
  Award,
  Smile,
  Star,
  X
} from 'lucide-react';

/* ==========================================
   CUTE HELLO KITTY DECORATIVE SVG COMPONENTS
   ========================================== */

// Hello Kitty's Iconic Red/Pink Bow decoration
const HelloKittyBow: React.FC<{ className?: string, onClick?: () => void }> = ({ className = "w-10 h-10", onClick }) => (
  <svg 
    viewBox="0 0 100 80" 
    className={`${className} cursor-pointer transition-transform duration-300 hover:scale-115 active:scale-95 bow-shadow`}
    onClick={onClick}
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    id="svg-hk-bow"
  >
    {/* Left Loop */}
    <path d="M42 40 C12 12, 4 62, 42 46 Z" fill="#ff7096" stroke="#4a3e43" strokeWidth="4.5" strokeLinejoin="round" />
    {/* Right Loop */}
    <path d="M58 40 C88 12, 96 62, 58 46 Z" fill="#ff7096" stroke="#4a3e43" strokeWidth="4.5" strokeLinejoin="round" />
    {/* Left Ribbon Tail */}
    <path d="M30 46 C12 58, 16 82, 34 76" fill="#ff7096" stroke="#4a3e43" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
    {/* Right Ribbon Tail */}
    <path d="M70 46 C88 58, 84 82, 66 76" fill="#ff7096" stroke="#4a3e43" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
    {/* Center Knot */}
    <circle cx="50" cy="43" r="14" fill="#ffc2d1" stroke="#4a3e43" strokeWidth="4.5" />
    {/* Highlights */}
    <ellipse cx="50" cy="39" rx="5" ry="3" fill="#ffffff" />
    <path d="M33 37 C36 40, 39 40, 41 39" stroke="#4a3e43" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M67 37 C64 40, 61 40, 59 39" stroke="#4a3e43" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// Hello Kitty Cute Face Drawing for background and badges
const HelloKittyMiniFace: React.FC<{ className?: string }> = ({ className = "w-12 h-10" }) => (
  <svg viewBox="0 0 100 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" id="svg-hk-face">
    {/* Head shape */}
    <path d="M15 45 C15 25, 30 18, 50 18 C70 18, 85 25, 85 45 C85 62, 72 72, 50 72 C28 72, 15 62, 15 45 Z" fill="#ffffff" stroke="#4a3e43" strokeWidth="4.5" />
    {/* Left Ear */}
    <path d="M18 28 L10 12 C10 12, 18 8, 30 18 Z" fill="#ffffff" stroke="#4a3e43" strokeWidth="4.5" strokeLinejoin="round" />
    {/* Right Ear */}
    <path d="M82 28 L90 12 C90 12, 82 8, 70 18 Z" fill="#ffffff" stroke="#4a3e43" strokeWidth="4.5" strokeLinejoin="round" />
    {/* Small Bow on Right Ear */}
    <g transform="translate(62, 8) scale(0.35) rotate(15)">
      <path d="M42 40 C12 12, 4 62, 42 46 Z" fill="#ff7096" stroke="#4a3e43" strokeWidth="6" />
      <path d="M58 40 C88 12, 96 62, 58 46 Z" fill="#ff7096" stroke="#4a3e43" strokeWidth="6" />
      <circle cx="50" cy="43" r="14" fill="#ffffff" stroke="#4a3e43" strokeWidth="6" />
    </g>
    {/* Eyes */}
    <ellipse cx="36" cy="46" rx="4" ry="6" fill="#4a3e43" />
    <ellipse cx="64" cy="46" rx="4" ry="6" fill="#4a3e43" />
    {/* Nose */}
    <ellipse cx="50" cy="53" rx="5" ry="3.5" fill="#fec859" stroke="#4a3e43" strokeWidth="2.5" />
    {/* Whiskers Left */}
    <path d="M10 46 L24 48" stroke="#4a3e43" strokeWidth="3" strokeLinecap="round" />
    <path d="M8 54 L22 53" stroke="#4a3e43" strokeWidth="3" strokeLinecap="round" />
    {/* Whiskers Right */}
    <path d="M90 46 L76 48" stroke="#4a3e43" strokeWidth="3" strokeLinecap="round" />
    <path d="M92 54 L78 53" stroke="#4a3e43" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

/* ==========================================================
   WEB AUDIO INTERACTIVE CHIME SYNTHESIZER
   ========================================================== */
class MusicBoxSynth {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private currentTimeoutIds: number[] = [];
  private onNotePlayCallback: ((noteIndex: number) => void) | null = null;

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  // Plays a beautiful tiny mechanical bell chime
  playChime(freq: number, duration: number = 0.8, type: OscillatorType = "sine") {
    this.init();
    if (!this.ctx) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    const osc = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    // Cute music box metallic bell tone harmonics (faint overlay frequency)
    const oscHarmonic = this.ctx.createOscillator();
    const gainHarmonic = this.ctx.createGain();
    oscHarmonic.type = "sine";
    oscHarmonic.frequency.setValueAtTime(freq * 2.01, this.ctx.currentTime); // Slight detuned octave for chime feel

    // Fast attack, beautiful decay
    gainNode.gain.setValueAtTime(0, this.ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.3, this.ctx.currentTime + 0.03);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

    gainHarmonic.gain.setValueAtTime(0, this.ctx.currentTime);
    gainHarmonic.gain.linearRampToValueAtTime(0.08, this.ctx.currentTime + 0.02);
    gainHarmonic.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration * 0.5);

    osc.connect(gainNode);
    oscHarmonic.connect(gainHarmonic);
    gainNode.connect(this.ctx.destination);
    gainHarmonic.connect(this.ctx.destination);

    osc.start();
    oscHarmonic.start();
    osc.stop(this.ctx.currentTime + duration);
    oscHarmonic.stop(this.ctx.currentTime + duration);
  }

  // Cozy happy birthday chime loop sheet
  private melodyNotesList = [
    { freq: 261.63, dur: 0.4, label: "C4" },
    { freq: 261.63, dur: 0.4, label: "C4" },
    { freq: 293.66, dur: 0.8, label: "D4" },
    { freq: 261.63, dur: 0.8, label: "C4" },
    { freq: 349.23, dur: 0.8, label: "F4" },
    { freq: 329.63, dur: 1.6, label: "E4" },

    { freq: 261.63, dur: 0.4, label: "C4" },
    { freq: 261.63, dur: 0.4, label: "C4" },
    { freq: 293.66, dur: 0.8, label: "D4" },
    { freq: 261.63, dur: 0.8, label: "C4" },
    { freq: 392.00, dur: 0.8, label: "G4" },
    { freq: 349.23, dur: 1.6, label: "F4" },

    { freq: 261.63, dur: 0.4, label: "C4" },
    { freq: 261.63, dur: 0.4, label: "C4" },
    { freq: 523.25, dur: 0.8, label: "C5" },
    { freq: 440.00, dur: 0.8, label: "A4" },
    { freq: 349.23, dur: 0.8, label: "F4" },
    { freq: 329.63, dur: 0.8, label: "E4" },
    { freq: 293.66, dur: 1.6, label: "D4" },

    { freq: 466.16, dur: 0.4, label: "A#4" },
    { freq: 466.16, dur: 0.4, label: "A#4" },
    { freq: 440.00, dur: 0.8, label: "A4" },
    { freq: 349.23, dur: 0.8, label: "F4" },
    { freq: 392.00, dur: 0.8, label: "G4" },
    { freq: 349.23, dur: 2.0, label: "F4" }
  ];

  setOnNotePlay(callback: (index: number) => void) {
    this.onNotePlayCallback = callback;
  }

  playBirthdayLullaby(onCompleteLoop: () => void) {
    this.init();
    if (this.isPlaying) return;
    this.isPlaying = true;

    let totalOffset = 0;
    this.melodyNotesList.forEach((n, idx) => {
      const tid = window.setTimeout(() => {
        if (!this.isPlaying) return;
        this.playChime(n.freq, n.dur * 1.5, "triangle");
        if (this.onNotePlayCallback) this.onNotePlayCallback(idx);
        
        // Loop restart trigger at the end
        if (idx === this.melodyNotesList.length - 1) {
          const endId = window.setTimeout(() => {
            this.isPlaying = false;
            onCompleteLoop();
          }, n.dur * 2200);
          this.currentTimeoutIds.push(endId);
        }
      }, totalOffset * 1000);
      this.currentTimeoutIds.push(tid);
      totalOffset += n.dur * 1.25; // timing gap adjustment
    });
  }

  stop() {
    this.isPlaying = false;
    this.currentTimeoutIds.forEach(id => clearTimeout(id));
    this.currentTimeoutIds = [];
  }

  getIsPlaying() {
    return this.isPlaying;
  }
}

const synthInstance = new MusicBoxSynth();


/* ==========================================================
   POLAROID MEMORY SLIDESHOW DATA DEFINITION
   ========================================================== */
interface MemoryItem {
  id: string;
  age: string;
  title: string;
  date: string;
  description: string;
  photoSrc: string;
  illustrationType: 'flower' | 'stars' | 'cake' | 'kitty' | 'baloon';
  bgGrad: string;
}

const MEMORIES: MemoryItem[] = [
  {
    id: 'mem-1',
    age: 'Innocency Era 🌸',
    title: 'That childhood smile',
    date: 'Our Sweet Beginnings',
    description: 'You\'ve always had this magical spark that instantly brightens up the room. From silly shared jokes to building sheet fortresses, we\'ve conquered so much together.',
    photoSrc: '/photos/mem-1.png',
    illustrationType: 'kitty',
    bgGrad: 'linear-gradient(135deg, #ffd3e2 0%, #ffebf0 100%)'
  },
  {
    id: 'mem-2',
    age: 'Partner In Crime Era 🎈',
    title: 'Adventures & Secret Talks',
    date: 'Memorable Escapade',
    description: 'All those times we laughed so hard our stomachs hurt, covered for each other, and planned amazing adventures. No distance or time can ever dim our precious connection.',
    photoSrc: '/photos/mem-2.png',
    illustrationType: 'baloon',
    bgGrad: 'linear-gradient(135deg, #ffe5ec 0%, #fff0f3 100%)'
  },
  {
    id: 'mem-3',
    age: 'Golden Days ⭐',
    title: 'A Hug That Heals All',
    date: 'Family Treasures',
    description: 'No matter what storms we face in life, having you by my side makes everything feel safe. You\'re not just my beautiful sister, you\'re my ultimate rock and best friend.',
    photoSrc: '/photos/mem-3.png',
    illustrationType: 'stars',
    bgGrad: 'linear-gradient(135deg, #fec8591e 0%, #ffebf0 100%)'
  },
  {
    id: 'mem-4',
    age: 'Today & Beyond 💖',
    title: 'Shining Bright & Graceful',
    date: 'Current Beautiful Moments',
    description: 'Watching you blossom into this talented, kind, and incredibly gorgeous soul has been my absolute favorite story. Always remember how immensely proud I am of you!',
    photoSrc: '/photos/mem-4.png',
    illustrationType: 'cake',
    bgGrad: 'linear-gradient(135deg, #ffd3e2 0%, #ffebf0 100%)'
  }
];

/* ==========================================================
   LOVE NOTE bulletin posts
   ========================================================== */
interface BulletinNote {
  id: string;
  from: string;
  note: string;
  color: string;
  angle: number;
}


export default function App() {
  // Navigation & Reveal Flow
  const [isUnsealed, setIsUnsealed] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState<'memories' | 'wishes' | 'bulletin' | 'gift'>('memories');
  
  // IsMobile state for responsive angles & rotations
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Custom trail coordinates
  const [trail, setTrail] = useState<{ x: number, y: number, id: number }[]>([]);
  const trailCounter = useRef(0);

  // Audio Music states
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [currentMelodyNote, setCurrentMelodyNote] = useState<number | null>(null);

  // Wish blow candle game
  const [wishesList, setWishesList] = useState<string[]>(() => {
    const saved = localStorage.getItem('hk_sister_wishes');
    return saved ? JSON.parse(saved) : ["Stay healthy and happy always! 🌸", "May all your big dreams come true! 💫"];
  });
  const [newWishInput, setNewWishInput] = useState('');
  const [candleLit, setCandleLit] = useState(true);
  const [isBlowing, setIsBlowing] = useState(false);
  const [sparksCount, setSparksCount] = useState<number[]>([]);

  // Sticky/bulletin board
  const [bulletinNotes, setBulletinNotes] = useState<BulletinNote[]>(() => {
    const defaultNotes = [
      { id: '1', from: 'Your favorite brother/family 🎀', note: 'May you always have that sweet smile on your face and endless bows of joy in your life!', color: 'bg-rose-100 border-rose-300', angle: -3 },
      { id: '2', from: 'Family Chimes ✨', note: 'So proud of your dreams, kind heart, and exquisite perseverance. Have the absolute grandest year!', color: 'bg-pink-100 border-pink-300', angle: 4 },
      { id: '3', from: 'Secret Santa Helper 🍰', note: 'Remember to eat the biggest slice of strawberry cake and save me the strawberry frosting!', color: 'bg-cream-100 border-yellow-300', angle: -2 }
    ];
    const saved = localStorage.getItem('hk_bulletin_notes');
    return saved ? JSON.parse(saved) : defaultNotes;
  });
  const [bulletinFrom, setBulletinFrom] = useState('');
  const [bulletinText, setBulletinText] = useState('');

  // Unboxing Present State
  const [presentStep, setPresentStep] = useState<0 | 1 | 2 | 3>(0); // 0: Gift Box complete, 1: Bow unpinned, 2: Lid lifted, 3: Award presented
  const [recipientSisterName, setRecipientSisterName] = useState('My Sweet Sis');

  // Sparkles particles effects
  const [activeConfettiParticles, setActiveConfettiParticles] = useState<{ x: number, y: number, color: string, speedY: number, speedX: number, size: number, angle: number }[]>([]);

  /* ----------------------------------------------------
     EFFECT: Trail Cursor particles
     ---------------------------------------------------- */
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (Math.random() > 0.65) {
        const newParticle = {
          x: e.clientX,
          y: e.clientY + window.scrollY,
          id: trailCounter.current++
        };
        setTrail((prev) => [...prev.slice(-15), newParticle]);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Filter trail periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setTrail((prev) => prev.slice(1));
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  /* ----------------------------------------------------
     SYNTH AUDIO SETUP & AUTOPLAY ATTRIBUTES
     ---------------------------------------------------- */
  const toggleMusicPlay = () => {
    if (musicPlaying) {
      synthInstance.stop();
      setMusicPlaying(false);
      setCurrentMelodyNote(null);
    } else {
      synthInstance.init();
      setMusicPlaying(true);
      const runLoop = () => {
        synthInstance.playBirthdayLullaby(() => {
          if (synthInstance.getIsPlaying()) {
            runLoop();
          } else {
            setMusicPlaying(false);
            setCurrentMelodyNote(null);
          }
        });
      };
      synthInstance.setOnNotePlay((noteIdx) => {
        setCurrentMelodyNote(noteIdx);
        // Each note play drops beautiful floating sparkles on screen!
        triggerLocalConfettiBurst(window.innerWidth * 0.5, window.innerHeight * 0.35);
      });
      runLoop();
    }
  };

  useEffect(() => {
    return () => {
      synthInstance.stop();
    };
  }, []);

  /* ----------------------------------------------------
     PARTICLE CONFETTI LAUNCHER
     ---------------------------------------------------- */
  const triggerLocalConfettiBurst = (sourceX: number, sourceY: number, count: number = 25) => {
    const pinkPuffs = ['#ff7096', '#ffb3c6', '#ffc2d1', '#fec859', '#ffffff', '#ff1493'];
    const additionals = Array.from({ length: count }).map(() => ({
      x: sourceX,
      y: sourceY,
      color: pinkPuffs[Math.floor(Math.random() * pinkPuffs.length)],
      speedY: -3 - Math.random() * 8,
      speedX: -5 + Math.random() * 10,
      size: 6 + Math.random() * 15,
      angle: Math.random() * 360
    }));

    setActiveConfettiParticles((prev) => [...prev, ...additionals]);
  };

  // Animate custom physics particles
  useEffect(() => {
    if (activeConfettiParticles.length === 0) return;

    const frame = requestAnimationFrame(() => {
      setActiveConfettiParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.speedX,
            y: p.y + p.speedY,
            speedY: p.speedY + 0.18, // Gravity
            angle: p.angle + 3
          }))
          .filter((p) => p.y < window.innerHeight + window.scrollY + 100 && Math.abs(p.speedX) < 30)
      );
    });
    return () => cancelAnimationFrame(frame);
  }, [activeConfettiParticles]);

  /* ----------------------------------------------------
     WISH LIST CRUD & CANDLE GAME
     ---------------------------------------------------- */
  const addNewWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWishInput.trim()) return;
    const updated = [...wishesList, `${newWishInput.trim()} 🌟`];
    setWishesList(updated);
    setNewWishInput('');
    localStorage.setItem('hk_sister_wishes', JSON.stringify(updated));
    synthInstance.playChime(523.25, 0.4); // C5 chime
    triggerLocalConfettiBurst(window.innerWidth * 0.5, window.innerHeight * 0.5, 12);
  };

  const removeWish = (indexToRemove: number) => {
    const updated = wishesList.filter((_, idx) => idx !== indexToRemove);
    setWishesList(updated);
    localStorage.setItem('hk_sister_wishes', JSON.stringify(updated));
    synthInstance.playChime(329.63, 0.2); // E4 chime
  };

  const handleBlowoutCandle = () => {
    if (!candleLit) return;
    setIsBlowing(true);
    synthInstance.playChime(659.25, 0.8, "sine"); // E5 high chime
    triggerLocalConfettiBurst(window.innerWidth * 0.5, window.innerHeight * 0.5, 50);
    
    setTimeout(() => {
      setCandleLit(false);
      setIsBlowing(false);
    }, 1000);
  };

  const relightCandle = () => {
    setCandleLit(true);
    synthInstance.playChime(440.00, 0.4, "triangle"); // A4 relight chime
  };

  /* ----------------------------------------------------
     BULLETIN INTERACTIVITY
     ---------------------------------------------------- */
  const addBulletinNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bulletinText.trim()) return;

    const notesColors = [
      'bg-pink-100 border-pink-300',
      'bg-rose-100 border-rose-300',
      'bg-yellow-50 border-yellow-200',
      'bg-red-50 border-rose-200'
    ];

    const newNote: BulletinNote = {
      id: Date.now().toString(),
      from: bulletinFrom.trim() || 'A Secret Well-wisher 🤫',
      note: bulletinText.trim(),
      color: notesColors[Math.floor(Math.random() * notesColors.length)],
      angle: -6 + Math.random() * 12
    };

    const updated = [newNote, ...bulletinNotes];
    setBulletinNotes(updated);
    localStorage.setItem('hk_bulletin_notes', JSON.stringify(updated));
    setBulletinFrom('');
    setBulletinText('');
    synthInstance.playChime(587.33, 0.4, "triangle"); // D5 high
    triggerLocalConfettiBurst(window.innerWidth * 0.75, window.innerHeight * 0.5, 20);
  };

  const deleteBulletinNote = (id: string) => {
    const updated = bulletinNotes.filter(n => n.id !== id);
    setBulletinNotes(updated);
    localStorage.setItem('hk_bulletin_notes', JSON.stringify(updated));
  };



/* ==========================================================
   PHOTO SLOT COMPONENT
   ========================================================== */
const PhotoSlot: React.FC<{
  src: string;
  alt: string;
  label: string;
  note: string;
  variant?: 'kitty' | 'heart';
  className?: string;
}> = ({ src, alt, label, note, variant = 'heart', className = '' }) => {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div className={`relative w-full h-[180px] sm:h-[220px] rounded-3xl overflow-hidden border-4 border-white shadow-lg bg-gradient-to-br from-pink-50 via-rose-50 to-white ${className}`}>
      {!imageFailed ? (
        <>
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImageFailed(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/22 via-transparent to-transparent pointer-events-none" />
        </>
      ) : (
        <div className="absolute inset-0 border-4 border-dashed border-pink-300 bg-pink-50 flex flex-col items-center justify-center p-3 text-center">
          <Camera className="w-8 h-8 sm:w-10 sm:h-10 text-pink-400 mb-2 animate-floatSoft" />
          <span className="font-cute text-xs sm:text-sm font-semibold text-pink-500 uppercase tracking-wide bg-white/90 px-2 py-0.5 rounded-full border border-pink-200 mb-1 break-words text-center">
            {label}
          </span>
          <p className="text-[10px] sm:text-xs text-slate-500 max-w-[200px] leading-relaxed break-words">
            {note}
          </p>
        </div>
      )}

      <div className="absolute top-2 left-2 flex gap-1 z-10">
        <div className="w-2 h-2 rounded-full bg-pink-300" />
        <div className="w-2 h-2 rounded-full bg-rose-200" />
      </div>

      <div className="absolute bottom-3 left-3 right-3 z-10 flex items-end justify-between gap-3">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-3 py-2 border border-pink-100 shadow-sm max-w-[75%]">
          <div className="font-cute text-[10px] sm:text-xs font-bold uppercase tracking-widest text-pink-500">{label}</div>
          <div className="text-[10px] sm:text-xs text-slate-600 leading-tight mt-0.5">{note}</div>
        </div>
        <div className="shrink-0 opacity-80">
          {variant === 'kitty' ? <HelloKittyMiniFace className="w-14 h-12 sm:w-16 sm:h-14" /> : <Heart className="w-10 h-10 sm:w-12 sm:h-12 fill-pink-300 stroke-none" />}
        </div>
      </div>
    </div>
  );
};

  return (
    <div id="sister-birthday-root" className="min-h-screen bg-[#fff5f7] selection:bg-pink-200 selection:text-pink-800 relative overflow-x-hidden font-sans">
      
      {/* Dynamic Cursor Sparklings */}
      {trail.map((t) => (
        <div
          key={t.id}
          className="pointer-events-none absolute w-3 h-3 text-pink-400 z-50 animate-ping opacity-60"
          style={{ left: t.x - 6, top: t.y - 6 }}
        >
          <Heart className="w-full h-full fill-pink-400 stroke-pink-500 stroke-1" />
        </div>
      ))}

      {/* Physics Canvas Confetti Particles */}
      <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
        {activeConfettiParticles.map((p, idx) => (
          <div
            key={idx}
            className="absolute rounded-full"
            style={{
              left: p.x,
              top: p.y,
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              transform: `rotate(${p.angle}deg)`,
              opacity: 0.85,
              clipPath: p.size > 14 
                ? "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)" // Star clip
                : "none"
            }}
          />
        ))}
      </div>

      {/* Floating Sparkle background indicators */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-[15%] left-[8%] text-pink-200/40 animate-floatSoft"><Sparkles className="w-16 h-16" /></div>
        <div className="absolute top-[50%] right-[5%] text-pink-200/35 animate-floatSlow"><Sparkles className="w-24 h-24" /></div>
        <div className="absolute bottom-[20%] left-[12%] text-pink-200/30 animate-floatSoft"><Heart className="w-14 h-14 fill-pink-100/30 stroke-none" /></div>
        <div className="absolute top-[65%] left-[45%] text-amber-200/40 animate-pulseGlow"><Star className="w-8 h-8 fill-amber-100/45 stroke-none" /></div>
      </div>

      {/* Floating Ambient Music space */}
      {isUnsealed && (
        <div id="audio-control-suite" className="fixed top-4 right-4 z-40 flex items-center gap-1 bg-white/75 border-2 border-pink-200 px-3 py-2 rounded-full shadow-md backdrop-blur-md">
          <div className="flex gap-0.5 items-end justify-center h-4 w-7 mr-1">
            <span className={`w-1 bg-pink-400 rounded-full transition-all duration-300 ${musicPlaying ? 'h-4 animate-bounce' : 'h-1'}`} />
            <span className={`w-1 bg-rose-400 rounded-full transition-all duration-300 delay-100 ${musicPlaying ? 'h-3 animate-bounce' : 'h-1.5'}`} style={{ animationDelay: '0.15s' }} />
            <span className={`w-1 bg-yellow-400 rounded-full transition-all duration-300 delay-200 ${musicPlaying ? 'h-4 animate-bounce' : 'h-1'}`} style={{ animationDelay: '0.3s' }} />
            <span className={`w-1 bg-pink-300 rounded-full transition-all duration-300 delay-300 ${musicPlaying ? 'h-2 animate-bounce' : 'h-1.5'}`} style={{ animationDelay: '0.45s' }} />
          </div>
          <button
            onClick={toggleMusicPlay}
            className="p-1 px-2.5 bg-gradient-to-r from-pink-400 to-rose-400 text-white rounded-full text-xs font-cute font-medium flex items-center gap-1.5 hover:from-pink-500 hover:to-rose-500 transition-all shadow-sm active:scale-95"
            aria-label="Toggle ambient musical lullaby pitch"
            id="btn-toggle-music"
          >
            {musicPlaying ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            <span>{musicPlaying ? 'Mute' : 'Play Lullaby Chimes 🎹'}</span>
          </button>
        </div>
      )}


      {/* ==========================================================
         CINEMATIC SCREEN 1: POSTAL CARD SEAL (Opening gesture)
         ========================================================== */}
      <AnimatePresence>
        {!isUnsealed && (
          <motion.div
            id="ceremonial-unseal-gate"
            className="fixed inset-0 bg-gradient-to-b from-[#ffe5ec] via-[#ffebf0] to-[#fff3f5] flex flex-col items-center justify-center p-4 z-50"
            exit={{ opacity: 0, y: -40, scale: 0.98 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="absolute top-4 left-4 z-10 font-cute text-sm text-pink-500 font-semibold tracking-widest uppercase flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-pink-400" /> Let the Celebration Begin! <Sparkles className="w-4 h-4 text-pink-400" />
            </div>

            {/* Postcard Container */}
            <motion.div 
              id="unseal-postcard-shield"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
              className="w-full max-w-lg bg-white p-6 md:p-8 rounded-3xl shadow-xl border-8 border-pink-100 flex flex-col items-center text-center relative overflow-hidden"
            >
              {/* Top border decor */}
              <div className="absolute top-0 inset-x-0 h-4 bg-gradient-to-r from-pink-300 via-rose-300 to-amber-200" />
              
              {/* Sweet Kitty Head decoration */}
              <div className="mt-4 transform translate-y-2 hover:scale-105 transition-transform duration-300">
                <HelloKittyMiniFace className="w-32 h-24" />
              </div>

              {/* Title Greeting */}
              <h1 className="font-cute text-3xl md:text-4xl text-[#ff5c8a] font-extrabold mt-6 tracking-tight leading-tight">
                To My Amazing Sister... 🌸
              </h1>
              
              <p className="text-slate-500 mt-3 text-sm md:text-base leading-relaxed max-w-sm">
                A magical chest of sweet memories, wishing cake games, and cozy love notes prepared just for you.
              </p>

              {/* Glowing Interactive Unseal Button */}
              <div className="relative mt-8 group">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-pink-400 to-amber-300 opacity-75 blur-md group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulseGlow" />
                <button
                  onClick={() => {
                    setIsUnsealed(true);
                    triggerLocalConfettiBurst(window.innerWidth * 0.5, window.innerHeight * 0.4, 40);
                    // Launch custom happy birthday chime audio
                    toggleMusicPlay();
                  }}
                  className="relative px-8 py-4 bg-white border-2 border-pink-300 rounded-full font-cute text-lg text-pink-600 font-extrabold flex items-center gap-3 shadow-md hover:bg-pink-50 active:scale-95 transition-all duration-300"
                  id="btn-postcard-open"
                >
                  <HelloKittyBow className="w-8 h-7 -mt-0.5" />
                  <span>Unseal the Secret Letter 🎀</span>
                </button>
              </div>

              <span className="text-[10px] text-pink-400 font-mono mt-6 block uppercase tracking-widest animate-floatSoft">
                💝 TAP BOW TO UNRAP 💝
              </span>

              {/* Small stamp decoration */}
              <div className="absolute bottom-4 right-4 w-12 h-12 bg-pink-100/70 border border-pink-200 rounded-lg transform rotate-12 flex items-center justify-center">
                <Heart className="w-5 h-5 fill-pink-400 stroke-none text-pink-500" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* ==========================================================
         MAIN LAYOUT: STARRING ADORABLE CONTENT
         ========================================================== */}
      {isUnsealed && (
        <div id="main-celebration-hub" className="max-w-6xl mx-auto px-4 py-8 relative z-10 flex flex-col items-center">
          
          {/* ==========================================
             CINEMATIC HEADER & HERO PRESENTATION
             ========================================== */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="w-full flex flex-col items-center text-center mt-6"
            id="hero-cinematic-introduction"
          >
            <div className="inline-flex items-center gap-2 bg-pink-100 border border-pink-200 px-4 py-2 rounded-full mb-4 md:mb-6 shadow-sm">
              <Sparkles className="w-4 h-4 text-pink-500 animate-pulseGlow" />
              <span className="font-cute text-xs md:text-sm font-semibold text-pink-600 tracking-wide">
                Special Birthday Release for My Best Sister
              </span>
              <Sparkles className="w-4 h-4 text-pink-500 animate-pulseGlow" />
            </div>

            {/* Custom Hello Kitty Decorative Frame Headings */}
            <div className="relative inline-block mb-2 px-10">
              <div className="absolute top-0 left-0 -translate-x-3 -translate-y-4 transform rotate-[-15deg] hidden md:block">
                <HelloKittyBow className="w-14 h-11" />
              </div>
              <div className="absolute top-0 right-0 translate-x-3 -translate-y-4 transform rotate-[15deg] scale-x-[-1] hidden md:block">
                <HelloKittyMiniFace className="w-16 h-13" />
              </div>
              <h1 className="font-fancy text-4xl sm:text-5xl md:text-7xl text-[#ff5c8a] font-bold tracking-tight">
                Happy Birthday, Sis!
              </h1>
            </div>

            <h2 className="font-cute text-xl sm:text-2xl md:text-3xl text-slate-700 font-semibold tracking-tight max-w-xl mx-auto mb-6">
              To my beautiful friend, cheerleader, and favorite secret-keeper. 🎂🌸
            </h2>

            {/* =======================================================
               SISTER'S HERO EXQUISITE PHOTO FRAME (WITH GORGEOUS BORDERS)
               ======================================================= */}
            <div className="w-full max-w-3xl kitty-glass p-4 sm:p-6 rounded-3xl shadow-lg relative mb-12">
              {/* Absolute Corner Star shapes */}
              <div className="absolute top-3 left-3 text-pink-400 opacity-60"><Star className="w-5 h-5 fill-pink-300 stroke-none" /></div>
              <div className="absolute bottom-3 right-3 text-pink-400 opacity-60"><Star className="w-5 h-5 fill-pink-300 stroke-none animate-pulseGlow" /></div>
              
              {/* Hero Image Container representing Polaroid aesthetic with background visual */}
              <div className="relative w-full aspect-[16/9] md:h-[350px] bg-pink-100/30 rounded-2xl overflow-hidden border-4 border-white shadow-inner flex flex-col items-center justify-center p-4">
                
                
{/* Hero photo slot */}
<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-pink-100/50 via-rose-50 to-white p-4 sm:p-6">
  <div className="absolute -top-1 left-[50%] -translate-x-[50%] z-20">
    <HelloKittyBow className="w-14 h-11" />
  </div>

  <PhotoSlot
    src="/photos/hero.png"
    alt="Sister hero photo"
    label="Hero Photo"
    note="Place your main photo at public/photos/hero.png"
    variant="kitty"
    className="h-full"
  />
</div>
<div className="absolute top-2 right-2 bg-black/50 text-white rounded-lg p-1.5 px-3 text-[10px] font-mono select-none z-10">
                  📷 Editable Hero Photo Slot
                </div>
              </div>

              {/* Heartfelt Letter Section directly attached to the hero */}
              <div className="mt-6 text-center max-w-2xl mx-auto">
                <p className="font-cute text-base md:text-lg text-slate-700 font-normal leading-relaxed italic">
                  "Sisters are like sparkles in a cup of soda—sweet, sparkly, and absolutely refreshing! Thank you for holding my hand in difficult times, guiding my path, and being my daily bundle of endless giggles and smiles."
                </p>
                <div className="h-0.5 w-16 bg-pink-200 mx-auto my-4 rounded-full" />
                <h3 className="font-fancy text-2xl text-pink-500 font-medium tracking-wide">
                  With Infinite Love, Forever 💝
                </h3>
              </div>
            </div>


            {/* =======================================================
               DYNAMIC CARDS WORKSPACE / INTERACTIVE SECTIONS CONTROLS
               ======================================================= */}
            <div id="interactive-workspace-modules" className="w-full flex flex-col items-center">
              
              {/* Category Tab buttons */}
              <div className="flex flex-wrap justify-center gap-2 p-1.5 bg-pink-100/70 border-2 border-pink-200 rounded-full max-w-xl w-full mb-8 shadow-sm">
                
                <button
                  onClick={() => {
                    setActiveTab('memories');
                    synthInstance.playChime(261.63, 0.3); // C4 pitch
                  }}
                  className={`flex-1 min-w-[100px] px-3 py-2.5 rounded-full text-xs sm:text-sm font-cute font-bold transition-all flex items-center justify-center gap-1.5 ${
                    activeTab === 'memories' 
                      ? 'bg-gradient-to-r from-pink-400 to-rose-400 text-white shadow-md scale-[1.03]' 
                      : 'text-pink-600 hover:bg-white/50'
                  }`}
                  id="tab-memories"
                >
                  <Camera className="w-4 h-4" />
                  <span>Memory Book</span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('wishes');
                    synthInstance.playChime(293.66, 0.3); // D4 pitch
                  }}
                  className={`flex-1 min-w-[100px] px-3 py-2.5 rounded-full text-xs sm:text-sm font-cute font-bold transition-all flex items-center justify-center gap-1.5 ${
                    activeTab === 'wishes' 
                      ? 'bg-gradient-to-r from-pink-400 to-rose-400 text-white shadow-md scale-[1.03]' 
                      : 'text-pink-600 hover:bg-white/50'
                  }`}
                  id="tab-wishes"
                >
                  <Cake className="w-4 h-4" />
                  <span>Wish Sparks 🕯️</span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('bulletin');
                    synthInstance.playChime(329.63, 0.3); // E4 pitch
                  }}
                  className={`flex-1 min-w-[100px] px-3 py-2.5 rounded-full text-xs sm:text-sm font-cute font-bold transition-all flex items-center justify-center gap-1.5 ${
                    activeTab === 'bulletin' 
                      ? 'bg-gradient-to-r from-pink-400 to-rose-400 text-white shadow-md scale-[1.03]' 
                      : 'text-pink-600 hover:bg-white/50'
                  }`}
                  id="tab-bulletin"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Cozy Bulletin</span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('gift');
                    synthInstance.playChime(349.23, 0.3); // F4 pitch
                  }}
                  className={`flex-1 min-w-[100px] px-3 py-2.5 rounded-full text-xs sm:text-sm font-cute font-bold transition-all flex items-center justify-center gap-1.5 ${
                    activeTab === 'gift' 
                      ? 'bg-gradient-to-r from-pink-400 to-rose-400 text-white shadow-md scale-[1.03]' 
                      : 'text-pink-600 hover:bg-white/50'
                  }`}
                  id="tab-gift"
                >
                  <Gift className="w-4 h-4" />
                  <span>The Gift 🎁</span>
                </button>

              </div>

              {/* ACTIVE PANEL CONTENT WRAPPER */}
              <div className="w-full text-left min-h-[450px]">
                
                {/* -------------------------------------------
                   TAB 1: PHOTOS & MEMORIES SLIDESHOW
                   ------------------------------------------- */}
                {activeTab === 'memories' && (
                  <motion.div
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center"
                    id="panel-memories-book"
                  >
                    
                    {/* Sliding Polaroid Visual */}
                    <div className="col-span-1 md:col-span-6 flex flex-col items-center w-full">
                      <motion.div
                        className="bg-white p-3.5 sm:p-4 pb-10 sm:pb-12 rounded-3xl border-2 border-pink-100 shadow-xl max-w-sm w-full relative group transform transition-transform duration-300 hover:rotate-2"
                        whileHover={{ y: -4 }}
                      >
                        {/* Decorative Bow Pin Top Center */}
                        <div className="absolute -top-5 left-[50%] -translate-x-[50%] z-10 drop-shadow">
                          <HelloKittyBow className="w-12 h-10 animate-floatSoft" />
                        </div>

                        {/* Interactive Slide Selection Indicator */}
                        <div className="absolute top-3 right-3 bg-pink-100/90 text-pink-600 border border-pink-200 rounded-full px-2.5 py-0.5 text-[10px] font-cute font-bold">
                          {currentSlide + 1} / {MEMORIES.length}
                        </div>

                        <div className="h-6" />

                        {/* Slide image block */}
                        <PhotoSlot
                          src={MEMORIES[currentSlide].photoSrc}
                          alt={MEMORIES[currentSlide].title}
                          label={MEMORIES[currentSlide].title}
                          note={MEMORIES[currentSlide].date}
                          variant={MEMORIES[currentSlide].illustrationType === 'kitty' ? 'kitty' : 'heart'}
                          className="group"
                        />

                        {/* Captions space */}
                        <div className="mt-5 text-center px-2">
                          <span className="font-cute text-xs text-rose-400 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-100 inline-block font-semibold">
                            {MEMORIES[currentSlide].age}
                          </span>
                          <h3 className="font-cute text-base sm:text-lg text-slate-800 font-extrabold mt-2.5 break-words">
                            {MEMORIES[currentSlide].title}
                          </h3>
                          <p className="font-mono text-[10px] text-slate-400 mt-1">
                            📅 {MEMORIES[currentSlide].date}
                          </p>
                        </div>

                        <div className="absolute bottom-2 left-4 text-[9px] text-pink-300 font-memo italic">
                          💖 Editable Polaroid Frame
                        </div>
                      </motion.div>

                      {/* Sliding controls */}
                      <div className="flex gap-4 mt-6">
                        <button
                          onClick={() => {
                            setCurrentSlide((prev) => (prev - 1 + MEMORIES.length) % MEMORIES.length);
                            synthInstance.playChime(261.63, 0.2); // C4
                          }}
                          className="bg-white border-2 border-pink-200 p-2.5 rounded-full text-pink-500 hover:bg-pink-50 hover:border-pink-300 shadow-sm active:scale-90 transition-all"
                          aria-label="Previous Memory slide"
                          id="btn-prev-memory"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => {
                            setCurrentSlide((prev) => (prev + 1) % MEMORIES.length);
                            synthInstance.playChime(329.63, 0.2); // E4
                          }}
                          className="bg-white border-2 border-pink-200 p-2.5 rounded-full text-pink-500 hover:bg-pink-50 hover:border-pink-300 shadow-sm active:scale-90 transition-all"
                          aria-label="Next Memory slide"
                          id="btn-next-memory"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>

                    </div>

                    {/* Explanatory description of the memory */}
                    <div className="col-span-1 md:col-span-6 space-y-4">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-pink-500" />
                        <span className="font-cute text-sm text-pink-600 font-bold uppercase tracking-widest">Memory Capsule</span>
                      </div>
                      
                      <h3 className="font-fancy text-2xl sm:text-3xl text-pink-500 font-bold leading-tight break-words">
                        "{MEMORIES[currentSlide].title}"
                      </h3>

                      <p className="text-slate-600 leading-relaxed text-sm sm:text-base break-words">
                        {MEMORIES[currentSlide].description}
                      </p>

                      <div className="bg-white border border-pink-100 p-3 sm:p-4 rounded-2xl shadow-sm flex flex-col sm:flex-row gap-3 sm:gap-3.5 items-start">
                        <div className="p-2.5 bg-rose-50 rounded-xl text-rose-500 shrink-0 self-start">
                          <Heart className="w-5 h-5 fill-rose-100 animate-pulseGlow" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-cute text-xs font-bold text-slate-800 uppercase tracking-wider">A Special Reflection Note:</h4>
                          <p className="text-xs text-slate-500 leading-relaxed break-words">
                            "You can change the text directly in the React arrays, insert sweet custom notes of real inside jokes, or easily replace the images using the clear label placeholders!"
                          </p>
                        </div>
                      </div>

                      {/* Display small row indicator dots */}
                      <div className="flex flex-wrap gap-2 pt-1.5">
                        {MEMORIES.map((m, idx) => (
                          <button
                            key={m.id}
                            onClick={() => {
                              setCurrentSlide(idx);
                              synthInstance.playChime(261.63 + idx * 30, 0.2);
                            }}
                            className={`h-2.5 rounded-full transition-all duration-300 ${
                              idx === currentSlide ? 'bg-pink-500 w-6' : 'bg-pink-200 w-2.5 hover:bg-pink-300'
                            }`}
                            aria-label={`Show memory slide ${idx + 1}`}
                          />
                        ))}
                      </div>

                    </div>

                  </motion.div>
                )}


                {/* -------------------------------------------
                   TAB 2: MAKE A WISH (CAKE GAME)
                   ------------------------------------------- */}
                {activeTab === 'wishes' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
                    id="panel-wishes-candle"
                  >
                    
                    {/* The Birthday Cake Visualizer Area */}
                    <div className="col-span-1 md:col-span-6 flex flex-col items-center justify-center p-4">
                      
                      <div className="relative w-72 h-72 flex items-center justify-center">
                        
                        {/* Glowing Background Glow effect behind the cake */}
                        <div className={`absolute w-52 h-52 rounded-full transition-all duration-1000 blur-2xl ${
                          candleLit ? 'bg-amber-100/70 scale-105' : 'bg-transparent scale-90'
                        }`} />

                        {/* Interactive Candle Flame SVG */}
                        <div className="absolute top-6 flex flex-col items-center">
                          
                          {/* Secret wishing smoke plume when blown */}
                          <AnimatePresence>
                            {isBlowing && (
                              <motion.div 
                                className="absolute -top-12 text-pink-400 font-cute text-[10px] bg-white border border-pink-100 px-2 py-0.5 rounded-full shadow-sm"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: -20 }}
                                exit={{ opacity: 0 }}
                              >
                                *pffft!* 💨 Relish your wish!
                              </motion.div>
                            )}
                          </AnimatePresence>

                          {/* FLAME */}
                          {candleLit ? (
                            <motion.div
                              animate={{ 
                                scale: [1, 1.12, 0.98, 1.15, 1],
                                rotate: [-2, 3, -1, 4, -2]
                              }}
                              transition={{ 
                                repeat: Infinity, 
                                ease: "easeInOut",
                                duration: 1.5 
                              }}
                              className="w-4 h-9 bg-gradient-to-t from-red-500 via-amber-400 to-amber-100 rounded-full cursor-pointer hover:scale-110 shadow-[0_0_15px_rgba(245,158,11,0.8)] filter brightness-110 active:scale-95"
                              title="Tap to blow out!"
                              onClick={handleBlowoutCandle}
                              id="candle-flame-glowing"
                            />
                          ) : (
                            <div className="w-1 h-3 bg-zinc-600 rounded-full" />
                          )}

                          {/* Wick */}
                          <div className="w-0.5 h-1.5 bg-zinc-700" />
                          
                          {/* Candle stick */}
                          <div className="w-3 h-16 bg-gradient-to-r from-pink-300 via-white to-pink-300 rounded-md border border-pink-400 shadow-sm flex flex-col justify-between items-center py-1">
                            <span className="w-full h-0.5 bg-pink-400" />
                            <span className="w-full h-0.5 bg-pink-400" />
                            <span className="w-full h-0.5 bg-pink-400" />
                          </div>

                        </div>

                        {/* Cake Core Body */}
                        <div className="absolute bottom-8 w-60 h-36 flex flex-col justify-end items-center">
                          
                          {/* Cake Top Layer Frosting */}
                          <div className="w-52 h-14 bg-gradient-to-r from-white via-pink-100 to-white rounded-full border-4 border-pink-300 shadow-md relative z-10 flex items-center justify-between px-6">
                            
                            {/* Decorative small cherry stars on the cake */}
                            <Heart className="w-4.5 h-4.5 fill-pink-500 text-pink-500 -mt-2.5 animate-floatSoft" style={{ animationDelay: '0.2s' }} />
                            <Heart className="w-4.5 h-4.5 fill-rose-400 text-rose-400 -mt-2" style={{ animationDelay: '0.4s' }} />
                            <Heart className="w-4.5 h-4.5 fill-pink-500 text-pink-500 -mt-3" style={{ animationDelay: '0.1s' }} />
                            <Heart className="w-4.5 h-4.5 fill-rose-400 text-rose-400 -mt-2" style={{ animationDelay: '0.5s' }} />
                            <Heart className="w-4.5 h-4.5 fill-pink-500 text-pink-500 -mt-2.5" style={{ animationDelay: '0.3s' }} />

                          </div>

                          {/* Cake Bottom Layer Sponge */}
                          <div className="w-56 h-20 bg-gradient-to-b from-pink-200 via-pink-300 to-rose-300 rounded-b-3xl border-x-4 border-b-4 border-pink-400 -mt-6 relative shadow-lg flex flex-col justify-end pb-3 items-center">
                            
                            {/* Chocolate stripes or decorations */}
                            <div className="absolute top-2 inset-x-4 flex justify-between">
                              <span className="h-6 w-1.5 bg-rose-400/80 rounded-full" />
                              <span className="h-4 w-1.5 bg-rose-400/80 rounded-full" />
                              <span className="h-7 w-1.5 bg-rose-400/80 rounded-full" />
                              <span className="h-5 w-1.5 bg-rose-400/80 rounded-full" />
                              <span className="h-8 w-1.5 bg-rose-400/80 rounded-full" />
                              <span className="h-6 w-1.5 bg-rose-400/80 rounded-full" />
                              <span className="h-7 w-1.5 bg-rose-400/80 rounded-full" />
                            </div>

                            <span className="font-cute text-sm font-extrabold text-[#702d42] bg-white/75 border border-pink-300 rounded-full px-4 py-0.5 z-10 candy-gradient">
                              HAPPY BIRTHDAY! 🌸
                            </span>

                          </div>

                          {/* Cake ceramic Stand Plate */}
                          <div className="w-64 h-4 bg-gradient-to-r from-teal-50 via-teal-100 to-teal-50 rounded-full border-2 border-teal-200 shadow-md transform translate-y-1.5" />

                        </div>

                      </div>

                      {/* Relight candle option */}
                      {!candleLit && (
                        <motion.button
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          onClick={relightCandle}
                          className="mt-2 px-5 py-2 bg-pink-100 border border-pink-300 rounded-full text-xs font-cute font-bold text-pink-600 hover:bg-pink-200 active:scale-95 shadow-sm transition-all flex items-center gap-1.5"
                          id="btn-relight-candle"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" /> Relight Candle!
                        </motion.button>
                      )}

                    </div>

                    {/* interactive form column */}
                    <div className="col-span-1 md:col-span-6 space-y-5">
                      
                      <div className="bg-white p-5 rounded-3xl border-2 border-pink-100 shadow-md">
                        <h3 className="font-cute text-xl font-bold text-pink-600 mb-1">Make a Cozy Wish! ✨</h3>
                        <p className="text-xs text-slate-500 mb-4">
                          Type a sweet wish, close your eyes, snap to blow the candle stick, or log your dreams below!
                        </p>

                        <form onSubmit={addNewWish} className="space-y-3">
                          <textarea
                            value={newWishInput}
                            onChange={(e) => setNewWishInput(e.target.value)}
                            placeholder="Type sibling wishes, goals for the year, or sweet jokes..."
                            className="w-full text-sm bg-pink-50/50 border-2 border-pink-200 rounded-2xl p-3 focus:outline-none focus:border-pink-400 transition-colors placeholder:text-pink-300 resize-none h-20"
                            rows={2}
                          />
                          <div className="flex gap-2">
                            <button
                              type="submit"
                              disabled={!newWishInput.trim()}
                              className="flex-1 px-4 py-2 bg-gradient-to-r from-pink-400 to-rose-400 text-white rounded-full text-xs font-cute font-bold transition-all hover:from-pink-500 hover:to-rose-500 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm flex items-center justify-center gap-1.5"
                              id="btn-submit-wish"
                            >
                              <Plus className="w-3.5 h-3.5" /> Add to Wishing Journal
                            </button>
                            
                            {candleLit && (
                              <button
                                type="button"
                                onClick={handleBlowoutCandle}
                                className="px-5 py-2 bg-amber-400 text-amber-950 rounded-full text-xs font-cute font-bold transition-all hover:bg-amber-500 active:scale-95 shadow-sm"
                                id="btn-blow-out-action"
                              >
                                Blow candle out! 💨
                              </button>
                            )}
                          </div>
                        </form>
                      </div>

                      {/* Wishing Journal Logs displaying actual wishes stored */}
                      <div className="bg-pink-50/50 rounded-2xl p-4 border border-pink-100 max-h-48 overflow-y-auto space-y-2">
                        <div className="flex items-center justify-between pb-1.5 border-b border-pink-100">
                          <span className="font-cute text-xs font-bold text-pink-600 uppercase tracking-widest flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 fill-pink-600 stroke-none" /> Sister Wish Board
                          </span>
                          <span className="text-[10px] text-zinc-400 italic">Saved locally</span>
                        </div>

                        {wishesList.length === 0 ? (
                          <p className="text-xs text-center text-slate-400 py-3">No logged wishes yet. Type one above!</p>
                        ) : (
                          wishesList.map((w, idx) => (
                            <div key={idx} className="flex items-start justify-between bg-white px-3 py-2 rounded-xl border border-pink-100 text-xs shadow-none">
                              <span className="text-slate-700 leading-relaxed pr-3">{w}</span>
                              <button
                                onClick={() => removeWish(idx)}
                                className="p-1 text-slate-300 hover:text-rose-500 active:scale-90 transition-colors"
                                aria-label="Delete wish log"
                              >
                                <Trash className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))
                        )}
                      </div>

                    </div>

                  </motion.div>
                )}


                {/* -------------------------------------------
                   TAB 3: THE COZY BULLETIN LOVE NOTE BOARD
                   ------------------------------------------- */}
                {activeTab === 'bulletin' && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                    id="panel-bulletin-loveboard"
                  >
                    
                    {/* Top title bar explaining note creation */}
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-pink-100 shadow-sm">
                      <div>
                        <h3 className="font-cute text-lg font-bold text-pink-600 flex items-center gap-1.5">
                          <Smile className="w-5 h-5 text-amber-500" /> Pink Ribbon Bulletin Board
                        </h3>
                        <p className="text-xs text-slate-500">
                          Add cozy birthday letters, family chimes, or happy sister memes right onto this board!
                        </p>
                      </div>

                      {/* Inline trigger button form */}
                      <form onSubmit={addBulletinNote} className="flex flex-wrap gap-2 w-full md:w-auto">
                        <input
                          type="text"
                          value={bulletinFrom}
                          onChange={(e) => setBulletinFrom(e.target.value)}
                          placeholder="Your name..."
                          className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-pink-300 w-full sm:w-28 text-slate-700"
                        />
                        <input
                          type="text"
                          required
                          value={bulletinText}
                          onChange={(e) => setBulletinText(e.target.value)}
                          placeholder="Write a sweet message note..."
                          className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-pink-300 flex-1 min-w-[150px] text-slate-700"
                        />
                        <button
                          type="submit"
                          className="px-4 py-2 bg-pink-500 text-white rounded-xl text-xs font-cute font-bold hover:bg-pink-600 transition-colors active:scale-95"
                          id="btn-add-note-bulletin"
                        >
                          Pin Note! 📌
                        </button>
                      </form>
                    </div>

                    {/* Actual sticky note grid imitating cork pin-board */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 p-4 bg-[radial-gradient(#ffe1ea_1px,_transparent_1.5px)] bg-[size:16px_16px] rounded-3xl min-h-[300px] border border-pink-100 inner-shadow bg-[#fffbfc] items-start">
                      
                      {bulletinNotes.map((item) => (
                        <motion.div
                          key={item.id}
                          className="p-4 rounded-2xl shadow-md border flex flex-col justify-between relative transform transition-all hover:scale-[1.02] hover:-translate-y-1 bg-white"
                          style={{ 
                            transform: isMobile ? 'none' : `rotate(${item.angle}deg)`,
                          }}
                          whileHover={{ rotate: 0 }}
                        >
                          {/* Pin Decorator indicator */}
                          <div className="absolute top-1 left-[50%] -translate-x-[50%] flex flex-col items-center">
                            <span className="w-3 h-3 rounded-full bg-rose-500 border border-rose-600 shadow animate-floatSoft" />
                            <span className="h-2 w-[1px] bg-slate-400" />
                          </div>

                          <div className="h-2.5" />

                          {/* Top Card Body */}
                          <div className={`${item.color} p-3 rounded-xl border-dashed border text-xs text-slate-700 leading-relaxed min-h-[100px] flex flex-col justify-center break-words`}>
                            "{item.note}"
                          </div>

                          {/* Card bottom details */}
                          <div className="mt-3 flex items-center justify-between gap-2 flex-wrap sm:flex-nowrap">
                            <span className="font-cute text-[10px] font-bold text-pink-600 bg-pink-50 px-2.5 py-1 rounded-full border border-pink-100 break-words line-clamp-2 md:line-clamp-none max-w-full">
                              ✍️ {item.from}
                            </span>

                            <button
                              onClick={() => deleteBulletinNote(item.id)}
                              className="text-slate-300 hover:text-rose-500 p-1 rounded-full hover:bg-rose-50 active:scale-90 transition-all shrink-0"
                              aria-label="Remove sticky note"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>

                        </motion.div>
                      ))}

                    </div>

                  </motion.div>
                )}


                {/* -------------------------------------------
                   TAB 4: DIGITAL PRESENT UNWRAPPING BOX & TROPHY
                   ------------------------------------------- */}
                {activeTab === 'gift' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center p-4 min-h-[400px]"
                    id="panel-gift-unwrapping"
                  >
                    
                    {/* Stage 0 / 1 / 2: Present Box rendering */}
                    {presentStep < 3 && (
                      <div className="flex flex-col items-center text-center max-w-sm">
                        
                        <h3 className="font-fancy text-3xl text-pink-500 font-bold mb-1">Unwrap Sis's Special Present! 🎁</h3>
                        <p className="text-xs text-slate-500 mb-8">
                          I packed a studio-level customizable trophy surprise. Click step-by-step to open!
                        </p>

                        <div className="relative w-64 h-64 flex items-center justify-center mb-6">
                          
                          {/* Present Box base wrapping visually */}
                          <motion.div
                            id="visual-hk-giftbox"
                            className="w-48 h-48 bg-gradient-to-b from-[#ff7096] to-[#ff477e] rounded-2xl relative shadow-2xl border-4 border-white flex items-center justify-center cursor-pointer"
                            onClick={() => {
                              if (presentStep === 0) {
                                setPresentStep(1);
                                synthInstance.playChime(329.63, 0.4); // E4
                              } else if (presentStep === 1) {
                                setPresentStep(2);
                                synthInstance.playChime(392.00, 0.4); // G4
                                triggerLocalConfettiBurst(window.innerWidth * 0.5, window.innerHeight * 0.5, 35);
                              }
                            }}
                            animate={presentStep === 0 ? {
                              rotate: [-1, 2, -2, 1, -1],
                              y: [0, -4, 0]
                            } : {}}
                            transition={{
                              repeat: Infinity,
                              duration: 3,
                              ease: "easeInOut"
                            }}
                          >
                            
                            {/* Horizontal Gold Ribbon Bow Ribbon */}
                            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-8 bg-amber-300 border-x-2 border-white" />
                            {/* Vertical Gold Ribbon Bow Ribbon */}
                            <div className="absolute inset-x-0 h-8 top-1/2 -translate-y-1/2 bg-amber-300 border-y-2 border-white" />

                            {/* Hello Kitty Bow Seal Top center of box */}
                            {presentStep < 2 && (
                              <div className="absolute -top-7 left-1/2 -translate-x-1/2 z-10 scale-125 hover:scale-135 transition-transform duration-300">
                                <HelloKittyBow className="w-16 h-13 animate-pulseGlow" />
                              </div>
                            )}

                            {/* Label sticker card tag */}
                            <div className="absolute top-1/3 left-6 p-2 bg-white/95 border border-pink-300 rounded-lg shadow transform -rotate-12 text-[10px] font-cute font-bold text-pink-600">
                              🌸 For Sis
                            </div>

                            {/* Step prompt message center */}
                            <div className="relative z-10 text-white font-cute font-extrabold text-sm uppercase tracking-wide bg-black/35 px-4 py-1.5 rounded-full select-none">
                              {presentStep === 0 && 'STEP 1: Untie Ribbon ✨'}
                              {presentStep === 1 && 'STEP 2: Lift Lid 🎂'}
                            </div>

                          </motion.div>
                          
                        </div>

                        {/* Text explanation */}
                        <button
                          onClick={() => {
                            if (presentStep === 0) setPresentStep(1);
                            else if (presentStep === 1) {
                              setPresentStep(2);
                              triggerLocalConfettiBurst(window.innerWidth * 0.5, window.innerHeight * 0.5, 30);
                            } else if (presentStep === 2) {
                              setPresentStep(3);
                              triggerLocalConfettiBurst(window.innerWidth * 0.5, window.innerHeight * 0.5, 50);
                              synthInstance.playChime(523.25, 1.2, "sine"); // High sound C5
                            }
                          }}
                          className="px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-cute font-bold hover:shadow-lg hover:scale-103 transition-all active:scale-95"
                          id="btn-next-unwrap-step"
                        >
                          {presentStep === 0 && 'Untie the Beautiful Pink Ribbon 🎀'}
                          {presentStep === 1 && 'Pop the Present Lid Off! 🧁'}
                          {presentStep === 2 && 'Expose the Heartfelt Surprise! 🥇'}
                        </button>

                      </div>
                    )}

                    {/* Stage 3: Certified Hall of Fame Sister Trophy Present! */}
                    {presentStep === 3 && (
                      <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className="w-full max-w-xl bg-white p-6 md:p-8 rounded-3xl border-8 border-yellow-200 shadow-2xl relative text-center overflow-hidden"
                      >
                        {/* Shimmer glowing backdrop */}
                        <div className="absolute -inset-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-100/40 via-transparent to-transparent pointer-events-none" />

                        {/* Top ribbon border decor */}
                        <div className="absolute top-0 inset-x-0 h-4 bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-300" />

                        <div className="flex justify-between items-start mt-2">
                          <Star className="w-6 h-6 text-yellow-500 fill-yellow-200 animate-spin" style={{ animationDuration: '6s' }} />
                          <div className="flex justify-center -mt-8">
                            <div className="bg-amber-100 rounded-full p-4 border-4 border-white shadow-md">
                              <Award className="w-14 h-14 text-yellow-600 animate-floatSoft" />
                            </div>
                          </div>
                          <Star className="w-6 h-6 text-yellow-500 fill-yellow-200 animate-spin" style={{ animationDuration: '8s' }} />
                        </div>

                        <span className="font-cute text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-3 py-1 font-bold tracking-widest uppercase mt-4 inline-block">
                          Official Sister Certification Hall of Fame
                        </span>

                        <h3 className="font-fancy text-4xl text-[#ca8a04] font-bold mt-3 tracking-wide">
                          World's Best Sister Award
                        </h3>

                        {/* Customize recipient sister name form */}
                        <div className="my-5 max-w-xs mx-auto space-y-1.5 bg-yellow-50/40 p-3 rounded-2xl border border-yellow-100">
                          <label className="block text-[10px] text-amber-800 font-cute uppercase tracking-wider font-extrabold text-left ml-1">Recipient Sister Name:</label>
                          <input
                            type="text"
                            value={recipientSisterName}
                            onChange={(e) => setRecipientSisterName(e.target.value)}
                            placeholder="Type sister name here..."
                            className="w-full text-center text-sm font-cute font-extrabold capitalize bg-white border border-amber-300 rounded-xl px-3 py-1.5 focus:outline-none focus:border-amber-500 text-amber-950 shadow-sm"
                          />
                        </div>

                        <p className="text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
                          This prestigious badge is hereby decorated upon <strong className="text-slate-800 font-extrabold font-cute text-base capitalize bg-yellow-50 px-1 py-0.5 rounded">{recipientSisterName}</strong> for being the most compassionate, loving, beautiful, and outstanding sister in the cosmos!
                        </p>

                        <div className="mt-6 flex flex-wrap justify-center gap-6 items-center border-t border-amber-100 pt-5">
                          <div className="text-center">
                            <span className="block font-mono text-[10px] text-zinc-400 capitalize">Issued Date:</span>
                            <span className="font-cute text-xs font-bold text-slate-700">June 14, 2026 📅</span>
                          </div>
                          
                          <div className="w-12 h-12">
                            <HelloKittyMiniFace className="w-full h-full" />
                          </div>

                          <div className="text-center">
                            <span className="block font-mono text-[10px] text-zinc-400">Signature:</span>
                            <span className="font-fancy text-sm text-[#ff5c8a] font-bold underline">Family Helper 🎀</span>
                          </div>
                        </div>

                        {/* Reset wrap or download option triggers */}
                        <div className="mt-6 flex gap-2 justify-center">
                          <button
                            onClick={() => {
                              setPresentStep(0);
                              synthInstance.playChime(261.63, 0.3); // C4
                            }}
                            className="text-xs font-cute text-amber-700 hover:underline bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-full px-4 py-2 transition-all active:scale-95"
                            id="btn-rebox-gift"
                          >
                            🎁 Wrap Gift Again
                          </button>
                          
                          <button
                            onClick={() => {
                              window.print();
                            }}
                            className="text-xs font-cute bg-[#ca8a04] text-white hover:bg-yellow-700 rounded-full px-4 py-2 select-all transition-all active:scale-95 shadow-sm"
                            id="btn-print-trophy"
                          >
                            🖨️ Print Sister Award
                          </button>
                        </div>

                      </motion.div>
                    )}

                  </motion.div>
                )}

              </div>

            </div>


            {/* =======================================================
               GALLERY TILES COLLECTION SECTION
               ======================================================= */}
            <div id="additional-album-gallery" className="w-full mt-10 space-y-6">
              
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-pink-500 animate-pulseGlow" />
                <h3 className="font-cute text-2xl font-bold text-slate-800">
                  Sister's Polaroid Album Tiles
                </h3>
              </div>

              {/* Grid of Polaroid layout cells with image placeholders */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                <div className="bg-white p-4.5 rounded-3xl border border-pink-100 shadow-sm relative group hover:shadow-md transition-all">
                  <div className="absolute top-1 left-[50%] -translate-x-[50%] z-10 scale-90">
                    <HelloKittyBow className="w-8 h-7" />
                  </div>
                  <div className="h-4" />
                  <PhotoSlot src="/photos/gallery-1.png" alt="Sister laughing in nature" label="Gallery 01" note="Put this image at public/photos/gallery-1.jpg" variant="kitty" className="group" />
                  <p className="font-cute text-[11px] text-slate-400 mt-3 text-center">📷 Cozy Flower snapshot</p>
                </div>

                <div className="bg-white p-4.5 rounded-3xl border border-pink-100 shadow-sm relative group hover:shadow-md transition-all">
                  <div className="absolute top-1 left-[50%] -translate-x-[50%] z-10 scale-90">
                    <HelloKittyBow className="w-8 h-7" />
                  </div>
                  <div className="h-4" />
                  <PhotoSlot src="/photos/gallery-2.png" alt="Fun selfie or photo booth moment" label="Gallery 02" note="Put this image at public/photos/gallery-2.jpg" variant="heart" className="group" />
                  <p className="font-cute text-[11px] text-slate-400 mt-3 text-center">📷 Silly Selfie frame</p>
                </div>

                <div className="bg-white p-4.5 rounded-3xl border border-pink-100 shadow-sm relative group hover:shadow-md transition-all">
                  <div className="absolute top-1 left-[50%] -translate-x-[50%] z-10 scale-90">
                    <HelloKittyBow className="w-8 h-7" />
                  </div>
                  <div className="h-4" />
                  <PhotoSlot src="/photos/gallery-3.png" alt="Coffee or casual moment" label="Gallery 03" note="Put this image at public/photos/gallery-3.jpg" variant="kitty" className="group" />
                  <p className="font-cute text-[11px] text-slate-400 mt-3 text-center">📷 Coffee Escalation moment</p>
                </div>

                <div className="bg-white p-4.5 rounded-3xl border border-pink-100 shadow-sm relative group hover:shadow-md transition-all">
                  <div className="absolute top-1 left-[50%] -translate-x-[50%] z-10 scale-90">
                    <HelloKittyBow className="w-8 h-7" />
                  </div>
                  <div className="h-4" />
                  <PhotoSlot src="/photos/gallery-4.png" alt="Celebration or family graduation photo" label="Gallery 04" note="Put this image at public/photos/gallery-4.jpg" variant="heart" className="group" />
                  <p className="font-cute text-[11px] text-slate-400 mt-3 text-center">📷 Landmark Milestone memories</p>
                </div>

              </div>

            </div>


            {/* =======================================================
               FOOTER: HEARTFELT CREATORS ACCENTS
               ======================================================= */}
            <footer className="w-full mt-16 pt-8 border-t border-pink-200/60 pb-12 flex flex-col items-center justify-between gap-4 text-center">
              
              <div className="flex gap-1 items-center animate-floatSoft">
                <HelloKittyMiniFace className="w-10 h-8" />
                <HelloKittyBow className="w-8.5 h-7" />
              </div>

              <div className="space-y-1">
                <p className="font-fancy text-lg text-pink-500 font-semibold italic">
                  "Sisters may fight, sisters may bicker, but sisters love is thicker than thicker!"
                </p>
                <p className="text-xs text-slate-500 tracking-wide font-cute font-medium">
                  Designed with infinite love, cozy pastel glows, and real Web Audio chimes for a truly magical Sister!
                </p>
              </div>

              <p className="text-[10px] text-zinc-400 font-mono">
                📅 June 14, 2026 // Sister's Special Edition Card
              </p>

            </footer>

          </motion.div>

        </div>
      )}

    </div>
  );
}
