import prismaClient from '../../prisma';

class DetailUserService {
  async execute(user_id: string) {
    const user = await prismaClient.user.findFirst({
      where: { id: user_id },
      select: {
        id: true,
        username: true,
        accountId: true,
      },
    });

    const account = await prismaClient.account.findFirst({
      where: { id: user.accountId },
      select: {
        balance: true,
      },
    });

    return { ...user, ...account };
  }
}

export { DetailUserService };
