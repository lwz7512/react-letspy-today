import create from 'zustand'

import {
  getGameCodeRunningResult as runPY
} from '../service/ProjectService'


const getCurrentGameSnippet = getHandler => ({
  id:   getHandler()['projectID'],
  name: getHandler()['projectName'],
  code: getHandler()['codeValue']
})

const projectStore = create(
  (set, get) => ({
    introMode: true,
    switchMode: () => set(
      state => ({introMode: !state['introMode']})
    ),
    runningMode: false,
    toggleRunning: () => set(
      state => ({runningMode: !state['runningMode']})
    ),
    // project id
    projectID: '1',
    setProjectID: id => set({projectID: id}),
    // project name
    projectName: 'demo project',
    setProjectName: name => set({projectName: name}),
    // editor code
    codeValue: '',
    codeValueChanged: code => set({codeValue: code}),
    // code running state
    codeExecResult: {},
    // code running error
    codeExecError: null,
    // code running request
    execute: async (target) => {
      const gameSnippet = getCurrentGameSnippet(get)
      const result = await runPY({...gameSnippet, ...target})
      if (result['status'] === 200) {
        set({codeExecResult: result['data']})
      } else {
        set({codeExecError: result})
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
