import { Test, TestingModule } from '@nestjs/testing';
import { CreatorsService } from './creators.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

const mockCreators = [
  {
    id: '11111111-1111-1111-1111-111111111111',
    name: 'Alice Tech',
    platform: 'YouTube',
    niche: 'Technology',
    bio: 'A tech creator',
    followerCount: 500000,
    engagementRate: 5.5,
    audienceCountry: 'USA',
    avatarUrl: 'https://i.pravatar.cc/300?img=1',
    creatorScore: 120,
    verified: true,
    recentContent: ['Gadget Review', 'Tech Tips'],
    createdAt: new Date(),
  },
  {
    id: '22222222-2222-2222-2222-222222222222',
    name: 'Bob Gaming',
    platform: 'Instagram',
    niche: 'Gaming',
    bio: 'A gaming creator',
    followerCount: 200000,
    engagementRate: 8.1,
    audienceCountry: 'UK',
    avatarUrl: 'https://i.pravatar.cc/300?img=2',
    creatorScore: 145,
    verified: false,
    recentContent: ['Epic Gameplay', 'Pro Tips'],
    createdAt: new Date(),
  },
];

const mockPrisma = {
  creator: {
    findMany: jest.fn(),
    count: jest.fn(),
    findUnique: jest.fn(),
  },
};

describe('CreatorsService', () => {
  let service: CreatorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreatorsService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<CreatorsService>(CreatorsService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  describe('findAll', () => {
    it('returns paginated creators with no filters', async () => {
      mockPrisma.creator.findMany.mockResolvedValue(mockCreators);
      mockPrisma.creator.count.mockResolvedValue(2);

      const result = await service.findAll({ page: 1, limit: 12 });

      expect(result.data).toHaveLength(2);
      expect(result.total).toBe(2);
      expect(result.page).toBe(1);
      expect(result.totalPages).toBe(1);
      expect(mockPrisma.creator.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ skip: 0, take: 12 }),
      );
    });

    it('builds a keyword search WHERE clause when q is provided', async () => {
      mockPrisma.creator.findMany.mockResolvedValue([mockCreators[0]]);
      mockPrisma.creator.count.mockResolvedValue(1);

      await service.findAll({ q: 'tech', page: 1, limit: 12 });

      const call = mockPrisma.creator.findMany.mock.calls[0][0];
      expect(call.where.OR).toBeDefined();
      expect(call.where.OR[0]).toEqual(
        expect.objectContaining({
          name: { contains: 'tech', mode: 'insensitive' },
        }),
      );
    });

    it('filters by niche when niche is provided', async () => {
      mockPrisma.creator.findMany.mockResolvedValue([mockCreators[0]]);
      mockPrisma.creator.count.mockResolvedValue(1);

      await service.findAll({ niche: 'Technology', page: 1, limit: 12 });

      const call = mockPrisma.creator.findMany.mock.calls[0][0];
      expect(call.where.niche).toEqual({
        equals: 'Technology',
        mode: 'insensitive',
      });
    });

    it('filters by platform when platform is provided', async () => {
      mockPrisma.creator.findMany.mockResolvedValue([mockCreators[0]]);
      mockPrisma.creator.count.mockResolvedValue(1);

      await service.findAll({ platform: 'YouTube', page: 1, limit: 12 });

      const call = mockPrisma.creator.findMany.mock.calls[0][0];
      expect(call.where.platform).toEqual({
        equals: 'YouTube',
        mode: 'insensitive',
      });
    });

    it('applies follower range filters when minFollowers/maxFollowers are provided', async () => {
      mockPrisma.creator.findMany.mockResolvedValue(mockCreators);
      mockPrisma.creator.count.mockResolvedValue(2);

      await service.findAll({
        minFollowers: 100000,
        maxFollowers: 600000,
        page: 1,
        limit: 12,
      });

      const call = mockPrisma.creator.findMany.mock.calls[0][0];
      expect(call.where.followerCount).toEqual({ gte: 100000, lte: 600000 });
    });

    it('computes correct pagination skip when page > 1', async () => {
      mockPrisma.creator.findMany.mockResolvedValue([]);
      mockPrisma.creator.count.mockResolvedValue(24);

      await service.findAll({ page: 3, limit: 8 });

      const call = mockPrisma.creator.findMany.mock.calls[0][0];
      expect(call.skip).toBe(16);
      expect(call.take).toBe(8);
    });
  });


  describe('findOne', () => {
    it('returns a creator when id exists', async () => {
      mockPrisma.creator.findUnique.mockResolvedValue(mockCreators[0]);

      const result = await service.findOne(
        '11111111-1111-1111-1111-111111111111',
      );

      expect(result).toEqual(mockCreators[0]);
      expect(mockPrisma.creator.findUnique).toHaveBeenCalledWith({
        where: { id: '11111111-1111-1111-1111-111111111111' },
      });
    });

    it('throws NotFoundException when id does not exist', async () => {
      mockPrisma.creator.findUnique.mockResolvedValue(null);

      await expect(
        service.findOne('00000000-0000-0000-0000-000000000000'),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
