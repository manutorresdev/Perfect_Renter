// const path = require('path');

// const { createWebpackDevConfig } = require('@craco/craco');

// const cracoConfig = require('./craco.config.js');
// const webpackConfig = createWebpackDevConfig(cracoConfig);

const path = require('path')

const {
  createWebpackDevConfig,
  createWebpackProdConfig
} = require('@craco/craco')

const cracoConfig = require('./craco.config.js')
const webpackConfig =
  process.env.NODE_ENV === 'production'
    ? createWebpackProdConfig(cracoConfig)
    : createWebpackDevConfig(cracoConfig)

module.exports = {
  webpackConfig,
  tocMode: 'collapse',
  assetsDir: 'public/Images',
  require: [path.join(__dirname, './node_modules/tailwindcss/tailwind.css')],
  sections: [
    {
      expand: false,
      name: 'Global Components',
      components: 'src/Components/Global/*.jsx',
      ignore: [
        'src/Components/Global/Home.jsx',
        'src/Components/Global/MenuElements.jsx'
      ],
      usageMode: 'collapse',
      exampleMode: 'collapse',

      sections: [
        {
          ignore: [
            'src/Components/Global/Home.jsx',
            'src/Components/Global/MenuElements.jsx'
          ],
          name: 'Home Components',
          content: 'src/Components/Global/HomeReadme.md'
        }
      ]
    },
    {
      exampleMode: 'collapse',
      name: 'Forms Components',
      components: 'src/Components/Forms/*.jsx',
      usagemode: 'collapse',
      ignore: ['src/Components/Forms/RecoverPass.jsx'],
      sections: [
        {
          name: 'Book Property',
          component: 'src/Components/Forms/ContactProperty.jsx',
          content: 'src/Components/Forms/BookProperty.md'
        }
      ]
    },
    {
      exampleMode: 'collapse',
      name: 'Properties Components',
      components: 'src/Components/Properties/*.jsx',
      ignore: 'src/Components/Properties/PropertyInfo.jsx',
      usageMode: 'collapse'
    },
    {
      exampleMode: 'collapse',
      name: 'Users Components',
      components: 'src/Components/Users/*.jsx',
      usageMode: 'collapse',
      sections: [
        {
          name: 'Delete Account',
          component: 'serc/Components/Users/Profile.jsx',
          content: 'src/Components/Users/DeleteOverlay.md'
        }
      ]
    }
  ]
}
