import React, { useState } from 'react';
import { useAutomation } from '../../context/AutomationContext';
import {
  Sparkles,
  Paperclip,
  Mic,
  ArrowRight,
  Mail,
  FileText,
  FileSpreadsheet,
  Clock,
  Play,
  Pause,
  Zap,
  TrendingUp,
  ChevronRight,
  FileCode,
} from 'lucide-react';

export const OverviewPage: React.FC = () => {
  const {
    automations,
    navigateTo,
    startAIGeneration,
    toggleAutomationStatus,
    metrics,
    showToast,
  } = useAutomation();

  const [promptText, setPromptText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [executionMode, setExecutionMode] = useState<'autonomous' | 'sandboxed' | 'verification'>('autonomous');

  const samplePrompts = [
    'When an executive contract review arrives, extract key deliverables, evaluate risk, and alert legal lead.',
    'Daily at 18:00, correlate industrial telemetry from Datadog and internal Postgres, then draft incident summary.',
    'When a CAD or compliance PDF is uploaded to vault, extract regulatory tags and update local database.',
  ];

  const handleGenerate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const targetPrompt = promptText.trim() || samplePrompts[0];
    startAIGeneration(targetPrompt);
    navigateTo('create');
  };

  const handleVoiceToggle = () => {
    if (!isListening) {
      setIsListening(true);
      showToast('Listening for sovereign mission prompt...', 'info');
      setTimeout(() => {
        setPromptText('When an executive contract review arrives, extract key deliverables, evaluate risk, and alert legal lead.');
        setIsListening(false);
        showToast('Transcribed mission prompt', 'success');
      }, 1800);
    } else {
      setIsListening(false);
    }
  };

  const recentArtifacts = [
    {
      id: 'art-1',
      title: 'Contract Deliverables Dossier',
      type: 'PDF / Executive Briefing',
      time: '12m ago',
      node: 'Smart Email Triage',
      status: 'VERIFIED',
    },
    {
      id: 'art-2',
      title: 'Daily Business Telemetry Report',
      type: 'Structured Markdown + JSON',
      time: '1h ago',
      node: 'Daily Intelligence Report',
      status: 'DELIVERED',
    },
    {
      id: 'art-3',
      title: 'Incident Telemetry Correlation',
      type: 'Log Analysis AST',
      time: '3h ago',
      node: 'Cloud Anomaly Sentinel',
      status: 'AUDITED',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8 select-none">
      {/* 1. Header: Command Workspace Identity & Sovereign Telemetry */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/[0.06] dark:border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10.5px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-600">
              ARASAKA // SOVEREIGN WORKBENCH
            </span>
            <span className="text-slate-300 dark:text-slate-700">·</span>
            {/* <span className="text-[10px] font-mono text-[#1D4ED8] bg-blue-50 px-1.5 py-0.2 rounded border border-blue-200/60">
              NODE-01 ONLINE
            </span> */}
          </div>
          <h1 className="text-2xl sm:text-[26px] font-semibold tracking-tight text-[#121316] dark:text-slate-200">
            Command Workspace
          </h1>
          {/* <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
            <span>Air-gapped on-premise cluster operating across {metrics.activeAutomations} active listeners.</span>
          </p> */}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => navigateTo('activity')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-[#18181b] hover:bg-slate-50 dark:hover:bg-[#27272a] rounded-control border border-black/[0.07] dark:border-white/[0.08] shadow-2xs transition-colors pressable"
          >
            <Clock className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
            <span>Audit Trail</span>
          </button>
          <button
            onClick={() => navigateTo('analytics')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-[#18181b] hover:bg-slate-50 dark:hover:bg-[#27272a] rounded-control border border-black/[0.07] dark:border-white/[0.08] shadow-2xs transition-colors pressable"
          >
            <TrendingUp className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
            <span>Telemetry</span>
          </button>
        </div>
      </div>

      {/* 2. PRIMARY COMMAND SURFACE: UNDERSTAND -> PLAN -> EXECUTE -> VERIFY -> DELIVER */}
      <div className="space-y-3">
        {/* Pipeline Progression Indicator */}
        <div className="px-2 flex items-center justify-between text-[10.5px] font-mono text-slate-400 dark:text-slate-600">
          <div className="flex items-center gap-1 sm:gap-2">
            <span className="font-semibold text-[#1D4ED8] dark:text-slate-400">1. UNDERSTAND</span>
            <span className="text-slate-300 dark:text-slate-700">→</span>
            <span>2. PLAN</span>
            <span className="text-slate-300 dark:text-slate-700">→</span>
            <span>3. EXECUTE</span>
            <span className="text-slate-300 dark:text-slate-700">→</span>
            <span>4. VERIFY</span>
            <span className="text-slate-300 dark:text-slate-700">→</span>
            <span>5. DELIVER</span>
          </div>
          <span className="hidden sm:inline text-slate-400 dark:text-slate-600">NEURAL DISPATCH READY</span>
        </div>

        {/* Main Task Composer Box */}
        <div
          className={`relative bg-white dark:bg-[#18181b] rounded-command border transition-all duration-200 ${
            isFocused
              ? 'border-[#1D4ED8] dark:border-slate-400 shadow-command ring-2 ring-[#1D4ED8]/15 dark:ring-slate-400/15'
              : 'border-black/[0.08] dark:border-white/[0.08] shadow-subtle hover:border-black/[0.15] dark:hover:border-white/[0.15]'
          }`}
        >
          {/* Top Meta Bar */}
          <div className="px-5 py-4 flex items-center justify-between border-b border-black/[0.04] dark:border-white/[0.06] bg-[#FAF9F7]/60 dark:bg-[#0a0a0b]/60">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#1D4ED8] dark:text-slate-400" />
              <span className="text-[11.5px] font-mono font-medium text-slate-700 dark:text-slate-300">
                TASK COMPOSER
              </span>
            </div>

            {/* Execution Mode Radio Selector */}
            <div className="flex items-center gap-2 bg-black/[0.03] dark:bg-white/[0.05] p-1 rounded border border-black/[0.05] dark:border-white/[0.08]">
              <button
                type="button"
                onClick={() => setExecutionMode('autonomous')}
                className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                  executionMode === 'autonomous'
                    ? 'bg-white dark:bg-[#27272a] text-[#121316] dark:text-slate-200 font-semibold shadow-2xs'
                    : 'text-slate-500 dark:text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                }`}
              >
                AUTONOMOUS
              </button>
              <button
                type="button"
                onClick={() => setExecutionMode('sandboxed')}
                className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                  executionMode === 'sandboxed'
                    ? 'bg-white dark:bg-[#27272a] text-[#121316] dark:text-slate-200 font-semibold shadow-2xs'
                    : 'text-slate-500 dark:text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                }`}
              >
                SANDBOXED
              </button>
              <button
                type="button"
                onClick={() => setExecutionMode('verification')}
                className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                  executionMode === 'verification'
                    ? 'bg-white dark:bg-[#27272a] text-[#121316] dark:text-slate-200 font-semibold shadow-2xs'
                    : 'text-slate-500 dark:text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                }`}
              >
                DUAL-VERIFY
              </button>
            </div>
          </div>

          <form onSubmit={handleGenerate} className="p-5">
            <label className="text-xs font-semibold text-[#121316] dark:text-slate-200 mb-1.5 block tracking-tight">
              What do you need KAIRO to do?
            </label>
            <textarea
              value={promptText}
              onChange={e => setPromptText(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              rows={3}
              placeholder="e.g. When an executive contract review arrives in Gmail, analyze priority, synthesize action items, and dispatch briefing to Slack..."
              className="w-full h-32 outline-none bg-transparent text-[13.5px] text-[#121316] dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-600 resize-none outline-none leading-relaxed font-normal"
              onKeyDown={e => {
                if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                  handleGenerate();
                }
              }}
            />

            {/* Bottom Controls Bar */}
            <div className="flex items-center justify-between pt-3 border-t border-black/[0.05] dark:border-white/[0.06] mt-2">
              <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-500">
                <button
                  type="button"
                  onClick={() => showToast('Schema / payload file picker ready', 'info')}
                  className="p-1.5 hover:text-[#121316] dark:hover:text-slate-200 rounded-control hover:bg-black/[0.04] dark:hover:bg-white/[0.05] transition-colors pressable"
                  title="Attach schema, OpenAPI spec, or document"
                >
                  <Paperclip className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={handleVoiceToggle}
                  className={`p-1.5 rounded-control transition-colors pressable ${
                    isListening
                      ? 'text-red-600 bg-red-50 dark:bg-red-500/20 ring-1 ring-red-200 dark:ring-red-500/30 animate-pulse'
                      : 'hover:text-[#121316] dark:hover:text-slate-200 hover:bg-black/[0.04] dark:hover:bg-white/[0.05]'
                  }`}
                  title="Dictate with voice"
                >
                  <Mic className="w-3.5 h-3.5" />
                </button>
                {promptText.length > 0 && (
                  <span className="text-[10.5px] text-slate-400 dark:text-slate-600 font-mono ml-2">
                    {promptText.length} chars
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium text-white dark:text-[#0a0a0b] bg-[#121316] dark:bg-[#fafafa] hover:bg-[#1D4ED8] dark:hover:bg-[#e4e4e7] rounded-control shadow-2xs transition-all pressable"
                >
                  <span>Synthesize Workflow</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Contextual Industrial Blueprint Suggestions */}
        <div className="flex flex-wrap items-center gap-2 pt-1 px-1">
          <span className="text-[11px] text-slate-400 dark:text-slate-600 font-mono uppercase">Blueprints:</span>
          {samplePrompts.map((sample, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setPromptText(sample)}
              className="text-[11px] text-slate-600 dark:text-slate-400 hover:text-[#121316] dark:hover:text-slate-200 bg-white dark:bg-[#18181b] hover:bg-slate-50 dark:hover:bg-[#27272a] px-2.5 py-1 rounded-control border border-black/[0.06] dark:border-white/[0.08] shadow-2xs transition-colors truncate max-w-xs sm:max-w-md text-left pressable"
              title={sample}
            >
              {sample.length > 50 ? sample.substring(0, 50) + '...' : sample}
            </button>
          ))}
        </div>
      </div>

      {/* 3. SOVEREIGN INDUSTRIAL TELEMETRY STRIP (High-density, no oversized cards) */}
      <div className="py-4 px-3 bg-white dark:bg-[#18181b] rounded-card border border-black/[0.07] dark:border-white/[0.08] shadow-2xs">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-600 block">
              ACTIVE LISTENERS
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-semibold tracking-tight text-[#121316] dark:text-slate-200 font-mono">
                {metrics.activeAutomations}
              </span>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">online</span>
            </div>
            <p className="text-[10.5px] text-slate-400 dark:text-slate-600 font-mono">100% on-premise SLA</p>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-600 block">
              EXECUTIONS
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-semibold tracking-tight text-[#121316] dark:text-slate-200 font-mono">
                {metrics.tasksCompleted.toLocaleString()}
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-500 font-mono">tasks</span>
            </div>
            <p className="text-[10.5px] text-emerald-600 dark:text-emerald-400 font-mono">+14.2% velocity</p>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-600 block">
              MACHINE TIME SAVED
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-semibold tracking-tight text-[#121316] dark:text-slate-200 font-mono">
                {metrics.timeSaved}
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-500 font-mono">saved</span>
            </div>
            <p className="text-[10.5px] text-slate-400 dark:text-slate-600 font-mono">~3.5 hrs/operator</p>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-600 block">
              SLA RELIABILITY
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-semibold tracking-tight text-[#121316] dark:text-slate-200 font-mono">
                {metrics.successRate}
              </span>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">verified</span>
            </div>
            <p className="text-[10.5px] text-slate-400 dark:text-slate-600 font-mono">Zero unhandled errors</p>
          </div>
        </div>
      </div>

      {/* 4. ACTIVE AUTOMATED WORKFLOWS DIRECTORY */}
      <div className="space-y-3">
        <div className="flex items-center justify-between pb-1">
          <div>
            <h3 className="text-xs sm:text-sm font-semibold tracking-tight text-[#121316] dark:text-slate-200">
              Active Workflows & Listeners
            </h3>
            <p className="text-[11.5px] text-slate-400 dark:text-slate-600">
              Autonomous processes actively monitoring inputs and evaluating neural logic
            </p>
          </div>
          <button
            onClick={() => navigateTo('automations')}
            className="text-xs font-mono text-[#1D4ED8] dark:text-slate-400 hover:underline inline-flex items-center gap-1 pressable"
          >
            <span>View directory ({automations.length})</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* High-density list with hairline dividers */}
        <div className="bg-white dark:bg-[#18181b] rounded-card border border-black/[0.07] dark:border-white/[0.08] shadow-2xs divide-y divide-black/[0.05] dark:divide-white/[0.06] overflow-hidden">
          {automations.slice(0, 4).map(auto => {
            const isActive = auto.status === 'active';
            return (
              <div
                key={auto.id}
                className="p-3.5 sm:px-4.5 sm:py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#FAF9F7]/70 dark:hover:bg-white/[0.02] transition-colors group"
              >
                {/* Left: Icon & Title */}
                <div
                  className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
                  onClick={() => navigateTo('builder')}
                >
                  <div
                    className={`w-7 h-7 rounded-control flex items-center justify-center shrink-0 border ${
                      isActive
                        ? 'bg-blue-50/70 dark:bg-blue-500/20 text-[#1D4ED8] dark:text-blue-400 border-blue-200/60 dark:border-blue-500/30'
                        : 'bg-slate-100 dark:bg-slate-500/20 text-slate-500 dark:text-slate-500 border-black/[0.06] dark:border-white/[0.08]'
                    }`}
                  >
                    {auto.icon === 'Mail' && <Mail className="w-3.5 h-3.5" />}
                    {auto.icon === 'FileText' && <FileText className="w-3.5 h-3.5" />}
                    {auto.icon === 'FileSpreadsheet' && <FileSpreadsheet className="w-3.5 h-3.5" />}
                    {auto.icon !== 'Mail' && auto.icon !== 'FileText' && auto.icon !== 'FileSpreadsheet' && (
                      <Zap className="w-3.5 h-3.5" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] font-semibold text-[#121316] dark:text-slate-200 group-hover:text-[#1D4ED8] dark:group-hover:text-slate-300 transition-colors truncate">
                        {auto.title}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 px-1.5 py-0.2 rounded text-[9.5px] font-mono tracking-tight ${
                          isActive
                            ? 'bg-emerald-50 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-500/30'
                            : 'bg-amber-50 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-200/60 dark:border-amber-500/30'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isActive ? 'bg-emerald-500' : 'bg-amber-500'
                          }`}
                        />
                        {isActive ? 'ACTIVE' : 'PAUSED'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-500 truncate mt-0.5">
                      {auto.description}
                    </p>
                  </div>
                </div>

                {/* Right: Last run telemetry & Quick Actions */}
                <div className="flex items-center justify-between sm:justify-end gap-5 text-xs shrink-0 pl-10 sm:pl-0">
                  <div className="text-left sm:text-right font-mono">
                    <span className="text-slate-400 dark:text-slate-600 text-[10px] block uppercase">Last Run</span>
                    <span className="font-medium text-slate-700 dark:text-slate-400 text-[11.5px]">{auto.lastRun}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => toggleAutomationStatus(auto.id)}
                      className={`p-1.5 rounded-control border transition-colors pressable ${
                        isActive
                          ? 'border-amber-200 dark:border-amber-500/30 text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-500/10'
                          : 'border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/10'
                      }`}
                      title={isActive ? 'Pause listener' : 'Resume listener'}
                    >
                      {isActive ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                    </button>
                    <button
                      onClick={() => navigateTo('builder')}
                      className="px-2.5 py-1 text-xs font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-[#27272a] hover:bg-slate-50 dark:hover:bg-[#3a3a3e] rounded-control border border-black/[0.08] dark:border-white/[0.08] shadow-2xs transition-colors pressable"
                      title="Open in Workflow Canvas"
                    >
                      Inspect Canvas
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. PRODUCTION ARTIFACTS / DELIVERABLES STRIP */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between pb-1">
          <div>
            <h3 className="text-xs sm:text-sm font-semibold tracking-tight text-[#121316] dark:text-slate-200">
              Verified Production Deliverables
            </h3>
            <p className="text-[11.5px] text-slate-400 dark:text-slate-600">
              Tangible work artifacts produced by KAIRO autonomous executions
            </p>
          </div>
          <span className="text-[10px] font-mono text-slate-400 dark:text-slate-600">
            SHA-256 SIGNED
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {recentArtifacts.map(art => (
            <div
              key={art.id}
              onClick={() => navigateTo('activity')}
              className="p-3.5 bg-white dark:bg-[#18181b] rounded-card border border-black/[0.07] dark:border-white/[0.08] shadow-2xs hover:border-black/[0.14] dark:hover:border-white/[0.15] transition-all cursor-pointer group pressable"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-6 h-6 rounded bg-[#FAF9F7] dark:bg-[#27272a] border border-black/[0.05] dark:border-white/[0.08] flex items-center justify-center text-slate-600 dark:text-slate-400">
                  <FileCode className="w-3 h-3 text-[#1D4ED8] dark:text-slate-400" />
                </div>
                <span className="text-[9.5px] font-mono font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/20 px-1.5 py-0.2 rounded border border-emerald-200/50 dark:border-emerald-500/30">
                  {art.status}
                </span>
              </div>
              <h4 className="text-xs font-semibold text-[#121316] dark:text-slate-200 group-hover:text-[#1D4ED8] dark:group-hover:text-slate-300 transition-colors truncate">
                {art.title}
              </h4>
              <p className="text-[10.5px] text-slate-400 dark:text-slate-600 mt-0.5 truncate">
                {art.type} · {art.time}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
