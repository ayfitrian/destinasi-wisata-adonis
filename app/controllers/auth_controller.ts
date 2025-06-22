import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'
import hash from '@adonisjs/core/services/hash'

export default class AuthController {
  
  showLogin({ view }: HttpContext) {
    return view.render('pages/auth/login')
  }
  
  async login({ request, response, auth, session }: HttpContext) {
    const validator = vine.compile(
      vine.object({
        email: vine.string().email(),
        password: vine.string(),
      })
    )
    const payload = await request.validateUsing(validator)
    
    try {
      const user = await User.verifyCredentials(payload.email, payload.password)
      await auth.use('web').login(user)
      return response.redirect().toRoute('dashboard')
    } catch (error) {
      session.flash({ error: 'Email atau password salah.' })
      return response.redirect().back()
    }
  }

  showRegister({ view }: HttpContext) {
    return view.render('pages/auth/register')
  }

  async register({ request, response, auth }: HttpContext) {
    const validator = vine.compile(
      vine.object({
        fullName: vine.string().minLength(3),
        email: vine.string().email().unique(async (db, value) => {
          const user = await db.from('users').where('email', value).first()
          return !user
        }),
        password: vine.string().minLength(8).confirmed(),
      })
    )
    const payload = await request.validateUsing(validator)
    
    payload.password = await hash.make(payload.password)
    const user = await User.create(payload)
    await auth.use('web').login(user)

    return response.redirect().toRoute('dashboard')
  }

  async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect().toRoute('home')
  }
}