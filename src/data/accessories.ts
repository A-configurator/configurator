// Данные аксессуаров Arizona RP на основе arz-wiki.com
// Слоты: 1-Голова, 2-Лицо, 3-Шея, 4-Тело, 5-Руки, 6-Спина, 7-Ноги, 8-Ступни

export interface AccessoryStats {
  defense: number;        // Защита (%)
  regen: number;          // Регенерация (HP/мин)
  damage: number;         // Урон (%)
  luck: number;           // Удача (шанс крит. урона) (%)
  maxHp: number;          // Макс. HP
  maxArmor: number;       // Макс. Броня
  stunChance: number;     // Шанс оглушения (%)
  drunkChance: number;    // Шанс опьянения (%)
  antiStun: number;       // Шанс избежать оглушения (%)
  reflect: number;        // Отражение урона (%)
  block: number;          // Блокировка урона (раз)
  fireRate: number;       // Скорострельность (%)
  recoil: number;         // Отдача (%)
}

// Type of accessory (for slot 6 universal)
export type AccessoryType = 'attack' | 'defense';

export interface Accessory {
  id: number;
  name: string;
  slot: number;
  slotName: string;
  description: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';

  // Встроенные (свои) характеристики аксессуара
  stats: AccessoryStats;
  yellowStats?: AccessoryStats;

  // Перенесённые характеристики (добавляются к встроенным)
  baseTransferStats?: AccessoryStats;
  yellowTransferStats?: AccessoryStats;

  accessoryType?: AccessoryType; // Тип аксессуара (для слота 6)
  imageUrl?: string;
  isYellowOnly?: boolean; // Аксессуар только с жёлтыми характеристиками
}


export const SLOT_NAMES: Record<number, string> = {
  1: 'Голова',
  2: 'Лицо',
  3: 'Рука',
  4: 'Шея',
  5: 'Плечо',
  6: 'Спина',
  7: 'Бронежилет',
  8: 'Чемодан',
};

export const STAT_LABELS: Record<keyof AccessoryStats, string> = {
  defense: 'Защита',
  regen: 'Регенерация (HP/мин)',
  damage: 'Урон',
  luck: 'Удача (шанс крит. урона)',
  maxHp: 'Макс. HP',
  maxArmor: 'Макс. Броня',
  stunChance: 'Шанс оглушения',
  drunkChance: 'Шанс опьянения',
  antiStun: 'Шанс избежать оглушения',
  reflect: 'Отражение урона',
  block: 'Блокировка урона (раз)',
  fireRate: 'Скорострельность',
  recoil: 'Отдача',
};

export const STAT_SUFFIXES: Record<keyof AccessoryStats, string> = {
  defense: '%',
  regen: '',
  damage: '%',
  luck: '%',
  maxHp: '',
  maxArmor: '',
  stunChance: '%',
  drunkChance: '%',
  antiStun: '%',
  reflect: '%',
  block: '',
  fireRate: '%',
  recoil: '%',
};

// Пустые статы - используй для новых аксессуаров
export const emptyStats: AccessoryStats = { defense: 0, regen: 0, damage: 0, luck: 0, maxHp: 0, maxArmor: 0, stunChance: 0, drunkChance: 0, antiStun: 0, reflect: 0, block: 0, fireRate: 0, recoil: 0 };

// Импорты изображений аксессуаров
import markerDeadInsideImg from '@/assets/accessories/marker-dead-inside.png';
import enderCubeImg from '@/assets/accessories/ender-cube.png';
import starNimbusImg from '@/assets/accessories/star-nimbus.png';
import markerBadImg from '@/assets/accessories/marker-bad.png';
import fightClubImg from '@/assets/accessories/fight-club.png';
import ironManHelmetImg from '@/assets/accessories/iron-man-helmet.png';
import happyPepeImg from '@/assets/accessories/happy-pepe.png';
import pumpkinHeadImg from '@/assets/accessories/pumpkin-head.png';
import jetpackImg from '@/assets/accessories/jetpack.png';
import spaceJetpackImg from '@/assets/accessories/space-jetpack.png';

// Импорты аксессуаров слота 2 (Лицо)
import netrunnerGlassesImg from '@/assets/slot2-face/netrunner-glasses.png';
import cyberpunkVrGlassesImg from '@/assets/slot2-face/cyberpunk-vr-glasses.png';
import invisibilityMaskImg from '@/assets/slot2-face/invisibility-mask.png';
import headSphereImg from '@/assets/slot2-face/head-sphere.png';

// Импорты жёлтых аксессуаров слота 1 (только с жёлтыми характеристиками)
import nimbRingYellowImg from '@/assets/slot1-yellow/nimb-ring.png';
import tangoYellowImg from '@/assets/slot1-yellow/tango.png';
import nimbDoraYellowImg from '@/assets/slot1-yellow/nimb-dora.png';
import nimbMollyYellowImg from '@/assets/slot1-yellow/nimb-molly.png';
import exclusiveHat4YellowImg from '@/assets/slot1-yellow/exclusive-hat-4.png';
import exclusiveHat3YellowImg from '@/assets/slot1-yellow/exclusive-hat-3.png';
import exclusiveHat2YellowImg from '@/assets/slot1-yellow/exclusive-hat-2.png';
import exclusiveHat1YellowImg from '@/assets/slot1-yellow/exclusive-hat-1.png';
import tacticalHelmetYellowImg from '@/assets/slot1-yellow/tactical-helmet.png';
import pirateHatYellowImg from '@/assets/slot1-yellow/pirate-hat.png';

// Импорты жёлтых аксессуаров слота 2 (только с жёлтыми характеристиками)
import ghostEnergyMaskImg from '@/assets/slot2-yellow/ghost-energy-mask.png';
import respiratorImg from '@/assets/slot2-yellow/respirator.png';
import skullMaskImg from '@/assets/slot2-yellow/skull-mask.png';
import managerMaskImg from '@/assets/slot2-yellow/manager-mask.png';
import guardMask1Img from '@/assets/slot2-yellow/guard-mask-1.png';
import guardMask3Img from '@/assets/slot2-yellow/guard-mask-3.png';
import guardMask2Img from '@/assets/slot2-yellow/guard-mask-2.png';
import lokiMaskImg from '@/assets/slot2-yellow/loki-mask.png';
import wrenchMaskImg from '@/assets/slot2-yellow/wrench-mask.png';
import glentRobloxMaskImg from '@/assets/slot2-yellow/glent-roblox-mask.png';

