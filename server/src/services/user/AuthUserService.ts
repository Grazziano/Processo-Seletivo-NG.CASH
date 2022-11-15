import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import prismaClient from '../../prisma';

interface AuthRequest {
  username: string;
  password: string;
}

class AuthUserService {
  async execute({ username, password }: AuthRequest) {
    const user = await prismaClient.user.findFirst({
      where: { username: username },
    });

    if (!user) throw new Error('User not found');

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) throw new Error('Password incorrect');

    const token = sign(
      {
        username: user.username,
        id: user.id,
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: '24h',
      }
    );

    return { id: user.id, username: user.username, token };
  }
}

export { AuthUserService };
