module.exports = {
    title: "Common Sense",
    description: "",
    dest: 'docs/',
    serviceWorker: true,
    themeConfig: {
        repo: 'tnocs/csnext',
        editLinks: true,
        docsDir: 'pages',
        locales: {
          '/': {
            label: 'English',
            selectText: 'Languages',
            editLinkText: 'Edit this page on GitHub',
            nav: [
              {
                text: 'Getting started',
                link: '/guide/',
              },
              {
                text: 'Examples',
                link: '/examples/'
              }
            ]
          }
        }
    }
}