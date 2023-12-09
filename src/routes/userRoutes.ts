import { Router } from 'express';
import UserController from '../controllers/userController';

const router = Router();
const userController = new UserController();

// GET all Users
router.get('/', userController.getAllUsers.bind(userController));

// GET User by ID
router.get('/:id', userController.getUserById.bind(userController));

// CREATE a new User
router.patch('/', userController.createUser.bind(userController));

// UPDATE a User by ID
router.put('/:id', userController.updateUser.bind(userController));

// DELETE a User by ID
router.delete('/:id', userController.deleteUser.bind(userController));

export default router;
