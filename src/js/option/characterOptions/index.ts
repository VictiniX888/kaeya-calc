import ayakaOptions from './AyakaOption';
import CharacterOption from './CharacterOption';
import chongyunOptions from './ChongyunOption';
import dilucOptions from './DilucOption';
import hutaoOptions from './HuTaoOption';
import kazuhaOptions from './KazuhaOption';
import noelleOptions from './NoelleOption';
import xiaoOptions from './XiaoOption';
import yanfeiOptions from './YanfeiOption';
import yoimiyaOptions from './YoimiyaOption';

export { default as CharacterOption } from './CharacterOption';

export const characterOptions: Record<string, typeof CharacterOption[]> = {
  ayaka: ayakaOptions,
  diluc: dilucOptions,
  xiao: xiaoOptions,
  noelle: noelleOptions,
  chongyun: chongyunOptions,
  hutao: hutaoOptions,
  kazuha: kazuhaOptions,
  yanfei: yanfeiOptions,
  yoimiya: yoimiyaOptions,
};
