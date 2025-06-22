import type { HttpContext } from '@adonisjs/core/http'
import Ulasan from '#models/ulasan'
import vine from '@vinejs/vine'

export default class UlasansController {
  
  async store({ params, request, response, auth, session }: HttpContext) {
    const validator = vine.compile(
      vine.object({
        rating: vine.number().min(1).max(5),
        komentar: vine.string().trim().optional(),
      })
    )
    const payload = await request.validateUsing(validator)
    
    const user = auth.user!
    
    await Ulasan.create({
      ...payload,
      wisataId: params.id,
      userId: user.id
    })
    
    session.flash('success', 'Ulasan Anda berhasil dikirim.')
    return response.redirect().toRoute('wisata.detail', { id: params.id })
  }
}
