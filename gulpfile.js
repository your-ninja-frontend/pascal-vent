import gulp from 'gulp';
import autoprefixer from 'autoprefixer';
import postcss from 'gulp-postcss';
import imagemin from 'gulp-imagemin';
import sass from 'sass';
import gulpSass from 'gulp-sass';
import cleanCss from 'gulp-csso';
import rename from 'gulp-rename';
import { deleteAsync } from 'del';
import sourcemaps from 'gulp-sourcemaps';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import buble from 'gulp-buble';
import svgmin from 'gulp-svgmin';
import svgSprite from 'gulp-svg-sprite';
import replace from 'gulp-replace';
import cheerio from 'gulp-cheerio';
import webp from 'gulp-webp';

const createSass = gulpSass(sass);

// Объект путей

const paths = {
  styles: {
    src: 'source/sass/index.scss',
    dest: 'css/'
  },
  scripts: {
    src: 'source/js/**/*.js',
    dest: 'js/'
  },
  imageSvg: {
    src: 'source/img/sprite/*.svg',
    dest: 'img/sprite/'
  },
  image: {
    src: 'source/img/*',
    dest: 'img/'
  }
}

// Отчистка кталога стилей

const clean = () => deleteAsync([paths.styles.dest, paths.scripts.dest, paths.imageSvg.dest, paths.image.dest]);

// Генерация файла стилей

const styles = () => {
  return gulp.src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(createSass())
    .pipe(postcss([autoprefixer()]))
    .pipe(cleanCss())
    .pipe(rename({
      basename: 'style',
      suffix: '.min'
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.styles.dest))
}

// Генерация файла скриптов

const scripts = () => {
  return gulp.src(paths.scripts.src)
    .pipe(sourcemaps.init())
    .pipe(concat('script.min.js'))
    .pipe(buble())
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.scripts.dest))
}

// Генерация спрайта

const svgsprite = () => {

  return gulp.src(paths.imageSvg.src)
    .pipe(svgmin(
      {
        js2svg: {
          pretty: true,
          indent: 2,
        },
      }
    ))
    .pipe(cheerio({
      run: function ($) {
        $('[fill]').removeAttr('fill');
        $('[stroke]').removeAttr('stroke');
        $('[style]').removeAttr('style');
      },
      parserOptions: { xmlMode: true }
    }))
    .pipe(replace('&gt;', '>'))
    .pipe(svgSprite({
      shape: {
        dimension: {
          maxWidth: 500,
          maxHeight: 500
        },
        spacing: {
          padding: 0
        },
      },
      mode: {
        symbol: {
          dest: '.',
          sprite: 'sprite.svg'
        }
      }
    }))
    .on('error', function (error) { console.log(error); })
    .pipe(gulp.dest(paths.imageSvg.dest))
}

// Обработка изображений

const imageSqueeze = () => {
  return gulp.src(paths.image.src)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.image.dest))
}

// Convert webp

const convertWebp = () => {
  return gulp.src(paths.image.src)
    .pipe(imagemin())
    .pipe(webp())
    .pipe(gulp.dest(paths.image.dest))
};

// Отслеживание изменений стилей

const watchAll = () => {
  gulp.watch(['source/sass/**/*.scss'], stylesRun);
  gulp.watch(paths.scripts.src, scriptsRun);
  gulp.watch(paths.imageSvg.src, sprite);
  gulp.watch(paths.image.src, image);
  gulp.watch(paths.image.src, imageWebp);
}

// Сборка файла стилей

const build = gulp.series(clean, gulp.parallel(styles, scripts, imageSqueeze, svgsprite, convertWebp), watchAll)

export const stylesRun = styles;
export const delAll = clean;
export const watch = watchAll;
export const scriptsRun = scripts;
export const sprite = svgsprite;
export const image = imageSqueeze;
export const imageWebp = convertWebp;
export const b = build;
