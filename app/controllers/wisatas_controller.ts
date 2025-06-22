import type { HttpContext } from '@adonisjs/core/http'
import Wisata from '#models/wisata'
import Kategori from '#models/kategori'
import Kota from '#models/kota'
import vine from '@vinejs/vine'

export default class WisatasController {
  
  async index({ view }: HttpContext) {
    const wisatas = await Wisata.query().preload('kota').preload('kategori')
    const kotas = await Kota.all()
    const kategoris = await Kategori.all()
    return view.render('pages/admin/wisata_index', { wisatas, kotas, kategoris })
  }

  async store({ request, response, session }: HttpContext) {
    const validator = vine.compile(
      vine.object({
        nama: vine.string().trim().minLength(3),
        deskripsi: vine.string().trim().minLength(10),
        biayaMasuk: vine.number().positive(),
        kotaId: vine.number().exists(async (db, value) => !!await db.from('kotas').where('id', value).first()),
        kategoriId: vine.number().exists(async (db, value) => !!await db.from('kategoris').where('id', value).first()),
      })
    )
    const payload = await request.validateUsing(validator)
    
    await Wisata.create(payload)
    
    session.flash('success', 'Destinasi wisata berhasil ditambahkan.')
    return response.redirect().toRoute('wisata.manage.index')
  }

  async edit({ params, view }: HttpContext) {
    const wisata = await Wisata.findOrFail(params.id)
    const kotas = await Kota.all()
    const kategoris = await Kategori.all()
    return view.render('pages/admin/wisata_edit', { wisata, kotas, kategoris })
  }

  async update({ params, request, response, session }: HttpContext) {
    const validator = vine.compile(
        vine.object({
          nama: vine.string().trim().minLength(3),
          deskripsi: vine.string().trim().minLength(10),
          biayaMasuk: vine.number().positive(),
          kotaId: vine.number().exists(async (db, value) => !!await db.from('kotas').where('id', value).first()),
          kategoriId: vine.number().exists(async (db, value) => !!await db.from('kategoris').where('id', value).first()),
        })
      )
    const payload = await request.validateUsing(validator)
    const wisata = await Wisata.findOrFail(params.id)
    
    wisata.merge(payload)
    await wisata.save()
    
    session.flash('success', 'Destinasi wisata berhasil diperbarui.')
    return response.redirect().toRoute('wisata.manage.index')
  }

  async destroy({ params, response, session }: HttpContext) {
    const wisata = await Wisata.findOrFail(params.id)
    await wisata.delete()
    
    session.flash('success', 'Destinasi wisata berhasil dihapus.')
    return response.redirect().back()
  }
}
