import { useState } from 'react';
import { Accessory, accessories, SLOT_NAMES } from '@/data/accessories';
import { AccessoryCard } from './AccessoryCard';
import { Search, Filter } from 'lucide-react';

interface AccessoryGridProps {
  equippedAccessories: (Accessory | null)[];
  onAccessoryClick: (accessory: Accessory) => void;
  filterSlot?: number | null;
}

type RarityFilter = 'all' | 'common' | 'rare' | 'epic' | 'legendary';

export const AccessoryGrid = ({ equippedAccessories, onAccessoryClick, filterSlot }: AccessoryGridProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [slotFilter, setSlotFilter] = useState<number | null>(filterSlot ?? null);
  const [rarityFilter, setRarityFilter] = useState<RarityFilter>('all');

  const filteredAccessories = accessories.filter((acc) => {
    const matchesSearch = acc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSlot = slotFilter === null || acc.slot === slotFilter;
    const matchesRarity = rarityFilter === 'all' || acc.rarity === rarityFilter;
    return matchesSearch && matchesSlot && matchesRarity;
  });

  const isEquipped = (accessory: Accessory) => {
    return equippedAccessories.some((eq) => eq?.id === accessory.id);
  };

  return (
    <div className="arz-card h-full flex flex-col">
      <h2 className="font-semibold text-lg mb-4 arz-text-gradient tracking-wider">АКСЕССУАРЫ</h2>
      
      {/* Search and Filters */}
      <div className="space-y-3 mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Поиск аксессуаров..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-secondary border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <select
            value={slotFilter ?? ''}
            onChange={(e) => setSlotFilter(e.target.value ? Number(e.target.value) : null)}
            className="flex-1 min-w-[120px] px-3 py-2 bg-secondary border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="">Все слоты</option>
            {Object.entries(SLOT_NAMES).map(([num, name]) => (
              <option key={num} value={num}>{name}</option>
            ))}
          </select>
          
          <select
            value={rarityFilter}
            onChange={(e) => setRarityFilter(e.target.value as RarityFilter)}
            className="flex-1 min-w-[120px] px-3 py-2 bg-secondary border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="all">Все редкости</option>
            <option value="common">Обычные</option>
            <option value="rare">Редкие</option>
            <option value="epic">Эпические</option>
            <option value="legendary">Легендарные</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto arz-scrollbar pr-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filteredAccessories.map((accessory) => (
            <AccessoryCard
              key={accessory.id}
              accessory={accessory}
              isEquipped={isEquipped(accessory)}
              onClick={() => onAccessoryClick(accessory)}
            />
          ))}
        </div>
        
        {filteredAccessories.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <Filter className="w-12 h-12 mb-3 opacity-50" />
            <p className="text-sm">Аксессуары не найдены</p>
          </div>
        )}
      </div>
      
      <div className="pt-3 mt-3 border-t border-border text-xs text-muted-foreground text-center">
        Показано: {filteredAccessories.length} из {accessories.length}
      </div>
    </div>
  );
};
