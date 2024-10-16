interface PollOption {
  _id: number
  text: string
  amount: number
  betters: string[]
}

interface User {
  _id: number
  name: string
  password: string
  beans: number
  wins: number
  email: string
  reputation: number
  avatar?: string
}

interface Poll {
  _id: number
  creator: string
  creatorId: string
  title: string
  description: string
  endDate: Date
  options: PollOption[]
  status: string
}
