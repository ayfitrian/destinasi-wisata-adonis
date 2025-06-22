import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Wisata from '#models/wisata'
import User from '#models/user'

export default class Ulasan extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare rating: number

  @column()
  declare komentar: string | null

  @column()
  declare wisataId: number

  @column()
  declare userId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Wisata)
  declare wisata: BelongsTo<typeof Wisata>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
