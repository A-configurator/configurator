import { Accessory, STAT_LABELS, STAT_SUFFIXES } from '@/data/accessories';
import { X } from 'lucide-react';

interface AccessoryModalProps {
  accessory: Accessory;
  isEquipped: boolean;
  onClose: () => void;
  onEquip: () => void;
  onUnequip: () => void;
}

const RARITY_STYLES = {
  common: {
    gradient: 'from-muted-foreground/20 to-muted/10',
    text: 'text-muted-foreground',
    label: 'Обычный',
  },
  rare: {
    gradient: 'from-arz-blue/20 to-arz-blue/5',
    text: 'text-arz-blue',
    label: 'Редкий',
  },
  epic: {
    gradient: 'from-arz-purple/20 to-arz-purple/5',
    text: 'text-arz-purple',
    label: 'Эпический',
  },
  legendary: {
    gradient: 'from-arz-gold/20 to-arz-gold/5',
    text: 'arz-gold-text',
    label: 'Легендарный',
  },
};

export const AccessoryModal = ({ accessory, isEquipped, onClose, onEquip, onUnequip }: AccessoryModalProps) => {
  const style = RARITY_STYLES[accessory.rarity];
  const statKeys = Object.keys(accessory.stats) as (keyof typeof accessory.stats)[];
  const nonZeroStats = statKeys.filter((key) => accessory.stats[key] !== 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm" onClick={onClose}>
      <div
        className={`
          w-full max-w-md bg-gradient-to-br ${style.gradient} 
          border border-border rounded-xl shadow-2xl overflow-hidden
          bg-card
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative p-6 border-b border-border">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="pr-8">
            <span className={`text-xs font-semibold ${style.text} uppercase tracking-wider`}>
              {style.label}
            </span>
            <h2 className="text-xl font-bold mt-1 arz-text-gradient">{accessory.name}</h2>
            <p className="text-sm text-muted-foreground mt-1">Слот: {accessory.slotName}</p>
          </div>
        </div>

        {/* Description */}
        <div className="p-6 border-b border-border">
          <h3 className="text-sm font-semibold text-foreground/80 mb-2">Описание</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{accessory.description}</p>
        </div>

        {/* Stats */}
        <div className="p-6 border-b border-border">
          <h3 className="text-sm font-semibold text-foreground/80 mb-3">Характеристики</h3>
          
          {nonZeroStats.length > 0 ? (
            <div className="grid grid-cols-1 gap-2">
              {nonZeroStats.map((key) => {
                const value = accessory.stats[key];
                const isPositive = value > 0;
                const isNegative = value < 0;
                
                return (
                  <div
                    key={key}
                    className="flex items-center justify-between py-2 px-3 rounded-lg bg-secondary/30"
                  >
                    <span className="text-sm text-foreground/70">{STAT_LABELS[key]}</span>
                    <span
                      className={`
                        font-semibold text-sm
                        ${isPositive ? 'stat-positive' : ''}
                        ${isNegative ? 'text-arz-blue' : ''}
                      `}
                    >
                      {isPositive && '+'}
                      {value}{STAT_SUFFIXES[key]}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Нет бонусов к характеристикам</p>
          )}
        </div>

        {/* Actions */}
        <div className="p-6">
          {isEquipped ? (
            <button
              onClick={onUnequip}
              className="w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Снять
            </button>
          ) : (
            <button
              onClick={onEquip}
              className="w-full arz-button py-3"
            >
              Экипировать
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
