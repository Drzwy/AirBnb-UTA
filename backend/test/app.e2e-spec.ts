import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { AppModule } from 'src/app.module';
import { LoginDTO } from 'src/auth/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRegisterDTO } from 'src/user/dto';

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

  describe('Auth', () => {
    const loginDTO: LoginDTO = {
      email: 'test@test.com',
      password: 'test123!@#',
    };
    const registerDTO: UserRegisterDTO = {
      ...loginDTO,
      run: '20000000-0',
      nombre: 'test',
      apellidoPat: 'test',
      apellidoMat: 'test',
      descripcion: 'descripción',
      idiomas: ['idioma1', 'idioma2', 'idioma3'],
      detalles: ['detalle1', 'detalle2', 'detalle3'],
    };

    describe('Registro', () => {
      it('debería registrar un usuario nuevo', () => {
        return pactum
          .spec()
          .post('/auth/register')
          .withBody(registerDTO)
          .expectStatus(HttpStatus.CREATED);
      });
      it('Error con credenciales duplicadas', () => {
        return pactum
          .spec()
          .post('/auth/register')
          .withBody(registerDTO)
          .expectStatus(HttpStatus.FORBIDDEN);
      });
    });

    describe('Login', () => {
      it('logear usuario test', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody(loginDTO)
          .expectStatus(HttpStatus.OK);
      });
    });
  });
});
