import { Router } from 'express';
import { container } from 'tsyringe';
import { TaskController } from '../controllers/taskController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();
const taskController = container.resolve(TaskController);

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Cria uma nova tarefa
 *     tags:
 *       - Tasks
 *     description: Cria uma tarefa com título e descrição fornecidos no corpo da requisição.
 *     security:
 *       - bearerAuth: []  # Usando a autenticação JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tarefa criada com sucesso
 *       409:
 *         description: Já existe uma tarefa com este título
 *       422:
 *         description: Dados inválidos fornecidos
 */
router.post('/tasks', authMiddleware, (req, res, next) => {
  taskController.create(req, res).then(() => next()).catch(next);
});

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Retorna todas as tarefas
 *     tags:
 *       - Tasks
 *     description: Obtém uma lista de todas as tarefas do usuário autenticado.
 *     security:
 *       - bearerAuth: []  # Usando a autenticação JWT
 *     responses:
 *       200:
 *         description: Lista de tarefas
 *       401:
 *         description: Não autorizado
 */
router.get('/tasks', authMiddleware, (req, res, next) => {
  taskController.findAll(req, res).then(() => next()).catch(next);
});

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Retorna uma tarefa pelo ID
 *     tags:
 *       - Tasks
 *     description: Obtém uma tarefa específica com base no ID fornecido.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da tarefa
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []  # Usando a autenticação JWT
 *     responses:
 *       200:
 *         description: Tarefa encontrada
 *       404:
 *         description: Tarefa não encontrada
 *       401:
 *         description: Não autorizado
 */
router.get('/tasks/:id', authMiddleware, (req, res, next) => {
  taskController.findById(req, res).then(() => next()).catch(next);
});

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Atualiza uma tarefa existente
 *     tags:
 *       - Tasks
 *     description: Atualiza os detalhes de uma tarefa existente com base no ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da tarefa
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []  # Usando a autenticação JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tarefa atualizada com sucesso
 *       404:
 *         description: Tarefa não encontrada
 *       422:
 *         description: Dados inválidos fornecidos
 *       401:
 *         description: Não autorizado
 */
router.put('/tasks/:id', authMiddleware, (req, res, next) => {
  taskController.update(req, res).then(() => next()).catch(next);
});

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Deleta uma tarefa pelo ID
 *     tags:
 *       - Tasks
 *     description: Exclui uma tarefa específica com base no ID fornecido.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da tarefa
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []  # Usando a autenticação JWT
 *     responses:
 *       204:
 *         description: Tarefa deletada com sucesso
 *       404:
 *         description: Tarefa não encontrada
 *       401:
 *         description: Não autorizado
 */
router.delete('/tasks/:id', authMiddleware, (req, res, next) => {
  taskController.delete(req, res).then(() => next()).catch(next);
});

export default router;
