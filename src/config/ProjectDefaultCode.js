import { rTabs } from '../utils/StrUtil'

const projectCode_1 = rTabs(`
    troops_amount = 100  # DO NOT TOUCH THIS LINE!
    # Note: 
    # A formular using 'foo' expected
    troops_amount = troops_amount * 2
`)

const projectCode_2 = rTabs(`
    # Tips: 
    # walk(1)
    # jump(1)
    # pivot()
    #
    # lets get started with:
    walk(1)
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
        expect: 200
    },
    2: {
        projName: 'Lava Adventure',
        codeType: 'actions',
        params: '',
        expect: [{}, {}, {}]
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

export const projectsTips = {
    1: {
        name: `Clone Army`,
        challenge: `Change yourself could be tough, but this is not True for python variables. 
            In this project, you are expected to use 'variables' to enlarge your army.
        `,
        mission: `
            Your are a scientist in charge of producing clone army to defense your world. 
            Your enemy is overwhelming, you need to double your army!
        `,
        tips: 'No support yet.',
        coding: `Write an expression or a formular to double the 'troops_amount' value above.`,
        walk: 'Fire Now!',
        pass: 'Bingo!',
        tags: ['Easy', 'Variable', 'Statement']
    },
    2: {
        name: `Lava Adventure`,
        challenge: `The goal in this mission is learning how to organize different actions to get through the lava valley.`,
        mission: `
            Ola is being trapped in the lava valley! Your mission is to help him out of there!
        `,
        tips: `
            Compose a group of actions to instruct Ola walking through it.
            ONE line ONE action only, available actions including:
        `,
        coding: '',
        walk: '',
        pass: '',
        tags: ['Easy', 'Action', 'Function']
    },
    3: {
        name: `Missing Bricks`,
        challenge: ``,
        mission: `
            Ola needs to reach the door across the broken bridge, help him repair the bridge!
        `,
        tips: `
            in bridge stone list, 1 repesents existing conrnerstone, 0 repesents blank space.
            So, when all the 0 change to 1, you would pass!
        `,
        coding: 'Change odd elements of the list to 1',
        walk: 'Now, press right arrow key to move player',
        pass: 'Congratulations!',
        tags: ['Easy', 'Adventure', 'Statement']
    },
}
