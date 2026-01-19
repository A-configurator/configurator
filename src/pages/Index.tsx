import { useState, useCallback, useMemo } from 'react';
import { Accessory, accessories, calculateTotalStats, SLOT_NAMES, AccessoryStats, AccessoryType, getEmptyStats } from '@/data/accessories';
import { X, Minus, Plus, Search, Shirt, Send } from 'lucide-react';
import { Patch, getPatchesForSlot, calculatePatchBonuses } from '@/data/patches';
import logoImg from '@/assets/logo.png';

// Skin images
import spaceFarmerImg from '@/assets/skins/space-farmer.png';
import suidniSweeneyImg from '@/assets/skins/suidni-sweeney.png';
import antManImg from '@/assets/skins/ant-man.png';
import meguImg from '@/assets/skins/megu.png';
import bloodAngelImg from '@/assets/skins/blood-angel.png';
import spaceMarineImg from '@/assets/skins/space-marine.png';
import altGirlImg from '@/assets/skins/alt-girl.png';
import spetsnazImg from '@/assets/skins/spetsnaz.png';
import deadpoolImg from '@/assets/skins/deadpool.png';
import danjiImg from '@/assets/skins/danji.png';

// Base stats (without any skin)
const BASE_STATS: AccessoryStats = {
  defense: 8,
  regen: 4,
  damage: 4,
  luck: 4,
  maxHp: 12,
  maxArmor: 12,
  stunChance: 0,
  drunkChance: 0,
  antiStun: 0,
  reflect: 0,
  block: 0,
  fireRate: 0,
  recoil: 0,
};

// Skins data
export interface SkinStats {
  defense?: number;
  damage?: number;
  reflect?: number;
  maxArmor?: number;
}

export interface Skin {
  id: number;
  name: string;
  image: string;
  stats: SkinStats;
}

const skins: Skin[] = [
  { id: 1, name: 'Космический Фермер', image: spaceFarmerImg, stats: { defense: 2, damage: 2, reflect: 3, maxArmor: 50 } },
  { id: 2, name: 'Суидни Суини', image: suidniSweeneyImg, stats: { defense: 2, damage: 2, reflect: 3 } },
  { id: 3, name: 'Человек-муравей', image: antManImg, stats: { defense: 2, damage: 2, reflect: 3 } },
  { id: 4, name: 'Мэгу', image: meguImg, stats: { defense: 2, damage: 2, reflect: 3 } },
  { id: 5, name: 'Кровавый Ангел', image: bloodAngelImg, stats: { defense: 2, damage: 2, reflect: 3 } },
  { id: 6, name: 'Космодесантник', image: spaceMarineImg, stats: { defense: 2, damage: 2, reflect: 3 } },
  { id: 7, name: 'Альтушка', image: altGirlImg, stats: { maxArmor: 100 } },
  { id: 8, name: 'Спецназовец', image: spetsnazImg, stats: { defense: 2, damage: 2, reflect: 3 } },
  { id: 9, name: 'Дэдпул', image: deadpoolImg, stats: { damage: 2, reflect: 3 } },
  { id: 10, name: 'Данджи', image: danjiImg, stats: { defense: 2, damage: 2, reflect: 3 } },
];

// Calculate slot bonuses based on level
// Slot 1 (Head): Luck
// Slot 2, 5 (Defense): Defense
// Slot 3, 4 (Attack): Damage
// Slot 6 (Universal): Damage or Defense based on accessory type
// Slot 7, 8: No special bonuses from levels

const calculateSlotBonuses = (
  slot: number, 
  level: number, 
  accessoryType: AccessoryType = 'attack'
): Partial<AccessoryStats> => {
  const bonuses: Partial<AccessoryStats> = {};

  // Slot 1 - Head (Luck)
  if (slot === 1) {
    if (level >= 4 && level <= 12) {
      bonuses.luck = level - 3; // +1 per level from 4
    } else if (level === 13) {
      bonuses.luck = 10;
      bonuses.maxHp = 4;
      bonuses.maxArmor = 9;
    } else if (level === 14) {
      bonuses.luck = 11;
      bonuses.maxHp = 4; // сохраняется от +13
      bonuses.maxArmor = 14; // 9 + 5
      bonuses.drunkChance = 2;
      bonuses.reflect = 1;
    }
  }

  // Slot 2, 5 - Defense slots
  if (slot === 2 || slot === 5) {
    if (level >= 4 && level <= 12) {
      bonuses.defense = (level - 3) * 2; // +2 per level from 4
    } else if (level === 13) {
      bonuses.defense = 20;
      bonuses.maxHp = 4;
      bonuses.maxArmor = 9;
    } else if (level === 14) {
      bonuses.defense = 22;
      bonuses.maxHp = 4; // сохраняется от +13
      bonuses.maxArmor = 14; // 9 + 5
      bonuses.drunkChance = 2;
      bonuses.reflect = 1;
    }
  }

  // Slot 3, 4 - Attack slots
  if (slot === 3 || slot === 4) {
    if (level >= 4 && level <= 12) {
      bonuses.damage = level - 3; // +1 per level from 4
    } else if (level === 13) {
      bonuses.damage = 10;
      bonuses.maxHp = 4;
      bonuses.maxArmor = 9;
    } else if (level === 14) {
      bonuses.damage = 11;
      bonuses.maxHp = 4; // сохраняется от +13
      bonuses.maxArmor = 9; // у атакующих слотов нет +5
      bonuses.drunkChance = 2;
      bonuses.reflect = 1;
    }
  }

  // Slot 6 - Universal (attack or defense based on accessory type)
  // По правилам: до +3 включительно бонусов НЕТ, бонусы начинаются с +4
  if (slot === 6) {
    if (accessoryType === 'attack') {
      if (level >= 4 && level <= 12) {
        bonuses.damage = level - 3; // +1 per level from 4
      } else if (level === 13) {
        bonuses.damage = 11;
        bonuses.maxHp = 4;
        bonuses.maxArmor = 9;
      } else if (level === 14) {
        bonuses.damage = 12;
        bonuses.maxHp = 4; // сохраняется от +13
        bonuses.maxArmor = 14;
        bonuses.drunkChance = 2;
        bonuses.reflect = 1;
      }
    } else {
      if (level >= 4 && level <= 12) {
        bonuses.defense = (level - 3) * 2; // +2 per level from 4
      } else if (level === 13) {
        bonuses.defense = 22;
        bonuses.maxHp = 4;
        bonuses.maxArmor = 9;
      } else if (level === 14) {
        bonuses.defense = 24;
        bonuses.maxHp = 4; // сохраняется от +13
        bonuses.maxArmor = 14;
        bonuses.drunkChance = 2;
        bonuses.reflect = 1;
      }
    }
  }

  return bonuses;
};

