import { ArchaicPetra4PcOption } from '../../artifact/artifactSet/ArchaicPetra';
import { Instructor4PcOption } from '../../artifact/artifactSet/Instructor';
import { NoblesseOblige4PcOption } from '../../artifact/artifactSet/NoblesseOblige';
import { Tenacity4PcOption } from '../../artifact/artifactSet/Tenacity';
import { ViridescentVenerer4PcOption } from '../../artifact/artifactSet/ViridescentVenerer';
import ArtifactSetOption from '../../option/artifactSetOptions/ArtifactSetOption';

const artifactTeamBuffs: Record<string, typeof ArtifactSetOption> = {
  archaicPetra4Pc: ArchaicPetra4PcOption,
  instructor4Pc: Instructor4PcOption,
  noblesseOblige4Pc: NoblesseOblige4PcOption,
  tenacity4Pc: Tenacity4PcOption,
  viridescentVenerer4Pc: ViridescentVenerer4PcOption,
};

export default artifactTeamBuffs;
