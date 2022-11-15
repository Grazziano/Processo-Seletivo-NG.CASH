import prismaClient from '../../prisma';

interface UserRequest {
  username: string;
  password: string;
}

class CreateUserService {
  async execute({ username, password }: UserRequest) {
    if (!username) throw new Error('Username is required');

    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        username: username,
      },
    });

    if (userAlreadyExists) throw new Error('User already exists');

    const account = await prismaClient.account.create({
      data: {
        balance: 100.0,
      },
    });

    const user = await prismaClient.user.create({
      data: {
        username: username,
        password: password,
        accountId: account.id,
      },
      select: {
        id: true,
        username: true,
      },
    });

    return user;
  }
}

export { CreateUserService };
