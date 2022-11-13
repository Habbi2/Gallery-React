function importAll(r) {
  let images = [];
  r.keys().map((item, index) => { return images[index] = [  r(item) ] });
  return images;
}

const images = importAll(require.context('../images', false, /\.(png|jpe?g|svg)$/));

export default images;
