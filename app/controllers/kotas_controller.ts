import type { HttpContext } from '@adonisjs/core/http'
import Kota from '#models/kota'
import vine from '@vinejs/vine'

export default class KotasController {

  async index({ view }: HttpContext) {
    const kotas = await Kota.query().orderBy('id', 'asc')
    return view.render('pages/admin/kota_index', { kotas })
  }

  async store({ request, response, session }: HttpContext) {
    const validator = vine.compile(
      vine.object({
        namaKota: vine.string().trim().minLength(3),
      })
    )
    const payload = await request.validateUsing(validator)
    
    await Kota.create(payload)
    
    session.flash('success', 'Kota berhasil ditambahkan.')
    return response.redirect().toRoute('kota.index')
  }

  async edit({ params, view }: HttpContext) {
    const kota = await Kota.findOrFail(params.id)
    return view.render('pages/admin/kota_edit', { kota })
  }

  async update({ params, request, response, session }: HttpContext) {
    const validator = vine.compile(
      vine.object({
        namaKota: vine.string().trim().minLength(3),
      })
    )
    const payload = await request.validateUsing(validator)
    const kota = await Kota.findOrFail(params.id)
    
    kota.merge(payload)
    await kota.save()
    
    session.flash('success', 'Kota berhasil diperbarui.')
    return response.redirect().toRoute('kota.index')
  }

  async destroy({ params, response, session }: HttpContext) {
    const kota = await Kota.findOrFail(params.id)
    await kota.delete()
    
    session.flash('success', 'Kota berhasil dihapus.')
    return response.redirect().back()
  }
}
