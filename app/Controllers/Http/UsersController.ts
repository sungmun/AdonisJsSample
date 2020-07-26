import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {schema} from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class UsersController {
  // public async index (ctx: HttpContextContract) {
  // }

  public async create (ctx: HttpContextContract) {
    const loginSchema=schema.create({
      email:schema.string(),
      password:schema.string(),
    })

    const {email, password}=await ctx.request.validate({schema:loginSchema})

    const isEmail=await User.findBy('email',email)
    if(isEmail){
      throw Error('이미 존재하는 이메일 입니다')
    }
    await User.firstOrCreate({email,password})

    const token=await ctx.auth.use('api').attempt(email,password)
    return token.toJSON()
  }

  // public async store (ctx: HttpContextContract) {
  // }
  //
  // public async show (ctx: HttpContextContract) {
  // }
  //
  // public async edit (ctx: HttpContextContract) {
  // }
  //
  // public async update (ctx: HttpContextContract) {
  // }
  //
  // public async destroy (ctx: HttpContextContract) {
  // }
  public async login (ctx:HttpContextContract){
    const loginSchema=schema.create({
      email:schema.string(),
      password:schema.string(),
    })

    const {email, password}=await ctx.request.validate({schema:loginSchema})

    // const user=await User.query().where('email',email).andWhere('password',password).firstOrFail()

    // await user.refresh()

    const token=await ctx.auth.use('api').attempt(email,password)
    return token.toJSON()
  }
}
