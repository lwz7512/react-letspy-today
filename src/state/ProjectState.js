import create from 'zustand'

import { getGameCodeRunningResult } from '../service/ProjectService'


const projectStore = create(
  set => ({
    introMode: true,
    switchMode: () => set(
      state => ({introMode: !state['introMode']})
    ),
    runningMode: false,
    toggleRunning: () => set(
      state => ({runningMode: !state['runningMode']})
    ),
    // code running state
    codeExecResult: {},
    // code running request
    sendGameCode: async (gameSnippet) => {
      const result = await getGameCodeRunningResult(gameSnippet)
      if (result['status'] === 200) {
        set({codeExecResult: result['data']})
      }
    },
    // more state and action ...
  })
)

export default projectStore



// templete store:
// const useStore = create(set => ({
//   bears: 0,
//   increasePopulation: () => set(state => ({ bears: state.bears + 1 })),
//   removeAllBears: () => set({ bears: 0 })
// }))
