import prismaClient from '../../prisma';

interface ITransaction {
  username: string;
  value: number;
  userId: string;
}

class CashOutTransactionService {
  async execute({ username, value, userId }: ITransaction) {
    if (!username || !value) throw new Error('Invalid data');

    const user = await prismaClient.user.findFirst({ where: { id: userId } });

    const userToTransfer = await prismaClient.user.findFirst({
      where: { username },
    });

    if (userToTransfer.id === userId) {
      throw new Error('Unable to transfer to yourself');
    }

    const accountFrom = await prismaClient.account.findFirst({
      where: { id: user.accountId },
    });

    if (accountFrom.balance < value) {
      throw new Error('Unable to complete transfer. Insufficient funds');
    }

    const cashOut = await prismaClient.account.update({
      where: { id: user.accountId },
      data: { balance: accountFrom.balance - value },
    });

    const accountTo = await prismaClient.account.findFirst({
      where: { id: userToTransfer.accountId },
    });

    const cashIn = await prismaClient.account.update({
      where: { id: userToTransfer.accountId },
      data: { balance: accountTo.balance + value },
    });

    await prismaClient.transaction.create({
      data: {
        debitedAccountId: cashOut.id,
        creditedAccountId: cashIn.id,
        value: value,
      },
    });

    return { message: 'Transfer completed successfully' };
  }
}

export { CashOutTransactionService };
