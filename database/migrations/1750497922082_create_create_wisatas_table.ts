import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'wisatas'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('nama').notNullable()
      table.text('deskripsi').notNullable()
      table.decimal('biaya_masuk', 12, 2).notNullable()
      
      table.integer('kota_id').unsigned().references('id').inTable('kotas').onDelete('CASCADE')
      table.integer('kategori_id').unsigned().references('id').inTable('kategoris').onDelete('CASCADE')

      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}