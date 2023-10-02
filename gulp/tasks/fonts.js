import fs from "fs";
import fonter from "gulp-fonter-2";
import ttf2woff2 from "gulp-ttf2woff2";

import rename from 'gulp-rename';

export const otf2ttf = () => {
  return app.gulp
    .src(`${app.path.src.fonts}/*.otf`, {})
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "FONTS",
          message: "Error: <%= error.message %>",
        }),
      ),
    )
    .pipe(
      fonter({
        formats: ["ttf"],
      }),
    )
    .pipe(app.gulp.dest(app.path.src.fonts));
};

export const ttf2woff = () => {
  return app.gulp
    .src(`${app.path.src.fonts}/*.ttf`, {})
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "FONTS",
          message: "Error: <%= error.message %>",
        }),
      ),
    )
    .pipe(
      fonter({
        formats: ["woff"],
      }),
    )
    .pipe(app.gulp.dest(app.path.build.fonts))
    .pipe(app.gulp.src(`${app.path.src.fonts}/*.ttf`))
    .pipe(ttf2woff2())
    .pipe(app.gulp.dest(app.path.build.fonts));
};

export const fontsStyle = () => {
  let fontsFile = app.path.src.fontsscss;
  fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
    if (fontsFiles) {
      if (!fs.existsSync(fontsFile)) {
        fs.writeFile(fontsFile, "", cb);
        let newFileOnly;

        for (let i = 0; i < fontsFiles.length; i++) {
          let fontFileName = fontsFiles[i].split(".")[0];

          if (newFileOnly !== fontFileName) {
            let fontName = fontFileName.split("-")[0]
              ? fontFileName.split("-")[0]
              : fontFileName;
            let fontWeight = fontFileName.split("-")[1]
              ? fontFileName.split("-")[1]
              : fontFileName;

            switch (fontWeight.toLowerCase()) {
              case "thin":
                fontWeight = 100;
                break;
              case "extralight":
                fontWeight = 200;
                break;
              case "light":
                fontWeight = 300;
                break;
              case "medium":
                fontWeight = 500;
                break;
              case "semibold":
                fontWeight = 600;
                break;
              case "bold":
                fontWeight = 700;
                break;
              case "extrabold":
                fontWeight = 800;
                break;
              case "heavy":
                fontWeight = 800;
                break;
              case "black":
                fontWeight = 900;
                break;
              default:
                fontWeight = 400;
                break;
            }

            fs.appendFile(
              fontsFile,
              `@font-face {\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("/assets/fonts/${fontFileName}.woff2") format("woff2"), url("/assets/fonts/${fontFileName}.woff") format("woff");\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;\n}\n`,
              cb,
            );
            newFileOnly = fontFileName;
          }
        }
      } else {
        console.log(
          "Файл scss/fonts.scss уже существует. Для обновления файла нужно его удалить.",
        );
      }
    }
  });

  return app.gulp.src(app.path.srcFolder);
  function cb() {}
};
