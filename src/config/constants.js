/**
 * app brand labels
 */
export const app_brand = {
  hero_title_a: 'Minimal Python Coding Playground',
  hero_title_b: ['You Coding', 'You Playing', 'You get Rewards'],
  action_now_label: 'Get Started',
  action_now_route: '/project/1',
  feature_title_a: 'Coding with fun?',
  feature_title_b: '🐱',
  feature_title_c: 'let\'s start with some well designed projects to guide your through very basic Python.',
}

export const EditorMode = {
  EDIT: 'edit',
  LIVE: 'live_code',
  REFE: 'reference_subtitle',
  TIPS: 'tips',
  RESET: 'reset_editor',
  HELP: 'help_contact',
  HIDE: 'hide_header'
}

export const games = [
  {
    id: 1, src: 'games/shots/gameshot_1.png', doc: 'games/1.md', 
    alt: 'The Clone Armys', code: 'CloneArmy.js'
  },
  {
    id: 2, src: 'games/shots/gameshot_2.png', doc: 'games/2.md', 
    alt: 'Lava Adventure', code: 'LavaAdventure.js'
  },
  {
    id: 3, src: 'games/shots/gameshot_3.png', doc: 'games/3.md', 
    alt: 'Make your Bridge', code: 'MakeYourPath.js'
  },
  {
    id: 4, src: 'games/shots/gameshot_4.png', doc: 'games/4.md', 
    alt: 'Guess My Name', code: 'GuessMyName.js'
  },
  {
    id: 5, src: 'games/shots/gameshot_5.png', doc: 'games/5.md', 
    alt: 'Riddle of Sphinx', code: 'SphinxRiddle.js'
  },
  {
    id: 6, src: 'games/shots/gameshot_6.png', doc: 'games/6.md', 
    alt: 'Free Your Troops', code: 'FlyThemUp.js'
  },
  {
    id: 7, src: 'games/shots/gameshot_7.png', doc: 'games/7.md', 
    alt: 'Which way to go', code: 'WhichWayToGo.js'
  },
  {
    id: 8, src: 'games/shots/gameshot_8.png', doc: 'games/8.md', 
    alt: 'Pass live bridge', code: 'PassLiveBridge.js'
  },
  {
    id: 9, src: 'games/shots/gameshot_9.png', doc: 'games/9.md', 
    alt: 'Fix the clock', code: 'FixTheClock.js'
  },
  { id: Infinity, src: '', doc: '', alt: 'Stay tuned...', },
]

export const gameDevWorkflow = [
  '1. Select Python Nano-Concept to cover',
  '2. Outline a story including a challenge to be done',
  '3. Collect and search handy game assets(image, audio)',
  '4. Build Game map in Tiled if necessary',
  '5. Develop the static main scene of game',
  '6. Add interaction to game',
  '7. Complete the whole game logic',
  '8. Expose `bingo` interface for Python code result',
]