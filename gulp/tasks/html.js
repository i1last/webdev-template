import fileInclude from "gulp-file-include";
import webpHtmlNoSvg from "gulp-webp-html-nosvg";
import versionNumber from "gulp-version-number";
import htmlmin from "gulp-htmlmin";

export const html = () => {
  return app.gulp
    .src(app.path.src.html)
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "HTML",
          messahe: "Error: <%= error.message %>",
        }),
      ),
    )
    .pipe(fileInclude({
      prefix: '@@',
      basepath: app.path.fileIncludeFolder
    }))
    .pipe(app.plugins.if(app.isBuild, webpHtmlNoSvg()))
    .pipe(
      app.plugins.if(
        app.isBuild,
        versionNumber({
          value: "%DT%",
          append: {
            key: "_v",
            cover: 0,
            to: ["css", "js"],
          },
          output: {
            file: "gulp/version.json",
          },
        }),
      ),
    )
    .pipe(
      app.plugins.if(
        app.isBuild,
        htmlmin({
          collapseWhitespace: true,
        }),
      ),
    )
    .pipe(app.gulp.dest(app.path.build.html))
    .pipe(app.plugins.browsersync.stream());
};
