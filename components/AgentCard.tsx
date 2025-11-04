import { AgentLog } from '@/components/pipeline';
import clsx from 'classnames';

type AgentCardProps = {
  log: AgentLog;
  index: number;
};

export function AgentCard({ log, index }: AgentCardProps) {
  return (
    <div
      className={clsx(
        'rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur',
        'shadow-[0_40px_80px_-40px_rgba(29,131,255,0.45)]'
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold uppercase tracking-[0.25em] text-white/70">
          Agent {index + 1}
        </span>
        <span className="text-xs font-medium text-primary-300">Confidence {Math.round(log.confidence * 100)}%</span>
      </div>
      <h3 className="mt-3 text-xl font-bold text-white">{log.name}</h3>
      <p className="mt-3 text-sm leading-6 text-white/80">{log.decision}</p>
    </div>
  );
}
