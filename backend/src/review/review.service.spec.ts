import { Test, TestingModule } from '@nestjs/testing';
import { ReviewService, ReviewType } from './review.service';
import { PrismaService } from '../prisma/prisma.service';
import {
  BadRequestException,
  ForbiddenException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ValoracionUsuario, ValoracionPropiedad } from '@prisma/client';
import {
  CreateUserReviewDTO,
  CreateHomeStayReviewDTO,
  ModifyReviewDTO,
  DeleteReviewDTO,
  GetReviewBatch,
} from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

describe('ReviewService', () => {
  const mockUserReviews: ValoracionUsuario[] = [
    {
      fechaCreacion: new Date(),
      estaActivo: true,
      descripcion: 'descripcion',
      puntuacion: 5,
      usuarioCreadorId: 1,
      usuarioCriticadoId: 2,
    },
    {
      fechaCreacion: new Date(),
      estaActivo: true,
      descripcion: 'descripcion',
      puntuacion: 4,
      usuarioCreadorId: 2,
      usuarioCriticadoId: 1,
    },
  ];

  const mockHomeStayReviews: ValoracionPropiedad[] = [
    {
      fechaCreacion: new Date(),
      estaActivo: true,
      descripcion: 'descripcion',
      puntuacion: 5,
      usuarioCreadorId: 1,
      propiedadCriticadaId: 1,
    },
    {
      fechaCreacion: new Date(),
      estaActivo: true,
      descripcion: 'descripcion',
      puntuacion: 5,
      usuarioCreadorId: 1,
      propiedadCriticadaId: 2,
    },
  ];

  const mockReview: ValoracionUsuario = {
    fechaCreacion: new Date(),
    estaActivo: true,
    descripcion: 'descripcion',
    puntuacion: 5,
    usuarioCreadorId: 1,
    usuarioCriticadoId: 2,
  };

  const mockHomeStayReview: ValoracionPropiedad = {
    fechaCreacion: new Date(),
    estaActivo: true,
    descripcion: 'descripcion',
    puntuacion: 5,
    usuarioCreadorId: 1,
    propiedadCriticadaId: 1,
  };

  const mockPrisma = {
    valoracionUsuario: {
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    valoracionPropiedad: {
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    $transaction: jest.fn(),
  };

  let reviewService: ReviewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewService,
        {
          provide: PrismaService,
          useValue: mockPrisma,
        },
      ],
    }).compile();

    reviewService = module.get<ReviewService>(ReviewService);
  });

  it('should be defined', () => {
    expect(reviewService).toBeDefined();
  });

  describe('getAllUserReviews', () => {
    it('should return all user reviews', async () => {
      mockPrisma.valoracionUsuario.findMany.mockResolvedValue(mockUserReviews);

      const result = await reviewService.getAllUserReviews();
      expect(result).toEqual(mockUserReviews);
    });
  });

  describe('getUserReviewsForIdBatch', () => {
    it('should return user reviews for id batch', async () => {
      const ids: GetReviewBatch = { idBatch: [1, 2] };
      mockPrisma.valoracionUsuario.findMany.mockResolvedValue(mockUserReviews);

      const result = await reviewService.getUserReviewsForIdBatch(ids);
      expect(result).toEqual(mockUserReviews);
    });

    it('should throw BadRequestException if id batch is empty', async () => {
      const ids: GetReviewBatch = { idBatch: [] };

      await expect(reviewService.getUserReviewsForIdBatch(ids)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('getHomeStayReviewsForIdBatch', () => {
    it('should return homestay reviews for id batch', async () => {
      const ids: GetReviewBatch = { idBatch: [1, 2] };
      mockPrisma.valoracionPropiedad.findMany.mockResolvedValue(
        mockHomeStayReviews,
      );

      const result = await reviewService.getHomeStayReviewsForIdBatch(ids);
      expect(result).toEqual(mockHomeStayReviews);
    });

    it('should throw BadRequestException if id batch is empty', async () => {
      const ids: GetReviewBatch = { idBatch: [] };

      await expect(
        reviewService.getHomeStayReviewsForIdBatch(ids),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('getAllHomeStayReviews', () => {
    it('should return all homestay reviews', async () => {
      mockPrisma.valoracionPropiedad.findMany.mockResolvedValue(
        mockHomeStayReviews,
      );

      const result = await reviewService.getAllHomeStayReviews();
      expect(result).toEqual(mockHomeStayReviews);
    });
  });

  describe('getAllReviewsFromUser', () => {
    it('should return all reviews from a user', async () => {
      const id = 1;
      mockPrisma.$transaction.mockResolvedValue([
        mockHomeStayReviews,
        mockUserReviews,
      ]);

      const result = await reviewService.getAllReviewsFromUser(id);
      expect(result).toEqual([mockHomeStayReviews, mockUserReviews]);
    });
  });

  describe('getAllReviewsForUser', () => {
    it('should return all reviews for a user', async () => {
      const id = 1;
      mockPrisma.valoracionUsuario.findMany.mockResolvedValue(mockUserReviews);

      const result = await reviewService.getAllReviewsForUser(id);
      expect(result).toEqual(mockUserReviews);
    });
  });

  describe('getAllReviewsForHomeStay', () => {
    it('should return all reviews for a homestay', async () => {
      const id = 1;
      mockPrisma.valoracionPropiedad.findMany.mockResolvedValue(
        mockHomeStayReviews,
      );

      const result = await reviewService.getAllReviewsForHomeStay(id);
      expect(result).toEqual(mockHomeStayReviews);
    });
  });

  describe('createReviewForUser', () => {
    it('should create a new review for user', async () => {
      const userId = 1;
      const dto: CreateUserReviewDTO = {
        puntuacion: 5,
        usuarioCriticadoId: 2,
      };

      mockPrisma.valoracionUsuario.create.mockResolvedValue(mockReview);

      const result = await reviewService.createReviewForUser(userId, dto);
      expect(result).toEqual(mockReview);
    });

    it('should throw ForbiddenException if review already exists', async () => {
      const userId = 1;
      const dto: CreateUserReviewDTO = {
        puntuacion: 5,
        usuarioCriticadoId: 2,
      };

      mockPrisma.valoracionUsuario.create.mockRejectedValue(
        new PrismaClientKnownRequestError(
          'Ya existe una valoración hecha por el usuario hacia el usuario especificado',
          {
            code: 'P2002',
            clientVersion: '5.14.0',
            meta: {
              modelName: 'ValoracionUsuario',
              target: ['usuarioCreadorId', 'usuarioCriticadoId'],
            },
          },
        ),
      );

      await expect(
        reviewService.createReviewForUser(userId, dto),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('createReviewForHomeStay', () => {
    it('should create a new review for homestay', async () => {
      const userId = 1;
      const dto: CreateHomeStayReviewDTO = {
        puntuacion: 5,
        propiedadCriticadaId: 2,
      };

      mockPrisma.valoracionPropiedad.create.mockResolvedValue(
        mockHomeStayReview,
      );

      const result = await reviewService.createReviewForHomeStay(userId, dto);
      expect(result).toEqual(mockHomeStayReview);
    });

    it('should throw ForbiddenException if review already exists', async () => {
      const userId = 1;
      const dto: CreateHomeStayReviewDTO = {
        puntuacion: 5,
        propiedadCriticadaId: 2,
      };

      mockPrisma.valoracionPropiedad.create.mockRejectedValue(
        new PrismaClientKnownRequestError(
          'Ya existe una valoración hecha por el usuario hacia la propiedad especificada',
          {
            code: 'P2002',
            clientVersion: '5.14.0',
            meta: {
              modelName: 'ValoracionPropiedad',
              target: ['usuarioCreadorId', 'propiedadCriticadaId'],
            },
          },
        ),
      );

      await expect(
        reviewService.createReviewForHomeStay(userId, dto),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('modifyReview', () => {
    it('should modify a homestay review', async () => {
      const dto: ModifyReviewDTO = {
        usuarioCreadorId: 1,
        receptorId: 2,
        descripcion: 'descripcion',
        puntuacion: 5,
      };

      mockPrisma.valoracionPropiedad.update.mockResolvedValue(
        mockHomeStayReview,
      );

      const result = await reviewService.modifyReview(dto, ReviewType.HOMESTAY);
      expect(result).toEqual(mockHomeStayReview);
    });

    it('should throw NotFoundException if review does not exist', async () => {
      const dto: ModifyReviewDTO = {
        usuarioCreadorId: 23,
        receptorId: 54,
        descripcion: 'Updated description',
        puntuacion: 1,
      };

      mockPrisma.valoracionUsuario.update.mockRejectedValue(
        new PrismaClientKnownRequestError(
          'La valoración referenciada no existe',
          {
            code: 'P2025',
            clientVersion: '5.14.0',
            meta: {
              modelName: 'ValoracionUsuario',
              cause: 'Record to update not found.',
            },
          },
        ),
      );

      await expect(
        reviewService.modifyReview(dto, ReviewType.USER),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteReview', () => {
    const deleteReviewDTO: DeleteReviewDTO = {
      usuarioCreadorId: 1,
      receptorId: 2,
    };

    it('should delete a home stay review', async () => {
      mockPrisma.valoracionPropiedad.delete.mockResolvedValue(
        mockHomeStayReview,
      );

      const result = await reviewService.deleteReview(
        deleteReviewDTO,
        ReviewType.HOMESTAY,
      );
      expect(result).toEqual(mockHomeStayReview);
    });

    it('should throw ForbiddenException if review does not exist (user review)', async () => {
      mockPrisma.valoracionUsuario.delete.mockRejectedValue(
        new PrismaClientKnownRequestError(
          'La valoración referenciada no existe',
          {
            code: 'P2025',
            clientVersion: '5.14.0',
            meta: {
              modelName: 'ValoracionUsuario',
              cause: 'Record to delete does not exist.',
            },
          },
        ),
      );

      await expect(
        reviewService.deleteReview(deleteReviewDTO, ReviewType.USER),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should throw ForbiddenException if review does not exist (home stay review)', async () => {
      mockPrisma.valoracionPropiedad.delete.mockRejectedValue(
        new PrismaClientKnownRequestError(
          'La valoración referenciada no existe',
          {
            code: 'P2025',
            clientVersion: '5.14.0',
            meta: {
              modelName: 'ValoracionPropiedad',
              cause: 'Record to delete does not exist.',
            },
          },
        ),
      );

      await expect(
        reviewService.deleteReview(deleteReviewDTO, ReviewType.HOMESTAY),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should throw InternalServerErrorException for other errors (user review)', async () => {
      mockPrisma.valoracionUsuario.delete.mockRejectedValue(
        new Error('Random error'),
      );

      await expect(
        reviewService.deleteReview(deleteReviewDTO, ReviewType.USER),
      ).rejects.toThrow(InternalServerErrorException);
    });

    it('should throw InternalServerErrorException for other errors (home stay review)', async () => {
      mockPrisma.valoracionPropiedad.delete.mockRejectedValue(
        new Error('Random error'),
      );

      await expect(
        reviewService.deleteReview(deleteReviewDTO, ReviewType.HOMESTAY),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });
});
