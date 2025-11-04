'use client';

import { FormEvent, useMemo, useState } from 'react';
import { AgentCard } from '@/components/AgentCard';
import { SectionCard } from '@/components/SectionCard';
import { PipelineInput, PipelineResult, runPipeline } from '@/components/pipeline';
import clsx from 'classnames';

const toneOptions: PipelineInput['tone'][] = ['Bold', 'Friendly', 'Inspirational', 'Educational', 'Humorous'];
const runtimeOptions: PipelineInput['runtime'][] = [15, 30, 45, 60];

const defaultInput: PipelineInput = {
  topic: 'AI productivity habits',
  audience: 'creators',
  goal: 'triple your output',
  tone: 'Bold',
  runtime: 30
};

export default function Page() {
  const [formState, setFormState] = useState<PipelineInput>(defaultInput);
  const [result, setResult] = useState<PipelineResult | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const headline = useMemo(() => {
    if (!result) {
      return 'Autonomous Agent Squad for Viral Shorts';
    }
    return 'Delivery Blueprint Ready—Time to Shoot.';
  }, [result]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsGenerating(true);
    const output = runPipeline(formState);
    setResult(output);
    setIsGenerating(false);
  }

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-12 text-white">
      <header className="rounded-3xl border border-white/10 bg-gradient-to-br from-primary-500/40 via-primary-500/20 to-primary-900/20 p-8 shadow-[0_45px_90px_-40px_rgba(29,131,255,0.65)]">
        <span className="text-xs font-semibold uppercase tracking-[0.35em] text-white/70">Agentic Workspace</span>
        <h1 className="mt-3 text-4xl font-bold md:text-5xl">{headline}</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-white/80">
          Spin up orchestrated creative agents that research, script, design, and package your YouTube Shorts.
          Provide a topic and intent—the squad handles storyline, pacing, B-roll, and metadata in seconds.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="grid gap-6 rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur lg:grid-cols-[1.1fr_0.9fr]"
      >
        <div className="space-y-5">
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-white/60">Topic fuel</label>
            <input
              className="mt-2 w-full rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-sm outline-none focus:border-primary-300 focus:ring-2 focus:ring-primary-500/40"
              value={formState.topic}
              onChange={event => setFormState(current => ({ ...current, topic: event.target.value }))}
              placeholder="Ex: Zero to viral in 30 minutes with AI editing"
              required
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-white/60">Audience archetype</label>
            <input
              className="mt-2 w-full rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-sm outline-none focus:border-primary-300 focus:ring-2 focus:ring-primary-500/40"
              value={formState.audience}
              onChange={event => setFormState(current => ({ ...current, audience: event.target.value }))}
              placeholder="Ex: indie founders, travel vloggers, design students"
              required
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-white/60">Outcome you promise</label>
            <input
              className="mt-2 w-full rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-sm outline-none focus:border-primary-300 focus:ring-2 focus:ring-primary-500/40"
              value={formState.goal}
              onChange={event => setFormState(current => ({ ...current, goal: event.target.value }))}
              placeholder="Ex: land brand deals, shortcut editing time, explode newsletter signups"
              required
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-white/60">Tone of voice</label>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {toneOptions.map(option => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setFormState(current => ({ ...current, tone: option }))}
                    className={clsx(
                      'rounded-xl border px-3 py-2 text-sm font-medium transition',
                      formState.tone === option
                        ? 'border-primary-300 bg-primary-500/40 text-white shadow-lg shadow-primary-500/30'
                        : 'border-white/10 bg-white/10 text-white/70 hover:border-primary-200/50 hover:bg-primary-500/10'
                    )}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-white/60">Runtime target</label>
              <div className="mt-3 flex flex-wrap gap-2">
                {runtimeOptions.map(option => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setFormState(current => ({ ...current, runtime: option }))}
                    className={clsx(
                      'rounded-xl border px-4 py-2 text-sm font-semibold transition',
                      formState.runtime === option
                        ? 'border-primary-300 bg-primary-500/40 text-white shadow-lg shadow-primary-500/30'
                        : 'border-white/10 bg-white/10 text-white/70 hover:border-primary-200/50 hover:bg-primary-500/10'
                    )}
                  >
                    {option}s
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between space-y-4 rounded-2xl border border-white/10 bg-black/20 p-5">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-white/60">Agent preview</h3>
            <p className="mt-4 text-sm text-white/75">
              Squad combines real-time trend mapping, short-form storytelling frameworks, and metadata packaging.
              Generation is instant—no API keys required.
            </p>
          </div>
          <button
            type="submit"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-2xl border border-primary-200/40 bg-primary-500/70 px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
          >
            <span className="absolute inset-0 translate-y-full bg-white/20 transition group-hover:translate-y-0" />
            <span className="relative">{isGenerating ? 'Deploying agents...' : 'Generate short system'}</span>
          </button>
        </div>
      </form>

      {result ? (
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-6">
            <SectionCard title="Hero Statement" subtitle="North star message anchoring the short.">
              <p>{result.heroStatement}</p>
            </SectionCard>
            <SectionCard title="Hook & CTA">
              <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                <p className="text-sm text-primary-200">Hook</p>
                <p className="mt-1 text-base font-semibold text-white">{result.hook}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                <p className="text-sm text-primary-200">Call to action</p>
                <p className="mt-1 text-base font-semibold text-white">{result.callToAction}</p>
              </div>
            </SectionCard>
            <SectionCard title="Talking Points" subtitle="Beats sequenced for retention spikes.">
              <ul className="space-y-2">
                {result.talkingPoints.map(point => (
                  <li key={point} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                    {point}
                  </li>
                ))}
              </ul>
            </SectionCard>
            <SectionCard title="Release Timeline" subtitle="Execution plan from ideation to launch.">
              <ul className="space-y-2 text-sm">
                {result.releaseTimeline.map(item => (
                  <li key={item.day} className="flex items-start gap-3 rounded-xl border border-white/10 bg-black/20 p-3">
                    <span className="mt-0.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary-200">
                      {item.day}
                    </span>
                    <span className="text-white/80">{item.task}</span>
                  </li>
                ))}
              </ul>
            </SectionCard>
          </div>
          <div className="space-y-6">
            <SectionCard title="Agent Decisions" subtitle="Logs from each specialist agent.">
              <div className="grid gap-4 md:grid-cols-2">
                {result.agentLog.map((log, index) => (
                  <AgentCard key={log.name} index={index} log={log} />
                ))}
              </div>
            </SectionCard>
            <SectionCard title="Script Beats" subtitle="Timestamps, lines, and pacing recommendations.">
              <div className="space-y-3">
                {result.script.map(beat => (
                  <div
                    key={beat.timestamp + beat.line}
                    className="rounded-2xl border border-white/10 bg-black/25 p-4"
                  >
                    <div className="flex items-center justify-between text-xs text-white/60">
                      <span>{beat.timestamp}</span>
                      <span>Pacing</span>
                    </div>
                    <p className="mt-2 text-base font-semibold text-white">{beat.line}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl border border-primary-200/20 bg-primary-500/10 p-4">
                <h3 className="text-sm font-semibold text-primary-100">Pacing Notes</h3>
                <ul className="mt-2 space-y-2 text-sm text-white/75">
                  {result.pacingNotes.map(note => (
                    <li key={note}>• {note}</li>
                  ))}
                </ul>
              </div>
            </SectionCard>
            <SectionCard title="Visual Direction" subtitle="B-roll, transitions, and captions ready to import.">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                  <h4 className="text-sm font-semibold text-primary-100">B-roll stack</h4>
                  <ul className="mt-2 space-y-2 text-sm text-white/75">
                    {result.brollIdeas.map(idea => (
                      <li key={idea}>• {idea}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                  <h4 className="text-sm font-semibold text-primary-100">Transitions</h4>
                  <ul className="mt-2 space-y-2 text-sm text-white/75">
                    {result.transitions.map(item => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                <h4 className="text-sm font-semibold text-primary-100">Caption map</h4>
                <ul className="mt-2 space-y-2 text-sm text-white/75">
                  {result.captions.map(entry => (
                    <li key={entry.timestamp + entry.text}>
                      <span className="text-white/60">{entry.timestamp}:</span> {entry.text}
                    </li>
                  ))}
                </ul>
              </div>
            </SectionCard>
            <SectionCard title="Packaging" subtitle="Titles, tags, and repurposing angles.">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                  <h4 className="text-sm font-semibold text-primary-100">Titles</h4>
                  <ul className="mt-2 space-y-2 text-sm text-white/75">
                    {result.titleOptions.map(option => (
                      <li key={option}>• {option}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                  <h4 className="text-sm font-semibold text-primary-100">Hashtags</h4>
                  <p className="mt-2 text-sm text-white/75">{result.hashtags.join(' ')}</p>
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                <h4 className="text-sm font-semibold text-primary-100">Repurpose angles</h4>
                <ul className="mt-2 space-y-2 text-sm text-white/75">
                  {result.repurposeIdeas.map(idea => (
                    <li key={idea}>• {idea}</li>
                  ))}
                </ul>
              </div>
            </SectionCard>
            <SectionCard title="Dispatch Summary" subtitle="Snapshot to share with collaborators.">
              <p>{result.summary}</p>
            </SectionCard>
          </div>
        </div>
      ) : null}
    </main>
  );
}
