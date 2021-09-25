import { AppState } from '../../App';
import { Stats } from '../../data/types';
import Artifact from '../artifact/Artifact';
import DamageModifier from '../modifier/DamageModifer';
import { StatMixin } from '../option/Mixin';
import { getTotalStatsAt } from '../Stat';
import { TalentType } from '../talent/types';

export type RollDistribution = {
  stat: string;
  rolls: number;
};

type SubstatOptimzerResult = {
  subStatRolls: RollDistribution[];
  artifacts: Artifact[];
};

// Average substat rolls, as per KQM guidelines
const substats: Record<string, number> = {
  hpBonus: 0.0496,
  flatHp: 253.94,
  atkBonus: 0.0496,
  flatAtk: 16.54,
  defBonus: 0.062,
  flatDef: 19.68,
  elementalMastery: 19.82,
  energyRecharge: 0.0551,
  critRate: 0.0331,
  critDmg: 0.0662,
};

export function optimizeSubstats(
  possibleStats: string[],
  maxRolls: number,
  optimizeTalentType: TalentType,
  optimizeTalentId: string,
  appState: AppState,
  artifactSetBonuses: Stats,
  damageModifier: DamageModifier,
  statMixins: StatMixin[]
): SubstatOptimzerResult {
  let maxDmg = 0;
  let optimalSubstatRolls: RollDistribution[] = [];
  let optimalArtifacts: Artifact[] = appState.artifacts;

  const combinations = generateRollCombinations(possibleStats, maxRolls);

  combinations.forEach((combination) => {
    const artifacts = appState.artifacts.map((artifact) => {
      return new Artifact(
        artifact.type,
        artifact.rarity,
        artifact.level,
        artifact.mainStat.stat
      );
    });

    // Set artifact substats according to currentSubstatRolls
    let iArtifact = 0;
    let jArtifact = 0;
    combination.forEach(({ stat, rolls }) => {
      artifacts[iArtifact].setSubStatProp(jArtifact, stat);
      artifacts[iArtifact].setSubStatValue(jArtifact, substats[stat] * rolls);
      if (++jArtifact >= 4) {
        jArtifact = 0;
        if (++iArtifact >= 5) {
          // This really should not happen
          iArtifact = 0;
        }
      }
    });

    const totalStats = getTotalStatsAt(
      appState.character,
      appState.weapon,
      artifactSetBonuses,
      artifacts,
      appState.talentAttackLevel,
      appState.talentSkillLevel,
      appState.talentBurstLevel,
      statMixins
    );

    // Calculate talent damage
    const talentValues = appState.character.getTalentDamageAt({
      type: optimizeTalentType,
      talentLevel: appState.talentAttackLevel,
      totalStats: totalStats,
      modifier: damageModifier,
    });

    const talentDmg =
      talentValues.find(
        (talentValue) => talentValue.description === optimizeTalentId
      )?.damage?.[0] ?? 0;

    // Update optimal rolls
    if (talentDmg > maxDmg) {
      optimalSubstatRolls = combination;
      optimalArtifacts = artifacts;
      maxDmg = talentDmg;
    }
  });

  return {
    subStatRolls: optimalSubstatRolls,
    artifacts: optimalArtifacts,
  };
}

// Recursive function to generate all combinations of possibleStats.length numbers that sum to maxRolls
function generateRollCombinations(
  possibleStats: string[],
  maxRolls: number
): RollDistribution[][] {
  if (possibleStats.length === 0 || maxRolls === 0) {
    return [];
  }

  if (possibleStats.length === 1 || maxRolls === 1) {
    return [[{ stat: possibleStats[0], rolls: maxRolls }]];
  }

  const combinations: RollDistribution[][] = [];

  combinations.push([{ stat: possibleStats[0], rolls: maxRolls }]);

  for (let i = maxRolls - 1; i >= 0; i--) {
    const current: RollDistribution[] = [{ stat: possibleStats[0], rolls: i }];

    const backCombinations = generateRollCombinations(
      possibleStats.slice(1),
      maxRolls - i
    );

    combinations.push(
      ...backCombinations.map((combination) => current.concat(combination))
    );
  }

  return combinations;
}
