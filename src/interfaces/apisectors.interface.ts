export interface SectorJson {
  [x: string]: any;
  airspace: Airspace[];
  groups: { [key: string]: GroupValue };
  positions: { [key: string]: Position };
  callsigns: Callsigns;
  airports: { [key: string]: Airport };
}

export interface Airport {
  callsign: string;
  coord: number[];
  topdown: string[];
  runways?: string[];
}

export interface Airspace {
  id: string;
  group: GroupEnum;
  owner: string[];
  sectors: Sector[];
}

export enum GroupEnum {
  App = "APP",
  Edgg = "EDGG",
  Edmm = "EDMM",
  Eduu = "EDUU",
  Edww = "EDWW",
  Edyy = "EDYY",
  Mapp = "MAPP",
}

export interface Sector {
  max?: number;
  min?: number;
  points: Array<string[]>;
  runways?: Runway[];
}

export interface Runway {
  icao: Icao;
  runway: string;
}

export enum Icao {
  Eddb = "EDDB",
  Eddf = "EDDF",
}

export interface Callsigns {
  DEL: Del;
  GND: Gnd;
  TWR: Twr;
}

export interface Del {
  "": string;
}

export interface Gnd {
  "^[1-9]": string;
  "^[A-Z]": string;
  "": string;
  A: string;
}

export interface Twr {
  "": string;
  I: string;
}

export interface GroupValue {
  name: string;
}

export interface Position {
  colours?: Colour[];
  pre: string[];
  type: Type;
  frequency: string;
  callsign: string;
}

export interface Colour {
  hex: string;
}

export enum Type {
  App = "APP",
  Ctr = "CTR",
  Dep = "DEP",
}
