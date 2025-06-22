import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'

export default class ProfileController {
  
  async show({ view }: HttpContext) {
    return view.render('pages/profile')
  }

  async update({ request, response, auth, session }: HttpContext) {
    const user = auth.user!
    
    const validator = vine.compile(
      vine.object({
        fullName: vine.string().trim().minLength(3),
        email: vine.string().email().unique(async (db, value) => {
          const exists = await db.from('users').where('email', value).whereNot('id', user.id).first()
          return !exists
        })
      })
    )
    
    const payload = await request.validateUsing(validator)
    
    user.merge(payload)
    await user.save()
    
    session.flash('success', 'Profil berhasil diperbarui.')
    return response.redirect().back()
  }
}