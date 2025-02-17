import { Router } from 'express';
import { container } from 'tsyringe';
import { AuthController } from '../controllers/authController';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const router = Router();
const authController = container.resolve(AuthController);

// Configuração do Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Autenticação',
      version: '1.0.0',
      description: 'Documentação das rotas de autenticação (Registro e Login)',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./routes/authRoutes.ts'], // Onde as rotas estão localizadas
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rota para registrar um novo usuário
/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registra um novo usuário
 *     description: Registra um novo usuário fornecendo email, senha e nome
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - name
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *               name:
 *                 type: string
 *                 example: João Silva
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Requisição inválida
 *       409:
 *         description: Conflito (usuário já existe)
 */
router.post('/register', (req, res, next) => {
  authController.register(req, res).then(() => next()).catch(next);
});

// Rota para login de usuário
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Realiza login de um usuário
 *     description: Realiza o login de um usuário e retorna um token JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login bem-sucedido
 *                 token:
 *                   type: string
 *                   example: <JWT-token>
 *       400:
 *         description: Requisição inválida
 *       401:
 *         description: Credenciais inválidas
 */
router.post('/login', (req, res, next) => {
  authController.login(req, res).then(() => next()).catch(next);
});

export default router;
