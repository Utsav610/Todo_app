import { s, ms, vs, mvs } from 'react-native-size-matters';

export const scale = {
  s,
  ms: (size, factor = 0.1) => ms(size, factor),
  vs,
  mvs: (size, factor = 0.1) => mvs(size, factor)
};
