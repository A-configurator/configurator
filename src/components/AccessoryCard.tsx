import { Accessory } from '@/data/accessories';

interface AccessoryCardProps {
  accessory: Accessory;
  isEquipped: boolean;
  onClick: () => void;
}

const RARITY_STYLES = {
  common: {
    border: 'border-muted-foreground/50 hover:border-muted-foreground',
    bg: 'bg-muted/20',
    text: 'text-muted-foreground',
    label: 'Обычный',
  },
  rare: {
    border: 'border-arz-blue/50 hover:border-arz-blue',
    bg: 'bg-arz-blue/10',
    text: 'text-arz-blue',
    label: 'Редкий',
  },
  epic: {
    border: 'border-arz-purple/50 hover:border-arz-purple',
    bg: 'bg-arz-purple/10',
    text: 'text-arz-purple',
    label: 'Эпический',
  },
  legendary: {
    border: 'border-arz-gold/50 hover:border-arz-gold',
    bg: 'bg-arz-gold/10',
    text: 'text-arz-gold',
    label: 'Легендарный',
  },
};

export const AccessoryCard = ({ accessory, isEquipped, onClick }: AccessoryCardProps) => {
  const style = RARITY_STYLES[accessory.rarity];

  return (
    <div
      onClick={onClick}
      className={`
        arz-card arz-card-hover cursor-pointer relative
        ${style.border} ${style.bg}
        ${isEquipped ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}
      `}
    >
      {isEquipped && (
        <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full font-semibold">
          ✓
        </div>
      )}
      
      <div className="flex flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-sm leading-tight">{accessory.name}</h3>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{accessory.slotName}</span>
          <span className={`text-xs font-medium ${style.text}`}>{style.label}</span>
        </div>
      </div>
    </div>
  );
};
