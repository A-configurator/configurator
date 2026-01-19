import { AccessoryStats } from './accessories';

// Patch images
import patchDefenseImg from '@/assets/patches/patch-defense.png';
import patchDamageImg from '@/assets/patches/patch-damage.png';
import patchRegenImg from '@/assets/patches/patch-regen.png';
import patchLuckImg from '@/assets/patches/patch-luck.png';
import patchMaxHpImg from '@/assets/patches/patch-maxhp.png';
import patchReflectImg from '@/assets/patches/patch-reflect.png';
import patchDarknessImg from '@/assets/patches/patch-darkness.png';
import patchMonsterImg from '@/assets/patches/patch-monster.png';
import patchEnergyImg from '@/assets/patches/patch-energy.png';

export interface Patch {
  id: string;
  name: string;
  image: string;
  stats: Partial<AccessoryStats>;
  // Если указаны - нашивка доступна только для этих слотов
  allowedSlots?: number[];
  isLegendary?: boolean;
}

// Базовые нашивки (доступны для всех слотов)
export const basePatches: Patch[] = [
  {
    id: 'defense',
    name: 'Нашивка на защиту',
    image: patchDefenseImg,
    stats: { defense: 6 },
  },
  {
    id: 'damage',
    name: 'Нашивка на урон',
    image: patchDamageImg,
    stats: { damage: 3 },
  },
  {
    id: 'regen',
    name: 'Нашивка на регенерацию',
    image: patchRegenImg,
    stats: { regen: 3 },
  },
  {
    id: 'luck',
    name: 'Нашивка на удачу',
    image: patchLuckImg,
    stats: { luck: 3 },
  },
  {
    id: 'maxhp',
    name: 'Нашивка на макс. HP',
    image: patchMaxHpImg,
    stats: { maxHp: 8 },
  },
  {
    id: 'reflect',
    name: 'Нашивка на отражение',
    image: patchReflectImg,
    stats: { reflect: 3 },
  },
];

// Легендарные нашивки (для определённых слотов)
export const legendaryPatches: Patch[] = [
  {
    id: 'darkness',
    name: 'Легендарная нашивка тьмы',
    image: patchDarknessImg,
    stats: { defense: 4, damage: 2 },
    allowedSlots: [1],
    isLegendary: true,
  },
  {
    id: 'monster',
    name: 'Легендарная нашивка монстра',
    image: patchMonsterImg,
    stats: { defense: 4, damage: 2 },
    allowedSlots: [2],
    isLegendary: true,
  },
  {
    id: 'energy',
    name: 'Легендарная нашивка энергии',
    image: patchEnergyImg,
    stats: { defense: 8, damage: 4, stunChance: 3 },
    allowedSlots: [3],
    isLegendary: true,
  },
];

// Все нашивки
export const allPatches: Patch[] = [...basePatches, ...legendaryPatches];

// Получить доступные нашивки для слота
export const getPatchesForSlot = (slotNumber: number): Patch[] => {
  return allPatches.filter((patch) => {
    // Если нет ограничений - доступна для всех
    if (!patch.allowedSlots) return true;
    // Иначе - только для указанных слотов
    return patch.allowedSlots.includes(slotNumber);
  });
};

// Рассчитать бонусы от нашивок
export const calculatePatchBonuses = (
  patches: (Patch | null)[]
): AccessoryStats => {
  const total: AccessoryStats = {
    defense: 0,
    regen: 0,
    damage: 0,
    luck: 0,
    maxHp: 0,
    maxArmor: 0,
    stunChance: 0,
    drunkChance: 0,
    antiStun: 0,
    reflect: 0,
    block: 0,
    fireRate: 0,
    recoil: 0,
  };

  patches.forEach((patch) => {
    if (!patch) return;
    (Object.keys(patch.stats) as (keyof AccessoryStats)[]).forEach((key) => {
      total[key] += patch.stats[key] || 0;
    });
  });

  return total;
};
