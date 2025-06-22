import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Ulasan from '#models/ulasan'
import hash from '@adonisjs/core/services/hash'
import { Exception } from '@adonisjs/core/exceptions'


export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare fullName: string

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Ulasan)
  declare ulasans: HasMany<typeof Ulasan>

  // --- PERBAIKAN DIMULAI DI SINI ---
  /**
   * Metode untuk memverifikasi kredensial pengguna
   */
  static async verifyCredentials(email: string, password_plain: string) {
    const user = await User.findBy('email', email)

    // Jika pengguna tidak ditemukan, lempar exception
    if (!user) {
      throw new Exception('Email atau password salah.', {
        status: 400,
        code: 'E_INVALID_CREDENTIALS'
      })
    }

    // Verifikasi password yang di-hash
    if (!(await hash.verify(user.password, password_plain))) {
      throw new Exception('Email atau password salah.', {
        status: 400,
        code: 'E_INVALID_CREDENTIALS'
      })
    }

    return user
  }
  // --- PERBAIKAN SELESAI DI SINI ---
}