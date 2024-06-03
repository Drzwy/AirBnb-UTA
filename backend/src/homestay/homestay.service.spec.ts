import { Test, TestingModule } from '@nestjs/testing';
import { HomestayService } from './homestay.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { Propiedad, Usuario } from '@prisma/client';
import { HomeStayCreateDTO, HomeStayUpdateDTO } from './dto';

describe('HomestayService', () => {
  const mockAllHomestay: Propiedad[] = [
    {
      id: 2,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
      estaActivo: true,
      dormitorios: 3,
      camas: 3,
      banos: 2,
      fechasDisponibles: [new Date()],
      precioNoche: 13000,
      maxPersonas: 5,
      tipo: 'Casa',
      descripcion: 'Descripcion',
      pais: 'Chile',
      ciudad: 'Arica',
      calle: 'Edmundo Flores',
      nroCasa: 1000,
      nroDpto: 2,
      comodidades: ['comodidad1'],
      opcionesDeSeguridad: ['seguridad1'],
      opcionesDeLlegada: ['llegada1'],
      reglas: ['regla1'],
      fotos: ['url'],
      anfitrionId: 1,
    },
    {
      id: 3,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
      estaActivo: true,
      dormitorios: 4,
      camas: 4,
      banos: 2,
      fechasDisponibles: [new Date()],
      precioNoche: 14500,
      maxPersonas: 5,
      tipo: 'Casa',
      descripcion: 'Descripcion2',
      pais: 'Chile',
      ciudad: 'Arica',
      calle: 'Edmundo Flores',
      nroCasa: 1001,
      nroDpto: 3,
      comodidades: ['comodidad2'],
      opcionesDeSeguridad: ['seguridad2'],
      opcionesDeLlegada: ['llegada2'],
      reglas: ['regla2'],
      fotos: ['url'],
      anfitrionId: 1,
    },
    {
      id: 4,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
      estaActivo: true,
      dormitorios: 2,
      camas: 2,
      banos: 1,
      fechasDisponibles: [new Date()],
      precioNoche: 10000,
      maxPersonas: 3,
      tipo: 'Casa',
      descripcion: 'Descripcion3',
      pais: 'Chile',
      ciudad: 'Arica',
      calle: 'Edmundo Flores',
      nroCasa: 1002,
      nroDpto: 4,
      comodidades: ['comodidad3'],
      opcionesDeSeguridad: ['seguridad3'],
      opcionesDeLlegada: ['llegada3'],
      reglas: ['regla3'],
      fotos: ['url'],
      anfitrionId: 2,
    },
    {
      id: 8,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
      estaActivo: false,
      dormitorios: 2,
      camas: 2,
      banos: 1,
      fechasDisponibles: [new Date()],
      precioNoche: 10000,
      maxPersonas: 3,
      tipo: 'Casa',
      descripcion: 'Descripcion8',
      pais: 'Chile',
      ciudad: 'Arica',
      calle: 'Edmundo Flores',
      nroCasa: 1008,
      nroDpto: 4,
      comodidades: ['comodidad8'],
      opcionesDeSeguridad: ['seguridad8'],
      opcionesDeLlegada: ['llegada8'],
      reglas: ['regla8'],
      fotos: ['url'],
      anfitrionId: 2,
    },
  ];

  const mockHomestay: Propiedad = {
    id: 1,
    fechaCreacion: new Date(),
    fechaActualizacion: new Date(),
    estaActivo: true,
    dormitorios: 4,
    camas: 4,
    banos: 2,
    fechasDisponibles: [new Date()],
    precioNoche: 14500,
    maxPersonas: 5,
    tipo: 'Casa',
    descripcion: 'Descripcion',
    pais: 'Chile',
    ciudad: 'Arica',
    calle: 'Edmundo Flores',
    nroCasa: 1002,
    nroDpto: 3,
    comodidades: ['comodidad3'],
    opcionesDeSeguridad: ['seguridad3'],
    opcionesDeLlegada: ['llegada3'],
    reglas: ['regla3'],
    fotos: ['url'],
    anfitrionId: 1,
  };

  const createDto: HomeStayCreateDTO = {
    dormitorios: 4,
    camas: 4,
    banos: 2,
    fechasDisponibles: [new Date()],
    precioNoche: 14500,
    maxPersonas: 5,
    tipo: 'Casa',
    descripcion: 'Descripcion',
    pais: 'Chile',
    ciudad: 'Arica',
    calle: 'Edmundo Flores',
    nroCasa: 1002,
    nroDpto: 3,
    comodidades: ['comodidad3'],
    opcionesDeSeguridad: ['seguridad3'],
    opcionesDeLlegada: ['llegada3'],
    reglas: ['regla3'],
    fotos: ['url'],
    anfitrionId: 1,
  };

  const updateDto: HomeStayUpdateDTO = {
    dormitorios: 4,
    camas: 4,
    banos: 2,
    fechasDisponibles: [new Date()],
    precioNoche: 14500,
    maxPersonas: 5,
    tipo: 'Casa',
    descripcion: 'Descripcion',
    pais: 'Chile',
    ciudad: 'Arica',
    calle: 'Edmundo Flores',
    nroCasa: 1002,
    nroDpto: 3,
    comodidades: ['comodidad3'],
    opcionesDeSeguridad: ['seguridad3'],
    opcionesDeLlegada: ['llegada3'],
    reglas: ['regla3'],
    fotos: ['url'],
    anfitrionId: 1,
  };

  const mockUsuario: Usuario = {
    id: 1,
    estaActivo: true,
    fechaCreacion: new Date(),
    fechaActualizacion: new Date(),
    tipoUsuario: 'Cliente',
    email: 'string@gmail.com',
    hash: 'hash',
    run: '1111111-1',
    nombre: 'Juan',
    apellidoPat: 'Pilco',
    apellidoMat: 'Pilco',
    descripcion: 'descripcion',
    idiomas: ['Pilco'],
    detalles: ['Pilco'],
  };

  const mockPrisma = {
    propiedad: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    usuario: {
      findUnique: jest.fn(),
    },
  };

  let homestayService: HomestayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HomestayService,
        {
          provide: PrismaService,
          useValue: mockPrisma,
        },
      ],
    }).compile();

    homestayService = module.get<HomestayService>(HomestayService);
  });

  it('should be defined', () => {
    expect(homestayService).toBeDefined();
  });

  describe('getAllHomeStays', () => {
    it('Should return all homestays', async () => {
      mockPrisma.propiedad.findMany.mockResolvedValue(
        mockAllHomestay.filter((homestay) => homestay.estaActivo === true),
      );

      const result = await homestayService.getAllHomeStays();
      expect(result).toEqual(
        mockAllHomestay.filter((homestay) => homestay.estaActivo === true),
      );
    });
  });

  describe('getHomeStayById', () => {
    it('Should return homestay by id', async () => {
      mockPrisma.propiedad.findUnique.mockResolvedValue(mockAllHomestay[0]);
      const result = await homestayService.getHomeStayById(2);
      expect(result).toEqual(mockAllHomestay[0]);
    });

    it('Should throw NotFoundExeptcion if homestay is not found', async () => {
      mockPrisma.propiedad.findUnique.mockResolvedValue(null);
      await expect(homestayService.getHomeStayById(5)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('getAllHomeStayByUserId', () => {
    it('Should return all homestays by anfitrionId', async () => {
      mockPrisma.usuario.findUnique.mockResolvedValue(mockUsuario);
      mockPrisma.propiedad.findMany.mockResolvedValue(
        mockAllHomestay.filter((homestay) => homestay.anfitrionId === 1),
      );
      const result = await homestayService.getAllHomeStaysByUserId(1);
      expect(result).toEqual(
        mockAllHomestay.filter((homestay) => homestay.anfitrionId === 1),
      );
    });

    it('Should throw NotFoundException if owner does not exist', async () => {
      mockPrisma.usuario.findUnique.mockResolvedValue(null);

      await expect(homestayService.getAllHomeStaysByUserId(1)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('createHomeStay', () => {
    it('Should create a new homestay', async () => {
      mockPrisma.usuario.findUnique.mockResolvedValue(mockUsuario);
      mockPrisma.propiedad.create.mockResolvedValue(mockHomestay);
      const result = await homestayService.createHomeStay(createDto);
      expect(result).toEqual(mockHomestay);
    });

    it('Should throw NotFoundException if owner does not exist', async () => {
      mockPrisma.usuario.findUnique.mockResolvedValue(null);
      await expect(homestayService.createHomeStay(createDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('updateHomeStay', () => {
    it('Should update a homestay', async () => {
      mockPrisma.propiedad.findUnique.mockResolvedValue(mockHomestay);
      mockPrisma.propiedad.update.mockResolvedValue(mockHomestay);

      const result = await homestayService.updateHomeStay(1, updateDto);
      expect(result).toEqual(mockHomestay);
    });

    it('Should throw NotFoundException if homestay does not exist', async () => {
      mockPrisma.propiedad.findUnique.mockResolvedValue(null);

      await expect(
        homestayService.updateHomeStay(1, updateDto),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteHomeStay', () => {
    it('Should delete a homestay', async () => {
      mockPrisma.propiedad.findUnique.mockResolvedValue(mockHomestay);
      mockPrisma.propiedad.update.mockResolvedValue(mockHomestay);

      const result = await homestayService.deleteHomeStay(1);
      expect(result).toEqual(mockHomestay);
    });

    it('Should throw NotFoundException if homestay does not exist', async () => {
      mockPrisma.propiedad.findUnique.mockResolvedValue(null);

      await expect(homestayService.deleteHomeStay(1)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
