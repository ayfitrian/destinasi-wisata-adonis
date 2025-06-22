import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

// Auth routes don't need session checks, they handle their own logic
router.get('/login', '#controllers/auth_controller.showLogin').as('auth.showLogin')
router.post('/login', '#controllers/auth_controller.login').as('auth.login')
router.get('/register', '#controllers/auth_controller.showRegister').as('auth.showRegister')
router.post('/register', '#controllers/auth_controller.register').as('auth.register')

// All routes that might show user-specific content, but are public, go here
router.group(() => {
  router.get('/', '#controllers/pages_controller.landing').as('home')
  router.get('/jelajahi', '#controllers/pages_controller.wisataFilter').as('wisata.filter')
  router.get('/wisata/:id', '#controllers/pages_controller.wisataDetail').as('wisata.detail')
  router.get('/terpopuler', '#controllers/pages_controller.wisataTerpopuler').as('wisata.terpopuler')
}).use(middleware.silentAuth())


// All routes that require a user to be logged in go here
router.group(() => {
  router.post('/logout', '#controllers/auth_controller.logout').as('auth.logout')
  router.get('/dashboard', '#controllers/pages_controller.dashboard').as('dashboard')

  // Kategori Routes
  router.get('/kategori', '#controllers/kategoris_controller.index').as('kategori.index')
  router.post('/kategori', '#controllers/kategoris_controller.store').as('kategori.store')
  router.get('/kategori/:id/edit', '#controllers/kategoris_controller.edit').as('kategori.edit')
  router.put('/kategori/:id', '#controllers/kategoris_controller.update').as('kategori.update')
  router.delete('/kategori/:id', '#controllers/kategoris_controller.destroy').as('kategori.destroy')
  
  // Kota Routes
  router.get('/kota', '#controllers/kotas_controller.index').as('kota.index')
  router.post('/kota', '#controllers/kotas_controller.store').as('kota.store')
  router.get('/kota/:id/edit', '#controllers/kotas_controller.edit').as('kota.edit')
  router.put('/kota/:id', '#controllers/kotas_controller.update').as('kota.update')
  router.delete('/kota/:id', '#controllers/kotas_controller.destroy').as('kota.destroy')

  // Wisata (Admin) Routes
  router.get('/wisata', '#controllers/wisatas_controller.index').as('wisata.manage.index')
  router.post('/wisata', '#controllers/wisatas_controller.store').as('wisata.manage.store')
  router.get('/wisata/:id/edit', '#controllers/wisatas_controller.edit').as('wisata.manage.edit')
  router.put('/wisata/:id', '#controllers/wisatas_controller.update').as('wisata.manage.update')
  router.delete('/wisata/:id', '#controllers/wisatas_controller.destroy').as('wisata.manage.destroy')
  
  // Ulasan (Admin & User)
  router.get('/ulasan', '#controllers/ulasans_controller.index').as('ulasan.index')
  router.post('/wisata/:id/ulasan', '#controllers/ulasans_controller.store').as('ulasan.store')
  router.delete('/ulasan/:id', '#controllers/ulasans_controller.destroy').as('ulasan.destroy')
  
  // Profile
  router.get('/profile', '#controllers/profile_controller.show').as('profile.show')
  router.put('/profile', '#controllers/profile_controller.update').as('profile.update')

}).use(middleware.auth())