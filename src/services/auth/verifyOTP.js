export const verifyOTP = async (confirmationCode, code) => {
    try{
        const result = await confirmationCode.confirm(code);

        return{ success: true, user: result.user };
    } catch (error) {
        console.error("Error verificando OTP:", error);
        return { success: false, message: error.message };
    }
}