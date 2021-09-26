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
export const substats: Record<string, number> = {
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

// Optimize substats according to KQM standardized guidelines
// 20 preallocated fixed subs (2 of each substat)
// maxRolls liquid subs (default/max = 20)
// each sub type can have maximum 2 rolls per different main stat type
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

  const combinations = generateRollCombinationsKqm(
    possibleStats,
    maxRolls,
    appState.artifacts.map((artifact) => artifact.mainStat.stat)
  );

  combinations.forEach((combination) => {
    const artifacts = generateBaseArtifacts(appState.artifacts);

    addRollsToArtifacts(combination, artifacts);

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

// Recursive function to generate all substat combinations according to KQM 2*n rule
function generateRollCombinationsKqm(
  possibleStats: string[],
  maxRolls: number,
  mainStats: string[]
): RollDistribution[][] {
  if (possibleStats.length === 0 || maxRolls === 0) {
    return [];
  }

  const sameMainStatCount = mainStats.filter(
    (mainStat) => possibleStats[0] === mainStat
  ).length;
  const currentMaxRolls = Math.min((5 - sameMainStatCount) * 2, maxRolls);

  const combinations: RollDistribution[][] = [];

  for (let i = currentMaxRolls; i >= 0; i--) {
    const current: RollDistribution[] = [{ stat: possibleStats[0], rolls: i }];

    const backCombinations = generateRollCombinationsKqm(
      possibleStats.slice(1),
      maxRolls - i,
      mainStats
    );

    if (backCombinations.length === 0) {
      combinations.push(current);
    } else {
      combinations.push(
        ...backCombinations.map((combination) => current.concat(combination))
      );
    }
  }

  return combinations;
}

// Recursive function to generate all combinations of possibleStats.length numbers that sum to maxRolls
// Generated combinations are not guaranteed to be valid substat combinations
/*
function generateRollCombinations(
  possibleStats: string[],
  maxRolls: number
): RollDistribution[][] {
  if (possibleStats.length === 0 || maxRolls === 0) {
    return [];
  }

  const combinations: RollDistribution[][] = [];

  for (let i = maxRolls; i >= 0; i--) {
    const current: RollDistribution[] = [{ stat: possibleStats[0], rolls: i }];

    const backCombinations = generateRollCombinations(
      possibleStats.slice(1),
      maxRolls - i
    );

    if (backCombinations.length === 0) {
      combinations.push(current);
    } else {
      combinations.push(
        ...backCombinations.map((combination) => current.concat(combination))
      );
    }
  }

  return combinations;
}
*/

// Generate artifacts with 2 of each substat
function generateBaseArtifacts(prevArtifacts: Artifact[]): Artifact[] {
  const artifacts = prevArtifacts.map((artifact) => {
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
  Object.entries(substats).forEach(([stat, value]) => {
    artifacts[iArtifact].setSubStatProp(jArtifact, stat);
    artifacts[iArtifact].setSubStatValue(jArtifact, value * 2);
    if (++jArtifact >= 4) {
      jArtifact = 0;
      if (++iArtifact >= 5) {
        // This really should not happen
        iArtifact = 0;
      }
    }
  });

  return artifacts;
}

// Add liquid subs to fixed subs without replacing any fixed subs
function addRollsToArtifacts(
  combination: RollDistribution[],
  artifacts: Artifact[]
) {
  const subStats = artifacts.flatMap((artifact) => artifact.subStats);
  combination.forEach(({ stat, rolls }) => {
    const subStat = subStats.find((inputStat) => inputStat.stat === stat);
    if (subStat === undefined) {
      let sIndex = 0;
      artifacts
        .find((artifact) =>
          artifact.subStats.find((inputStat, i) => {
            sIndex = i;
            return isNaN(inputStat.value);
          })
        )
        ?.setSubStatValue(sIndex, substats[stat] * rolls);
    } else {
      subStat.setValue(subStat.value + substats[stat] * rolls);
    }
  });
}
