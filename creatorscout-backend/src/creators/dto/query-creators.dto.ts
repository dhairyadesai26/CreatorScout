import {
  IsOptional,
  IsString,
  IsEnum,
  IsInt,
  IsIn,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';

export class QueryCreatorsDto {

  @IsOptional()
  @IsString()
  q?: string;

  @IsOptional()
  @IsString()
  niche?: string;

  @IsOptional()
  @IsEnum(['YouTube', 'Instagram'])
  platform?: 'YouTube' | 'Instagram';

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  minFollowers?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  maxFollowers?: number;

  @IsOptional()
  @IsIn(['followerCount', 'engagementRate', 'creatorScore', 'createdAt'])
  sortBy?: 'followerCount' | 'engagementRate' | 'creatorScore' | 'createdAt';

  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc';

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  limit?: number = 12;
}
