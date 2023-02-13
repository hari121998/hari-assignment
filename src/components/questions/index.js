import {v4 as uuidv4} from 'uuid'

const zero = (value = [0, 0]) => {
  switch (value[0]) {
    case 'times':
      return 0 * value[1]
    case 'minus':
      return 0 - value[1]
    case 'plus':
      return 0 + value[1]
    case 'dividedBy':
      return Math.floor(0 / value[1])
    default:
      return 0
  }
}

const one = (value = [0, 0]) => {
  switch (value[0]) {
    case 'times':
      return 1 * value[1]
    case 'minus':
      return 1 - value[1]
    case 'plus':
      return 1 + value[1]
    case 'dividedBy':
      return Math.floor(1 / value[1])
    default:
      return 1
  }
}

const two = (value = [0, 0]) => {
  switch (value[0]) {
    case 'times':
      return 2 * value[1]
    case 'minus':
      return 2 - value[1]
    case 'plus':
      return 2 + value[1]
    case 'dividedBy':
      return Math.floor(2 / value[1])
    default:
      return 2
  }
}

const three = (value = [0, 0]) => {
  switch (value[0]) {
    case 'times':
      return 3 * value[1]
    case 'minus':
      return 3 - value[1]
    case 'plus':
      return 3 + value[1]
    case 'dividedBy':
      return Math.floor(3 / value[1])
    default:
      return 3
  }
}

const four = (value = [0, 0]) => {
  switch (value[0]) {
    case 'times':
      return 4 * value[1]
    case 'minus':
      return 4 - value[1]
    case 'plus':
      return 4 + value[1]
    case 'dividedBy':
      return Math.floor(4 / value[1])
    default:
      return 4
  }
}

const five = (value = [0, 0]) => {
  switch (value[0]) {
    case 'times':
      return 5 * value[1]
    case 'minus':
      return 5 - value[1]
    case 'plus':
      return 5 + value[1]
    case 'dividedBy':
      return Math.floor(5 / value[1])
    default:
      return 5
  }
}

const six = (value = [0, 0]) => {
  switch (value[0]) {
    case 'times':
      return 6 * value[1]
    case 'minus':
      return 6 - value[1]
    case 'plus':
      return 6 + value[1]
    case 'dividedBy':
      return Math.floor(6 / value[1])
    default:
      return 6
  }
}
const seven = (value = [0, 0]) => {
  switch (value[0]) {
    case 'times':
      return 7 * value[1]
    case 'minus':
      return 7 - value[1]
    case 'plus':
      return 7 + value[1]
    case 'dividedBy':
      return Math.floor(7 / value[1])
    default:
      return 7
  }
}
const eight = (value = [0, 0]) => {
  switch (value[0]) {
    case 'times':
      return 8 * value[1]
    case 'minus':
      return 8 - value[1]
    case 'plus':
      return 8 + value[1]
    case 'dividedBy':
      return Math.floor(8 / value[1])
    default:
      return 8
  }
}
const nine = (value = [0, 0]) => {
  switch (value[0]) {
    case 'times':
      return 9 * value[1]
    case 'minus':
      return 9 - value[1]
    case 'plus':
      return 9 + value[1]
    case 'dividedBy':
      return Math.floor(9 / value[1])
    default:
      return 9
  }
}

const times = x => ['times', x]

const plus = x => ['plus', x]

const minus = x => ['minus', x]

const dividedBy = x => ['dividedBy', x]

const masterQuestions = [
  {
    id: uuidv4(),
    displayText: '7 multiplied by 5',
    displayAnswer: seven(times(five())),
    isAnswered: false,
  },
  {
    id: uuidv4(),
    displayText: 'Addition of Four and Nine',
    displayAnswer: four(plus(nine())),
    isAnswered: false,
  },
  {
    id: uuidv4(),
    displayText: 'Eight subtracted by Three',
    displayAnswer: eight(minus(three())),
    isAnswered: false,
  },
  {
    id: uuidv4(),
    displayText: 'Six divided By Two',
    displayAnswer: six(dividedBy(two())),
    isAnswered: false,
  },

  {
    id: uuidv4(),
    displayText: 'zero divided by one',
    displayAnswer: zero(dividedBy(one())),
    isAnswered: false,
  },
  {
    id: uuidv4(),
    displayText: 'Addition of Eight and Four',
    displayAnswer: eight(plus(four())),
    isAnswered: false,
  },
  {
    id: uuidv4(),
    displayText: 'Six subtracted by Two',
    displayAnswer: six(minus(two())),
    isAnswered: false,
  },
]
const checkQuestions = localStorage.getItem('questions')

if (checkQuestions === null) {
  const parsedMasterQuestions = JSON.stringify(masterQuestions)
  localStorage.setItem('questions', parsedMasterQuestions)
}
export {
  masterQuestions,
  zero,
  one,
  two,
  three,
  four,
  five,
  six,
  seven,
  eight,
  nine,
  times,
  plus,
  minus,
  dividedBy,
}
