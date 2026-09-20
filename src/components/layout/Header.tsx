import React, { useState } from 'react';
import { useAutomation } from '../../context/AutomationContext';
import {
  Bell,
  Search,
  Plus,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  ShieldCheck,
  Moon,
  Sun,
} from 'lucide-react';

export const Header: React.FC = () => {
  const { currentTab, navigateTo, activities, showToast, isDarkMode, toggleDarkMode } = useAutomation();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const getPageMeta = () => {
    switch (currentTab) {
      case 'overview':
        return { title: 'Overview', jp: '統制空間' };
      case 'create':
        return { title: 'Create', jp: '作成器' };
      case 'builder':
        return { title: 'Builder', jp: '設計図' };
      case 'library':
        return { title: 'Blueprint Library', jp: '文庫' };
      case 'automations':
        return { title: 'Automations', jp: '自動化目録' };
      case 'analytics':
        return { title: 'Analytics', jp: '運用分析' };
      case 'activity':
        return { title: 'Activity', jp: '監査証跡' };
      case 'settings':
        return { title: 'Configuration', jp: '設定' };
      default:
        return { title: 'Workspace', jp: '空間' };
    }
  };

  const pageMeta = getPageMeta();

  return (
    <>
      <header className="h-14 border-b border-black/[0.06] dark:border-white/[0.08] bg-[#FAF9F7]/90 dark:bg-[#0a0a0b]/90 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between sticky top-0 z-10 select-none transition-colors duration-200">
        {/* Left Breadcrumb / Node Identifier */}
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-[11px] font-mono text-slate-400 dark:text-slate-600 uppercase tracking-wider hidden sm:inline">
            KAIRO
          </span>
          <span className="text-slate-300 dark:text-slate-700 text-xs hidden sm:inline">/</span>
          <div className="flex items-baseline gap-2">
            <h1 className="text-[13.5px] font-semibold text-[#121316] dark:text-slate-200 tracking-tight">
              {pageMeta.title}
            </h1>
          </div>

          {currentTab === 'builder' && (
            <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-control text-[10px] font-mono font-medium bg-emerald-50 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200/70 dark:border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              LIVE CANVAS
            </span>
          )}
        </div>

        {/* Right System Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="w-7 h-7 flex items-center justify-center rounded-control text-slate-500 dark:text-slate-400 hover:text-[#121316] dark:hover:text-slate-200 hover:bg-black/[0.04] dark:hover:bg-white/[0.05] transition-colors pressable"
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Sovereign Security Badge */}
          {/* <div className="hidden lg:flex items-center gap-1.5 px-2 py-1 rounded-control bg-black/[0.03] border border-black/[0.06] text-[10.5px] font-mono text-slate-600">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>CONFIDENTIAL // AIR-GAPPED</span>
          </div> */}

          {/* Command Search Trigger */}
          <button
            onClick={() => setSearchModalOpen(true)}
            className="flex items-center gap-2 px-2.5 py-1 text-xs text-slate-500 dark:text-slate-400 bg-white dark:bg-[#18181b] hover:bg-slate-50 dark:hover:bg-[#27272a] hover:text-slate-900 dark:hover:text-slate-200 rounded-control border border-black/[0.07] dark:border-white/[0.08] shadow-2xs transition-colors pressable"
            title="Search or execute system command (⌘K)"
          >
            <Search className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
            <span className="text-[12px] hidden md:inline">Command...</span>
          </button>

          {/* Quick Create Mission CTA */}
          {currentTab !== 'create' && currentTab !== 'builder' && (
            <button
              onClick={() => navigateTo('create')}
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-white bg-[#121316] dark:bg-[#fafafa] dark:text-[#0a0a0b] hover:bg-[#1D4ED8] dark:hover:bg-[#e4e4e7] rounded-control shadow-2xs transition-all pressable"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Compose Task</span>
            </button>
          )}

          {/* Notification Button & Origin-Aware Popover */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="w-7 h-7 flex items-center justify-center rounded-control text-slate-500 dark:text-slate-400 hover:text-[#121316] dark:hover:text-slate-200 hover:bg-black/[0.04] dark:hover:bg-white/[0.05] transition-colors relative pressable"
              title="Audit telemetry notifications"
              aria-label="Audit notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#1D4ED8] dark:bg-[#fafafa]" />
            </button>

            {/* Notification Popover Dropdown (origin-aware top-right) */}
            {notificationsOpen && (
              <div
                className="absolute right-0 mt-2 w-80 bg-white dark:bg-[#18181b] rounded-card shadow-float border border-black/[0.08] dark:border-white/[0.1] p-3 z-30 transition-all duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] origin-top-right"
                style={{ transformOrigin: 'top right' }}
              >
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-black/[0.05] dark:border-white/[0.08]">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[12px] font-semibold text-[#121316] dark:text-slate-200">
                      System Audit Trail
                    </span>
                    <span className="text-[9px] font-mono text-slate-400 dark:text-slate-600">LIVE</span>
                  </div>
                  <button
                    onClick={() => {
                      showToast('Audit notifications acknowledged', 'info');
                      setNotificationsOpen(false);
                    }}
                    className="text-[11px] text-[#1D4ED8] dark:text-slate-400 hover:underline font-medium"
                  >
                    Clear
                  </button>
                </div>

                <div className="space-y-1.5 max-h-64 overflow-y-auto">
                  {activities.slice(0, 3).map(act => (
                    <div
                      key={act.id}
                      onClick={() => {
                        navigateTo('activity');
                        setNotificationsOpen(false);
                      }}
                      className="p-2 rounded-control hover:bg-slate-50 dark:hover:bg-white/[0.05] cursor-pointer transition-colors text-left group"
                    >
                      <div className="flex items-start gap-2">
                        {act.status === 'success' ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                        ) : (
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-medium text-slate-800 dark:text-slate-300 line-clamp-1 group-hover:text-[#1D4ED8] dark:group-hover:text-slate-200 transition-colors">
                            {act.title}
                          </p>
                          <div className="flex items-center gap-2 text-[10px] text-slate-400 dark:text-slate-600 mt-0.5 font-mono">
                            <span>{act.timestamp}</span>
                            <span>·</span>
                            <span>{act.duration}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 mt-2 border-t border-black/[0.04] dark:border-white/[0.06] text-center">
                  <button
                    onClick={() => {
                      navigateTo('activity');
                      setNotificationsOpen(false);
                    }}
                    className="text-[11px] text-slate-600 dark:text-slate-400 hover:text-[#121316] dark:hover:text-slate-200 font-medium"
                  >
                    View complete execution audit →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Landing page link */}
          {/* <button
            onClick={() => navigateTo('landing')}
            className="text-[11px] font-mono text-slate-500 hover:text-[#121316] px-2 py-1 rounded hover:bg-black/[0.04] transition-colors hidden sm:inline-flex items-center gap-1 pressable"
            title="Return to Sovereign Intro"
          >
            <span>Landing</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </button> */}
        </div>
      </header>

      {/* Global Quick Search / Command Palette Modal */}
      {searchModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/20 dark:bg-black/50 backdrop-blur-xs flex items-start justify-center pt-20 px-4"
          onClick={() => setSearchModalOpen(false)}
        >
          <div
            className="w-full max-w-lg bg-white dark:bg-[#18181b] rounded-command shadow-float border border-black/[0.08] dark:border-white/[0.1] overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-3 border-b border-black/[0.06] dark:border-white/[0.1] flex items-center gap-2.5">
              <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0" />
              <input
                type="text"
                autoFocus
                placeholder="Type command, search blueprints, or jump to route..."
                className="w-full text-xs bg-transparent border-none outline-none text-[#121316] dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 font-mono"
              />
              <kbd
                onClick={() => setSearchModalOpen(false)}
                className="cursor-pointer text-[10px] font-mono px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 rounded border border-black/[0.06] dark:border-white/[0.1]"
              >
                ESC
              </kbd>
            </div>
            <div className="p-2 max-h-72 overflow-y-auto space-y-0.5 text-left">
              <div className="px-2.5 py-1 text-[10px] font-mono font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Sovereign Navigation
              </div>
              <button
                onClick={() => {
                  navigateTo('overview');
                  setSearchModalOpen(false);
                }}
                className="w-full text-left px-2.5 py-1.5 rounded-control text-xs hover:bg-slate-100 dark:hover:bg-slate-700/50 flex items-center justify-between text-slate-800 dark:text-slate-200 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="font-medium">Command Workspace</span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500">Overview & Live Signals</span>
                </div>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">⌘1</span>
              </button>
              <button
                onClick={() => {
                  navigateTo('create');
                  setSearchModalOpen(false);
                }}
                className="w-full text-left px-2.5 py-1.5 rounded-control text-xs hover:bg-slate-100 dark:hover:bg-slate-700/50 flex items-center justify-between text-slate-800 dark:text-slate-200 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="font-medium">Compose Task</span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500">Natural Language Mission</span>
                </div>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">⌘3</span>
              </button>
              <button
                onClick={() => {
                  navigateTo('builder');
                  setSearchModalOpen(false);
                }}
                className="w-full text-left px-2.5 py-1.5 rounded-control text-xs hover:bg-slate-100 dark:hover:bg-slate-700/50 flex items-center justify-between text-slate-800 dark:text-slate-200 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="font-medium">Workflow Canvas</span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500">Visual Node Architecture</span>
                </div>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">⌘4</span>
              </button>
              <button
                onClick={() => {
                  navigateTo('library');
                  setSearchModalOpen(false);
                }}
                className="w-full text-left px-2.5 py-1.5 rounded-control text-xs hover:bg-slate-100 dark:hover:bg-slate-700/50 flex items-center justify-between text-slate-800 dark:text-slate-200 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="font-medium">Blueprint Library</span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500">Curated Industrial Blueprints</span>
                </div>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">⌘5</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
