import React from 'react'
import { pathName } from '@/router/router'
import { CardWrapper } from '@/components/auth/CardWrapper'

export function ErrorCard() {
    return (
        <CardWrapper
            headerLabel='Oops! Something went wrong!'
            backButtonLabel='Back to login'
            backButtonHref={pathName.login.path}
        />
    )
}
