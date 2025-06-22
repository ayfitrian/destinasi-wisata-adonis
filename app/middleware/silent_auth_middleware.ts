import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

/**
 * Silent auth middleware can be used to authenticate users
 * but not raise an exception when the user is not logged-in
 */
export default class SilentAuthMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    /**
     * Check if user is logged-in or not. If not, then
     * a `null` value will be assigned to `ctx.auth.user`
     */
    await ctx.auth.check()

    /**
     * Call next method in the pipeline
     */
    return next()
  }
}