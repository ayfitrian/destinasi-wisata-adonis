import type { HttpContext } from '@adonisjs/core/http'
import Wisata from '#models/wisata'
import Kota from '#models/kota'
import db from '@adonisjs/lucid/services/db'

export default class PagesController {
  
  async landing({ view }: HttpContext) {
    return view.render('pages/landing')
  }
  
  async dashboard({ view }: HttpContext) {
    return view.render('pages/dashboard')
  }
  
  async wisataDetail({ params, view }: HttpContext) {
    const wisata = await Wisata.query()
      .where('id', params.id)
      .preload('kota')
      .preload('kategori')
      .preload('ulasans', (query) => {
        query.preload('user').orderBy('created_at', 'desc')
      })
      .firstOrFail()
      
    return view.render('pages/wisata_detail', { wisata })
  }

  async wisataFilter({ request, view }: HttpContext) {
    const { filterKota, filterBiaya } = request.qs()
    const kotas = await Kota.all()

    const query = Wisata.query().preload('kota').preload('kategori')

    if (filterKota) {
      query.where('kota_id', filterKota)
    }

    if (filterBiaya) {
      query.where('biaya_masuk', '<=', filterBiaya)
    }

    const wisatas = await query.orderBy('created_at', 'desc')
    
    return view.render('pages/wisata_filter', { wisatas, kotas, filterKota, filterBiaya })
  }

  async wisataTerpopuler({ view }: HttpContext) {
    const wisatas = await Wisata.query()
      .join('ulasans', 'wisatas.id', 'ulasans.wisata_id')
      .select('wisatas.*')
      .select(db.raw('AVG(ulasans.rating) as avg_rating'))
      .groupBy('wisatas.id')
      .orderBy('avg_rating', 'desc')
      .preload('kota')
      .preload('kategori')
      .limit(10)
    
    return view.render('pages/wisata_terpopuler', { wisatas })
  }
}