// Calculate total bonuses from all slot enhancements (only for equipped slots)
const calculateEnhancementBonuses = (
  enhancements: number[], 
  equippedAccessories: (Accessory | null)[],
  slot6Type: AccessoryType
): AccessoryStats => {
  const total: AccessoryStats = {
    defense: 0, regen: 0, damage: 0, luck: 0, maxHp: 0, maxArmor: 0,
    stunChance: 0, drunkChance: 0, antiStun: 0, reflect: 0, block: 0, fireRate: 0, recoil: 0
  };

  enhancements.forEach((level, index) => {
    // Only calculate bonuses if an accessory is equipped in this slot
    if (!equippedAccessories[index]) return;
    
    const slot = index + 1;
    // Use slot 6 type from accessory or state
    const accessoryType = slot === 6 
      ? (equippedAccessories[index]?.accessoryType || slot6Type)
      : 'attack';
    const bonuses = calculateSlotBonuses(slot, level, accessoryType);
    
    (Object.keys(bonuses) as (keyof AccessoryStats)[]).forEach((key) => {
      total[key] += bonuses[key] || 0;
    });
  });

  return total;
};

// Calculate total yellow stats from all equipped accessories
const calculateYellowStats = (equippedAccessories: (Accessory | null)[]): AccessoryStats => {
  const total = getEmptyStats();

  equippedAccessories.forEach((acc) => {
    if (!acc) return;

    // Если есть перенос жёлтых — берём ТОЛЬКО перенесённые, иначе — только встроенные
    const hasTransfer = !!acc.yellowTransferStats;

    (Object.keys(total) as (keyof AccessoryStats)[]).forEach((key) => {
      const val = hasTransfer
        ? acc.yellowTransferStats![key] || 0
        : acc.yellowStats?.[key] || 0;

      // «Защита: -X» означает +X к защите
      const normalized = key === 'defense' && val < 0 ? -val : val;
      total[key] += normalized;
    });
  });

  return total;
};

// Combine base stats + skin stats + accessory stats + enhancement bonuses + yellow stats + patch bonuses
const combineTotalStats = (
  baseStats: AccessoryStats, 
  skinStats: SkinStats | null, 
  accessoryStats: AccessoryStats,
  enhancementBonuses: AccessoryStats,
  yellowStats: AccessoryStats,
  patchBonuses: AccessoryStats
): AccessoryStats => {
  const rawDefense =
    baseStats.defense +
    (skinStats?.defense || 0) +
    accessoryStats.defense +
    enhancementBonuses.defense +
    yellowStats.defense +
    patchBonuses.defense;

  // Кап защиты: максимум 90% (как «Защита: -90% урона»)
  const cappedDefense = Math.min(Math.max(rawDefense, 0), 90);

  return {
    defense: cappedDefense,
    regen: baseStats.regen + accessoryStats.regen + enhancementBonuses.regen + yellowStats.regen + patchBonuses.regen,
    damage: baseStats.damage + (skinStats?.damage || 0) + accessoryStats.damage + enhancementBonuses.damage + yellowStats.damage + patchBonuses.damage,
    luck: baseStats.luck + accessoryStats.luck + enhancementBonuses.luck + yellowStats.luck + patchBonuses.luck,
    maxHp: baseStats.maxHp + accessoryStats.maxHp + enhancementBonuses.maxHp + yellowStats.maxHp + patchBonuses.maxHp,
    maxArmor: baseStats.maxArmor + (skinStats?.maxArmor || 0) + accessoryStats.maxArmor + enhancementBonuses.maxArmor + yellowStats.maxArmor + patchBonuses.maxArmor,
    stunChance: baseStats.stunChance + accessoryStats.stunChance + enhancementBonuses.stunChance + yellowStats.stunChance + patchBonuses.stunChance,
    drunkChance: baseStats.drunkChance + accessoryStats.drunkChance + enhancementBonuses.drunkChance + yellowStats.drunkChance + patchBonuses.drunkChance,
    antiStun: baseStats.antiStun + accessoryStats.antiStun + enhancementBonuses.antiStun + yellowStats.antiStun + patchBonuses.antiStun,
    reflect: baseStats.reflect + (skinStats?.reflect || 0) + accessoryStats.reflect + enhancementBonuses.reflect + yellowStats.reflect + patchBonuses.reflect,
    block: baseStats.block + accessoryStats.block + enhancementBonuses.block + yellowStats.block + patchBonuses.block,
    fireRate: baseStats.fireRate + accessoryStats.fireRate + enhancementBonuses.fireRate + yellowStats.fireRate + patchBonuses.fireRate,
    recoil: baseStats.recoil + accessoryStats.recoil + enhancementBonuses.recoil + yellowStats.recoil + patchBonuses.recoil,
  };
};

// Skin selection modal
interface SkinModalProps {
  selectedSkinId: number;
  onSelect: (skin: Skin) => void;
  onClose: () => void;
}

