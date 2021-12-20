import { rTabs } from '../utils/StrUtil'

const projectCode_1 = rTabs(`
    troops_amount = 20  # DO NOT TOUCH THIS LINE!
    # Note: 
    # make an expression to double the troops_amount variable value:
    # troops_amount = troops_amount * 2
`)

const projectCode_2 = rTabs(`
    # Tips: 
    # walk(1)
    # jump(1)
    # pivot()
    #
    # lets get started with:
    walk(1)
    jump(1)
    walk(1)
    jump(1)
    walk(1)
    pivot()
`)

const projectCode_3 = rTabs(`
    bridge = [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0]
    # lets get started with repairing first space:
    bridge[1] = 1
    # now your turn to fill other spaces:
`)

const projectCode_4 = rTabs(`
    bridge = [1, 0, 1, 0, 1, 0, 1, 0, 1, 0]
    # Mission Brief:
    # Ola needs to reach the door across the broken bridge, help him repair the bridge!
    #
    # Tips:
    # in bridge stone list, 1 repesents existing conrnerstone, 0 repesents blank space,
    # 
    # lets get started with repairing first space by:
    bridge[1] = 1
`)

const projectCode_5 = rTabs(`
    bridge = [1, 0, 1, 0, 1, 0, 1, 0, 1, 0]
    # Mission Brief:
    # Ola needs to reach the door across the broken bridge, help him repair the bridge!
    #
    # Tips:
    # in bridge stone list, 1 repesents existing conrnerstone, 0 repesents blank space,
    # 
    # lets get started with repairing first space by:
    bridge[1] = 1
`)

const projectCode_6 = rTabs(`
    bridge = [1, 0, 1, 0, 1, 0, 1, 0, 1, 0]
    # Mission Brief:
    # Ola needs to reach the door across the broken bridge, help him repair the bridge!
    #
    # Tips:
    # in bridge stone list, 1 repesents existing conrnerstone, 0 repesents blank space,
    # 
    # lets get started with repairing first space by:
    bridge[1] = 1
`)

const projectCode_7 = rTabs(`
    bridge = [1, 0, 1, 0, 1, 0, 1, 0, 1, 0]
    # Mission Brief:
    # Ola needs to reach the door across the broken bridge, help him repair the bridge!
    #
    # Tips:
    # in bridge stone list, 1 repesents existing conrnerstone, 0 repesents blank space,
    # 
    # lets get started with repairing first space by:
    bridge[1] = 1
`)

const projectCode_8 = rTabs(`
    bridge = [1, 0, 1, 0, 1, 0, 1, 0, 1, 0]
    # Mission Brief:
    # Ola needs to reach the door across the broken bridge, help him repair the bridge!
    #
    # Tips:
    # in bridge stone list, 1 repesents existing conrnerstone, 0 repesents blank space,
    # 
    # lets get started with repairing first space by:
    bridge[1] = 1
`)

const projectCode_9 = rTabs(`
    bridge = [1, 0, 1, 0, 1, 0, 1, 0, 1, 0]
    # Mission Brief:
    # Ola needs to reach the door across the broken bridge, help him repair the bridge!
    #
    # Tips:
    # in bridge stone list, 1 repesents existing conrnerstone, 0 repesents blank space,
    # 
    # lets get started with repairing first space by:
    bridge[1] = 1
`)


export const projectsBoilerplateCode = {
    1: projectCode_1,
    2: projectCode_2,
    3: projectCode_3,
    4: projectCode_4,
    5: projectCode_5,
    6: projectCode_6,
    7: projectCode_7,
    8: projectCode_8,
    9: projectCode_9,
}

export const projectsCodeTarget = {
    1: {
        projName: 'Clone Army',
        codeType: 'statements', 
        params: 'troops_amount', 
        expect: 40
    },
    2: {
        projName: 'Lava Adventure',
        codeType: 'actions',
        params: '',
        expect: [{walk: 1}, {jump: 1}, {walk: 1}, {jump: 1}, {walk: 1}, {pivot: 0}]
    },
    3: {
        projName: 'Missing bricks',
        codeType: 'statements',
        params: 'bridge',
        expect: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    },
    4: { },
    5: { },
    6: { },
    7: { },
    8: { },
    9: { },
}
