import { Result } from "@badrap/result";
import { readFile } from "fs/promises";
import YAML from "yaml";
import type YAMLFileData from "../../types/data-transfer-objects";


export const dataLoader = (path: string): Result<Promise<string>> => {
  try {

    const data: Promise<string> = readFile(path, "utf-8");
    return Result.ok(data);
  } catch (e) {
    console.log(`Reading file error: ${e}`);
  }

  return Result.err();
};


export const dataParser = (data: string): Result<YAMLFileData> => {
  try {
    const parsedData = YAML.parse(data);
    const typedData = parsedData as YAMLFileData;

    return Result.ok(typedData);
  } catch (e) {
    console.log(`Yaml file parsing error: ${e}`);
  }

  return Result.err();
};