// Импорты аксессуаров слота 3 (Рука)
import spaceHandImg from '@/assets/slot3-hand/space-hand.png';
import duffHammerImg from '@/assets/slot3-hand/duff-hammer.png';
import prototypeImg from '@/assets/slot3-hand/prototype.png';
import viGloveImg from '@/assets/slot3-hand/vi-glove.png';
import knucklesGloveImg from '@/assets/slot3-hand/knuckles-glove.png';
import magicAxeImg from '@/assets/slot3-hand/magic-axe.png';
import frapsSignImg from '@/assets/slot3-hand/fraps-sign.png';
import azzinothBladesImg from '@/assets/slot3-hand/azzinoth-blades.png';

// Импорты жёлтых аксессуаров слота 3 (только с жёлтыми характеристиками)
import energyWatchImg from '@/assets/slot3-yellow/energy-watch.png';
import bumblebeeWeaponImg from '@/assets/slot3-yellow/bumblebee-weapon.png';
import pirateLanternImg from '@/assets/slot3-yellow/pirate-lantern.png';
import banditCrossbowImg from '@/assets/slot3-yellow/bandit-crossbow.png';
import watchCartierImg from '@/assets/slot3-yellow/watch-cartier.png';
import watchCasioImg from '@/assets/slot3-yellow/watch-casio.png';
import watchRolexImg from '@/assets/slot3-yellow/watch-rolex.png';
import watchGucciImg from '@/assets/slot3-yellow/watch-gucci.png';
import watchPatekImg from '@/assets/slot3-yellow/watch-patek.png';
import watchAppleImg from '@/assets/slot3-yellow/watch-apple.png';

// Импорты аксессуаров слота 4 (Шея)
import machinatorChainImg from '@/assets/slot4-neck/machinator-chain.png';
import energyMachinatorImg from '@/assets/slot4-neck/energy-machinator.png';
import magicSphereImg from '@/assets/slot4-neck/magic-sphere.png';
import swagChainImg from '@/assets/slot4-neck/swag-chain.png';
import svagaChainImg from '@/assets/slot4-neck/svaga-chain.png';
import flyingSnowflakesImg from '@/assets/slot4-neck/flying-snowflakes.png';

// Импорты жёлтых аксессуаров слота 4 (только с жёлтыми характеристиками)
import illuminatiChainImg from '@/assets/slot4-yellow/illuminati-chain.png';
import giantChainImg from '@/assets/slot4-yellow/giant-chain.png';

// Импорты аксессуаров слота 5 (Плечо)
import magicBalloonImg from '@/assets/slot5-shoulder/magic-balloon.png';
import energyBalloonImg from '@/assets/slot5-shoulder/energy-balloon.png';
import kuraBalloonImg from '@/assets/slot5-shoulder/kura-balloon.png';
import toyDeloreanImg from '@/assets/slot5-shoulder/toy-delorean.png';
import planetExpressImg from '@/assets/slot5-shoulder/planet-express.png';
import pirateCompassImg from '@/assets/slot5-shoulder/pirate-compass.png';
import flyingDutchmanImg from '@/assets/slot5-shoulder/flying-dutchman.png';
import noStatsItemImg from '@/assets/slot5-shoulder/no-stats-item.png';
import mineSkeletonImg from '@/assets/slot5-shoulder/mine-skeleton.png';

// Импорты жёлтых аксессуаров слота 5 (только с жёлтыми характеристиками)
import arcanaIoImg from '@/assets/slot5-yellow/arcana-io.png';

// Импорты аксессуаров слота 6 (Спина)
import thorHammerImg from '@/assets/slot6-back/thor-hammer.png';
import jayceHammerImg from '@/assets/slot6-back/jayce-hammer.png';
import russianAxeImg from '@/assets/slot6-back/russian-axe.png';
import captainShieldImg from '@/assets/slot6-back/captain-shield.png';
import magmaAxeImg from '@/assets/slot6-back/magma-axe.png';
import iceSwordImg from '@/assets/slot6-back/ice-sword.png';
import energyShieldImg from '@/assets/slot6-back/energy-shield.png';
import comptonBatImg from '@/assets/slot6-back/compton-bat.png';
import goldenCrowbarImg from '@/assets/slot6-back/golden-crowbar.png';

// Импорты жёлтых аксессуаров слота 6 (только с жёлтыми характеристиками)
import katanaNirImg from '@/assets/slot6-yellow/katana-nir.png';
import bloodyWingsImg from '@/assets/slot6-yellow/bloody-wings.png';
import spiderLegsImg from '@/assets/slot6-yellow/spider-legs.png';
import redRoseScytheImg from '@/assets/slot6-yellow/red-rose-scythe.png';
import sprayCanBeltImg from '@/assets/slot6-yellow/spray-can-belt.png';
import pirateSabersImg from '@/assets/slot6-yellow/pirate-sabers.png';
import pirateChestImg from '@/assets/slot6-yellow/pirate-chest.png';
import anchorImg from '@/assets/slot6-yellow/anchor.png';
import hangGliderImg from '@/assets/slot6-yellow/hang-glider.png';
import battlefuryImg from '@/assets/slot6-yellow/battlefury.png';
import desolatorImg from '@/assets/slot6-yellow/desolator.png';
import jetpackWingsImg from '@/assets/slot6-yellow/jetpack-wings.png';
import firePickaxeImg from '@/assets/slot6-yellow/fire-pickaxe.png';
import creeperBackpackImg from '@/assets/slot6-yellow/creeper-backpack.png';
import aegisImg from '@/assets/slot6-yellow/aegis.png';
import traxCrossbowImg from '@/assets/slot6-yellow/trax-crossbow.png';

