import { AccessoryStats, STAT_LABELS, STAT_SUFFIXES } from '@/data/accessories';
import { Shield, Heart, Sword, Target, Zap, Wine, RefreshCw, Sparkles, Ban, Crosshair, Gauge } from 'lucide-react';

interface StatsPanelProps {
  stats: AccessoryStats;
}

const STAT_ICONS: Record<keyof AccessoryStats, React.ReactNode> = {
  defense: <Shield className="w-4 h-4" />,
  regen: <Heart className="w-4 h-4" />,
  damage: <Sword className="w-4 h-4" />,
  luck: <Sparkles className="w-4 h-4" />,
  maxHp: <Heart className="w-4 h-4" />,
  maxArmor: <Shield className="w-4 h-4" />,
  stunChance: <Zap className="w-4 h-4" />,
  drunkChance: <Wine className="w-4 h-4" />,
  antiStun: <Ban className="w-4 h-4" />,
  reflect: <RefreshCw className="w-4 h-4" />,
  block: <Target className="w-4 h-4" />,
  fireRate: <Crosshair className="w-4 h-4" />,
  recoil: <Gauge className="w-4 h-4" />,
};

export const StatsPanel = ({ stats }: StatsPanelProps) => {
  const statKeys = Object.keys(stats) as (keyof AccessoryStats)[];

  return (
    <div className="arz-card h-full">
      <h2 className="font-semibold text-lg mb-4 arz-text-gradient tracking-wider">ХАРАКТЕРИСТИКИ</h2>
      
      <div className="space-y-2">
        {statKeys.map((key) => {
          const value = stats[key];
          const isPositive = value > 0;
          const isNegative = value < 0;
          
          return (
            <div
              key={key}
              className="flex items-center justify-between py-2 px-3 rounded-lg bg-secondary/30 border border-border/50"
            >
              <div className="flex items-center gap-2">
                <span className={isPositive ? 'stat-positive' : 'stat-neutral'}>
                  {STAT_ICONS[key]}
                </span>
                <span className="text-sm text-foreground/80">{STAT_LABELS[key]}</span>
              </div>
              <span
                className={`
                  font-semibold text-sm
                  ${isPositive ? 'stat-positive' : ''}
                  ${isNegative ? 'text-arz-blue' : ''}
                  ${!isPositive && !isNegative ? 'stat-neutral' : ''}
                `}
              >
                {isPositive && '+'}
                {value}{STAT_SUFFIXES[key]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
