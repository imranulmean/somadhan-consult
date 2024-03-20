export const ROOT_ROUTE = '/'
export const LOGIN_ROUTE = '/login'
export const SIGNUP_ROUTE = '/signup'
export const PROFILE_ROUTE = '/profile'
export const GUEST_APPOINTMENT_ROUTE = '/appointment'
export const APPOINTMENT_ROUTE = '/appointment/:appointmentId'
export const APPOINTMENT_FINISH_ROUTE = '/appointment/:appointmentId/finish'
export const PROVIDERS_ROUTE = '/providers'
export const PROVIDER_ROUTE = '/providers/:providerId'
export const HISTORY_ROUTE = '/history'
export const EXPERTS_ROUTE = '/experts'
export const HOME_ROUTE = '/home'
export const ASKNOW_ROUTE = '/asknow'
export const PUBLIC_ROUTES = [LOGIN_ROUTE, SIGNUP_ROUTE]


export type Routes =
  | typeof ROOT_ROUTE
  | typeof LOGIN_ROUTE
  | typeof PROFILE_ROUTE
  | typeof APPOINTMENT_ROUTE
  | typeof PROVIDERS_ROUTE
  | typeof HISTORY_ROUTE
  | typeof EXPERTS_ROUTE
  | typeof HOME_ROUTE
  | typeof ASKNOW_ROUTE
