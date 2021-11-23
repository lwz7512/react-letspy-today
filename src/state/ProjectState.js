import create from 'zustand'

import {
  getGameCodeRunningResult as runPY
} from '../service/ProjectService'

/**
 * Compose GameSnippet object
 * @param {function} getHandler 
 * @returns gameSnippet match backend schema
 */
const getCurrentGameSnippet = getHandler => ({
  id:   getHandler()['projectID'],
  name: getHandler()['projectName'],
  code: getHandler()['codeValue'],
  params: '',
  codeType: '',
})

const projectStore = create(
  (set, get) => ({
    // for home page
    projects: [],
    setProjects: items => set({ projects : items }),
    // for project page
    introMode: true,
    switchMode: () => set(
      state => ({introMode: !state['introMode']})
    ),
    runningMode: false, // just for visual effect
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
    // starte running code
    isRunning: false,
    startRunning: () => set({isRunning: true}),
    // code running request
    execute: async (target) => {
      set({runningMode: true})
      const gameSnippet = getCurrentGameSnippet(get)
      const result = await runPY({...gameSnippet, ...target})
      if (result['status'] === 200) {
        set({codeExecResult: result['data']})
      } else {
        set({codeExecError: result})
      }
      set({isRunning: false})
      setTimeout(()=>{set({runningMode: false})}, 300)
    },
    reset: () => set({
      codeExecResult: {},
      codeExecError: null,
      introMode: true
    }),
    GAME_DEGUG: true,
    // more state and action ...
  })
)

export default projectStore
