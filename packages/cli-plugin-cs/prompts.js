module.exports = [{
    type: 'confirm',
    name: 'addDefaultProject',
    message: 'Allow CS to use the default project?',
    default: true,
  },
  {
    type: 'checkbox',
    name: 'csLayoutPlugins',
    message: 'Add the following layout plugins?',
    choices: ['muuri']
  }
]