// src/services/inviteService.js
import api from '../axios.js'

/**
 * Envia um convite de acesso à plataforma para o e-mail informado.
 * POST /invites
 * @param {string} email - E-mail do convidado
 */
export const sendInvite = (email) => api.post('/invites', { email })

/**
 * Lista todos os convites enviados pelo usuário autenticado.
 * GET /invites
 */
export const getInvites = () => api.get('/invites')

/**
 * Cancela/revoga um convite já enviado.
 * DELETE /invites/:id
 * @param {string|number} id - ID do convite
 */
export const cancelInvite = (id) => api.delete(`/invites/${id}`)

/**
 * Reenviar o e-mail de convite para um convite já existente.
 * POST /invites/:id/resend
 * @param {string|number} id - ID do convite
 */
export const resendInvite = (id) => api.post(`/invites/${id}/resend`)
