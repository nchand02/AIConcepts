import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Chapter, ContentType, CalloutType, ContentBlock } from '../types';
import MermaidDiagram from './MermaidDiagram';
import { AlertTriangle, Info, Lightbulb, BookOpen, ShieldAlert, CheckCircle2, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface ChapterViewProps {
  chapter: Chapter;
  isComplete: boolean;
  onToggleComplete: () => void;
}

const ChapterView: React.FC<ChapterViewProps> = ({ chapter, isComplete, onToggleComplete }) => {
  // Scroll to top on chapter change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [chapter.id]);

  const renderCallout = (block: ContentBlock) => {
    let icon = <Info className="w-5 h-5" />;
    let bgClass = 'bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800';
    let textClass = 'text-blue-800 dark:text-blue-200';

    switch (block.variant) {
        case CalloutType.WARNING:
            icon = <AlertTriangle className="w-5 h-5" />;
            bgClass = 'bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800';
            textClass = 'text-amber-800 dark:text-amber-200';
            break;
        case CalloutType.TIP:
            icon = <Lightbulb className="w-5 h-5" />;
            bgClass = 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800';
            textClass = 'text-emerald-800 dark:text-emerald-200';
            break;
        case CalloutType.DEEP_DIVE:
            // Rendered differently below (collapsible)
            return null;
        case CalloutType.PITFALL:
            icon = <ShieldAlert className="w-5 h-5" />;
            bgClass = 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800';
            textClass = 'text-red-800 dark:text-red-200';
            break;
        case CalloutType.BEST_PRACTICE:
            icon = <CheckCircle2 className="w-5 h-5" />;
            bgClass = 'bg-teal-50 dark:bg-teal-900/10 border-teal-200 dark:border-teal-800';
            textClass = 'text-teal-800 dark:text-teal-200';
            break;
    }

    return (
      <div className={`my-6 p-5 rounded-xl border ${bgClass} flex gap-4 shadow-sm`} key={block.id}>
        <div className={`mt-0.5 flex-shrink-0 ${textClass}`}>{icon}</div>
        <div>
          {block.title && <h4 className={`font-bold mb-2 text-sm uppercase tracking-wide ${textClass}`}>{block.title}</h4>}
          <div className="text-slate-700 dark:text-slate-300 text-base leading-relaxed">
             {Array.isArray(block.content) ? block.content.map((c,i) => <p key={i} className="mb-2 last:mb-0">{c}</p>) : block.content}
          </div>
        </div>
      </div>
    );
  };

  const renderDeepDive = (block: ContentBlock) => {
      const [isOpen, setIsOpen] = useState(false);
      
      return (
          <div key={block.id} className="my-8 border border-indigo-200 dark:border-indigo-900 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-sm">
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 bg-indigo-50 dark:bg-indigo-950/30 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors text-left"
              >
                  <div className="flex items-center gap-3">
                      <div className="p-1.5 bg-indigo-200 dark:bg-indigo-800 rounded-md text-indigo-700 dark:text-indigo-200">
                          <BookOpen className="w-4 h-4" />
                      </div>
                      <span className="font-bold text-indigo-900 dark:text-indigo-100">Deep Dive: {block.title}</span>
                  </div>
                  {isOpen ? <ChevronUp className="w-5 h-5 text-indigo-400" /> : <ChevronDown className="w-5 h-5 text-indigo-400" />}
              </button>
              {isOpen && (
                  <div className="p-6 border-t border-indigo-100 dark:border-indigo-900 bg-white dark:bg-slate-950 animate-fade-in">
                      <div className="prose dark:prose-invert max-w-none">
                          <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                              {block.content}
                          </p>
                      </div>
                  </div>
              )}
          </div>
      )
  }

  const renderQuiz = (block: ContentBlock) => {
      const [selected, setSelected] = useState<string | null>(null);
      const [showResult, setShowResult] = useState(false);

      return (
          <div key={block.id} className="my-8 p-6 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2 mb-4 text-primary-600 dark:text-primary-400 font-bold text-sm uppercase tracking-wider">
                  <HelpCircle className="w-4 h-4" />
                  Review Question
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">{block.title}</h3>
              
              <div className="space-y-3">
                  {block.options?.map((option) => {
                      let btnClass = "border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800";
                      if (showResult) {
                          if (option.isCorrect) btnClass = "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200";
                          else if (selected === option.id) btnClass = "border-red-300 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200";
                      } else if (selected === option.id) {
                          btnClass = "border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-800 dark:text-primary-200";
                      }

                      return (
                        <button
                            key={option.id}
                            onClick={() => !showResult && setSelected(option.id)}
                            disabled={showResult}
                            className={`w-full text-left p-4 rounded-lg border-2 transition-all ${btnClass} ${!showResult ? 'active:scale-[0.99]' : ''}`}
                        >
                            {option.text}
                        </button>
                      )
                  })}
              </div>

              {!showResult ? (
                  <button 
                    onClick={() => setShowResult(true)}
                    disabled={!selected}
                    className="mt-6 px-6 py-2 bg-primary-600 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-700 transition-colors"
                  >
                      Check Answer
                  </button>
              ) : (
                  <div className="mt-6 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg animate-fade-in">
                      <span className="font-bold text-slate-900 dark:text-white block mb-1">Explanation:</span>
                      <p className="text-slate-700 dark:text-slate-300 text-sm">{block.answerExplanation}</p>
                  </div>
              )}
          </div>
      );
  }

  const renderKeyTerms = (block: ContentBlock) => {
      const terms = (block.content as string).split('\n').map(t => {
          const [term, def] = t.split(':');
          return { term, def };
      });

      return (
          <div key={block.id} className="my-8 border-t border-b border-slate-200 dark:border-slate-800 py-8">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Key Terminology</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                  {terms.map((t, i) => (
                      <div key={i} className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                          <span className="block font-bold text-primary-600 dark:text-primary-400 mb-1">{t.term}</span>
                          <span className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{t.def}</span>
                      </div>
                  ))}
              </div>
          </div>
      )
  }

  // Generate keywords from sections for SEO
  const keywords = [
    chapter.title, 
    "AI Education", 
    "Machine Learning",
    ...chapter.sections.map(s => s.title)
  ].join(", ");

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 animate-fade-in pb-32">
      {/* React 19 Native Metadata Hoisting */}
      <title>{chapter.title} - AI Tutorial Hub</title>
      <meta name="description" content={chapter.description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={`https://ai-tutorial-hub.com/chapter/${chapter.slug}`} />
      
      {/* Structured Data: Article & Breadcrumbs */}
      <script type="application/ld+json">
        {JSON.stringify([
          {
            "@context": "https://schema.org",
            "@type": "TechArticle",
            "headline": chapter.title,
            "description": chapter.description,
            "articleSection": "Artificial Intelligence",
            "keywords": keywords,
            "author": { "@type": "Organization", "name": "AI Tutorial Hub" }
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://ai-tutorial-hub.com/" },
              { "@type": "ListItem", "position": 2, "name": chapter.title, "item": `https://ai-tutorial-hub.com/chapter/${chapter.slug}` }
            ]
          }
        ])}
      </script>

      {/* Breadcrumbs */}
      <nav className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-8">
          <Link to="/" className="hover:text-primary-600 transition-colors">Home</Link>
          <ChevronDown className="w-4 h-4 -rotate-90 mx-2" />
          <span className="font-medium text-slate-900 dark:text-white">{chapter.title}</span>
      </nav>

      <header className="mb-12 border-b border-slate-200 dark:border-slate-800 pb-8">
        <span className="inline-block px-3 py-1 mb-4 text-xs font-bold uppercase tracking-wider text-primary-700 bg-primary-100 rounded-full dark:bg-primary-900/30 dark:text-primary-300">
            Module {chapter.id.toUpperCase().replace('C','')}
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
          {chapter.title}
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-light">
          {chapter.description}
        </p>
      </header>

      <div className="space-y-16">
        {chapter.sections.map((section) => (
          <section key={section.id} className="scroll-mt-24" id={section.id}>
            <div className="flex items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mr-4">
                {section.title}
                </h2>
                <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800"></div>
            </div>
            
            <div className="space-y-6">
              {section.blocks.map((block) => {
                switch (block.type) {
                  case ContentType.TEXT:
                    return (
                      <div key={block.id} className="text-slate-700 dark:text-slate-300 leading-8 text-lg">
                        {Array.isArray(block.content) ? block.content.map((p, i) => <p key={i} className="mb-4 last:mb-0">{p}</p>) : <p>{block.content}</p>}
                      </div>
                    );
                  case ContentType.MERMAID:
                    return <MermaidDiagram key={block.id} chart={block.content as string} />;
                  case ContentType.CALLOUT:
                    if (block.variant === CalloutType.DEEP_DIVE) return renderDeepDive(block);
                    return renderCallout(block);
                  case ContentType.QUIZ:
                    return renderQuiz(block);
                  case ContentType.KEY_TERMS:
                    return renderKeyTerms(block);
                  case ContentType.CODE:
                    return (
                      <div key={block.id} className="my-6 rounded-xl overflow-hidden bg-slate-900 shadow-lg border border-slate-800">
                         <div className="bg-slate-950/50 px-4 py-2 border-b border-slate-800 text-xs text-slate-400 font-mono flex justify-between items-center">
                             <span className="font-bold text-emerald-400">{block.title || 'Code'}</span>
                             <span className="text-[10px] uppercase opacity-50">ReadOnly</span>
                         </div>
                         <div className="p-4 overflow-x-auto custom-scrollbar">
                            <pre className="text-sm font-mono text-slate-300 leading-relaxed">
                                <code>{block.content}</code>
                            </pre>
                         </div>
                      </div>
                    );
                  case ContentType.LIST:
                       return (
                           <ul key={block.id} className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300 text-lg my-4 pl-4 border-l-2 border-slate-200 dark:border-slate-800">
                               {(block.content as string).split('\n').map((item, i) => (
                                   <li key={i} className="pl-2">{item.replace(/^\d+\.\s*/, '')}</li>
                               ))}
                           </ul>
                       )
                  case ContentType.TABLE:
                      // Simple table parser
                      const rows = (block.content as string).split('\n').map(r => r.split('|').map(c => c.trim())).filter(r => r.length > 1);
                      const header = rows[0];
                      const body = rows.slice(2); 
                      return (
                          <div key={block.id} className="my-8 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                              <table className="w-full text-sm text-left text-slate-500 dark:text-slate-400">
                                  <thead className="text-xs text-slate-700 uppercase bg-slate-50 dark:bg-slate-800 dark:text-slate-300">
                                      <tr>
                                          {header.map((h, i) => <th key={i} className="px-6 py-4">{h}</th>)}
                                      </tr>
                                  </thead>
                                  <tbody>
                                      {body.map((row, i) => (
                                          <tr key={i} className="bg-white border-b dark:bg-slate-900 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                              {row.map((cell, j) => <td key={j} className="px-6 py-4">{cell}</td>)}
                                          </tr>
                                      ))}
                                  </tbody>
                              </table>
                          </div>
                      )
                  default:
                    return null;
                }
              })}
            </div>
          </section>
        ))}
      </div>

      {/* Action Bar */}
      <div className="mt-20 p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 text-center">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Finished this module?
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
              Mark it as complete to track your progress on the homepage.
          </p>
          <button 
            onClick={onToggleComplete}
            className={`inline-flex items-center px-8 py-3 rounded-xl font-bold transition-all transform active:scale-95 ${
                isComplete 
                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-900' 
                : 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:shadow-lg'
            }`}
          >
              {isComplete ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                    Completed
                  </>
              ) : (
                  "Mark as Complete"
              )}
          </button>
      </div>

      <footer className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-xs text-slate-400 uppercase tracking-wider">
        <p>© 2025 AI Tutorial Hub</p>
        <p>Open Source Education</p>
      </footer>
    </div>
  );
};

export default ChapterView;