import UserController from './user.controller'
import MemberController from './member.controller'
import TreeController from './tree.controller'
import HistoryController from './history.controller'

export default [
   new UserController(),
   new MemberController(),
   new TreeController(),
   new HistoryController()
]