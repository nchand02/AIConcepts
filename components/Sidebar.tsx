import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, ChevronRight, Circle, CheckCircle2 } from 'lucide-react';
import { Chapter } from '../types';

interface SidebarProps {
  chapters: Chapter[];
  isOpen: boolean;
  closeMobile: () => void;
  completedChapters: Set<string>;
}

const Sidebar: React.FC<SidebarProps> = ({ chapters, isOpen, closeMobile, completedChapters }) => {
  const location = useLocation();
  const progress = Math.round((completedChapters.size / chapters.length) * 100);

  return (
    <aside
      className={`fixed top-0 left-0 z-40 w-72 h-screen pt-16 transition-transform bg-slate-50 dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0`}
    >
      <div className="h-full px-3 pb-20 overflow-y-auto custom-scrollbar">
        <ul className="space-y-1 font-medium mt-4">
          <li>
             <Link
                to="/"
                onClick={closeMobile}
                className={`flex items-center p-2 rounded-lg group transition-colors mb-4 ${
                  location.pathname === '/' 
                    ? 'bg-white dark:bg-slate-900 shadow-sm text-primary-600 dark:text-primary-400 border border-slate-200 dark:border-slate-800' 
                    : 'text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                <BookOpen className="w-5 h-5 transition duration-75" />
                <span className="ml-3">Course Overview</span>
              </Link>
          </li>
          
          <div className="px-2 mt-6 mb-6">
             <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-500 uppercase dark:text-slate-400 tracking-wider">
                  Progress
                </span>
                <span className="text-xs font-bold text-primary-600 dark:text-primary-400">
                    {progress}%
                </span>
             </div>
             <div className="w-full bg-slate-200 rounded-full h-1.5 dark:bg-slate-800">
                <div 
                    className="bg-primary-600 h-1.5 rounded-full transition-all duration-500 ease-out" 
                    style={{ width: `${progress}%` }}
                ></div>
             </div>
          </div>

          <div className="px-2 mb-2">
             <span className="text-xs font-bold text-slate-400 uppercase dark:text-slate-500 tracking-wider">
               Modules
             </span>
          </div>

          {chapters.map((chapter) => {
            const isActive = location.pathname === `/chapter/${chapter.slug}`;
            const isCompleted = completedChapters.has(chapter.id);
            
            return (
              <li key={chapter.id} className="mb-1">
                <Link
                  to={`/chapter/${chapter.slug}`}
                  onClick={closeMobile}
                  className={`flex items-center p-2 rounded-lg group transition-colors ${
                    isActive
                      ? 'bg-white dark:bg-slate-900 shadow-sm text-primary-700 dark:text-primary-400 border border-slate-200 dark:border-slate-800'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <div className={`min-w-[20px] flex justify-center mr-2`}>
                      {isCompleted ? (
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                      ) : isActive ? (
                           <Circle className="w-2 h-2 fill-current" />
                      ) : (
                          <Circle className="w-2 h-2 text-slate-300 dark:text-slate-700" />
                      )}
                  </div>
                  <span className="flex-1 text-sm font-medium">{chapter.title}</span>
                </Link>

                {/* Subsections / Table of Contents for Active Chapter */}
                {isActive && (
                    <div className="ml-9 mt-1 border-l border-slate-200 dark:border-slate-800 space-y-1 animate-fade-in">
                        {chapter.sections.map(section => (
                            <a 
                                key={section.id}
                                href={`#${section.id}`}
                                className="block pl-4 py-1.5 text-xs text-slate-500 hover:text-slate-900 dark:text-slate-500 dark:hover:text-slate-300 transition-colors truncate"
                            >
                                {section.title}
                            </a>
                        ))}
                    </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;