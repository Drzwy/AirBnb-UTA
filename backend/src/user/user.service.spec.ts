import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { UserCreateDTO, UserRegisterDTO, UserUpdateDto } from './dto';
import * as argon from 'argon2';
import { Usuario, UserTypes } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

describe('UserService', () => {
  const mockUser: Usuario = {
    id: 1,
    fechaCreacion: new Date(),
    fechaActualizacion: new Date(),
    estaActivo: true,
    tipoUsuario: UserTypes.Cliente,
    email: 'test@example.com',
    hash: 'password',
    run: '12345678-9',
    nombre: 'John',
    apellidoPat: 'Doe',
    apellidoMat: 'Smith',
    descripcion: 'Test user',
    idiomas: ['español'],
    detalles: ['detalle1'],
  };

  const mockAllUser: Usuario[] = [
    {
      id: 1,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
      estaActivo: true,
      tipoUsuario: UserTypes.Cliente,
      email: 'test@example.com',
      hash: 'password',
      run: '12345678-9',
      nombre: 'John',
      apellidoPat: 'Doe',
      apellidoMat: 'Smith',
      descripcion: 'Test user',
      idiomas: ['español'],
      detalles: ['detalle1'],
    },
    {
      id: 2,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
      estaActivo: true,
      tipoUsuario: UserTypes.Cliente,
      email: 'test2@example.com',
      hash: 'password2',
      run: '12345671-9',
      nombre: 'John2',
      apellidoPat: 'Doe2',
      apellidoMat: 'Smith2',
      descripcion: 'Test user',
      idiomas: ['español'],
      detalles: ['detalle1'],
    },
  ];

  const userCreateDto: UserCreateDTO = {
    tipoUsuario: UserTypes.Cliente,
    email: 'test@example.com',
    hash: 'password',
    run: '12345678-9',
    nombre: 'John',
    apellidoPat: 'Doe',
    apellidoMat: 'Smith',
    descripcion: 'Test user',
    idiomas: ['español'],
    detalles: ['detalle1'],
  };

  const userUpdateDto: UserUpdateDto = {
    email: 'newemail@example.com',
  };

  let userService: UserService;
  const mockPrisma = {
    usuario: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
    },
    propiedad: {
      updateMany: jest.fn(),
    },
    $transaction: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: mockPrisma,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('registerUser', () => {
    it('should register a new user with type Cliente', async () => {
      const dto: UserRegisterDTO = {
        email: 'test@example.com',
        hash: 'password',
        run: '12345678-9',
        nombre: 'John',
        apellidoPat: 'Doe',
        apellidoMat: 'Smith',
        descripcion: 'Test user',
        idiomas: ['español'],
        detalles: ['detalle1'],
      };

      const createDto: UserCreateDTO = {
        ...dto,
        tipoUsuario: UserTypes.Cliente,
      };

      mockPrisma.usuario.create.mockResolvedValue(mockUser);

      const result = await userService.registerUser(createDto);
      expect(mockPrisma.usuario.create).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockUser);
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const hash = await argon.hash(userCreateDto.hash);
      const createdUser: Usuario = {
        id: 1,
        ...userCreateDto,
        hash,
        fechaCreacion: new Date(),
        fechaActualizacion: new Date(),
        estaActivo: true,
      };

      mockPrisma.usuario.create.mockResolvedValue(mockUser);

      const result = await userService.createUser(createdUser);
      expect(mockPrisma.usuario.create).toHaveBeenCalledTimes(2);
      expect(result).toEqual(mockUser);
    });

    it('should throw ForbiddenException if credentials are duplicated', async () => {
      mockPrisma.usuario.create.mockRejectedValue(
        new PrismaClientKnownRequestError('Credenciales duplicadas', {
          code: 'P2002',
          clientVersion: '2.17.0',
          meta: { modelName: 'Usuario', target: ['email'] },
        }),
      );
      expect(mockPrisma.usuario.create).toHaveBeenCalledTimes(2);
      await expect(userService.createUser(userCreateDto)).rejects.toThrow(
        ForbiddenException,
      );
    });
  });

  describe('getUserById', () => {
    it('should return user by id', async () => {
      mockPrisma.usuario.findUnique.mockResolvedValue(mockAllUser[0]);

      const result = await userService.getUserById(1);
      expect(result).toEqual(mockAllUser[0]);
    });

    it('should throw NotFoundException if user not found', async () => {
      mockPrisma.usuario.findUnique.mockResolvedValue(null);
      await expect(userService.getUserById(32)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('getAllUsers', () => {
    it('should return all users', async () => {
      mockPrisma.usuario.findMany.mockResolvedValue(mockAllUser);

      const result = await userService.getAllUsers();
      expect(result).toEqual(mockAllUser);
    });

    it('should throw NotFoundException if no users found', async () => {
      mockPrisma.usuario.findMany.mockResolvedValue([]);
      await expect(userService.getAllUsers()).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('updateUserById', () => {
    it('should update user by id', async () => {
      mockPrisma.usuario.update.mockResolvedValue(mockUser);

      const result = await userService.updateUserById(1, userUpdateDto);
      expect(mockPrisma.usuario.update).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockUser);
    });

    it('should throw NotFoundException if user not found', async () => {
      mockPrisma.usuario.update.mockRejectedValue(
        new PrismaClientKnownRequestError('User not found', {
          code: 'P2025',
          clientVersion: '2.17.0',
          meta: { modelName: 'Usuario', cause: 'Record to update not found.' },
        }),
      );
      expect(mockPrisma.usuario.update).toHaveBeenCalledTimes(1);
      await expect(
        userService.updateUserById(1, userUpdateDto),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw ForbiddenException if credentials are duplicated', async () => {
      mockPrisma.usuario.update.mockRejectedValue(
        new PrismaClientKnownRequestError('Credenciales duplicadas', {
          code: 'P2002',
          clientVersion: '2.17.0',
          meta: { modelName: 'Usuario', target: ['email'] },
        }),
      );
      expect(mockPrisma.usuario.update).toHaveBeenCalledTimes(2);
      await expect(
        userService.updateUserById(1, userUpdateDto),
      ).rejects.toThrow(ForbiddenException);
    });
  });
});
