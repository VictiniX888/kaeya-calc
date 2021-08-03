import ayakaOptions from './AyakaOption';
import CharacterOption from './CharacterOption';
import chongyunOptions from './ChongyunOption';
import dilucOptions from './DilucOption';
import hutaoOptions from './HuTaoOption';
import kazuhaOptions from './KazuhaOption';
import noelleOptions from './NoelleOption';
import sayuOptions from './SayuOption';
import sucroseOptions from './SucroseOption';
import ventiOptions from './VentiOption';
import xiaoOptions from './XiaoOption';
import yanfeiOptions from './YanfeiOption';
import yoimiyaOptions from './YoimiyaOption';

export { default as CharacterOption } from './CharacterOption';

export const characterOptions: Record<string, typeof CharacterOption[]> = {
  ayaka: ayakaOptions,
  diluc: dilucOptions,
  venti: ventiOptions,
  xiao: xiaoOptions,
  noelle: noelleOptions,
  chongyun: chongyunOptions,
  sucrose: sucroseOptions,
  hutao: hutaoOptions,
  kazuha: kazuhaOptions,
  yanfei: yanfeiOptions,
  yoimiya: yoimiyaOptions,
  sayu: sayuOptions,
};
