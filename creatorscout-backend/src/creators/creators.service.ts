import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { QueryCreatorsDto } from './dto/query-creators.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class CreatorsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: QueryCreatorsDto) {
    const {
      q,
      niche,
      platform,
      country,
      minFollowers,
      maxFollowers,
      sortBy = 'creatorScore',
      sortOrder = 'desc',
      page = 1,
      limit = 12,
    } = query;

    const where: Prisma.CreatorWhereInput = {};

    if (q) {
      where.OR = [
        { name: { contains: q, mode: 'insensitive' } },
        { bio: { contains: q, mode: 'insensitive' } },
        { niche: { contains: q, mode: 'insensitive' } },
      ];
    }

    if (niche) {
      where.niche = { equals: niche, mode: 'insensitive' };
    }

    if (platform) {
      where.platform = { equals: platform, mode: 'insensitive' };
    }

    if (country) {
      where.audienceCountry = { contains: country, mode: 'insensitive' };
    }

    if (minFollowers !== undefined || maxFollowers !== undefined) {
      where.followerCount = {};
      if (minFollowers !== undefined) where.followerCount.gte = minFollowers;
      if (maxFollowers !== undefined) where.followerCount.lte = maxFollowers;
    }

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.creator.findMany({
        where,
        orderBy: { [sortBy]: sortOrder },
        skip,
        take: limit,
      }),
      this.prisma.creator.count({ where }),
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string) {
    const creator = await this.prisma.creator.findUnique({ where: { id } });

    if (!creator) {
      throw new NotFoundException(`Creator with id "${id}" not found`);
    }

    return creator;
  }
}
