const {
  override,
  addWebpackModuleRule,
  addWebpackAlias,
} = require('customize-cra')
const path = require('path')

const ROOT_PATH = path.resolve(__dirname)
const SRC_PATH = path.resolve(ROOT_PATH, './src')
const ASSETS_PATH = path.resolve(SRC_PATH, 'assets')
const MODULE_PATH = path.resolve(SRC_PATH, 'modules')
const COMPONENT_PATH = path.resolve(SRC_PATH, 'components/index')
const IMG_PATH = path.resolve(ASSETS_PATH, 'img')

module.exports = override(
  addWebpackModuleRule({
    test: /\.styl$/,
    exclude: /(node_modules)/,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          sourceMap: true,
          modules: {
            mode: 'global',
          },
          importLoaders: 2,
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            plugins: [
              require('precss')({
                /* ...options */
              }),
              require('autoprefixer')({
                grid: true,
              }),
            ],
          },
          sourceMap: true,
        },
      },
      {
        loader: 'stylus-loader',
        options: {
          sourceMap: true,
        },
      },
    ],
  }),
  addWebpackModuleRule({
    test: /\.css$/,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          sourceMap: true,
          modules: false,
        },
      },
    ],
  }),
  addWebpackAlias({
    '@Home': SRC_PATH,
    '@Images': IMG_PATH,
    '@Assets': ASSETS_PATH,
    '@Modules': MODULE_PATH,
    '@Components': COMPONENT_PATH,
  }),
)
