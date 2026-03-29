const store = new Map<string, Set<string>>();

export const setAllow = (ip: string, flag: string) => {
  if (!store.has(ip)) store.set(ip, new Set());
  store.get(ip)!.add(flag);
};

export const checkAllow = (ip: string, flag: string) => {
  return store.get(ip)?.has(flag) ?? false;
};

export const clearAllow = (ip: string, flag: string) => {
  store.get(ip)?.delete(flag);
};
