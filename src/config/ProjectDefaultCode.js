import { rTabs } from '../utils/StrUtil'

const projectCode_1 = rTabs(`
    foo = 100  # DO NOT TOUCH THIS LINE!
    # Mission Brief:
    # Write an expression or a formular to double the 'foo' value above.
    #
    # Note: 
    # A formular using 'foo' expected
    foo = foo * 2
`)

const projectCode_2 = rTabs(`
    # Mission Brief:
    # Ola is being trapped in the lava valley! 
    # Your mission is to help him out of there!
    #
    # Tips: 
    # Compose a group of actions to instruct Ola walking through it.
    # ONE line ONE action only, available actions including:
    # walk(1)
    # jump(1)
    # pivot()
    #
    # lets get started with:
    walk(1)
`)

const projectCode_3 = rTabs(`
    bridge = [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0]
    # Mission Brief:
    # Ola needs to reach the door across the broken bridge, 
    # help him repair the bridge!
    #
    # Tips:
    # in bridge stone list, 1 repesents existing conrnerstone, 
    # 0 repesents blank space. So, when all the 0 change to 1,
    # you would pass!
    # 
    # lets get started with repairing first space by:
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
        projName: 'demo',
        codeType: 'statements', 
        params: 'foo', 
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
