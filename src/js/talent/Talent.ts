import { TalentProps, TalentValue } from './types';

import defaultTalent from './DefaultTalent';
import lisaTalent from './LisaTalent';
import barbaraTalent from './BarbaraTalent';
import kaeyaTalent from './KaeyaTalent';
import dilucTalent from './DilucTalent';
import razorTalent from './RazorTalent';
import amberTalent from './AmberTalent';
import ventiTalent from './VentiTalent';
import xianglingTalent from './XianglingTalent';
import beidouTalent from './BeidouTalent';
import xingqiuTalent from './XingqiuTalent';
import xiaoTalent from './XiaoTalent';
import ningguangTalent from './NingguangTalent';
import kleeTalent from './KleeTalent';
import zhongliTalent from './ZhongliTalent';
import fischlTalent from './FischlTalent';
import bennettTalent from './BennettTalent';
import tartagliaTalent from './TartagliaTalent';
import noelleTalent from './NoelleTalent';
import qiqiTalent from './QiqiTalent';
import chongyunTalent from './ChongyunTalent';
import ganyuTalent from './GanyuTalent';
import albedoTalent from './AlbedoTalent';
import dionaTalent from './DionaTalent';
import monaTalent from './MonaTalent';
import keqingTalent from './KeqingTalent';
import sucroseTalent from './SucroseTalent';
import xinyanTalent from './XinyanTalent';
import rosariaTalent from './RosariaTalent';
import hutaoTalent from './HutaoTalent';
import yanfeiTalent from './YanfeiTalent';
import eulaTalent from './EulaTalent';

export default interface Talent {
  attack: (props: TalentProps) => TalentValue[];
  skill: (props: TalentProps) => TalentValue[];
  burst: (props: TalentProps) => TalentValue[];
}

export const talents: Record<string, Talent> = {
  defaultTalent,
  lisa: lisaTalent,
  barbara: barbaraTalent,
  kaeya: kaeyaTalent,
  diluc: dilucTalent,
  razor: razorTalent,
  amber: amberTalent,
  venti: ventiTalent,
  xiangling: xianglingTalent,
  beidou: beidouTalent,
  xingqiu: xingqiuTalent,
  xiao: xiaoTalent,
  ningguang: ningguangTalent,
  klee: kleeTalent,
  zhongli: zhongliTalent,
  fischl: fischlTalent,
  bennett: bennettTalent,
  tartaglia: tartagliaTalent,
  noelle: noelleTalent,
  qiqi: qiqiTalent,
  chongyun: chongyunTalent,
  ganyu: ganyuTalent,
  albedo: albedoTalent,
  diona: dionaTalent,
  mona: monaTalent,
  keqing: keqingTalent,
  sucrose: sucroseTalent,
  xinyan: xinyanTalent,
  rosaria: rosariaTalent,
  hutao: hutaoTalent,
  yanfei: yanfeiTalent,
  eula: eulaTalent,
};
