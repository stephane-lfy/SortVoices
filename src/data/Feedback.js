const data = [];

function randomIntFromInterval(min,max)
{
  return Math.floor(Math.random()*(max-min+1)+min);
}

const popularities = ["POS", "NEG", "NEU"];

for (let i = 0, l = 1000; i < l; i++) {
  let feedback = null;
  if (randomIntFromInterval(0, 99) % 2) {
    feedback = {
      sav: popularities[randomIntFromInterval(0, 2)],
      shipping: popularities[randomIntFromInterval(0, 2)],
      product: popularities[randomIntFromInterval(0, 2)]
    }
  }
  data.push({
    feedback,
    publishedAt: new Date(2019, randomIntFromInterval(0, 6), randomIntFromInterval(1, 30))
  });
}

export default data;
