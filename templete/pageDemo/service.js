import { api } from '@/utils/config';
import { apiGenerator } from '@/utils';

const { {{generateName}} } = api;

const {{generateName}}ApiGenerator = apiGenerator({{generateName}});

export const query = {{generateName}}ApiGenerator.get$query;
export const create = {{generateName}}ApiGenerator.post$create;
export const remove = {{generateName}}ApiGenerator.delete$delete;
export const update = {{generateName}}ApiGenerator.put$update;
