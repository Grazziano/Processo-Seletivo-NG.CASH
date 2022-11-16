import prismaClient from '../../prisma';

class TransactionsUserService {
  async execute(userId: string) {
    const user = await prismaClient.user.findFirst({ where: { id: userId } });

    const transactionsOut = await prismaClient.transaction.findMany({
      where: { debitedAccountId: user.accountId },
    });

    const transactionsIn = await prismaClient.transaction.findMany({
      where: { creditedAccountId: user.accountId },
    });

    return { debited: transactionsOut, credited: transactionsIn };
  }
}

export { TransactionsUserService };
