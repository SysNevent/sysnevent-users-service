import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { AppError } from '../../errors/AppError'
import { CreateUserervice } from '../../services/user/CreateUserService'

class CreateUserController {
  async handle(req: Request, res: Response) {
    const { name, email, role, password } = req.body
    const createUserService = new CreateUserervice()

    try {
      const result = await createUserService.execute({
        name,
        email,
        role,
        password
      })
      return res.status(StatusCodes.CREATED).json(result)
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ error: error.message })
      }

      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: 'Internal Server Error' })
    }
  }
}

export { CreateUserController }
