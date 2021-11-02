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

const projectCode_1 = rTabs(`
    foo = 100  # DO NOT TOUCH THIS LINE!
    # Mission Brief:
    # Write an expression or a formular to double the 'foo' value above.
    # Note: 
    # A formular using 'foo' expected
    foo = foo * 2
`)

const projectCode_2 = rTabs(`
    foo = 100  # DO NOT TOUCH THIS LINE!
    # Mission Brief:
    # Write an expression or a formular to double the 'foo' value above.
    # Note: 
    # A formular using 'foo' expected
    foo = foo * 2
`)

const projectCode_3 = rTabs(`
    # TODO: ...
`)

export const projectsBoilerplateCode = {
    1: projectCode_1,
    2: projectCode_2,
    3: projectCode_3,
}

export const projectsCodeTarget = {
    1: { funcName: '', params: 'foo'},
    2: { },
    3: { },
}