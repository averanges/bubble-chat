import userService from "../service/userService.js"

class authController {
    signup = async (req,res) => {
            try {
            const data = req.body
            const user = await userService.signup(data)
            req.session.userId = user.id
            return res.json(user)   
    } catch (error) {
            return res.status(400).json({error: error.message})   
    }
    }
    login = async (req, res) => {
        try {
            const data = req.body
            const user = await userService.login(data)
            req.session.userId = user.id
            return res.json(user)   
        } catch (error) {
            return res.status(400).json({error: error.message})   
        }
    }
}

export default new authController()