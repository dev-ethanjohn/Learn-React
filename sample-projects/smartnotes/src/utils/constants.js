const logoPaths = [
  "logo1.svg",
  "logo2.svg",
  "logo1.svg",
  "logo3.svg",
  "logo4.svg",
  "logo2.svg",
  "logo4.svg",
  "logo3.svg",
];

const logos = logoPaths.map(
  (file) => new URL(`../assets/LogoBanner/${file}`, import.meta.url).href
);

export { logos };
