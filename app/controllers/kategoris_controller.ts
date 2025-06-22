import type { HttpContext } from '@adonisjs/core/http'
import Kategori from '#models/kategori'
import vine from '@vinejs/vine'

export default class KategorisController {
  
  async index({ view }: HttpContext) {
    const kategoris = await Kategori.query().orderBy('id', 'asc')
    return view.render('pages/admin/kategori_index', { kategoris })
  }
  
  async store({ request, response, session }: HttpContext) {
    const validator = vine.compile(
      vine.object({
        namaKategori: vine.string().trim().minLength(3),
      })
    )
    const payload = await request.validateUsing(validator)
    
    await Kategori.create(payload)
    
    session.flash('success', 'Kategori berhasil ditambahkan.')
    return response.redirect().toRoute('kategori.index')
  }

  async edit({ params, view }: HttpContext) {
    const kategori = await Kategori.findOrFail(params.id)
    return view.render('pages/admin/kategori_edit', { kategori })
  }

  async update({ params, request, response, session }: HttpContext) {
    const validator = vine.compile(
      vine.object({
        namaKategori: vine.string().trim().minLength(3),
      })
    )
    const payload = await request.validateUsing(validator)
    const kategori = await Kategori.findOrFail(params.id)
    
    kategori.merge(payload)
    await kategori.save()
    
    session.flash('success', 'Kategori berhasil diperbarui.')
    return response.redirect().toRoute('kategori.index')
  }

  async destroy({ params, response, session }: HttpContext) {
    const kategori = await Kategori.findOrFail(params.id)
    await kategori.delete()
    
    session.flash('success', 'Kategori berhasil dihapus.')
    return response.redirect().back()
  }
}