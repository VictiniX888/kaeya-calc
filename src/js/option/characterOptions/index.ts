import CharacterOption from './CharacterOption';
import chongyunOptions from './ChongyunOption';
import dilucOptions from './DilucOption';
import hutaoOptions from './HuTaoOption';
import noelleOptions from './NoelleOption';
import xiaoOptions from './XiaoOption';
import yanfeiOptions from './YanfeiOption';

export { default as CharacterOption } from './CharacterOption';

export const characterOptions: Record<string, typeof CharacterOption[]> = {
  diluc: dilucOptions,
  xiao: xiaoOptions,
  noelle: noelleOptions,
  chongyun: chongyunOptions,
  hutao: hutaoOptions,
  yanfei: yanfeiOptions,
};
