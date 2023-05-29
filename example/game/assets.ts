import { existsSync, mkdirSync, readFileSync } from "fs";
import { writeFile } from "fs/promises";
import { dirname } from "path";
import { AssetData } from "../types";

const getPath = (addr: string, id: number): string =>
  `data/assets/${addr}/${id}.json`;

export const createAsset = async (
  addr: string,
  id: number
): Promise<AssetData> => {
  const path = getPath(addr, id);
  if (existsSync(path)) {
    throw Error("Asset already created");
  }
  mkdirSync(dirname(path), { recursive: true });
  const asset: AssetData = {
    id,
    genome: {
      //FIXME Brain stats should derive from the genome mapping
      growth: Math.random(),
    },
    computeUnits: 0,
  };
  await writeFile(path, JSON.stringify(asset));
  return asset;
};

export const getAsset = async (
  addr: string,
  id: number
): Promise<AssetData> => {
  const path = getPath(addr, id);
  if (!existsSync(path)) {
    return await createAsset(addr, id);
  }
  return JSON.parse(readFileSync(path, "utf8")) as AssetData;
};

export const updateAsset = async (
  addr: string,
  id: number,
  asset: AssetData
): Promise<void> => {
  const path = getPath(addr, id);
  await writeFile(path, JSON.stringify(asset));
};
