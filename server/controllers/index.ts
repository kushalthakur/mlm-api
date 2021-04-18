import UserController from './user.controller'
import MemberController from './member.controller'
import HistoryController from './history.controller'

export default [
   new UserController(),
   new MemberController(),
   new HistoryController()
]