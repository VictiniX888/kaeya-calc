import ArtifactSet from './ArtifactSet';
import ResolutionOfSojourner from './artifactSet/ResolutionOfSojourner';
import TinyMiracle from './artifactSet/TinyMiracle';
import MartialArtist from './artifactSet/MartialArtist';
import Gambler from './artifactSet/Gambler';
import GladiatorsFinale from './artifactSet/GladiatorsFinale';
import ViridescentVenerer from './artifactSet/ViridescentVenerer';
import WanderersTroupe from './artifactSet/WanderersTroupe';
import CrimsonWitch from './artifactSet/CrimsonWitch';
import NoblesseOblige from './artifactSet/NoblesseOblige';
import EmblemOfSeveredFate from './artifactSet/EmblemOfSeveredFate';
import BraveHeart from './artifactSet/BraveHeart';
import Berserker from './artifactSet/Berserker';
import Instructor from './artifactSet/Instructor';
import BlizzardStrayer from './artifactSet/BlizzardStrayer';
import Thundersoother from './artifactSet/Thundersoother';
import Lavawalker from './artifactSet/Lavawalker';
import MaidenBeloved from './artifactSet/MaidenBeloved';
import BloodstainedChivalry from './artifactSet/BloodstainedChivalry';
import ArchaicPetra from './artifactSet/ArchaicPetra';
import RetracingBolide from './artifactSet/RetracingBolide';
import HeartOfDepth from './artifactSet/HeartOfDepth';
import Tenacity from './artifactSet/Tenacity';
import PaleFlame from './artifactSet/PaleFlame';
import Shimenawa from './artifactSet/Shimenawa';

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
