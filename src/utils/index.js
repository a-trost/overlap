export const formatSeconds = time => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = Math.floor(time % 60);
  let finalTime = "";
  if (hours > 0) {
    finalTime += `${hours}:${minutes < 10 ? "0" : ""}`;
  }
  finalTime += `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  return finalTime;
};

export const randomDegree = () => {
  const degree = Math.random() * 100;
  if (degree < 5 || degree > 70) {
    return randomDegree();
  }
  return degree;
};

export const getColor = (index, length) => {
  const colors = ["#F5C043", "#B2301A", "#5FA790", "#D73721"];
  const episode = length - index;
  return colors[episode % 4];
};

export const formatEpisodeNumber = number => {
  const int = Number(number);
  if (int > 99) {
    return `${int}`;
  }
  if (int > 9) {
    return `0${int}`;
  }
  return `00${int}`;
};
