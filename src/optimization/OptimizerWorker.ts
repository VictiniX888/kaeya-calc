// WorkerHack has to be imported first
import '../WorkerHack';

import { getAllArtifactSetBonuses } from '../artifact/ArtifactSetUtil';
import Save, {
  ArtifactSave,
  createArtifactSave,
  unpackSave,
} from '../save/Save';
import { optimizeSubstats, RollDistribution } from './Optimization';
import { getAllTalentFns } from '../talent/Talent';

type OptimizerWorkerData = {
  possibleStats: string[];
  maxRolls: number;
  erThreshold: number;
  save: Save;
};

export type SubstatOptimizerResultSave = {
  subStatRolls: RollDistribution[];
  artifacts: ArtifactSave[];
};

export const optimize = (
  data: OptimizerWorkerData
): SubstatOptimizerResultSave => {
  const appState = unpackSave(data.save);
  const artifactSetBonuses = getAllArtifactSetBonuses(appState.artifactSets);
  const talents = getAllTalentFns(appState.character, appState.weapon);
  const calcParams = { ...appState, artifactSetBonuses, talents };

  const result = optimizeSubstats(
    data.possibleStats,
    data.maxRolls,
    data.erThreshold,
    appState.rotation,
    calcParams
  );

  return {
    subStatRolls: result.subStatRolls,
    artifacts: result.artifacts.map(createArtifactSave),
  };
};
