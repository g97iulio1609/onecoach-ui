import { Card } from '@onecoach/ui';
import { Calendar, Download, Share2 } from 'lucide-react';
import { cn } from '@onecoach/lib-design-system';

export type Period = '7d' | '30d' | '90d' | '1y' | 'custom';

interface AnalyticsHeaderProps {
  title: string;
  subtitle?: string;
  period: Period;
  onPeriodChange: (period: Period) => void;
  className?: string;
}

export function AnalyticsHeader({
  title,
  subtitle,
  period,
  onPeriodChange,
  className,
}: AnalyticsHeaderProps) {
  const periods: Array<{ label: string; value: Period }> = [
    { label: '7G', value: '7d' },
    { label: '30G', value: '30d' },
    { label: '90G', value: '90d' },
    { label: '1A', value: '1y' },
  ];

  return (
    <div className={cn('mb-8 space-y-4', className)}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">{title}</h1>
          {subtitle && <p className="mt-1 text-neutral-500 dark:text-neutral-400">{subtitle}</p>}
        </div>

        <div className="flex gap-2">
          <button className="rounded-full border border-white/10 bg-white/10 p-2 transition-colors hover:bg-white/20">
            <Download size={20} className="text-neutral-700 dark:text-neutral-300" />
          </button>
          <button className="rounded-full border border-white/10 bg-white/10 p-2 transition-colors hover:bg-white/20">
            <Share2 size={20} className="text-neutral-700 dark:text-neutral-300" />
          </button>
        </div>
      </div>

      <Card variant="glass" className="flex items-center justify-between p-2">
        <div className="flex items-center space-x-1 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800">
          {periods.map((p) => (
            <button
              key={p.value}
              onClick={() => onPeriodChange(p.value)}
              className={cn(
                'rounded-md px-3 py-1.5 text-sm font-medium transition-all',
                period === p.value
                  ? 'bg-white text-neutral-900 shadow-sm dark:bg-neutral-700 dark:text-white'
                  : 'text-neutral-500 hover:bg-neutral-200 dark:text-neutral-400 dark:hover:bg-neutral-700'
              )}
            >
              {p.label}
            </button>
          ))}
        </div>

        <button className="flex items-center space-x-2 rounded-lg px-3 py-1.5 transition-colors hover:bg-white/10">
          <Calendar size={16} className="text-neutral-500 dark:text-neutral-400" />
          <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Personalizza
          </span>
        </button>
      </Card>
    </div>
  );
}
