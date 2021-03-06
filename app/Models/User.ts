import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import Encryption from '@ioc:Adonis/Core/Encryption'
export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email:string

  @column({
    serializeAs:null,
    prepare:value=>Encryption.encrypt(value),
    consume:value=>Encryption.decrypt(value),
  })
  public password:string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
