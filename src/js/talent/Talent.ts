import { Talents } from './types';

import albedoTalents from '../character/albedo/AlbedoTalent';
import aloyTalents from '../character/aloy/AloyTalent';
import amberTalents from '../character/amber/AmberTalent';
import ayakaTalents from '../character/ayaka/AyakaTalent';
import barbaraTalents from '../character/barbara/BarbaraTalent';
import beidouTalents from '../character/beidou/BeidouTalent';
import bennettTalents from '../character/bennett/BennettTalent';
import chongyunTalents from '../character/chongyun/ChongyunTalent';
import dilucTalents from '../character/diluc/DilucTalent';
import dionaTalents from '../character/diona/DionaTalent';
import eulaTalents from '../character/eula/EulaTalent';
import fischlTalents from '../character/fischl/FischlTalent';
import ganyuTalents from '../character/ganyu/GanyuTalent';
import hutaoTalents from '../character/hutao/HutaoTalent';
import jeanTalents from '../character/jean/JeanTalent';
import kaeyaTalents from '../character/kaeya/KaeyaTalent';
import kazuhaTalents from '../character/kazuha/KazuhaTalent';
import keqingTalents from '../character/keqing/KeqingTalent';
import kleeTalents from '../character/klee/KleeTalent';
import kokomiTalents from '../character/kokomi/KokomiTalent';
import lisaTalents from '../character/lisa/LisaTalent';
import monaTalents from '../character/mona/MonaTalent';
import ningguangTalents from '../character/ningguang/NingguangTalent';
import noelleTalents from '../character/noelle/NoelleTalent';
import qiqiTalents from '../character/qiqi/QiqiTalent';
import raidenTalents from '../character/raiden/RaidenTalent';
import razorTalents from '../character/razor/RazorTalent';
import rosariaTalents from '../character/rosaria/RosariaTalent';
import saraTalents from '../character/sara/SaraTalent';
import sayuTalents from '../character/sayu/SayuTalent';
import sucroseTalents from '../character/sucrose/SucroseTalent';
import tartagliaTalents from '../character/tartaglia/TartagliaTalent';
import ventiTalents from '../character/venti/VentiTalent';
import xianglingTalents from '../character/xiangling/XianglingTalent';
import xiaoTalents from '../character/xiao/XiaoTalent';

const talents: Record<string, Talents> = {
  albedo: albedoTalents,
  aloy: aloyTalents,
  amber: amberTalents,
  ayaka: ayakaTalents,
  barbara: barbaraTalents,
  beidou: beidouTalents,
  bennett: bennettTalents,
  chongyun: chongyunTalents,
  diluc: dilucTalents,
  diona: dionaTalents,
  eula: eulaTalents,
  fischl: fischlTalents,
  ganyu: ganyuTalents,
  hutao: hutaoTalents,
  jean: jeanTalents,
  kaeya: kaeyaTalents,
  kazuha: kazuhaTalents,
  keqing: keqingTalents,
  klee: kleeTalents,
  kokomi: kokomiTalents,
  lisa: lisaTalents,
  mona: monaTalents,
  ningguang: ningguangTalents,
  noelle: noelleTalents,
  qiqi: qiqiTalents,
  raiden: raidenTalents,
  razor: razorTalents,
  rosaria: rosariaTalents,
  sara: saraTalents,
  sayu: sayuTalents,
  sucrose: sucroseTalents,
  tartaglia: tartagliaTalents,
  venti: ventiTalents,
  xiangling: xianglingTalents,
  xiao: xiaoTalents,
};

export function getAllTalentFns(characterId: string): Talents | undefined {
  return talents[characterId];
}
