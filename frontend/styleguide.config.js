const path = require('path');

const { createWebpackDevConfig } = require('@craco/craco');

const cracoConfig = require('./craco.config.js');
const webpackConfig = createWebpackDevConfig(cracoConfig);

module.exports = {
  webpackConfig,
  tocMode: 'collapse',
  assetsDir: 'public/Images',
  require: [path.join(__dirname, './node_modules/tailwindcss/tailwind.css')],
  sections: [
    {
      name: 'Global Components',
      components: 'src/Components/Global/*.jsx',
      ignore: [
        'src/Components/Global/Home.jsx',
        'src/Components/Global/MenuElements.jsx',
      ],
      usageMode: 'expand',
    },
    {
      name: 'Forms Components',
      components: 'src/Components/Forms/*.jsx',
      usagemode: 'expand',
    },
    {
      name: 'Properties Components',
      components: 'src/Components/Properties/*.jsx',
      ignore: 'src/Components/Properties/PropertyInfo.jsx',
      usageMode: 'expand',
    },
    {
      name: 'Users Components',
      components: 'src/Components/Users/*.jsx',
      usageMode: 'expand',
    },
  ],
};
