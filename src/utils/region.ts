export function getRegion(region: any): 'india' | 'global' {
  return region === 'global' ? 'global' : 'india';
}
