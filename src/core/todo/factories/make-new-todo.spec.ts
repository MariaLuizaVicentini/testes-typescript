import { makeNewTodo } from './make-new-todo';

describe('makeNewTodo (Teste de unidade)', () => {
  test('deve retornar um novo TODO válido', () => {
    const expectedTodo = {
      id: expect.any(String),
      description: 'Meu Novo Todo',
      createdAt: expect.any(String),
    };

    const newTodo = makeNewTodo('Meu Novo Todo');

    expect(newTodo.description).toBe(expectedTodo.description);

    expect(newTodo).toStrictEqual(expectedTodo);
  });
});
