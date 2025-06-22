import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Wisata from '#models/wisata'

export default class Kota extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare namaKota: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Wisata)
  declare wisatas: HasMany<typeof Wisata>
}
