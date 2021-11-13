import { Stats } from '../data/types';
import ArtifactSet from './ArtifactSet';
import ArchaicPetra from './artifactSet/ArchaicPetra';
import Berserker from './artifactSet/Berserker';
import BlizzardStrayer from './artifactSet/BlizzardStrayer';
import BloodstainedChivalry from './artifactSet/BloodstainedChivalry';
import BraveHeart from './artifactSet/BraveHeart';
import CrimsonWitch from './artifactSet/CrimsonWitch';
import EmblemOfSeveredFate from './artifactSet/EmblemOfSeveredFate';
import Gambler from './artifactSet/Gambler';
import GladiatorsFinale from './artifactSet/GladiatorsFinale';
import HeartOfDepth from './artifactSet/HeartOfDepth';
import Instructor from './artifactSet/Instructor';
import Lavawalker from './artifactSet/Lavawalker';
import MaidenBeloved from './artifactSet/MaidenBeloved';
import MartialArtist from './artifactSet/MartialArtist';
import NoblesseOblige from './artifactSet/NoblesseOblige';
import PaleFlame from './artifactSet/PaleFlame';
import ResolutionOfSojourner from './artifactSet/ResolutionOfSojourner';
import RetracingBolide from './artifactSet/RetracingBolide';
import Shimenawa from './artifactSet/Shimenawa';
import Tenacity from './artifactSet/Tenacity';
import Thundersoother from './artifactSet/Thundersoother';
import TinyMiracle from './artifactSet/TinyMiracle';
import ViridescentVenerer from './artifactSet/ViridescentVenerer';
import WanderersTroupe from './artifactSet/WanderersTroupe';

const artifactSets: Record<string, typeof ArtifactSet> = {
  resolutionofsojourner: ResolutionOfSojourner,
  tinymiracle: TinyMiracle,
  martialartist: MartialArtist,
  gambler: Gambler,
  gladiatorsfinale: GladiatorsFinale,
  viridescentvenerer: ViridescentVenerer,
  wandererstroupe: WanderersTroupe,
  crimsonwitchofflames: CrimsonWitch,
  noblesseoblige: NoblesseOblige,
  emblemofseveredfate: EmblemOfSeveredFate,
  braveheart: BraveHeart,
  berserker: Berserker,
  instructor: Instructor,
  blizzardstrayer: BlizzardStrayer,
  thundersoother: Thundersoother,
  lavawalker: Lavawalker,
  maidenbeloved: MaidenBeloved,
  bloodstainedchivalry: BloodstainedChivalry,
  archaicpetra: ArchaicPetra,
  retracingbolide: RetracingBolide,
  heartofdepth: HeartOfDepth,
  tenacityofthemillelith: Tenacity,
  paleflame: PaleFlame,
  shimenawasreminiscence: Shimenawa,
};

function getArtifactSetConstructor(id: string): typeof ArtifactSet {
  return artifactSets[id] ?? ArtifactSet;
}

export function initArtifactSet(id: string = '', pieces?: number) {
  const ArtifactSetConstructor = getArtifactSetConstructor(id);

  return new ArtifactSetConstructor(id, pieces);
}

export function getAllArtifactSetBonuses(artifactSets: ArtifactSet[]): Stats {
  return artifactSets
    .map((artifactSet) => artifactSet.stats)
    .reduce((acc, stats) => {
      Object.entries(stats).forEach(([stat, value]) => {
        acc[stat] = value + (acc[stat] ?? 0);
      });
      return acc;
    }, {} as Stats);
}

/* To be implemented

// Swirl Dmg up not yet implemented. Medium priority.
// Requires reaction dmg to be implemented first.
Relic_ReactionWindEnhance,

// Reaction Dmg Up not yet implemented. Medium priority
// Requires reaction dmg to be implemented first
Relic_ReactionFireEnhance,

// Not yet implemented. Medium priority
// Requires reaction dmg to be implemented first
Relic_ReactionElectricEnhance: defaultSetBonus,

// Not yet implemented. Low priority.
// Requires info about team composition
Relic_AbsorbTeamElemResist: defaultSetBonus,

// Not yet implemented. Low priority.
// Probably can be implemented with a dropdown option for prev received elem dmg
Relic_ElemDmgEnhanceElemResist: defaultSetBonus,
*/
