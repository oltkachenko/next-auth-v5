import { pathName } from "./router/router"

export const publicRoutes = [
    pathName.home.path,
    pathName["new-verification"].path
]

export const authRoutes = [
    pathName.login.path,
    pathName.register.path,
    pathName.error.path,
    pathName.reset.path,
    pathName["new-password"].path
]

export const apiAuthPrefix = "/api/auth"

export const DEFAULT_LOGIN_REDIRECT = pathName.settings.path