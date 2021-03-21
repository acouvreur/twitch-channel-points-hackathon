const getHashCode = (str) => {
  let hash = 0;
  if (str.length === 0) return hash;
  for (let i = 0; i < str.length; i += 1) {
    // eslint-disable-next-line no-bitwise
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    // eslint-disable-next-line no-bitwise
    hash &= hash; // Convert to 32bit integer
  }
  return hash;
};

const intToHSL = (val) => `hsl(${val % 360},100%,30%)`;

class ColorService {
  getColorMap = (strArray) => strArray.reduce((acc, cur) => {
    acc[cur] = intToHSL(getHashCode(cur));
    return acc;
  }, {});
}

export default new ColorService();
