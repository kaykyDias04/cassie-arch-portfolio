import { about } from './about';
import { project } from './project';

export const schemaTypes = [project, about];

export const SINGLETON_TYPES = new Set<string>([about.name]);
