import { rTabs } from '../utils/StrUtil'

const projectCode_1 = rTabs(`
    troops_amount = 20  # DO NOT TOUCH THIS LINE!
    # Note: 
    # make an expression to double the troops_amount variable value:
    # troops_amount = troops_amount * 2
`)

const projectCode_2 = rTabs(`
    # Mission Brief:
    # Ola is being trapped in the lava valley! 
    # Your mission is to help him out of there!
    #
    # actions available: 
    # walk(1)
    # jump(1)
    # pivot()
    # 
    # How to control player:
    # walk: RIGHT ARROW KEY
    # jump: UP ARROW KEY
    #
    # lets get started with:
    walk(1)
`)

const projectCode_3 = rTabs(`
    # Mission Brief:
    # A bridge is missing some bricks which are represented by '1', 
    # make up for it to pass safely!
    # 
    bridge = [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0]
    # lets get started with repairing first space:
    bridge[1] = 1
    # now your turn to fill other spaces:
`)

const projectCode_4 = rTabs(`
    # The robot's name is saved in variable 'myName':
    # myName = "**ILLOU"
    #
    # Mission Brief:
    # The robot could not recall his name recorded in a variable <myName> above, 
    # help him to figure it out the first two letters.
    # 
    # Tips:
    # First two letter of his name is missing, you are expected to use
    # string slice method to extract the real value of '**' from <myName>!
    # 
    # Now, write you solution to replace the 'None' below:
    firstTwoChars = None
`)

const projectCode_5 = rTabs(`
    # There are two box holding the answer of the Sphinx famous question:
    # green_box = "********"
    # red_box = "########"
    #
    # Mission Brief:
    # first, you need to know the right anwser, 
    # then you need to know how to check the two box with "if" statement,
    # if the two box contain the key word of right anwser, return the box!
    #
    # Tips:
    # key word may use 'person', :)
    # lets first create a placeholder for your anwser,
    # check two box variables, asign the right one to the 'the_right_box':
    the_right_box = None
`)


const projectCode_6 = rTabs(`
    # Assume you have Soldier definition like this:
    # class Soldier:
    #    def addPower(self, ability):
    #        self.ability = ability
    #
    # also a squad of uncertain number soldiers under your control:
    # troops = [soldier, soldier, soldier, ...soldier]
    #
    # Mission Brief:
    # Your troops are being trapped in toxic valley, you need to dispatch
    # flying armor for each of them to get out of there!
    #
    # Tips:
    # Every soldier in your 'troops' need 'flying' ability to escapge
    # valley, loop the 'troops' list through 'for ... in' statement, 
    # get each soldier and call its 'addPower' function by:
    # soldier.addPower('flying').
    # 
    # lets check out our 'troops' list by a loop processing:
    
`)

const projectCode_7 = rTabs(`
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

`)

const projectCode_8 = rTabs(`
    # Assume you have two groups of stones which are flying constantly:
    # yellow_stones = [*, *, *, *]
    # red_stones = [*, *, *, *]
    # Each 'stone' in that group actually is one of the alphabet
    #
    # Mission Brief:
    # To reach the exit, you need to
    # 1. have 'yellow_stones' sorted in ascending order,
    # 2. have 'red_stones' sorted in descending order,
    # 3. add two group stones into one list 'bridge_stones' below
    #
    # Tips:
    # Remember to jump and hit the key to unlock the door.
    #
    # connect ascending yellow_stones and descending red_stones into:
    bridge_stones = None
    # lets first hack two groups of stones:
`)

const projectCode_9 = rTabs(`
    # To fix the clock, here is a starting point to figure out current time:
    from datetime import datetime
    now = datetime.now()
    #
    # Mission Brief:
    # You have a 'now' object to use, 
    # get the 'hour', 'minute', 'second' value from it!
    #
    # Tips:
    # visit this tutorial to find the clue:
    # https://www.geeksforgeeks.org/python-datetime-datetime-class/
    # Search: Example 2: Accessing the attributes of date and time object
    # 
    # lets define empty variables to be replaced with your solutions,
    # utilize the 'now' object above to get these values:
    hour = None
    minute = None
    second = None
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
    },
    2: {
        projName: 'Lava Adventure',
        codeType: 'actions',
        params: '',
        expect: [{walk: 1}, {jump: 1}, {walk: 1}, {jump: 1}, {walk: 1}, {pivot: 0}],
    },
    3: {
        projName: 'Missing bricks',
        codeType: 'statements',
        params: 'bridge',
        expect: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    },
    4: {
        projName: 'Guess My Name',
        codeType: 'statements', 
        params: 'firstTwoChars', 
        expect: 'CA',
    },
    5: {
        projName: 'Riddle of Sphinx',
        codeType: 'statements',
        params: 'the_right_box',
        expect: 'a person'
    },
    6: {
        projName: 'Free Your Troops',
        codeType: 'statements',
        params: 'troops',
        expect: [
            {ability: 'flying'}, {ability: 'flying'}, {ability: 'flying'},
            {ability: 'flying'}, {ability: 'flying'}, {ability: 'flying'},
            {ability: 'flying'}, {ability: 'flying'}, {ability: 'flying'},
            {ability: 'flying'}, {ability: 'flying'}, {ability: 'flying'},
        ]
    },
    7: {
        projName: 'Which way to go',
        codeType: 'statements',
        params: 'right_path',
        expect: {id: 4}
    },
    8: {
        projName: 'Pass live bridge',
        codeType: 'statements',
        params: 'bridge_stones',
        expect: ['a', 'b', 'c', 'd', 'h', 'g', 'f', 'e']
    },
    9: {
        projName: 'Fix the clock',
        codeType: 'solutions_clock',
        params: 'hour,minute,second',
        expect: [true, true, true]
    },
}
