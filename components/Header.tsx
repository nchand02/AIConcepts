import React, { useState } from 'react';
import { Menu, Moon, Sun, Search, X, Github } from 'lucide-react';
import { CURRICULUM } from '../constants';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  toggleSidebar: () => void;
  isDark: boolean;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, isDark, toggleTheme }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Simple client-side search
  const searchResults = searchQuery.length < 2 ? [] : CURRICULUM.flatMap(chapter => 
    chapter.sections.flatMap(section => {
      const matches = section.blocks.filter(b => 
        typeof b.content === 'string' && b.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (matches.length > 0 || section.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        return [{
          chapter: chapter,
          section: section,
          excerpt: matches[0]?.content.toString().slice(0, 60) + '...' || ''
        }];
      }
      return [];
    })
  );

  const handleNavigate = (slug: string, sectionId: string) => {
    navigate(`/chapter/${slug}`);
    setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <button
              onClick={toggleSidebar}
              type="button"
              className="inline-flex items-center p-2 text-sm text-slate-500 rounded-lg md:hidden hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200 dark:text-slate-400 dark:hover:bg-slate-700 dark:focus:ring-slate-600"
            >
              <span className="sr-only">Open sidebar</span>
              <Menu className="w-6 h-6" />
            </button>
            <a href="#" className="flex ml-2 md:mr-24">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                AI Tutorial Hub
              </span>
            </a>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="relative hidden md:block">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              </div>
              <input 
                type="text" 
                className="block w-full p-2 pl-10 text-sm text-slate-900 border border-slate-300 rounded-lg bg-slate-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                placeholder="Search docs..." 
                onClick={() => setIsSearchOpen(true)}
                readOnly
              />
            </div>

             {/* Mobile Search Trigger */}
             <button onClick={() => setIsSearchOpen(true)} className="p-2 text-slate-500 rounded-lg md:hidden hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700">
               <Search className="w-5 h-5" />
             </button>

            <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2 text-slate-500 rounded-lg hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700">
                <Github className="w-5 h-5" />
            </a>

            <button
              onClick={toggleTheme}
              className="p-2 text-slate-500 rounded-lg hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center pt-20 bg-slate-900/50 backdrop-blur-sm">
            <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden m-4">
                <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
                    <Search className="w-5 h-5 text-slate-400" />
                    <input 
                        autoFocus
                        type="text"
                        placeholder="Find in documentation..."
                        className="flex-1 bg-transparent border-none outline-none text-slate-900 dark:text-white placeholder-slate-400"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button onClick={() => setIsSearchOpen(false)}>
                        <X className="w-5 h-5 text-slate-400 hover:text-slate-600" />
                    </button>
                </div>
                <div className="max-h-[60vh] overflow-y-auto p-2">
                    {searchResults.length === 0 && searchQuery.length > 0 && (
                        <div className="p-8 text-center text-slate-500">No results found</div>
                    )}
                     {searchResults.length === 0 && searchQuery.length === 0 && (
                        <div className="p-8 text-center text-slate-500 text-sm">Type to search topics like "Transformers", "Agents", "RAG"...</div>
                    )}
                    {searchResults.map((res, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleNavigate(res.chapter.slug, res.section.id)}
                            className="w-full text-left p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 group"
                        >
                            <div className="text-xs font-medium text-primary-600 dark:text-primary-400 mb-1">
                                {res.chapter.title}
                            </div>
                            <div className="font-medium text-slate-900 dark:text-slate-100">
                                {res.section.title}
                            </div>
                            {res.excerpt && (
                                <div className="text-sm text-slate-500 mt-1 line-clamp-1">
                                    {res.excerpt}
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>
      )}
    </nav>
  );
};

export default Header;