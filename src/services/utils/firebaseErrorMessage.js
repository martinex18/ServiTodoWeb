export const firebaseErrorMessage = (code) => {
    const errors = {
        // Auth
        "auth/invalid-credential":
            "Correo o contraseña incorrectos.",

        "auth/user-not-found":
            "No existe una cuenta con estos datos.",

        "auth/wrong-password":
            "La contraseña es incorrecta.",

        "auth/email-already-in-use":
            "Este correo ya se encuentra registrado.",

        "auth/invalid-email":
            "El correo electrónico no es válido.",

        "auth/weak-password":
            "La contraseña debe tener al menos 6 caracteres.",

        "auth/user-disabled":
            "Esta cuenta ha sido deshabilitada.",

        "auth/too-many-requests":
            "Demasiados intentos. Intenta nuevamente más tarde.",

        "auth/network-request-failed":
            "No hay conexión a internet.",

        "auth/operation-not-allowed":
            "Esta operación no está habilitada.",

        // OTP
        "auth/invalid-phone-number":
            "El número de teléfono no es válido.",

        "auth/invalid-verification-code":
            "El código de verificación es incorrecto.",

        "auth/code-expired":
            "El código ha expirado. Solicita uno nuevo.",

        "auth/missing-verification-code":
            "Debes ingresar el código de verificación.",

        "auth/quota-exceeded":
            "Se alcanzó el límite de envíos de mensajes. Intenta más tarde.",

        "auth/captcha-check-failed":
            "No fue posible validar la seguridad. Intenta nuevamente.",

        // Firestore
        "permission-denied":
            "No tienes permisos para realizar esta acción.",

        "unavailable":
            "El servicio no está disponible temporalmente.",

        "not-found":
            "No se encontró la información solicitada.",

        "already-exists":
            "La información ya existe.",

        "failed-precondition":
            "No se cumplen las condiciones necesarias para esta operación.",

        "resource-exhausted":
            "Se alcanzó el límite permitido. Intenta más tarde.",
    };

    return (
        errors[code] ||
        "Ocurrió un error inesperado. Intenta nuevamente."
    )
}