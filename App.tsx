import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ChapterView from './components/ChapterView';
import { CURRICULUM } from './constants';
import { CheckCircle, BookOpen, Cpu, Network, Layers, BrainCircuit, Award } from 'lucide-react';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
             (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  // Progress Tracking State
  const [completedChapters, setCompletedChapters] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('completedChapters');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  useEffect(() => {
    localStorage.setItem('completedChapters', JSON.stringify(Array.from(completedChapters)));
  }, [completedChapters]);

  const toggleTheme = () => setIsDark(!isDark);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  
  const markChapterComplete = (chapterId: string) => {
    setCompletedChapters(prev => {
        const newSet = new Set(prev);
        if (newSet.has(chapterId)) {
            newSet.delete(chapterId);
        } else {
            newSet.add(chapterId);
        }
        return newSet;
    });
  };

  const progress = Math.round((completedChapters.size / CURRICULUM.length) * 100);

  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col">
        <Header 
            toggleSidebar={toggleSidebar} 
            isDark={isDark} 
            toggleTheme={toggleTheme} 
        />
        
        <Sidebar 
            chapters={CURRICULUM} 
            isOpen={isSidebarOpen} 
            closeMobile={() => setIsSidebarOpen(false)}
            completedChapters={completedChapters}
        />

        <main className={`flex-1 p-4 md:ml-72 pt-20 transition-all duration-300`}>
          <Routes>
            <Route path="/" element={
                <div className="max-w-4xl mx-auto py-8 md:py-12 animate-fade-in">
                    <title>AI Tutorial Hub | Free Comprehensive AI & Machine Learning Course</title>
                    <meta name="description" content="Start your journey with AI Tutorial Hub. A free, open-source educational portal for mastering Artificial Intelligence, Machine Learning, Deep Learning, and RAG systems." />
                    <link rel="canonical" href="https://ai-tutorial-hub.com/" />
                    
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center justify-center p-2 px-3 mb-4 text-sm font-medium text-primary-700 bg-primary-100 rounded-full dark:bg-primary-900/30 dark:text-primary-300">
                           <span className="w-2 h-2 mr-2 bg-primary-500 rounded-full animate-pulse"></span>
                           Updated for 2025 GenAI Stack
                        </div>
                        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">
                            Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600 dark:from-primary-400 dark:to-indigo-400">Modern AI</span>
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
                            A professional, open-source learning path designed for engineers. 
                            From <strong>Neural Networks</strong> to <strong>RAG Agents</strong>.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                             <a href="#/chapter/foundations" className="inline-flex items-center justify-center px-8 py-3.5 text-base font-bold text-white bg-primary-600 rounded-xl hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/30 hover:scale-105">
                                Start Free Course
                                <BookOpen className="w-5 h-5 ml-2" />
                            </a>
                             <a href="https://github.com" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center px-8 py-3.5 text-base font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
                                View Source
                            </a>
                        </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3 mb-16">
                         {[
                            { icon: <BrainCircuit />, title: "Foundations", desc: "Master the math and logic behind Neural Networks." },
                            { icon: <Layers />, title: "Architecture", desc: "Deep dive into Transformers, Attention, and Tokenization." },
                            { icon: <Network />, title: "Production", desc: "Build RAG pipelines, Agents, and fine-tune models." },
                         ].map((item, i) => (
                            <div key={i} className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 hover:border-primary-200 dark:hover:border-primary-900 transition-colors">
                                <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center text-primary-600 dark:text-primary-400 mb-4 shadow-sm">
                                    {item.icon}
                                </div>
                                <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">{item.title}</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                         ))}
                    </div>

                    <div className="border-t border-slate-200 dark:border-slate-800 pt-12">
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Your Curriculum</h2>
                        </div>

                        {/* Progress Dashboard */}
                        <div className="mb-10 p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                            <div className="flex justify-between items-end mb-4 relative z-10">
                                <div>
                                    <div className="flex items-center gap-2 text-sm font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wider mb-1">
                                        <Award className="w-4 h-4" />
                                        Current Progress
                                    </div>
                                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                                        {completedChapters.size} <span className="text-slate-400 text-lg font-normal">/ {CURRICULUM.length} Modules Completed</span>
                                    </p>
                                </div>
                                <span className="text-4xl font-black text-slate-200 dark:text-slate-700">
                                    {progress}%
                                </span>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-3 dark:bg-slate-800 overflow-hidden relative z-10">
                                <div 
                                    className="bg-gradient-to-r from-primary-500 to-indigo-600 h-3 rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(59,130,246,0.5)]" 
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {CURRICULUM.map((chapter, index) => (
                                <a key={chapter.id} href={`#/chapter/${chapter.slug}`} className="group flex items-center p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-primary-300 dark:hover:border-primary-700 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all">
                                    <div className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full mr-4 text-sm font-bold transition-colors ${
                                        completedChapters.has(chapter.id) 
                                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                                        : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400 group-hover:bg-white dark:group-hover:bg-slate-700'
                                    }`}>
                                        {completedChapters.has(chapter.id) ? <CheckCircle className="w-5 h-5" /> : index + 1}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className={`font-semibold transition-colors ${
                                            completedChapters.has(chapter.id) 
                                            ? 'text-slate-500 dark:text-slate-500 line-through decoration-slate-300 dark:decoration-slate-700' 
                                            : 'text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400'
                                        }`}>
                                            {chapter.title}
                                        </h3>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-1">
                                            {chapter.description}
                                        </p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            } />
            {CURRICULUM.map((chapter) => (
              <Route
                key={chapter.id}
                path={`/chapter/${chapter.slug}`}
                element={
                    <ChapterView 
                        chapter={chapter} 
                        isComplete={completedChapters.has(chapter.id)}
                        onToggleComplete={() => markChapterComplete(chapter.id)}
                    />
                }
              />
            ))}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;