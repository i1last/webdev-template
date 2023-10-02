import * as nodePath from "path";
const rootFolder = nodePath.basename(nodePath.resolve());

const srcFolder = "./src";
const buildFolder = "./dist";

export const path = {
  src: {
    files: `${srcFolder}/assets/files/**/*.*`,
    html: `${srcFolder}/app/**/*.html`,
    scss: `${srcFolder}/**/*.scss`,
    js: `${srcFolder}/**/*.js`,
    images: `${srcFolder}/assets/images/**/*.{jpg,jpeg,png,gif,webp}`,
    svg: `${srcFolder}/assets/images/**/*.svg`,
    svgicons: `${srcFolder}/assets/svgicons/*.svg`,
    fonts: `${srcFolder}/assets/fonts`,
    fontsscss: `${srcFolder}/scss/core/fonts.scss`
  },
  build: {
    files: `${buildFolder}/assets/files/`,
    html: `${buildFolder}/`,
    css: `${buildFolder}/app/css/`,
    js: `${buildFolder}/app/js/`,
    images: `${buildFolder}/assets/images/`,
    fonts: `${buildFolder}/assets/fonts`,
  },
  watch: {
    files: `${srcFolder}/assets/files/**/*.*`,
    html: `${srcFolder}/**/*.html`,
    scss: `${srcFolder}/scss/**/*.scss`,
    js: `${srcFolder}/**/*.js`,
    images: `${srcFolder}/assets/images/**/*.{svg,ico,jpg,jpeg,png,gif,webp}`,
  },
  buildFolder: buildFolder,
  srcFolder: srcFolder,
  rootFolder: rootFolder,
  fileIncludeFolder: srcFolder,
  ftp: "",
};