// Аксессуары Arizona RP
export const accessories: Accessory[] = [
  // ===== СЛОТ 1 - ГОЛОВА =====
  {
    id: 101,
    name: 'Маркер dead inside',
    slot: 1,
    slotName: 'Голова',
    description: 'Маркер с надписью Dead Inside',
    rarity: 'rare',
    stats: { ...emptyStats, damage: 1, luck: 10, stunChance: 1 },
    imageUrl: markerDeadInsideImg,
  },
  {
    id: 102,
    name: 'Эндер куб',
    slot: 1,
    slotName: 'Голова',
    description: 'Загадочный эндер куб',
    rarity: 'epic',
    stats: { ...emptyStats, damage: 1, luck: 10, stunChance: 1 },
    imageUrl: enderCubeImg,
  },
  {
    id: 103,
    name: 'Звёздный нимб',
    slot: 1,
    slotName: 'Голова',
    description: 'Сияющий звёздный нимб',
    rarity: 'legendary',
    stats: { ...emptyStats, damage: 1, luck: 10, stunChance: 1 },
    imageUrl: starNimbusImg,
  },
  {
    id: 104,
    name: 'Маркер «BAD»',
    slot: 1,
    slotName: 'Голова',
    description: 'Маркер с надписью BAD',
    rarity: 'rare',
    stats: { ...emptyStats, luck: 10 },
    imageUrl: markerBadImg,
  },
  {
    id: 105,
    name: 'Бойцовский клуб',
    slot: 1,
    slotName: 'Голова',
    description: 'Первое правило бойцовского клуба...',
    rarity: 'epic',
    stats: { ...emptyStats, luck: 10 },
    imageUrl: fightClubImg,
  },
  {
    id: 106,
    name: 'Шлем железного человека',
    slot: 1,
    slotName: 'Голова',
    description: 'Шлем Тони Старка',
    rarity: 'legendary',
    stats: { ...emptyStats, luck: 2 },
    imageUrl: ironManHelmetImg,
  },
  {
    id: 107,
    name: 'Весёлый Пепе',
    slot: 1,
    slotName: 'Голова',
    description: 'Знаменитая лягушка Пепе',
    rarity: 'common',
    stats: { ...emptyStats, luck: 1 },
    imageUrl: happyPepeImg,
  },
  {
    id: 108,
    name: 'Голова Тыква',
    slot: 1,
    slotName: 'Голова',
    description: 'Хэллоуинская тыква',
    rarity: 'rare',
    stats: { ...emptyStats, defense: 2, damage: 2, luck: 2 },
    imageUrl: pumpkinHeadImg,
  },
  {
    id: 109,
    name: 'Джетпак',
    slot: 1,
    slotName: 'Голова',
    description: 'Реактивный ранец',
    rarity: 'rare',
    stats: { ...emptyStats, defense: 2, damage: 2, luck: 2 },
    imageUrl: jetpackImg,
  },
  {
    id: 110,
    name: 'Космический джетпак',
    slot: 1,
    slotName: 'Голова',
    description: 'Улучшенный космический джетпак',
    rarity: 'epic',
    stats: { ...emptyStats, defense: 2, damage: 2, luck: 2 },
    imageUrl: spaceJetpackImg,
  },
  // ===== СЛОТ 1 - ГОЛОВА (ТОЛЬКО ЖЁЛТЫЕ ХАРАКТЕРИСТИКИ) =====
  {
    id: 201,
    name: 'Нимб кольца всевластия',
    slot: 1,
    slotName: 'Голова',
    description: 'Кольцо всевластия',
    rarity: 'legendary',
    stats: { ...emptyStats },
    yellowStats: { ...emptyStats, defense: 3, damage: 3, luck: 1, maxHp: 19 },
    imageUrl: nimbRingYellowImg,
    isYellowOnly: true,
  },
  {
    id: 202,
    name: 'Танго',
    slot: 1,
    slotName: 'Голова',
    description: 'Танцующий нимб',
    rarity: 'rare',
    stats: { ...emptyStats },
    yellowStats: { ...emptyStats, defense: 2, damage: 1, luck: 1, maxHp: 10 },
    imageUrl: tangoYellowImg,
    isYellowOnly: true,
  },
  {
    id: 203,
    name: 'Нимб Доры',
    slot: 1,
    slotName: 'Голова',
    description: 'Нимб исследовательницы',
    rarity: 'rare',
    stats: { ...emptyStats },
    yellowStats: { ...emptyStats, defense: 2, damage: 1, luck: 1, maxHp: 10 },
    imageUrl: nimbDoraYellowImg,
    isYellowOnly: true,
  },
  {
    id: 204,
    name: 'Нимб Пошлой Молли',
    slot: 1,
    slotName: 'Голова',
    description: 'Особенный нимб',
    rarity: 'epic',
    stats: { ...emptyStats },
    yellowStats: { ...emptyStats, luck: 2, antiStun: 8, reflect: 2 },
    imageUrl: nimbMollyYellowImg,
    isYellowOnly: true,
  },
  {
    id: 205,
    name: 'Эксклюзивная шляпа 4',
    slot: 1,
    slotName: 'Голова',
    description: 'Эксклюзивная шляпа',
    rarity: 'rare',
    stats: { ...emptyStats },
    yellowStats: { ...emptyStats, damage: 1, maxHp: 5 },
    imageUrl: exclusiveHat4YellowImg,
    isYellowOnly: true,
  },
  {
    id: 206,
    name: 'Эксклюзивная шляпа 3',
    slot: 1,
    slotName: 'Голова',
    description: 'Эксклюзивная шляпа',
    rarity: 'rare',
    stats: { ...emptyStats },
    yellowStats: { ...emptyStats, defense: 1, maxHp: 5 },
    imageUrl: exclusiveHat3YellowImg,
    isYellowOnly: true,
  },
  {
    id: 207,
    name: 'Эксклюзивная шляпа 2',
    slot: 1,
    slotName: 'Голова',
    description: 'Эксклюзивная шляпа',
    rarity: 'rare',
    stats: { ...emptyStats },
    yellowStats: { ...emptyStats, luck: 1, maxHp: 5 },
    imageUrl: exclusiveHat2YellowImg,
    isYellowOnly: true,
  },
  {
    id: 208,
    name: 'Эксклюзивная шляпа 1',
    slot: 1,
    slotName: 'Голова',
    description: 'Эксклюзивная шляпа',
    rarity: 'rare',
    stats: { ...emptyStats },
    yellowStats: { ...emptyStats, damage: 1, maxHp: 5 },
    imageUrl: exclusiveHat1YellowImg,
    isYellowOnly: true,
  },
  {
    id: 209,
    name: 'Тактический шлем',
    slot: 1,
    slotName: 'Голова',
    description: 'Военный тактический шлем',
    rarity: 'epic',
    stats: { ...emptyStats },
    yellowStats: { ...emptyStats, defense: 2, maxArmor: 10 },
    imageUrl: tacticalHelmetYellowImg,
    isYellowOnly: true,
  },
  {
    id: 210,
    name: 'Пиратская шляпа №1',
    slot: 1,
    slotName: 'Голова',
    description: 'Шляпа настоящего пирата',
    rarity: 'rare',
    stats: { ...emptyStats },
    yellowStats: { ...emptyStats, defense: 1, damage: 1, luck: 1, stunChance: 1 },
    imageUrl: pirateHatYellowImg,
    isYellowOnly: true,
  },
  // ===== СЛОТ 2 - ЛИЦО =====
  {
    id: 301,
    name: 'Анимированные очки Netrunner',
    slot: 2,
    slotName: 'Лицо',
    description: 'Киберпанковские анимированные очки',
    rarity: 'epic',
    stats: { ...emptyStats, defense: 2, luck: 25 },
    imageUrl: netrunnerGlassesImg,
  },
  {
    id: 302,
    name: 'Киберпанковские VR-очки',
    slot: 2,
    slotName: 'Лицо',
    description: 'Футуристические VR очки',
    rarity: 'epic',
    stats: { ...emptyStats, defense: 2, luck: 25 },
    imageUrl: cyberpunkVrGlassesImg,
  },
  {
    id: 303,
    name: 'Маска-невидимка',
    slot: 2,
    slotName: 'Лицо',
    description: 'Маска с эффектом невидимости',
    rarity: 'legendary',
    stats: { ...emptyStats, stunChance: 3 },
    imageUrl: invisibilityMaskImg,
  },
  {
    id: 304,
    name: 'Сфера над головой',
    slot: 2,
    slotName: 'Лицо',
    description: 'Парящая сфера над головой',
    rarity: 'legendary',
    stats: { ...emptyStats, defense: 2, damage: 2, luck: 2 },
    imageUrl: headSphereImg,
  },
  // ===== СЛОТ 2 - ЛИЦО (ТОЛЬКО ЖЁЛТЫЕ ХАРАКТЕРИСТИКИ) =====
  {
    id: 401,
    name: 'Энерго маска Госта',
    slot: 2,
    slotName: 'Лицо',
    description: 'Энергетическая маска призрака',
    rarity: 'legendary',
    stats: { ...emptyStats },
    yellowStats: { ...emptyStats, defense: 5, damage: 5, maxHp: 20, stunChance: 4, block: 4 },
    imageUrl: ghostEnergyMaskImg,
    isYellowOnly: true,
  },
  {
    id: 402,
    name: 'Респиратор',
    slot: 2,
    slotName: 'Лицо',
    description: 'Киберпанковский респиратор',
    rarity: 'rare',
    stats: { ...emptyStats },
    yellowStats: { ...emptyStats, defense: 1, damage: 1 },
    imageUrl: respiratorImg,
    isYellowOnly: true,
  },
  {
    id: 403,
    name: 'Маска череп',
    slot: 2,
    slotName: 'Лицо',
    description: 'Маска в виде черепа',
    rarity: 'epic',
    stats: { ...emptyStats },
    yellowStats: { ...emptyStats, damage: 2, maxArmor: 10 },
    imageUrl: skullMaskImg,
    isYellowOnly: true,
  },
  {
    id: 404,
    name: 'Маска распорядителя',
    slot: 2,
    slotName: 'Лицо',
    description: 'Маска из сериала Игра в кальмара',
    rarity: 'rare',
    stats: { ...emptyStats },
    yellowStats: { ...emptyStats, damage: 1, maxHp: 5 },
    imageUrl: managerMaskImg,
    isYellowOnly: true,
  },
  {
    id: 405,
    name: 'Маска охранника 1',
    slot: 2,
    slotName: 'Лицо',
    description: 'Маска охранника с квадратом',
    rarity: 'rare',
    stats: { ...emptyStats },
    yellowStats: { ...emptyStats, luck: 1, maxHp: 5 },
    imageUrl: guardMask1Img,
    isYellowOnly: true,
  },
  {
    id: 406,
    name: 'Маска охранника 3',
    slot: 2,
    slotName: 'Лицо',
    description: 'Маска охранника с кругом',
    rarity: 'rare',
    stats: { ...emptyStats },
    yellowStats: { ...emptyStats, defense: 1, maxHp: 5 },
    imageUrl: guardMask3Img,
    isYellowOnly: true,
  },
  {
    id: 407,
    name: 'Маска охранника 2',
    slot: 2,
    slotName: 'Лицо',
    description: 'Маска охранника с треугольником',
    rarity: 'rare',
    stats: { ...emptyStats },
    yellowStats: { ...emptyStats, damage: 1, maxHp: 5 },
    imageUrl: guardMask2Img,
    isYellowOnly: true,
  },
  {
    id: 408,
    name: 'Маска Локи',
    slot: 2,
    slotName: 'Лицо',
    description: 'Зелёная маска Локи из фильма Маска',
    rarity: 'epic',
    stats: { ...emptyStats },
    yellowStats: { ...emptyStats, damage: 1, maxHp: 5 },
    imageUrl: lokiMaskImg,
    isYellowOnly: true,
  },
  {
    id: 409,
    name: 'Маска «Wrench»',
    slot: 2,
    slotName: 'Лицо',
    description: 'Маска Ренча из Watch Dogs',
    rarity: 'epic',
    stats: { ...emptyStats },
    yellowStats: { ...emptyStats, defense: 1, maxHp: 5 },
    imageUrl: wrenchMaskImg,
    isYellowOnly: true,
  },
  {
    id: 410,
    name: 'Маска Глента из Роблокса',
    slot: 2,
    slotName: 'Лицо',
    description: 'Голова персонажа Roblox',
    rarity: 'epic',
    stats: { ...emptyStats },
    yellowStats: { ...emptyStats, maxHp: 15, maxArmor: 15 },
    imageUrl: glentRobloxMaskImg,
    isYellowOnly: true,
  },
  // ===== СЛОТ 3 - РУКА =====
  {
    id: 501,
    name: 'Космическая рука',
    slot: 3,
    slotName: 'Рука',
    description: 'Космическая кибернетическая рука',
    rarity: 'legendary',
    stats: { ...emptyStats, damage: 4, maxArmor: 10, reflect: 1 },
    imageUrl: spaceHandImg,
  },
  {
    id: 502,
    name: 'Молот «Duff»',
    slot: 3,
    slotName: 'Рука',
    description: 'Молот из банки пива Duff',
    rarity: 'epic',
    stats: { ...emptyStats, damage: 4 },
    imageUrl: duffHammerImg,
  },
  {
    id: 503,
    name: 'Прототип',
    slot: 3,
    slotName: 'Рука',
    description: 'Демоническое оружие-прототип',
    rarity: 'legendary',
    stats: { ...emptyStats, damage: 4 },
    imageUrl: prototypeImg,
  },
  {
    id: 504,
    name: 'Перчатка Вай',
    slot: 3,
    slotName: 'Рука',
    description: 'Перчатка из Arcane',
    rarity: 'legendary',
    stats: { ...emptyStats, damage: 4 },
    imageUrl: viGloveImg,
  },
  {
    id: 505,
    name: 'Перчатка Наклза',
    slot: 3,
    slotName: 'Рука',
    description: 'Перчатка ехидны Наклза',
    rarity: 'epic',
    stats: { ...emptyStats, damage: 4 },
    imageUrl: knucklesGloveImg,
  },
  {
    id: 506,
    name: 'Магический топор',
    slot: 3,
    slotName: 'Рука',
    description: 'Волшебный топор с магическим эффектом',
    rarity: 'legendary',
    stats: { ...emptyStats, damage: 4 },
    imageUrl: magicAxeImg,
  },
  {
    id: 507,
    name: 'Табличка «Фрапс пишется»',
    slot: 3,
    slotName: 'Рука',
    description: 'Хлопушка с надписью Фрапс пишется',
    rarity: 'rare',
    stats: { ...emptyStats, defense: -2, damage: 2, luck: 2 },
    imageUrl: frapsSignImg,
  },
  {
    id: 508,
    name: 'Клинки Аззинота',
    slot: 3,
    slotName: 'Рука',
    description: 'Легендарные клинки из World of Warcraft',
    rarity: 'legendary',
    stats: { ...emptyStats, defense: -2, damage: 2, luck: 2 },
    imageUrl: azzinothBladesImg,
  },
  // ===== СЛОТ 3 - РУКА (ТОЛЬКО ЖЁЛТЫЕ ХАРАКТЕРИСТИКИ) =====
  {
    id: 601,
    name: 'Энергетические часы',
    slot: 3,
    slotName: 'Рука',
    description: 'Футуристические энергетические часы',
    rarity: 'legendary',
    stats: { ...emptyStats },
    yellowStats: { ...emptyStats, defense: 2, damage: 2, maxHp: 5, maxArmor: 5, reflect: 6 },
    imageUrl: energyWatchImg,
    isYellowOnly: true,
  },
  {
    id: 602,
    name: 'Оружие Бамбл Би',
    slot: 3,
    slotName: 'Рука',
    description: 'Оружие трансформера Бамблби',
    rarity: 'epic',
    stats: { ...emptyStats },
    yellowStats: { ...emptyStats, defense: 1, damage: 1 },
    imageUrl: bumblebeeWeaponImg,
    isYellowOnly: true,
  },
  {
    id: 603,
    name: 'Пиратский фонарь',
    slot: 3,
    slotName: 'Рука',
    description: 'Старинный пиратский фонарь',
    rarity: 'rare',
    stats: { ...emptyStats },
    yellowStats: { ...emptyStats, defense: 1, damage: 1, luck: 1, drunkChance: 1 },
    imageUrl: pirateLanternImg,
    isYellowOnly: true,
  },
  {
    id: 604,
    name: 'Бандитский арбалет',
    slot: 3,
    slotName: 'Рука',
    description: 'Арбалет бандита',
    rarity: 'epic',
    stats: { ...emptyStats },
    yellowStats: { ...emptyStats, luck: 3, antiStun: 4, reflect: 1 },
    imageUrl: banditCrossbowImg,
    isYellowOnly: true,
  },
  {
    id: 605,
    name: 'Часы «Panthere de Cartier»',
    slot: 3,
    slotName: 'Рука',
    description: 'Элитные часы Cartier',
    rarity: 'rare',
    stats: { ...emptyStats },
    yellowStats: { ...emptyStats, luck: 1, maxHp: 5 },
    imageUrl: watchCartierImg,
    isYellowOnly: true,
  },
  {
    id: 606,
    name: 'Часы «Relogios Casio»',
    slot: 3,
    slotName: 'Рука',
    description: 'Классические часы Casio',
    rarity: 'rare',
    stats: { ...emptyStats },
    yellowStats: { ...emptyStats, defense: 1, maxHp: 5 },
    imageUrl: watchCasioImg,
    isYellowOnly: true,
  },
  {
    id: 607,
    name: 'Часы «Rolex Submariner»',
    slot: 3,
    slotName: 'Рука',
    description: 'Легендарные часы Rolex',
    rarity: 'epic',
    stats: { ...emptyStats },
    yellowStats: { ...emptyStats, defense: 1, maxHp: 5 },
    imageUrl: watchRolexImg,
    isYellowOnly: true,
  },
  {
    id: 608,
    name: 'Часы «Gucci»',
    slot: 3,
    slotName: 'Рука',
    description: 'Стильные часы Gucci',
    rarity: 'epic',
    stats: { ...emptyStats },
    yellowStats: { ...emptyStats, damage: 1, maxHp: 5 },
    imageUrl: watchGucciImg,
    isYellowOnly: true,
  },
  {
    id: 609,
    name: 'Часы «Patek Philippe Nautilus»',
    slot: 3,
    slotName: 'Рука',
    description: 'Роскошные часы Patek Philippe',
    rarity: 'legendary',
    stats: { ...emptyStats },
    yellowStats: { ...emptyStats, luck: 1, maxHp: 5 },
    imageUrl: watchPatekImg,
    isYellowOnly: true,
  },
  {
    id: 610,
    name: 'Часы «Apple Watch»',
    slot: 3,
    slotName: 'Рука',
    description: 'Смарт-часы Apple',
    rarity: 'rare',
    stats: { ...emptyStats },
    yellowStats: { ...emptyStats, defense: 1, maxHp: 5 },
    imageUrl: watchAppleImg,
    isYellowOnly: true,
  },
  // ===== СЛОТ 4 - ШЕЯ =====
  {
    id: 701,
    name: 'Цепь «Махинатор»',
    slot: 4,
    slotName: 'Шея',
    description: 'Цепь с символом махинатора',
    rarity: 'epic',
    stats: { ...emptyStats, defense: 2, damage: 1, luck: 10, maxArmor: 25 },
    imageUrl: machinatorChainImg,
  },
  {
    id: 702,
    name: 'Энергетический махинатор',
    slot: 4,
    slotName: 'Шея',
    description: 'Энергетическая версия махинатора',
    rarity: 'legendary',
    stats: { ...emptyStats, defense: 4, damage: 4, luck: 12, maxHp: 5, maxArmor: 25 },
    imageUrl: energyMachinatorImg,
  },
  {
    id: 703,
    name: 'Магическая сфера',
    slot: 4,
    slotName: 'Шея',
    description: 'Парящая магическая сфера',
    rarity: 'legendary',
    stats: { ...emptyStats, defense: 2, luck: 16 },
    imageUrl: magicSphereImg,
  },
  {
    id: 704,
    name: 'Цепь SWAG',
    slot: 4,
    slotName: 'Шея',
    description: 'Цепь с надписью SWAG',
    rarity: 'epic',
    stats: { ...emptyStats, defense: 2, damage: 1, luck: 10, maxArmor: 25 },
    imageUrl: swagChainImg,
  },
  {
    id: 705,
    name: 'Цепь СВАГА',
    slot: 4,
    slotName: 'Шея',
    description: 'Цепь с надписью СВАГА',
    rarity: 'epic',
    stats: { ...emptyStats, defense: 2, damage: 1, luck: 10, maxArmor: 25 },
    imageUrl: svagaChainImg,
  },
  {
    id: 706,
    name: 'Летающие снежинки',
    slot: 4,
    slotName: 'Шея',
    description: 'Парящие снежинки вокруг шеи',
    rarity: 'rare',
    stats: { ...emptyStats },
    imageUrl: flyingSnowflakesImg,
  },
  // ===== СЛОТ 4 - ШЕЯ (ТОЛЬКО ЖЁЛТЫЕ ХАРАКТЕРИСТИКИ) =====
  {
    id: 801,
    name: 'Цепь Иллюмината',
    slot: 4,
    slotName: 'Шея',
    description: 'Цепь с символом иллюминатов',
    rarity: 'epic',
    stats: { ...emptyStats },
    yellowStats: { ...emptyStats, defense: 1, damage: 1 },
    imageUrl: illuminatiChainImg,
    isYellowOnly: true,
  },
  {
    id: 802,
    name: 'Цепь Гиганта',
    slot: 4,
    slotName: 'Шея',
    description: 'Массивная цепь гиганта',
    rarity: 'legendary',
    stats: { ...emptyStats },
    yellowStats: { ...emptyStats, maxHp: 15, maxArmor: 15 },
    imageUrl: giantChainImg,
    isYellowOnly: true,
  },

  // ===== СЛОТ 5 - ПЛЕЧО =====
  {
    id: 501,
    name: 'Магический воздушный шар #2',
    slot: 5,
    slotName: 'Плечо',
    description: 'Магический огненный воздушный шар',
    rarity: 'rare',
    stats: { ...emptyStats, defense: -2, damage: 1, luck: 10, maxArmor: 25 },
    imageUrl: magicBalloonImg,
  },
  {
    id: 502,
    name: 'Энергетический воздушный шар',
    slot: 5,
    slotName: 'Плечо',
    description: 'Высокотехнологичный энергетический шар',
    rarity: 'epic',
    stats: { ...emptyStats, defense: -4, damage: 4, luck: 24, maxHp: 5, maxArmor: 27, antiStun: 10 },
    imageUrl: energyBalloonImg,
  },
  {
    id: 503,
    name: 'Энергетический КУРА шар',
    slot: 5,
    slotName: 'Плечо',
    description: 'Энергетический шар в виде КУРЫ',
    rarity: 'epic',
    stats: { ...emptyStats, defense: -4, damage: 4, luck: 24, maxHp: 5, maxArmor: 27, antiStun: 10 },
    imageUrl: kuraBalloonImg,
  },
  {
    id: 504,
    name: 'Игрушечный Delorean',
    slot: 5,
    slotName: 'Плечо',
    description: 'Миниатюрная копия легендарного DeLorean',
    rarity: 'rare',
    stats: { ...emptyStats, luck: 10, maxArmor: 25, stunChance: 4 },
    imageUrl: toyDeloreanImg,
  },
  {
    id: 505,
    name: 'Planet Express',
    slot: 5,
    slotName: 'Плечо',
    description: 'Корабль Planet Express',
    rarity: 'rare',
    stats: { ...emptyStats, luck: 10, maxArmor: 25, stunChance: 4 },
    imageUrl: planetExpressImg,
  },
  {
    id: 506,
    name: 'Пиратский компас',
    slot: 5,
    slotName: 'Плечо',
    description: 'Мистический пиратский компас',
    rarity: 'epic',
    stats: { ...emptyStats, defense: -4, damage: 4, luck: 24, maxHp: 5, maxArmor: 27, antiStun: 20 },
    imageUrl: pirateCompassImg,
  },
  {
    id: 507,
    name: 'Летучий голландец',
    slot: 5,
    slotName: 'Плечо',
    description: 'Призрачный корабль Летучий голландец',
    rarity: 'legendary',
    stats: { ...emptyStats, defense: -4, damage: 4, luck: 24, maxHp: 5, maxArmor: 27, antiStun: 20 },
    imageUrl: flyingDutchmanImg,
  },
  {
    id: 508,
    name: 'Безымянный аксессуар',
    slot: 5,
    slotName: 'Плечо',
    description: 'Загадочный аксессуар без характеристик',
    rarity: 'common',
    stats: { ...emptyStats },
    imageUrl: noStatsItemImg,
  },
  {
    id: 509,
    name: 'МайнСкелет',
    slot: 5,
    slotName: 'Плечо',
    description: 'Легендарный аксессуар МайнСкелет',
    rarity: 'legendary',
    stats: { ...emptyStats },
    imageUrl: mineSkeletonImg,
  },
  {
    id: 901,
    name: 'Аркана ИО',
    slot: 5,
    slotName: 'Плечо',
    description: 'Мистическая аркана с сердцем',
    rarity: 'epic',
    stats: { ...emptyStats },
    yellowStats: { ...emptyStats, defense: 2, damage: 1, luck: 1, maxHp: 10 },
    imageUrl: arcanaIoImg,
    isYellowOnly: true,
  },
  // ===== СЛОТ 6 - СПИНА =====
  {
    id: 601,
    name: 'Молот Тора',
    slot: 6,
    slotName: 'Спина',
    description: 'Легендарный молот бога грома',
    rarity: 'legendary',
    stats: { ...emptyStats, damage: 4 },
    accessoryType: 'attack',
    imageUrl: thorHammerImg,
  },
  {
    id: 602,
    name: 'Молот Джейса',
    slot: 6,
    slotName: 'Спина',
    description: 'Мощный молот Джейса',
    rarity: 'epic',
    stats: { ...emptyStats, damage: 4 },
    accessoryType: 'attack',
    imageUrl: jayceHammerImg,
  },
  {
    id: 603,
    name: 'Русский боевой топор',
    slot: 6,
    slotName: 'Спина',
    description: 'Грозное русское оружие',
    rarity: 'rare',
    stats: { ...emptyStats, defense: -4 },
    accessoryType: 'defense',
    imageUrl: russianAxeImg,
  },
  {
    id: 604,
    name: 'Щит Капитана Америки',
    slot: 6,
    slotName: 'Спина',
    description: 'Вибраниумный щит супергероя',
    rarity: 'legendary',
    stats: { ...emptyStats, defense: -4 },
    accessoryType: 'defense',
    imageUrl: captainShieldImg,
  },
  {
    id: 605,
    name: 'Магмовый топор',
    slot: 6,
    slotName: 'Спина',
    description: 'Топор с огненной магмой',
    rarity: 'epic',
    stats: { ...emptyStats, defense: -4 },
    accessoryType: 'defense',
    imageUrl: magmaAxeImg,
  },
  {
    id: 606,
    name: 'Ледяной меч',
    slot: 6,
    slotName: 'Спина',
    description: 'Меч вечной мерзлоты',
    rarity: 'epic',
    stats: { ...emptyStats, defense: -4 },
    accessoryType: 'defense',
    imageUrl: iceSwordImg,
  },
  {
    id: 607,
    name: 'Энергетический щит',
    slot: 6,
    slotName: 'Спина',
    description: 'Защитный энергетический барьер',
    rarity: 'legendary',
    stats: { ...emptyStats, defense: -4, maxHp: 10, drunkChance: 2 },
    accessoryType: 'defense',
    imageUrl: energyShieldImg,
  },
  {
    id: 608,
    name: 'Бейсбольная бита Compton',
    slot: 6,
    slotName: 'Спина',
    description: 'Легендарная бита из Комптона',
    rarity: 'rare',
    stats: { ...emptyStats, defense: -4, stunChance: 5 },
    accessoryType: 'defense',
    imageUrl: comptonBatImg,
  },
  {
    id: 609,
    name: 'Золотая монтировка',
    slot: 6,
    slotName: 'Спина',
    description: 'Золотая монтировка с высоким шансом оглушения',
    rarity: 'epic',
    stats: { ...emptyStats, defense: -4, stunChance: 11 },
    accessoryType: 'defense',
    imageUrl: goldenCrowbarImg,
  },
  // ===== СЛОТ 6 - СПИНА (ТОЛЬКО ЖЁЛТЫЕ ХАРАКТЕРИСТИКИ) =====
  {
    id: 701,
    name: 'Катана Нир',
    slot: 6,
    slotName: 'Спина',
    description: 'Легендарная катана с золотым кольцом',
    rarity: 'legendary',
    stats: { ...emptyStats },
    yellowStats: { ...emptyStats, defense: 3, damage: 3, maxHp: 20, maxArmor: 20, reflect: 2 },
    accessoryType: 'defense',
    imageUrl: katanaNirImg,
    isYellowOnly: true,
  },
  {
    id: 702,
    name: 'Кровавые крылья',
    slot: 6,
    slotName: 'Спина',
    description: 'Крылья из кровавых перьев',
    rarity: 'epic',
    stats: { ...emptyStats },
    yellowStats: { ...emptyStats, defense: 2, damage: 2 },
    accessoryType: 'defense',
    imageUrl: bloodyWingsImg,
    isYellowOnly: true,
  },
  {
    id: 703,
    name: 'Паучьи лапы',
    slot: 6,
    slotName: 'Спина',
    description: 'Острые паучьи лапы на спине',
    rarity: 'rare',
    stats: { ...emptyStats },
    yellowStats: { ...emptyStats, defense: 1, damage: 1 },
    accessoryType: 'defense',
    imageUrl: spiderLegsImg,
    isYellowOnly: true,
  },
  {
    id: 704,
    name: 'Коса Красной Розы',
    slot: 6,
    slotName: 'Спина',
    description: 'Коса с красными розами',
    rarity: 'epic',
    stats: { ...emptyStats },
    yellowStats: { ...emptyStats, damage: 2, maxHp: 8, maxArmor: 8, reflect: 1 },
    accessoryType: 'attack',
    imageUrl: redRoseScytheImg,
    isYellowOnly: true,
  },
  {
    id: 705,
    name: 'Пояс с баллончиками',
    slot: 6,
    slotName: 'Спина',
    description: 'Тактический пояс с баллончиками краски',
    rarity: 'epic',
    stats: { ...emptyStats },
    yellowStats: { ...emptyStats, maxArmor: 50 },
    accessoryType: 'defense',
    imageUrl: sprayCanBeltImg,
    isYellowOnly: true,
  },
  {
    id: 706,
    name: 'Пиратские сабли',
    slot: 6,
    slotName: 'Спина',
    description: 'Перекрещенные пиратские сабли',
    rarity: 'rare',
    stats: { ...emptyStats },
    yellowStats: { ...emptyStats, defense: 1, damage: 1, luck: 1, stunChance: 1 },
    accessoryType: 'attack',
    imageUrl: pirateSabersImg,
    isYellowOnly: true,
  },
  {
    id: 707,
    name: 'Пиратский сундук',
    slot: 6,
    slotName: 'Спина',
    description: 'Сундук с сокровищами пирата',
    rarity: 'rare',
    stats: { ...emptyStats },
    yellowStats: { ...emptyStats, defense: 1, damage: 1, luck: 1, stunChance: 1 },
    accessoryType: 'defense',
    imageUrl: pirateChestImg,
    isYellowOnly: true,
  },
  {
    id: 708,
    name: 'Морской якорь',
    slot: 6,
    slotName: 'Спина',
    description: 'Якорь с кораллами и морскими звёздами',
    rarity: 'rare',
    stats: { ...emptyStats },
    yellowStats: { ...emptyStats, defense: 1, damage: 1, luck: 1, stunChance: 1 },
    accessoryType: 'defense',
    imageUrl: anchorImg,
    isYellowOnly: true,
  },
  {
    id: 709,
    name: 'Дельтаплан на спину',
    slot: 6,
    slotName: 'Спина',
    description: 'Красный дельтаплан для полётов',
    rarity: 'rare',
    stats: { ...emptyStats },
    yellowStats: { ...emptyStats, damage: 1, maxHp: 5 },
    accessoryType: 'attack',
    imageUrl: hangGliderImg,
    isYellowOnly: true,
  },
  {
    id: 710,
    name: 'Батлфьюри',
    slot: 6,
    slotName: 'Спина',
    description: 'Двухлезвийный боевой топор',
    rarity: 'legendary',
    stats: { ...emptyStats },
    yellowStats: { ...emptyStats, defense: 5, luck: 5, maxHp: 5 },
    accessoryType: 'defense',
    imageUrl: battlefuryImg,
    isYellowOnly: true,
  },
  {
    id: 711,
    name: 'Дезолятор',
    slot: 6,
    slotName: 'Спина',
    description: 'Энергетическое оружие',
    rarity: 'epic',
    stats: { ...emptyStats },
    yellowStats: { ...emptyStats, damage: 2, luck: 4, antiStun: 3, reflect: 1 },
    accessoryType: 'attack',
    imageUrl: desolatorImg,
    isYellowOnly: true,
  },
  {
    id: 712,
    name: 'Реактивный ранец с крыльями',
    slot: 6,
    slotName: 'Спина',
    description: 'Футуристический реактивный ранец',
    rarity: 'epic',
    stats: { ...emptyStats },
    yellowStats: { ...emptyStats, damage: 2, luck: 4, antiStun: 3, reflect: 1 },
    accessoryType: 'attack',
    imageUrl: jetpackWingsImg,
    isYellowOnly: true,
  },
  {
    id: 713,
    name: 'Огненная кирка',
    slot: 6,
    slotName: 'Спина',
    description: 'Кирка с огненными эффектами',
    rarity: 'rare',
    stats: { ...emptyStats },
    yellowStats: { ...emptyStats, damage: 1, maxHp: 5 },
    accessoryType: 'attack',
    imageUrl: firePickaxeImg,
    isYellowOnly: true,
  },
  {
    id: 714,
    name: 'Рюкзак «Крипер»',
    slot: 6,
    slotName: 'Спина',
    description: 'Рюкзак в виде Крипера из Minecraft',
    rarity: 'rare',
    stats: { ...emptyStats },
    yellowStats: { ...emptyStats, defense: 1, maxHp: 5 },
    accessoryType: 'defense',
    imageUrl: creeperBackpackImg,
    isYellowOnly: true,
  },
  {
    id: 715,
    name: 'Аегис',
    slot: 6,
    slotName: 'Спина',
    description: 'Энергетический щит Аегис',
    rarity: 'epic',
    stats: { ...emptyStats },
    yellowStats: { ...emptyStats, damage: 2, maxHp: 8, maxArmor: 8, reflect: 1 },
    accessoryType: 'attack',
    imageUrl: aegisImg,
    isYellowOnly: true,
  },
  {
    id: 716,
    name: 'Арбалет Траксы',
    slot: 6,
    slotName: 'Спина',
    description: 'Футуристический арбалет с синими энергетическими сферами',
    rarity: 'epic',
    stats: { ...emptyStats },
    yellowStats: { ...emptyStats, damage: 2, maxHp: 7, maxArmor: 7, reflect: 1 },
    accessoryType: 'attack',
    imageUrl: traxCrossbowImg,
    isYellowOnly: true,
  },
];

export const getEmptyStats = (): AccessoryStats => ({
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
});

export const calculateTotalStats = (equippedAccessories: (Accessory | null)[]): AccessoryStats => {
  const total = getEmptyStats();

  equippedAccessories.forEach((acc) => {
    if (!acc) return;

    // Если есть перенос базовых — берём ТОЛЬКО перенесённые, иначе — только встроенные
    const hasTransfer = !!acc.baseTransferStats;

    (Object.keys(total) as (keyof AccessoryStats)[]).forEach((key) => {
      const val = hasTransfer
        ? acc.baseTransferStats![key] || 0
        : acc.stats?.[key] || 0;

      // «Защита: -X» означает +X к защите
      const normalized = key === 'defense' && val < 0 ? -val : val;
      total[key] += normalized;
    });
  });

  return total;
};


