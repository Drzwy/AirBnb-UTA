import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateHomeStayReviewDTO,
  CreateUserReviewDTO,
  DeleteReviewDTO,
  GetReviewBatch,
  ModifyReviewDTO,
} from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { ValoracionPropiedad, ValoracionUsuario } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class ReviewService {
  constructor(private prismaService: PrismaService) {}

  async getAllUserReviews() {
    try {
      const reviews = await this.prismaService.valoracionUsuario.findMany();
      return reviews;
    } catch {}
  }

  async getUserReviewsForIdBatch(ids: GetReviewBatch) {
    try {
      if (ids.idBatch.length == 0)
        throw new BadRequestException('Número especificado de ids no válido');

      const userReviews: ValoracionUsuario[] =
        await this.prismaService.valoracionUsuario.findMany({
          where: {
            usuarioCriticadoId: { in: ids.idBatch },
          },
          include: {
            UsuarioCreador: true,
            UsuarioCriticado: true,
          },
        });

      return userReviews;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new InternalServerErrorException(error);
      } else {
        throw error;
      }
    }
  }

  async getHomeStayReviewsForIdBatch(ids: GetReviewBatch) {
    try {
      if (ids.idBatch.length == 0)
        throw new BadRequestException('Número especificado de ids no válido');

      const homeStayReviews: ValoracionPropiedad[] =
        await this.prismaService.valoracionPropiedad.findMany({
          where: {
            propiedadCriticadaId: { in: ids.idBatch },
          },
          include: {
            UsuarioCreador: true,
            PropiedadCriticada: true,
          },
        });

      return homeStayReviews;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new InternalServerErrorException(error);
      } else {
        throw error;
      }
    }
  }

  async getAllHomeStayReviews() {
    try {
      const reviews = await this.prismaService.valoracionPropiedad.findMany();
      return reviews;
    } catch {}
  }

  async getAllReviewsFromUser(id: number) {
    const homestayReviewsQuery =
      this.prismaService.valoracionPropiedad.findMany({
        where: { usuarioCreadorId: id },
        include: { PropiedadCriticada: true },
      });
    const userReviewsQuery = this.prismaService.valoracionUsuario.findMany({
      where: { usuarioCreadorId: id },
      include: { UsuarioCriticado: true },
    });

    const reviews = await this.prismaService.$transaction([
      homestayReviewsQuery,
      userReviewsQuery,
    ]);

    return reviews;
  }

  async getAllReviewsForUser(id: number) {
    const reviews = await this.prismaService.valoracionUsuario.findMany({
      where: { usuarioCriticadoId: id },
      include: { UsuarioCreador: true },
    });
    return reviews;
  }

  async getAllReviewsForHomeStay(id: number) {
    const reviews = await this.prismaService.valoracionPropiedad.findMany({
      where: { propiedadCriticadaId: id },
      include: { UsuarioCreador: true },
    });
    return reviews;
  }

  async createReviewForUser(userId: number, dto: CreateUserReviewDTO) {
    try {
      const userReview: ValoracionUsuario =
        await this.prismaService.valoracionUsuario.create({
          data: {
            usuarioCreadorId: userId,
            ...dto,
          },
        });

      return userReview;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        switch (error.code) {
          case 'P2002': {
            throw new ForbiddenException(
              'Ya existe una valoración hecha por el usuario hacia el usuario especificado',
            );
          }
        }
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async createReviewForHomeStay(userId: number, dto: CreateHomeStayReviewDTO) {
    try {
      const review = await this.prismaService.valoracionPropiedad.create({
        data: {
          usuarioCreadorId: userId,
          ...dto,
        },
      });
      return review;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        switch (error.code) {
          case 'P2002': {
            throw new ForbiddenException(
              'Ya existe una valoración hecha por el usuario hacia la propiedad especificada',
            );
          }
        }
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async modifyReview(dto: ModifyReviewDTO, type: ReviewType) {
    try {
      let review: ValoracionUsuario | ValoracionPropiedad;
      switch (type) {
        case ReviewType.USER: {
          review = await this.prismaService.valoracionUsuario.update({
            where: {
              usuarioCreadorId_usuarioCriticadoId: {
                usuarioCreadorId: dto.usuarioCreadorId,
                usuarioCriticadoId: dto.receptorId,
              },
            },
            data: {
              descripcion: dto.descripcion,
              puntuacion: dto.puntuacion,
            },
          });
        }
        case ReviewType.HOMESTAY: {
          review = await this.prismaService.valoracionPropiedad.update({
            where: {
              usuarioCreadorId_propiedadCriticadaId: {
                usuarioCreadorId: dto.usuarioCreadorId,
                propiedadCriticadaId: dto.receptorId,
              },
            },
            data: {
              descripcion: dto.descripcion,
              puntuacion: dto.puntuacion,
            },
          });
        }
      }
      return review;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('La valoración referenciada no existe');
        }
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async deleteReview(dto: DeleteReviewDTO, type: ReviewType) {
    try {
      let review: ValoracionUsuario | ValoracionPropiedad;
      switch (type) {
        case ReviewType.USER: {
          review = await this.prismaService.valoracionUsuario.delete({
            where: {
              usuarioCreadorId_usuarioCriticadoId: {
                usuarioCreadorId: dto.usuarioCreadorId,
                usuarioCriticadoId: dto.receptorId,
              },
            },
          });
        }
        case ReviewType.HOMESTAY: {
          review = await this.prismaService.valoracionPropiedad.delete({
            where: {
              usuarioCreadorId_propiedadCriticadaId: {
                usuarioCreadorId: dto.usuarioCreadorId,
                propiedadCriticadaId: dto.receptorId,
              },
            },
          });
        }
      }
      return review;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new ForbiddenException('La valoración referenciada no existe');
        }
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }
}

export enum ReviewType {
  USER = 'UserReview',
  HOMESTAY = 'HomeStayReview',
}
