import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Kota from '#models/kota'
import Kategori from '#models/kategori'
import Ulasan from '#models/ulasan'

export default class Wisata extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nama: string

  @column()
  declare deskripsi: string

  @column()
  declare biayaMasuk: number

  @column()
  declare kotaId: number

  @column()
  declare kategoriId: number
  
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Kota)
  declare kota: BelongsTo<typeof Kota>

  @belongsTo(() => Kategori)
  declare kategori: BelongsTo<typeof Kategori>

  @hasMany(() => Ulasan)
  declare ulasans: HasMany<typeof Ulasan>
}
