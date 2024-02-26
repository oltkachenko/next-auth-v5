'use client'

import { pathName } from "@/router/router"
import { CardWrapper } from "./CardWrapper"
import { BeatLoader } from "react-spinners"
import { useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { newVerification } from "@/actions/new-verification"
import { FormError } from "@/components/FormError"
import { FormSuccess } from "@/components/FormSuccess"

export default function NewVerificationForm() {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();


    const token = useSearchParams().get("token");

    const onSubmit = useCallback(() => {
        if (success || error) return;

        if(!token) {
            setError("Missing token!")

            return
        };
        
        newVerification(token)
            .then(data => {
                setSuccess(data.success)
                setError(data.error)
            })
            .catch(() => {
                setError("Something went wrong!")
            })
    }, [token, success, error])

    useEffect(() => {
        onSubmit()
    }, [onSubmit])

    return (
        <CardWrapper
            headerLabel="Confirming your verification"
            backButtonLabel="Back to login"
            backButtonHref={pathName.login.path}
        >
            {!success && !error && (
                <div className="flex item-center w-full justify-center mb-6">
                    <BeatLoader />
                </div>
            )}
            
            {!success && (
                <FormError message={error} />
            )}

            <FormSuccess message={success} />
        </CardWrapper>
    )
}
