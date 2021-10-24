import archaicPetraOptions from './ArchaicPetraOption';
import ArtifactSetOption from './ArtifactSetOption';
import berserkerOptions from './BerserkerOption';
import blizzardStrayerOptions from './BlizzardStrayerOption';
import bloodstainedChivalryOptions from './BloodstainedChivalryOption';
import braveHeartOptions from './BraveHeartOption';
import crimsonWitchOptions from './CrimsonWitchOption';
import heartOfDepthOptions from './HeartOfDepthOption';
import instructorOptions from './InstructorOption';
import lavawalkerOptions from './LavawalkerOption';
import maidenBelovedOptions from './MaidenBelovedOption';
import martialArtistOptions from './MartialArtistOption';
import noblesseObligeOptions from './NoblesseObligeOption';
import paleFlameOptions from './PaleFlameOption';
import retracingBolideOptions from './RetracingBolideOption';
import shimenawaOptions from './ShimenawaOption';
import tenacityOptions from './TenacityOption';
import thundersootherOptions from './ThundersootherOption';
import viridescentVenererOptions from './ViridescentVenererOption';

export { default as ArtifactSetOption } from './ArtifactSetOption';

export const artifactSetOptions: Record<string, typeof ArtifactSetOption[]> = {
  braveheart: braveHeartOptions,
  berserker: berserkerOptions,
  martialartist: martialArtistOptions,
  instructor: instructorOptions,
  blizzardstrayer: blizzardStrayerOptions,
  thundersoother: thundersootherOptions,
  lavawalker: lavawalkerOptions,
  maidenbeloved: maidenBelovedOptions,
  viridescentvenerer: viridescentVenererOptions,
  crimsonwitchofflames: crimsonWitchOptions,
  noblesseoblige: noblesseObligeOptions,
  bloodstainedchivalry: bloodstainedChivalryOptions,
  archaicpetra: archaicPetraOptions,
  retracingbolide: retracingBolideOptions,
  heartofdepth: heartOfDepthOptions,
  tenacityofthemillelith: tenacityOptions,
  paleflame: paleFlameOptions,
  shimenawasreminiscence: shimenawaOptions,
};
