import bcrypt from 'bcryptjs'
import nodeMailer from 'nodemailer'
import { Validator } from 'node-input-validator'
import { Environment } from '../environment'

// 
export const bcryptJs = (password: string, hash: any, callback: Function) => {
   bcrypt.compare(password, hash, (err: any, isMatch: any) => {
      if (err) {
         callback(err, false)
      } else {
         callback(null, isMatch)
      }
   })
}


// nodemailer transport
let smtpTransport: any = nodeMailer.createTransport({
   // service: "gmail",
   host: Environment.SMTP_HOST,
   port: 465,
   secure: true,
   auth: {
      user: Environment.SMTP_USERNAME,
      pass: Environment.SMTP_PASSWORD
   }
})
// send mail using smtp nodemailer
export const sendMail = async () => {
   smtpTransport.verify((err: any, success: any) => {
      if (err) {
         console.log('err', err)
      } else {
         console.log('success', success)
      }
   })
}
// validation
export const Validation = (keys: Array<any>, body: object) => {
   let obj: any = {}
   keys.forEach((key: any) => {
      if (key === 'email') {
         obj['email'] = 'required|email'
      } else if (key === 'sponsorId') {
         obj['sponsorId'] = 'required|minLength:8|maxLength:8'
      } else if (key === 'phone') {
         obj['phone'] = 'integer|minLength:10|maxLength:10'
      } else if (key === 'userId') {
         obj['userId'] = 'required|integer'
      } else {
         obj[key] = 'required'
      }
   })
   return new Validator(body, obj)
}





// Object Traversal in JavaScript
// We will traverse this horse object and its method
const horse: any = {
   color: "Black",
   name: "Chetan",
   behaviour: {
      actionTypes: {
         moveMethod: ["Twist", "Jump", "Run"],
         twistAction() {
            console.log('Moved now')
         },
         jumpAction() {
            console.log('Jumped now')
         }
      },
      mood: "angry",
      ears: "closed"
   }
}
const traverseObj = (horse: any) => {
   for (let prop in horse) {
      if (typeof horse[prop] === 'object') {
         traverseObj(horse[prop])
      } else if (typeof horse[prop] === 'function') {
         horse[prop]()
      } else {
         console.log(horse[prop])
      }
   }
}
// traverseObj(horse)