const SkinModal = ({ selectedSkinId, onSelect, onClose }: SkinModalProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSkins = useMemo(() => {
    if (!searchTerm.trim()) return skins;
    return skins.filter((skin) =>
      skin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm" onClick={onClose}>
      <div
        className="w-full max-w-md max-h-[70vh] bg-card border border-border rounded-xl shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-bold arz-text-gradient">Выбор скина</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-secondary hover:bg-secondary/80 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search */}
        <div className="p-3 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Поиск скина..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-secondary border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>
        
        {/* Skins list */}
        <div className="flex-1 overflow-y-auto p-3 arz-scrollbar">
          <div className="grid grid-cols-3 gap-2">
            {filteredSkins.map((skin) => (
              <div
                key={skin.id}
                onClick={() => onSelect(skin)}
                className={`
                  p-2 bg-secondary rounded-lg cursor-pointer flex flex-col items-center gap-1
                  border-2 transition-all duration-200
                  ${selectedSkinId === skin.id ? 'border-primary arz-glow' : 'border-border hover:border-primary/50'}
                `}
              >
                <img src={skin.image} alt={skin.name} className="w-16 h-20 object-cover object-top rounded" />
                <div className="text-[10px] font-medium truncate w-full text-center">{skin.name}</div>
                <div className="text-[8px] text-red-500 text-center leading-tight space-y-0.5">
                  {skin.stats.defense !== undefined && <div>Защита: {skin.stats.defense}</div>}
                  {skin.stats.damage !== undefined && <div>Урон: {skin.stats.damage}</div>}
                  {skin.stats.reflect !== undefined && <div>Отражение урона: {skin.stats.reflect}</div>}
                  {skin.stats.maxArmor !== undefined && <div>Макс. Брони: {skin.stats.maxArmor}</div>}
                </div>
              </div>
            ))}
          </div>
          
          {filteredSkins.length === 0 && (
            <div className="text-center text-muted-foreground py-8 text-sm">
              Ничего не найдено
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Yellow stats transfer modal (universal - for any accessory)
interface YellowTransferModalProps {
  slotNumber: number;
  accessories: Accessory[];
  excludeId: number; // ID текущего аксессуара (нельзя переносить на себя)
  onSelect: (accessory: Accessory) => void;
  onSkip: () => void;
  onClose: () => void;
}

const YellowTransferModal = ({ slotNumber, accessories: allAccessories, excludeId, onSelect, onSkip, onClose }: YellowTransferModalProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Фильтруем аксессуары этого слота с жёлтыми статами (включая isYellowOnly), исключая себя
  const yellowAccessories = allAccessories.filter(acc => 
    acc.slot === slotNumber && 
    acc.id !== excludeId && 
    (acc.yellowStats || acc.isYellowOnly)
  );

  const filteredOptions = useMemo(() => {
    if (!searchTerm.trim()) return yellowAccessories;
    return yellowAccessories.filter((opt) =>
      opt.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [yellowAccessories, searchTerm]);

  const statLabels: Record<string, string> = {
    defense: 'Защита',
    damage: 'Урон',
    luck: 'Удача',
    regen: 'Регенерация',
    maxHp: 'Макс. HP',
    maxArmor: 'Макс. Брони',
    stunChance: 'Шанс оглуш.',
    drunkChance: 'Шанс опьянения',
    antiStun: 'Анти-оглуш.',
    reflect: 'Отражение',
    block: 'Блок',
    fireRate: 'Скорострельность',
    recoil: 'Отдача',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm" onClick={onClose}>
      <div
        className="w-full max-w-md max-h-[80vh] bg-card border border-border rounded-xl shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-bold text-yellow-400">ПЕРЕНОС ЖЁЛТЫХ ХАРАКТЕРИСТИК</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-secondary hover:bg-secondary/80 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search */}
        <div className="p-3 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Поиск..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-secondary border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
            />
          </div>
        </div>
        
        {/* Options list */}
        <div className="flex-1 overflow-y-auto p-3 arz-scrollbar">
          <div className="grid grid-cols-2 gap-2">
            {filteredOptions.map((opt) => {
              const yellowStats = opt.isYellowOnly ? opt.yellowStats : opt.yellowStats;
              const statsToShow = yellowStats 
                ? Object.entries(yellowStats).filter(([_, value]) => value !== 0)
                : [];
              return (
                <div
                  key={opt.id}
                  onClick={() => onSelect(opt)}
                  className="p-2 bg-secondary rounded-lg cursor-pointer flex flex-col items-center gap-1 border-2 border-border hover:border-yellow-400/50 transition-all duration-200"
                >
                  {opt.imageUrl && (
                    <img src={opt.imageUrl} alt={opt.name} className="w-14 h-14 object-contain" />
                  )}
                  <div className="text-[10px] font-medium truncate w-full text-center">{opt.name}</div>
                  {opt.isYellowOnly && (
                    <div className="text-[9px] font-medium text-yellow-400">Жёлтый аксессуар</div>
                  )}
                  {statsToShow.length > 0 && (
                    <div className="text-[8px] text-center leading-tight space-y-0.5 w-full">
                      {statsToShow.map(([key, value]) => (
                        <div key={key}>
                          <span className="text-yellow-400">{statLabels[key] || key}: </span>
                          <span className="text-foreground">+{value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          {filteredOptions.length === 0 && (
            <div className="text-center text-muted-foreground py-8 text-sm">
              {searchTerm ? 'Ничего не найдено' : 'Нет аксессуаров с жёлтыми характеристиками'}
            </div>
          )}
        </div>

        {/* Footer with skip button */}
        <div className="p-3 border-t border-border">
          <button
            onClick={onSkip}
            className="w-full py-2.5 px-4 bg-secondary text-foreground border border-border rounded-lg text-sm font-medium hover:bg-secondary/80 transition-colors"
          >
            Не переносить
          </button>
        </div>
      </div>
    </div>
  );
};

// Slot selection modal - compact with search
interface SlotModalProps {
  slotNumber: number;
  accessories: Accessory[];
  equippedId: number | null;
  onSelect: (accessory: Accessory) => void;
  onUnequip: () => void;
  onClose: () => void;
}

const SlotModal = ({ slotNumber, accessories: slotAccessories, equippedId, onSelect, onUnequip, onClose }: SlotModalProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAccessories = useMemo(() => {
    if (!searchTerm.trim()) return slotAccessories;
    return slotAccessories.filter((acc) =>
      acc.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [slotAccessories, searchTerm]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm" onClick={onClose}>
      <div
        className="w-full max-w-md max-h-[70vh] bg-card border border-border rounded-xl shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-bold arz-text-gradient">{SLOT_NAMES[slotNumber]}</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-secondary hover:bg-secondary/80 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Unequip button if something is equipped */}
        {equippedId !== null && (
          <div className="p-3 border-b border-border">
            <button
              onClick={onUnequip}
              className="w-full py-2 px-4 bg-destructive/20 text-destructive border border-destructive/30 rounded-lg text-sm font-medium hover:bg-destructive/30 transition-colors"
            >
              Снять аксессуар
            </button>
          </div>
        )}

        {/* Search */}
        <div className="p-3 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Поиск аксессуара..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-secondary border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>
        
        {/* Accessories list */}
        <div className="flex-1 overflow-y-auto p-3 arz-scrollbar">
          <div className="grid grid-cols-2 gap-2">
            {filteredAccessories.map((acc) => {
              const statsToShow = acc.isYellowOnly 
                ? Object.entries(acc.yellowStats || {}).filter(([_, value]) => value !== 0)
                : Object.entries(acc.stats).filter(([_, value]) => value !== 0);
              return (
                <div
                  key={acc.id}
                  onClick={() => onSelect(acc)}
                  className={`
                    p-2 bg-secondary rounded-lg cursor-pointer flex flex-col items-center gap-1
                    border-2 transition-all duration-200
                    ${equippedId === acc.id ? 'border-primary arz-glow' : 'border-border hover:border-primary/50'}
                  `}
                >
                  {acc.imageUrl && (
                    <img src={acc.imageUrl} alt={acc.name} className="w-14 h-14 object-contain" />
                  )}
                  <div className="text-[10px] font-medium truncate w-full text-center">{acc.name}</div>
                  {/* Yellow only label */}
                  {acc.isYellowOnly && (
                    <div className="text-[9px] font-medium text-yellow-400">Жёлтые характеристики</div>
                  )}
                  {statsToShow.length > 0 && (
                    <div className="text-[8px] text-center leading-tight space-y-0.5 w-full">
                      {statsToShow.map(([key, value]) => {
                        const statKey = key as keyof AccessoryStats;
                        const labels: Record<string, string> = {
                          defense: 'Защита',
                          damage: 'Урон',
                          luck: 'Удача',
                          regen: 'Регенерация',
                          maxHp: 'Макс. HP',
                          maxArmor: 'Макс. Брони',
                          stunChance: 'Шанс оглуш.',
                          drunkChance: 'Шанс опьянения',
                          antiStun: 'Анти-оглуш.',
                          reflect: 'Отражение',
                          block: 'Блок',
                          fireRate: 'Скорострельность',
                          recoil: 'Отдача',
                        };
                        return (
                          <div key={key}>
                            <span className={acc.isYellowOnly ? 'text-yellow-400' : 'text-destructive'}>{labels[statKey] || key}: </span>
                            <span className="text-foreground">{value > 0 ? `+${value}` : value}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          {filteredAccessories.length === 0 && (
            <div className="text-center text-muted-foreground py-8 text-sm">
              {searchTerm ? 'Ничего не найдено' : 'Нет аксессуаров для этого слота'}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-border text-center text-xs text-muted-foreground">
          Найдено: {filteredAccessories.length}
        </div>
      </div>
    </div>
  );
};


// Base stats transfer modal (universal - for any accessory)
interface BaseStatsModalProps {
  slotNumber: number;
  accessories: Accessory[];
  excludeId: number; // ID текущего аксессуара (нельзя переносить на себя)
  onSelect: (accessory: Accessory) => void;
  onSkip: () => void;
  onClose: () => void;
}

const BaseStatsModal = ({ slotNumber, accessories: allAccessories, excludeId, onSelect, onSkip, onClose }: BaseStatsModalProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Фильтруем аксессуары этого слота, исключая себя и жёлтые аксессуары (у них нет базовых статов)
  const baseAccessories = allAccessories.filter(acc => acc.slot === slotNumber && acc.id !== excludeId && !acc.isYellowOnly);

  const filteredOptions = useMemo(() => {
    if (!searchTerm.trim()) return baseAccessories;
    return baseAccessories.filter((opt) =>
      opt.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [baseAccessories, searchTerm]);

  const statLabels: Record<string, string> = {
    defense: 'Защита',
    damage: 'Урон',
    luck: 'Удача',
    regen: 'Регенерация',
    maxHp: 'Макс. HP',
    maxArmor: 'Макс. Брони',
    stunChance: 'Шанс оглуш.',
    drunkChance: 'Шанс опьянения',
    antiStun: 'Анти-оглуш.',
    reflect: 'Отражение',
    block: 'Блок',
    fireRate: 'Скорострельность',
    recoil: 'Отдача',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm" onClick={onClose}>
      <div
        className="w-full max-w-md max-h-[80vh] bg-card border border-border rounded-xl shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-bold text-destructive">ПЕРЕНОС БАЗОВЫХ ХАРАКТЕРИСТИК</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-secondary hover:bg-secondary/80 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search */}
        <div className="p-3 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Поиск..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-secondary border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-destructive/50"
            />
          </div>
        </div>
        
        {/* Options list */}
        <div className="flex-1 overflow-y-auto p-3 arz-scrollbar">
          <div className="grid grid-cols-2 gap-2">
            {filteredOptions.map((opt) => {
              // Показываем базовые статы или жёлтые статы (если это isYellowOnly)
              const stats = opt.isYellowOnly ? opt.yellowStats : opt.stats;
              const statsToShow = stats ? Object.entries(stats).filter(([_, value]) => value !== 0) : [];
              return (
                <div
                  key={opt.id}
                  onClick={() => onSelect(opt)}
                  className="p-2 bg-secondary rounded-lg cursor-pointer flex flex-col items-center gap-1 border-2 border-border hover:border-destructive/50 transition-all duration-200"
                >
                  {opt.imageUrl && (
                    <img src={opt.imageUrl} alt={opt.name} className="w-14 h-14 object-contain" />
                  )}
                  <div className="text-[10px] font-medium truncate w-full text-center">{opt.name}</div>
                  {opt.isYellowOnly && (
                    <div className="text-[9px] font-medium text-yellow-400">Жёлтый аксессуар</div>
                  )}
                  {statsToShow.length > 0 && (
                    <div className="text-[8px] text-center leading-tight space-y-0.5 w-full">
                      {statsToShow.map(([key, value]) => (
                        <div key={key}>
                          <span className={opt.isYellowOnly ? 'text-yellow-400' : 'text-destructive'}>{statLabels[key] || key}: </span>
                          <span className="text-foreground">+{value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          {filteredOptions.length === 0 && (
            <div className="text-center text-muted-foreground py-8 text-sm">
              {searchTerm ? 'Ничего не найдено' : 'Нет доступных аксессуаров'}
            </div>
          )}
        </div>

        {/* Footer with skip button */}
        <div className="p-3 border-t border-border">
          <button
            onClick={onSkip}
            className="w-full py-2.5 px-4 bg-secondary text-foreground border border-border rounded-lg text-sm font-medium hover:bg-secondary/80 transition-colors"
          >
            Не переносить
          </button>
        </div>
      </div>
    </div>
  );
};

// Stats display component
const StatsDisplay = ({ stats }: { stats: AccessoryStats }) => {
  const statItems: { key: keyof AccessoryStats; label: string; format: (v: number) => string }[] = [
    { key: 'defense', label: 'Защита:', format: (v) => `[-${v}% урона]` },
    { key: 'regen', label: 'Регенерация:', format: (v) => `[${v} HP в мин.]` },
    { key: 'damage', label: 'Урон:', format: (v) => `[+${v} урона]` },
    { key: 'luck', label: 'Удача:', format: (v) => `[шанс ${v}% крит.урона]` },
    { key: 'maxHp', label: 'Макс. HP:', format: (v) => `[+${v} макс. HP]` },
    { key: 'maxArmor', label: 'Макс. Брони:', format: (v) => `[+${v} макс. Брони]` },
    { key: 'stunChance', label: 'Шанс оглушения:', format: (v) => `[+${v}%]` },
    { key: 'drunkChance', label: 'Шанс опьянения:', format: (v) => `[+${v}%]` },
    { key: 'antiStun', label: 'Шанс избежать оглушения:', format: (v) => `[+${v}%]` },
    { key: 'reflect', label: 'Отражение урона:', format: (v) => `[-${v}%]` },
    { key: 'block', label: 'Блокировка урона:', format: (v) => `[${v} раз]` },
    { key: 'fireRate', label: 'Скорострельность:', format: (v) => `[+${v}% скорострельности]` },
    { key: 'recoil', label: 'Отдача:', format: (v) => `[${v}% отдачи]` },
  ];

  return (
    <div className="space-y-1 text-sm">
      {statItems.map(({ key, label, format }) => (
        <div key={key} className="flex flex-wrap gap-1">
          <span className="font-medium">{label}</span>
          <span className={stats[key] !== 0 ? 'stat-positive' : 'stat-neutral'}>
            {format(stats[key])}
          </span>
        </div>
      ))}
    </div>
  );
};

// Patch selection modal
interface PatchModalProps {
  slotNumber: number;
  currentPatch: Patch | null;
  onSelect: (patch: Patch) => void;
  onRemove: () => void;
  onClose: () => void;
}

const PatchModal = ({ slotNumber, currentPatch, onSelect, onRemove, onClose }: PatchModalProps) => {
  const availablePatches = getPatchesForSlot(slotNumber);

  const statLabels: Record<string, string> = {
    defense: 'Защита',
    damage: 'Урон',
    luck: 'Удача',
    regen: 'Регенерация',
    maxHp: 'Макс. HP',
    maxArmor: 'Макс. Брони',
    stunChance: 'Шанс оглуш.',
    drunkChance: 'Шанс опьянения',
    antiStun: 'Анти-оглуш.',
    reflect: 'Отражение',
    block: 'Блок',
    fireRate: 'Скорострельность',
    recoil: 'Отдача',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm" onClick={onClose}>
      <div
        className="w-full max-w-md max-h-[80vh] bg-card border border-border rounded-xl shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-bold text-orange-400">ВЫБОР НАШИВКИ</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-secondary hover:bg-secondary/80 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Remove button if patch is selected */}
        {currentPatch && (
          <div className="p-3 border-b border-border">
            <button
              onClick={onRemove}
              className="w-full py-2 px-4 bg-destructive/20 text-destructive border border-destructive/30 rounded-lg text-sm font-medium hover:bg-destructive/30 transition-colors"
            >
              Убрать нашивку
            </button>
          </div>
        )}
        
        {/* Patches list */}
        <div className="flex-1 overflow-y-auto p-3 arz-scrollbar">
          <div className="grid grid-cols-2 gap-2">
            {availablePatches.map((patch) => {
              const statsToShow = Object.entries(patch.stats).filter(([_, value]) => value !== 0);
              return (
                <div
                  key={patch.id}
                  onClick={() => onSelect(patch)}
                  className={`
                    p-2 bg-secondary rounded-lg cursor-pointer flex flex-col items-center gap-1
                    border-2 transition-all duration-200
                    ${currentPatch?.id === patch.id ? 'border-orange-400 arz-glow' : 'border-border hover:border-orange-400/50'}
                    ${patch.isLegendary ? 'bg-gradient-to-br from-yellow-900/30 to-orange-900/30' : ''}
                  `}
                >
                  <img src={patch.image} alt={patch.name} className="w-14 h-14 object-contain" />
                  <div className={`text-[10px] font-medium truncate w-full text-center ${patch.isLegendary ? 'text-yellow-400' : ''}`}>
                    {patch.name}
                  </div>
                  {statsToShow.length > 0 && (
                    <div className="text-[8px] text-center leading-tight space-y-0.5 w-full">
                      {statsToShow.map(([key, value]) => (
                        <div key={key}>
                          <span className="text-orange-400">{statLabels[key] || key}: </span>
                          <span className="text-foreground">+{value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-border text-center text-xs text-muted-foreground">
          {slotNumber <= 3 && 'Доступна легендарная нашивка для этого слота!'}
        </div>
      </div>
    </div>
  );
};

// Equipment slot component
interface EquipmentSlotProps {
  slotNumber: number;
  equipped: Accessory | null;
  enhancement: number;
  onSlotClick: () => void;
  onEnhance: (delta: number) => void;
  slot6Type?: AccessoryType;
  onSlot6TypeChange?: (type: AccessoryType) => void;
  yellowStatsSource?: Accessory | null; // Источник жёлтых характеристик (аксессуар)
  baseStatsSource?: Accessory | null; // Источник базовых характеристик
  patch?: Patch | null; // Нашивка
  onPatchClick?: () => void; // Клик на "наш."
}

const EquipmentSlot = ({ slotNumber, equipped, enhancement, onSlotClick, onEnhance, slot6Type, onSlot6TypeChange, yellowStatsSource, baseStatsSource, patch, onPatchClick }: EquipmentSlotProps) => {
  return (
    <div className="flex flex-col">
      <div
        onClick={onSlotClick}
        className={`
          aspect-square bg-secondary rounded-lg flex items-center justify-center cursor-pointer
          border-2 transition-all duration-200 mb-1 relative
          ${equipped ? 'border-primary/50' : 'border-border hover:border-primary/30'}
        `}
      >
        {equipped ? (
          <div className="text-center p-1 flex flex-col items-center justify-center w-full h-full">
            {equipped.imageUrl ? (
              <img src={equipped.imageUrl} alt={equipped.name} className="w-12 h-12 object-contain" />
            ) : (
              <div className="text-[10px] font-medium truncate px-1">{equipped.name}</div>
            )}
          </div>
        ) : (
          <div className="text-xs text-muted-foreground">{SLOT_NAMES[slotNumber]}</div>
        )}
        
        {/* Base stats source icon - top LEFT corner */}
        {baseStatsSource && equipped && (
          <div className="absolute -top-2 -left-2 w-10 h-10 rounded-full border-2 border-destructive overflow-hidden bg-background">
            <img src={baseStatsSource.imageUrl} alt={baseStatsSource.name} className="w-full h-full object-contain" />
          </div>
        )}
        
        {/* Yellow stats source icon - top RIGHT corner */}
        {yellowStatsSource && equipped && (
          <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full border-2 border-yellow-400 overflow-hidden bg-background">
            <img src={yellowStatsSource.imageUrl} alt={yellowStatsSource.name} className="w-full h-full object-contain" />
          </div>
        )}

        {/* Patch icon - bottom LEFT corner */}
        {patch && (
          <div className="absolute -bottom-2 -left-2 w-8 h-8 rounded-full border-2 border-orange-400 overflow-hidden bg-background">
            <img src={patch.image} alt={patch.name} className="w-full h-full object-contain" />
          </div>
        )}
      </div>
      
      {/* Enhancement controls + Patch button */}
      <div className="flex items-center justify-center gap-1">
        <button
          onClick={(e) => { e.stopPropagation(); if (equipped) onPatchClick?.(); }}
          disabled={!equipped}
          className={`text-[9px] font-bold transition-colors ${
            !equipped 
              ? 'text-muted-foreground/30 cursor-not-allowed' 
              : patch 
                ? 'text-orange-400 cursor-pointer hover:text-orange-300' 
                : 'text-muted-foreground cursor-pointer hover:text-orange-300'
          }`}
          title={equipped ? "Выбрать нашивку" : "Сначала выберите аксессуар"}
        >
          наш.
        </button>
        <span className="text-xs font-medium text-primary">+{enhancement}</span>
        <button
          onClick={(e) => { e.stopPropagation(); onEnhance(-1); }}
          className="w-5 h-5 bg-secondary rounded flex items-center justify-center hover:bg-secondary/80"
        >
          <Minus className="w-3 h-3" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onEnhance(1); }}
          className="w-5 h-5 bg-secondary rounded flex items-center justify-center hover:bg-secondary/80"
        >
          <Plus className="w-3 h-3" />
        </button>
      </div>

    </div>
  );
};

const Index = () => {
  const [equippedAccessories, setEquippedAccessories] = useState<(Accessory | null)[]>(Array(8).fill(null));
  const [enhancements, setEnhancements] = useState<number[]>(Array(8).fill(14));
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [selectedSkin, setSelectedSkin] = useState<Skin | null>(null);
  const [showSkinModal, setShowSkinModal] = useState(false);
  const [slot6Type, setSlot6Type] = useState<AccessoryType>('attack');
  const [pendingAccessory, setPendingAccessory] = useState<Accessory | null>(null);
  const [showYellowModal, setShowYellowModal] = useState(false);
  const [showBaseStatsModal, setShowBaseStatsModal] = useState(false);
  const [selectedYellowStatsSource, setSelectedYellowStatsSource] = useState<(Accessory | null)[]>(Array(8).fill(null)); // Источник жёлтых
  const [selectedBaseStatsSource, setSelectedBaseStatsSource] = useState<(Accessory | null)[]>(Array(8).fill(null)); // Источник базовых
  const [selectedPatches, setSelectedPatches] = useState<(Patch | null)[]>(Array(8).fill(null)); // Нашивки для каждого слота
  const [showPatchModal, setShowPatchModal] = useState<number | null>(null); // Номер слота для выбора нашивки

  const accessoryStats = calculateTotalStats(equippedAccessories);
  const yellowStats = useMemo(() => calculateYellowStats(equippedAccessories), [equippedAccessories]);
  const enhancementBonuses = useMemo(() => calculateEnhancementBonuses(enhancements, equippedAccessories, slot6Type), [enhancements, equippedAccessories, slot6Type]);
  const patchBonuses = useMemo(() => calculatePatchBonuses(selectedPatches), [selectedPatches]);
  const totalStats = combineTotalStats(BASE_STATS, selectedSkin?.stats || null, accessoryStats, enhancementBonuses, yellowStats, patchBonuses);

  // DEBUG: Отладка статов
  console.log('=== DEBUG STATS ===');
  console.log('BASE_STATS:', BASE_STATS);
  console.log('accessoryStats:', accessoryStats);
  console.log('yellowStats:', yellowStats);
  console.log('enhancementBonuses:', enhancementBonuses);
  console.log('totalStats:', totalStats);
  console.log('equippedAccessories:', equippedAccessories.map(a => a ? { name: a.name, stats: a.stats, baseTransferStats: a.baseTransferStats, yellowStats: a.yellowStats, yellowTransferStats: a.yellowTransferStats } : null));

  // Когда выбирают аксессуар - всегда показываем модалку переноса базовых
  const handleSelectAccessory = useCallback((accessory: Accessory) => {
    setPendingAccessory(accessory);
    setSelectedSlot(null);
    setShowBaseStatsModal(true);
  }, []);

  // Выбрали базовые характеристики для переноса
  const handleSelectBaseStats = useCallback((sourceAccessory: Accessory) => {
    if (pendingAccessory) {
      // Добавляем перенесённые базовые статы (не затирая встроенные)
      const updatedAccessory: Accessory = {
        ...pendingAccessory,
        baseTransferStats: { ...sourceAccessory.stats },
        // Для слота 6 перенос базовых статов также переносит тип (АТК/ЗАЩ) для заточки
        accessoryType:
          pendingAccessory.slot === 6
            ? (sourceAccessory.accessoryType || pendingAccessory.accessoryType)
            : pendingAccessory.accessoryType,
      };

      setPendingAccessory(updatedAccessory);

      // Сохраняем источник базовых статов
      setSelectedBaseStatsSource((prev) => {
        const newSources = [...prev];
        newSources[pendingAccessory.slot - 1] = sourceAccessory;
        return newSources;
      });
    }
    setShowBaseStatsModal(false);
    // Переходим к выбору жёлтых
    setShowYellowModal(true);
  }, [pendingAccessory]);

  // Пропустить перенос базовых характеристик
  const handleSkipBaseStats = useCallback(() => {
    setPendingAccessory((currentPending) => {
      if (!currentPending) return currentPending;

      // Очищаем перенос базовых статов
      const cleared: Accessory = {
        ...currentPending,
        baseTransferStats: undefined,
      };

      // Очищаем источник базовых статов
      setSelectedBaseStatsSource((prev) => {
        const newSources = [...prev];
        newSources[currentPending.slot - 1] = null;
        return newSources;
      });

      return cleared;
    });

    setShowBaseStatsModal(false);
    // Переходим к выбору жёлтых
    setShowYellowModal(true);
  }, []);

  // Выбрали жёлтые характеристики для переноса
  const handleSelectYellowStats = useCallback((sourceAccessory: Accessory) => {
    setPendingAccessory((currentPending) => {
      if (currentPending) {
        const yellowSource = sourceAccessory.yellowStats;
        const accessoryWithYellow: Accessory = {
          ...currentPending,
          yellowTransferStats: yellowSource ? { ...yellowSource } : undefined,
        };
        setEquippedAccessories((prev) => {
          const newEquipped = [...prev];
          newEquipped[currentPending.slot - 1] = accessoryWithYellow;
          return newEquipped;
        });
        // Сохраняем источник жёлтых статов
        setSelectedYellowStatsSource((prev) => {
          const newSources = [...prev];
          newSources[currentPending.slot - 1] = sourceAccessory;
          return newSources;
        });
      }
      return null;
    });
    setShowYellowModal(false);
  }, []);

  // Пропустить выбор жёлтых
  const handleSkipYellow = useCallback(() => {
    setPendingAccessory((currentPending) => {
      if (currentPending) {
        const accessoryWithoutYellowTransfer: Accessory = {
          ...currentPending,
          yellowTransferStats: undefined,
        };

        setEquippedAccessories((prev) => {
          const newEquipped = [...prev];
          newEquipped[currentPending.slot - 1] = accessoryWithoutYellowTransfer;
          return newEquipped;
        });
        // Очищаем источник жёлтых статов
        setSelectedYellowStatsSource((prev) => {
          const newSources = [...prev];
          newSources[currentPending.slot - 1] = null;
          return newSources;
        });
      }
      return null;
    });
    setShowYellowModal(false);
  }, []);

  const handleUnequip = useCallback((slotIndex: number) => {
    setEquippedAccessories((prev) => {
      const newEquipped = [...prev];
      newEquipped[slotIndex] = null;
      return newEquipped;
    });

    // Также очищаем источники переносов, чтобы не оставались «привязки»
    setSelectedYellowStatsSource((prev) => {
      const next = [...prev];
      next[slotIndex] = null;
      return next;
    });
    setSelectedBaseStatsSource((prev) => {
      const next = [...prev];
      next[slotIndex] = null;
      return next;
    });

    setSelectedSlot(null);
  }, []);

  const handleEnhance = useCallback((slotIndex: number, delta: number) => {
    setEnhancements((prev) => {
      const newEnhancements = [...prev];
      newEnhancements[slotIndex] = Math.max(0, Math.min(14, newEnhancements[slotIndex] + delta));
      return newEnhancements;
    });
  }, []);

  const getAccessoriesForSlot = (slotNumber: number) => {
    return accessories.filter((acc) => acc.slot === slotNumber);
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      {/* Header */}
      <header className="flex items-center justify-between mb-4">
        {/* Logo + Title */}
        <div className="flex items-center gap-2">
          <img src={logoImg} alt="A-Configurator Logo" className="w-8 h-8" />
          <span className="text-accent font-bold text-xl">
            <span className="text-2xl">A</span>-Configurator
          </span>
        </div>

        {/* Telegram link */}
        <a 
          href="https://t.me/aconfigurator" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-xs text-muted-foreground hover:text-accent transition-colors"
        >
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline">Новости и предложения</span>
        </a>
      </header>

      {/* Main content: Skin + Stats + Slots centered */}
      <div className="flex gap-6 items-start justify-center">
        {/* Character image */}
        <div className="flex flex-col items-center flex-shrink-0">
          <div
            onClick={() => setShowSkinModal(true)}
            className="w-32 h-48 bg-secondary/30 rounded-lg flex items-center justify-center cursor-pointer hover:bg-secondary/50 transition-colors border-2 border-transparent hover:border-primary/30 overflow-hidden"
          >
            {selectedSkin ? (
              <img src={selectedSkin.image} alt={selectedSkin.name} className="w-full h-full object-cover object-top" />
            ) : (
              <div className="text-center p-2">
                <div className="text-xs text-muted-foreground leading-tight">Любой дефолт скин</div>
              </div>
            )}
          </div>
          <div className="mt-1 text-sm font-bold text-primary">+12</div>
        </div>

        {/* Stats */}
        <div className="flex-shrink-0">
          <StatsDisplay stats={totalStats} />
        </div>

        {/* Equipment slots grid */}
        <div className="grid grid-cols-3 gap-3 flex-shrink-0">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((slotNum) => (
          <EquipmentSlot
            key={slotNum}
            slotNumber={slotNum}
            equipped={equippedAccessories[slotNum - 1]}
            enhancement={enhancements[slotNum - 1]}
            onSlotClick={() => setSelectedSlot(slotNum)}
            onEnhance={(delta) => handleEnhance(slotNum - 1, delta)}
            slot6Type={slot6Type}
            onSlot6TypeChange={setSlot6Type}
            yellowStatsSource={selectedYellowStatsSource[slotNum - 1]}
            baseStatsSource={selectedBaseStatsSource[slotNum - 1]}
            patch={selectedPatches[slotNum - 1]}
            onPatchClick={() => setShowPatchModal(slotNum)}
          />
        ))}
        </div>
      </div>

      {/* Slot selection modal */}
      {selectedSlot !== null && (
        <SlotModal
          slotNumber={selectedSlot}
          accessories={getAccessoriesForSlot(selectedSlot)}
          equippedId={equippedAccessories[selectedSlot - 1]?.id ?? null}
          onSelect={handleSelectAccessory}
          onUnequip={() => handleUnequip(selectedSlot - 1)}
          onClose={() => setSelectedSlot(null)}
        />
      )}

      {/* Yellow stats transfer modal */}
      {showYellowModal && pendingAccessory && (
        <YellowTransferModal
          slotNumber={pendingAccessory.slot}
          accessories={accessories}
          excludeId={pendingAccessory.id}
          onSelect={handleSelectYellowStats}
          onSkip={handleSkipYellow}
          onClose={() => {
            setPendingAccessory(null);
            setShowYellowModal(false);
          }}
        />
      )}

      {/* Base stats transfer modal */}
      {showBaseStatsModal && pendingAccessory && (
        <BaseStatsModal
          slotNumber={pendingAccessory.slot}
          accessories={accessories}
          excludeId={pendingAccessory.id}
          onSelect={handleSelectBaseStats}
          onSkip={handleSkipBaseStats}
          onClose={() => {
            setPendingAccessory(null);
            setShowBaseStatsModal(false);
          }}
        />
      )}

      {/* Patch selection modal */}
      {showPatchModal !== null && (
        <PatchModal
          slotNumber={showPatchModal}
          currentPatch={selectedPatches[showPatchModal - 1]}
          onSelect={(patch) => {
            setSelectedPatches((prev) => {
              const newPatches = [...prev];
              newPatches[showPatchModal - 1] = patch;
              return newPatches;
            });
            setShowPatchModal(null);
          }}
          onRemove={() => {
            setSelectedPatches((prev) => {
              const newPatches = [...prev];
              newPatches[showPatchModal - 1] = null;
              return newPatches;
            });
            setShowPatchModal(null);
          }}
          onClose={() => setShowPatchModal(null)}
        />
      )}

      {/* Skin selection modal */}
      {showSkinModal && (
        <SkinModal
          selectedSkinId={selectedSkin?.id ?? 0}
          onSelect={(skin) => {
            setSelectedSkin(skin);
            setShowSkinModal(false);
          }}
          onClose={() => setShowSkinModal(false)}
        />
      )}
    </div>
  );
};

export default Index;
