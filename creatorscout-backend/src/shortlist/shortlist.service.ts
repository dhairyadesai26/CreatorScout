import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddToShortlistDto } from './dto/add-to-shortlist.dto';

@Injectable()
export class ShortlistService {
  constructor(private readonly prisma: PrismaService) {}

  async getShortlist(userId: string) {
    const entries = await this.prisma.shortlist.findMany({
      where: { userId },
      include: { creator: true },
      orderBy: { createdAt: 'desc' },
    });

    return entries.map((e) => ({
      shortlistId: e.id,
      addedAt: e.createdAt,
      creator: e.creator,
    }));
  }

  async addToShortlist(userId: string, dto: AddToShortlistDto) {
    const creator = await this.prisma.creator.findUnique({
      where: { id: dto.creatorId },
    });

    if (!creator) {
      throw new NotFoundException(`Creator "${dto.creatorId}" not found`);
    }

    const existing = await this.prisma.shortlist.findUnique({
      where: { userId_creatorId: { userId, creatorId: dto.creatorId } },
    });

    if (existing) {
      throw new ConflictException('Creator is already in your shortlist');
    }

    const entry = await this.prisma.shortlist.create({
      data: { userId, creatorId: dto.creatorId },
      include: { creator: true },
    });

    return {
      shortlistId: entry.id,
      addedAt: entry.createdAt,
      creator: entry.creator,
    };
  }

  async removeFromShortlist(userId: string, creatorId: string) {
    const entry = await this.prisma.shortlist.findUnique({
      where: { userId_creatorId: { userId, creatorId } },
    });

    if (!entry) {
      throw new NotFoundException('Creator is not in your shortlist');
    }

    await this.prisma.shortlist.delete({ where: { id: entry.id } });

    return { message: 'Creator removed from shortlist', creatorId };
  }
}
