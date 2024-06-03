import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { UserTypes } from '@prisma/client';
import * as pactum from 'pactum';
import { AppModule } from 'src/app.module';
import { LoginDTO } from 'src/auth/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserCreateDTO, UserRegisterDTO } from 'src/user/dto';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );
    await app.init();
    await app.listen(3333);

    prisma = app.get(PrismaService);
    await prisma.cleanDB();
    pactum.request.setBaseUrl('http://localhost:3333');
  });

  afterAll(() => {
    app.close();
  });

  describe('auth', () => {
    const U1LoginDTO: LoginDTO = {
      email: 'test@test.com',
      hash: 'test123!@#',
    };
    const U1RegisterDTO: UserRegisterDTO = {
      ...U1LoginDTO,
      run: '20000000-0',
      nombre: 'test',
      apellidoPat: 'test',
      apellidoMat: 'test',
      descripcion: 'descripción',
      idiomas: ['idioma1', 'idioma2', 'idioma3'],
      detalles: ['detalle1', 'detalle2', 'detalle3'],
    };
    const U2RegisterDTO: UserRegisterDTO = {
      email: 'test2@test.com',
      hash: 'test123!@#',
      run: 'test2',
      nombre: 'test2',
      apellidoPat: 'test2',
      apellidoMat: 'test2',
      descripcion: '',
      idiomas: [],
      detalles: [],
    };

    describe('register', () => {
      it('deberia registrar un usuario nuevo', () => {
        return pactum
          .spec()
          .post('/auth/register')
          .withBody(U1RegisterDTO)
          .expectStatus(HttpStatus.CREATED);
      });
      it('deberia saltar error con credenciales duplicadas', () => {
        return pactum
          .spec()
          .post('/auth/register')
          .withBody(U1RegisterDTO)
          .expectStatus(HttpStatus.FORBIDDEN);
      });
      it('deberia registrar con campos vacíos', () => {
        return pactum
          .spec()
          .post('/auth/register')
          .withBody(U2RegisterDTO)
          .expectStatus(HttpStatus.CREATED);
      });
    });

    describe('login', () => {
      it('deberia saltar error cuando no hay email', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody({
            hash: 'test',
          })
          .expectStatus(HttpStatus.BAD_REQUEST);
      });
      it('deberia saltar error cuando no hay password', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody({
            email: 'test',
          })
          .expectStatus(HttpStatus.BAD_REQUEST);
      });
      it('deberia saltar error cuando no hay body', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .expectStatus(HttpStatus.BAD_REQUEST);
      });
      it('deberia saltar error con credenciales erróneas', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody({
            email: U1LoginDTO.email,
            hash: 'PASSWORD-ERROR',
          })
          .expectStatus(HttpStatus.FORBIDDEN);
      });
      it('deberia logear', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody(U1LoginDTO)
          .expectStatus(HttpStatus.OK)
          .stores('clienteAuthToken', 'access_token');
      });
    });
  });

  describe('users ', () => {
    const createUserDTO: UserCreateDTO = {
      tipoUsuario: UserTypes.Administrador,
      email: 'admin@admin.com',
      hash: 'test123!@#',
      run: '19999999-9',
      nombre: 'test',
      apellidoPat: 'test',
      apellidoMat: 'test',
      descripcion: 'descripción',
      idiomas: ['idioma1', 'idioma2', 'idioma3'],
      detalles: ['detalle1', 'detalle2', 'detalle3'],
    };

    describe('Get me', () => {
      it('deberia obtener usuario logeado', () => {
        return pactum
          .spec()
          .get('/users/me')
          .withBearerToken('$S{clienteAuthToken}')
          .expectStatus(HttpStatus.OK)
          .inspect();
      });
    });

    describe('Get all users', () => {
      it('deberia obtener todos los usuarios', () => {
        return pactum
          .spec()
          .get('/users')
          .withBearerToken('$S{clienteAuthToken}')
          .expectStatus(HttpStatus.OK);
      });
    });

    describe('Get user by id', () => {
      it('deberia tirar error sin id', () => {
        return pactum
          .spec()
          .get('/users/test')
          .withBearerToken('$S{clienteAuthToken}')
          .expectStatus(HttpStatus.BAD_REQUEST);
      });

      it('deberia obtener usuario', () => {
        return pactum
          .spec()
          .get('/users/1')
          .withBearerToken('$S{clienteAuthToken}')
          .expectStatus(HttpStatus.OK)
          .inspect();
      });
    });

    describe('Create user (Admin)', () => {
      it('deberia tirar error sin body', () => {
        return pactum
          .spec()
          .post('/users/')
          .withBearerToken('$S{clienteAuthToken}')
          .expectStatus(HttpStatus.CREATED);
      });
      it('deberia crear un usuario admin', () => {});
      it('deberia crear un usuario cliente', () => {});
    });

    describe('Delete user (Admin)', () => {
      it('deberia tirar error sin id', () => {});
      it('deberia eliminar al usuario', () => {});
    });
  });
});
