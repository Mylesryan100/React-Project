export interface Country {
  cca3: string;
  name: {
    common: string;
  };
  flags: {
    png: string;
    svg: string;
  };
  population?: number;
  region?: string;
  capital?: string[];
  subregion?: string;
  borders?: string[];
}
