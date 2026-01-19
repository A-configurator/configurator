import { Accessory, SLOT_NAMES } from '@/data/accessories';
import { User, X } from 'lucide-react';

interface CharacterDisplayProps {
  equippedAccessories: (Accessory | null)[];
  onSlotClick: (slotIndex: number) => void;
  onUnequip: (slotIndex: number) => void;
}

const RARITY_COLORS = {
  common: 'border-muted-foreground',
  rare: 'border-arz-blue',
  epic: 'border-arz-purple',
  legendary: 'border-arz-gold',
};

const RARITY_BG = {
  common: 'bg-muted/30',
  rare: 'bg-arz-blue/10',
  epic: 'bg-arz-purple/10',
  legendary: 'bg-arz-gold/10',
};

export const CharacterDisplay = ({ equippedAccessories, onSlotClick, onUnequip }: CharacterDisplayProps) => {
  return (
    <div className="arz-card h-full">
      <h2 className="font-semibold text-lg mb-4 arz-text-gradient tracking-wider">ПЕРСОНАЖ</h2>
      
      <div className="flex flex-col items-center gap-4">
        {/* Character silhouette */}
        <div className="relative w-32 h-40 bg-secondary/50 rounded-lg flex items-center justify-center border border-border">
          <User className="w-20 h-20 text-muted-foreground" />
        </div>
        
        {/* Equipment slots */}
        <div className="grid grid-cols-2 gap-2 w-full">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((slotNum) => {
            const slotIndex = slotNum - 1;
            const equipped = equippedAccessories[slotIndex];
            
            return (
              <div
                key={slotNum}
                className={`
                  relative arz-slot cursor-pointer transition-all duration-200
                  ${equipped ? `arz-slot-filled ${RARITY_COLORS[equipped.rarity]} ${RARITY_BG[equipped.rarity]}` : 'hover:border-primary/50'}
                `}
                onClick={() => onSlotClick(slotIndex)}
              >
                <div className="text-center p-2">
                  <div className="text-xs text-muted-foreground mb-1">{SLOT_NAMES[slotNum]}</div>
                  {equipped ? (
                    <div className="text-xs font-medium truncate px-1">{equipped.name}</div>
                  ) : (
                    <div className="text-xs text-muted-foreground/50">Пусто</div>
                  )}
                </div>
                
                {equipped && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onUnequip(slotIndex);
                    }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-destructive rounded-full flex items-center justify-center hover:bg-destructive/80 transition-colors"
                  >
                    <X className="w-3 h-3 text-destructive-foreground" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
