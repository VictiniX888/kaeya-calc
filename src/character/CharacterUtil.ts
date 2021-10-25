import Albedo from './albedo/Albedo';
import Aloy from './aloy/Aloy';
import Amber from './amber/Amber';
import Ayaka from './ayaka/Ayaka';
import Barbara from './barbara/Barbara';
import Beidou from './beidou/Beidou';
import Bennett from './bennett/Bennett';
import Character from './Character';
import Chongyun from './chongyun/Chongyun';
import Diluc from './diluc/Diluc';
import Diona from './diona/Diona';
import Eula from './eula/Eula';
import Fischl from './fischl/Fischl';
import Ganyu from './ganyu/Ganyu';
import Hutao from './hutao/Hutao';
import Jean from './jean/Jean';
import Kaeya from './kaeya/Kaeya';
import Kazuha from './kazuha/Kazuha';
import Keqing from './keqing/Keqing';
import Klee from './klee/Klee';
import Kokomi from './kokomi/Kokomi';
import Lisa from './lisa/Lisa';
import Mona from './mona/Mona';
import Ningguang from './ningguang/Ningguang';
import Noelle from './noelle/Noelle';
import Qiqi from './qiqi/Qiqi';
import Raiden from './raiden/Raiden';
import Razor from './razor/Razor';
import Rosaria from './rosaria/Rosaria';
import Sara from './sara/Sara';
import Sayu from './sayu/Sayu';
import Sucrose from './sucrose/Sucrose';
import Tartaglia from './tartaglia/Tartaglia';
import Venti from './venti/Venti';
import Xiangling from './xiangling/Xiangling';
import Xiao from './xiao/Xiao';
import Xingqiu from './xingqiu/Xingqiu';
import Xinyan from './xinyan/Xinyan';
import Yanfei from './yanfei/Yanfei';
import Yoimiya from './yoimiya/Yoimiya';
import Zhongli from './zhongli/Zhongli';

const characters: Record<string, typeof Character> = {
  albedo: Albedo,
  aloy: Aloy,
  amber: Amber,
  ayaka: Ayaka,
  barbara: Barbara,
  beidou: Beidou,
  bennett: Bennett,
  chongyun: Chongyun,
  diluc: Diluc,
  diona: Diona,
  eula: Eula,
  fischl: Fischl,
  ganyu: Ganyu,
  hutao: Hutao,
  jean: Jean,
  kaeya: Kaeya,
  kazuha: Kazuha,
  keqing: Keqing,
  klee: Klee,
  kokomi: Kokomi,
  lisa: Lisa,
  mona: Mona,
  ningguang: Ningguang,
  noelle: Noelle,
  qiqi: Qiqi,
  raiden: Raiden,
  razor: Razor,
  rosaria: Rosaria,
  sara: Sara,
  sayu: Sayu,
  sucrose: Sucrose,
  tartaglia: Tartaglia,
  venti: Venti,
  xiangling: Xiangling,
  xiao: Xiao,
  xingqiu: Xingqiu,
  xinyan: Xinyan,
  yanfei: Yanfei,
  yoimiya: Yoimiya,
  zhongli: Zhongli,
};

export function getCharacterConstructor(id: string): typeof Character {
  return characters[id] ?? Character;
}

export function initCharacter(
  id: string = '',
  level?: number,
  hasAscended?: boolean
): Character {
  const CharacterConstructor = getCharacterConstructor(id);

  return new CharacterConstructor(id, level, hasAscended);
}
