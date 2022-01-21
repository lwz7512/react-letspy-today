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
    # myName = "??ILLOU"
    # Mission Brief:
    # The robot could not recall his name recorded in a variable <myName> above, 
    # help him to figure it out the first two letters.
    # 
    # Tips:
    # First two letter of his name is missing, you are expected to use
    # string slice method to extract the real value of '??' from <myName>!
    # 
    # Now, write you solution to replace the 'None' below:
    firstTwoChars = None
`)

const projectCode_5 = rTabs(`
    # There are two box holding the answer of the Sphinx famous question:
    # green_box = "********"
    # red_box = "########"
    # Mission Brief:
    # first, you need to know the right anwser, 
    # then you need to know how to check the two box with "if" statement,
    # if the two box contain the key word of right anwser, return the box!
    # Tips:
    # key word may use 'person', :)
    # lets first create a placeholder for your anwser,
    # check two box variables, asign the right one to the 'the_right_box':
    the_right_box = None
    if "person" in green_box:
        the_right_box = green_box
    if "person" in red_box:
        the_right_box = red_box
`)

const projectCode_6 = rTabs(`
    # Mission Brief: 
    # In this game, you are going to loop 'all_paths' list:
    # all_paths = [path_object, path_object, path_object, ...]
    # Check each path object, which one includes the right obstacle to 
    # reach the exit point!
    #
    # Tips:
    # Every path_object has a function: includeItem(type) to return 
    # True or False. type parameter in the function might be one of 
    # 'leaf', 'bridge', 'diamond', 'key', 'heart', 'cone'.
    # You may have noticed the right way out includes a 'key'!
    # 
    # lets first create a placeholder used to save your finding:
    right_path = None
    for path_object in all_paths:
        # check the 'path_object' above using its api 'includeItem',
        # then assign your finding to 'right_path'
        if path_object.includeItem('key'):
            right_path = path_object
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
        expect: 40,
        codeAnwser: '',
    },
    2: {
        projName: 'Lava Adventure',
        codeType: 'actions',
        params: '',
        expect: [{walk: 1}, {jump: 1}, {walk: 1}, {jump: 1}, {walk: 1}, {pivot: 0}],
        codeAnwser: '',
    },
    3: {
        projName: 'Missing bricks',
        codeType: 'statements',
        params: 'bridge',
        expect: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        codeAnwser: '',
    },
    4: {
        projName: 'Guess My Name',
        codeType: 'statements', 
        params: 'firstTwoChars', 
        expect: 'CA',
        codeAnwser: 'myName[:2]'
    },
    5: {
        projName: 'Riddle of Sphinx',
        codeType: 'statements',
        params: 'the_right_box',
        expect: 'a person'
    },
    6: {
        projName: 'Which way to go',
        codeType: 'statements',
        params: 'right_path',
        expect: {id: 4}
    },
    7: { },
    8: { },
    9: { },
}
