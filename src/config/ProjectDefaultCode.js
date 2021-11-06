import { rTabs } from '../utils/StrUtil'

export const firstProjectHintCode = rTabs(`
    # Python program to check if the number provided
    # by the user is an Armstrong number or not
    # take input from the user
    num = int(input("Enter a number: "))
    # initialize sum
    sum = 0
    # find the sum of the cube of each digit
    temp = num
    while temp > 0:
       digit = temp % 10
       sum += digit ** 3
       temp //= 10
    # display the result
    if num == sum:
       print(num,"is an Armstrong number")
    else:
       print(num,"is not an Armstrong number")
`)

const dummyProjectCode = rTabs(`
    # Mission Brief:
    # ...
    # Tips:
    # ...
    # lets get started with:
    # say('hi!')
`)

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
    # Mission Brief:
    # ...
    # Tips:
    # ...
    # lets get started with:
    # say('hi!')
`)

export const projectsBoilerplateCode = {
    1: projectCode_1,
    2: projectCode_2,
    3: projectCode_3,
    4: dummyProjectCode,
    5: dummyProjectCode,
    6: dummyProjectCode,
    7: dummyProjectCode,
    8: dummyProjectCode,
    9: dummyProjectCode,
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
    3: { },
    4: { },
    5: { },
    6: { },
    7: { },
    8: { },
    9: { },
}

export const checkResultMatchTartet = (expect, result) => {
    if (!result) return false // 0, something wrong in backend
    if (expect === result) return true

    if (Array.isArray(expect) && Array.isArray(result)) {
        if (expect.length !== result.length) return false
        // TODO: compare each action
        return true
    }

    return false
}

export const generateSuccessMessage = (target) => {
    return `Congratulations! You passed the ${target.projName} project!`
}

export const generateFailureMessage = (target, result) => {
    if (!result) return 'Ops...something wrong with your code!'
    if (target.params) {// string type
        return `expecting '${target.params}' equal to ${target.expect}`
    }
    // actions
    return 'ohoh...almost there, try again!'
}