export const checkSession = (req, res, next) => {
    try {
        const authCookie = req.cookies['authSession'];
        if (!authCookie) {
           throw new Error('User session is expired. Please, sign in again.')
        }
    } catch (error) {
        return res.status(401).json({error: error.message})
    }
    next();
}