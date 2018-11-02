module.exports = [{
    type: 'confirm',
    name: 'addDefaultProject',
    message: 'Allow CS to use the default project?',
    default: true,
  },
  {
    type: 'checkbox',
    name: 'csPlugins',
    message: 'Add the following CS plugins?',
    choices: ['split-panel', 'billboard', 'map']
  }
]