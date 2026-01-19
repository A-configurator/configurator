// Жёлтые характеристики для переноса на аксессуары
import { AccessoryStats, emptyStats } from './accessories';

// Импорты изображений
import nimbRingImg from '@/assets/yellow-stats/nimb-ring.png';
import tangoImg from '@/assets/yellow-stats/tango.png';
import nimbDoraImg from '@/assets/yellow-stats/nimb-dora.png';
import nimbMollyImg from '@/assets/yellow-stats/nimb-molly.png';
import exclusiveHat4Img from '@/assets/yellow-stats/exclusive-hat-4.png';
import exclusiveHat3Img from '@/assets/yellow-stats/exclusive-hat-3.png';
import exclusiveHat2Img from '@/assets/yellow-stats/exclusive-hat-2.png';
import exclusiveHat1Img from '@/assets/yellow-stats/exclusive-hat-1.png';
import tacticalHelmetImg from '@/assets/yellow-stats/tactical-helmet.png';
import pirateHatImg from '@/assets/yellow-stats/pirate-hat.png';

export interface YellowStatsOption {
  id: number;
  name: string;
  slot: number;
  stats: Partial<AccessoryStats>;
  imageUrl: string;
}

// Жёлтые характеристики для слота 1 (Голова)
export const yellowStatsSlot1: YellowStatsOption[] = [
  {
    id: 1001,
    name: 'Нимб кольца всевластия',
    slot: 1,
    stats: { defense: 3, damage: 3, luck: 1, maxHp: 19 },
    imageUrl: nimbRingImg,
  },
  {
    id: 1002,
    name: 'Танго',
    slot: 1,
    stats: { defense: 2, damage: 1, luck: 1, maxHp: 10 },
    imageUrl: tangoImg,
  },
  {
    id: 1003,
    name: 'Нимб Доры',
    slot: 1,
    stats: { defense: 2, damage: 1, luck: 1, maxHp: 10 },
    imageUrl: nimbDoraImg,
  },
  {
    id: 1004,
    name: 'Нимб Пошлой Молли',
    slot: 1,
    stats: { luck: 2, antiStun: 8, reflect: 2 },
    imageUrl: nimbMollyImg,
  },
  {
    id: 1005,
    name: 'Эксклюзивная шляпа 4',
    slot: 1,
    stats: { damage: 1, maxHp: 5 },
    imageUrl: exclusiveHat4Img,
  },
  {
    id: 1006,
    name: 'Эксклюзивная шляпа 3',
    slot: 1,
    stats: { defense: 1, maxHp: 5 },
    imageUrl: exclusiveHat3Img,
  },
  {
    id: 1007,
    name: 'Эксклюзивная шляпа 2',
    slot: 1,
    stats: { luck: 1, maxHp: 5 },
    imageUrl: exclusiveHat2Img,
  },
  {
    id: 1008,
    name: 'Эксклюзивная шляпа 1',
    slot: 1,
    stats: { damage: 1, maxHp: 5 },
    imageUrl: exclusiveHat1Img,
  },
  {
    id: 1009,
    name: 'Тактический шлем',
    slot: 1,
    stats: { defense: 2, maxArmor: 10 },
    imageUrl: tacticalHelmetImg,
  },
  {
    id: 1010,
    name: 'Пиратская шляпа №1',
    slot: 1,
    stats: { defense: 1, damage: 1, luck: 1, stunChance: 1 },
    imageUrl: pirateHatImg,
  },
];

// Получить жёлтые характеристики по слоту
export const getYellowStatsForSlot = (slot: number): YellowStatsOption[] => {
  switch (slot) {
    case 1:
      return yellowStatsSlot1;
    default:
      return [];
  }
};
