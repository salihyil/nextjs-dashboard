const tourConfig = [
  {
    selector: '[data-tut="reactour__iso"]',
    content: "Ok, let's start with the name of the Tour that is about to begin.",
    position: 'right',
  },
  {
    selector: '[data-tut="reactour__logo"]',
    content: 'And this is our cool bus...',
    position: [20, 20],
  },
  {
    selector: '[data-tut="reactour__copy"]',
    content: `Keep in mind that you could try and test everything during the Tour.
      For example, try selecting the highlighted text…`,
  },

  {
    selector: '[data-tut="reactour__scroll"]',
    content:
      'Probably you noted that the Tour scrolled directly to the desired place, and you could control the time also…',
  },
  {
    selector: '[data-tut="reactour__scroll--hidden"]',
    content: 'Also when places are pretty hidden…',
  },
  {
    selector: '[data-tut="reactour__action"]',
    content: 'When arrived on each place you could fire an action, like… (look at the console)',
    action: () =>
      console.log(`
                  ------------🏠🏚---------
      🚌 Arrived to explore these beautiful buildings! 🚌
                  ------------🏠🏚---------
   🚧 This action could also fire a method in your Component 🚧
    `),
  },
  {
    selector: '[data-tut="reactour__state"]',
    content: 'And the Tour could be observing changes to update the view, try clicking the button…',
    highlightedSelectors: ['[data-tut="reactour__state-absolute-child"]'],
    mutationObservables: ['[data-tut="reactour__state-absolute-child"]'],

    action: (node: HTMLElement) => node.focus(),
  },
  {
    selector: '[data-tut="reactour__highlighted"]',
    content:
      'Moreover you can highlight multiple elements and adjust highlighted region depending on DOM resizes and mutations. Try clicking the "?" tooltip and playing with tabs...',
    highlightedSelectors: ['[data-tut="reactour__highlighted-absolute-child"]'],
    mutationObservables: ['[data-tut="reactour__highlighted-absolute-child"]'],
    resizeObservables: ['[data-tut="reactour__highlighted-absolute-child"]'],
  },
  {
    selector: '[data-tour="open_modal"]',
    content:
      'Moreover you can highlight multiple elements and adjust highlighted region depending on DOM resizes and mutations. Try clicking the "?" tooltip and playing with tabs...',
    highlightedSelectors: ['.modaaals-modal'],
    mutationObservables: ['#portaaal'],
  },
];

const tourConfigAlt  = [
  {
    selector: '[data-tut="reactour__logo"]',
    content: 'Alt 1.',
  },
  {
    selector: '[data-tut="reactour__copy"]',
    content: 'Alt 2.',
  },
  {
    selector: '[data-tut="reactour__iso"]',
    content: 'Alt 3.',
  },
];

export { tourConfig, tourConfigAlt };

export const tour1Steps = [
  {
    selector: '.first-step1',
    content: 'Bu ilk adım.',
  },
  {
    selector: '.second-step1',
    content: 'Bu ikinci adım.',
  },
  {
    selector: '.third-step1',
    content: 'Bu üçüncü adım.',
  },
];

export const tour2Steps = [
  {
    selector: '.first-step2',
    content: 'Bu ilk adım.',
  },
  {
    selector: '.second-step2',
    content: 'Bu ikinci adım.',
  },
];
