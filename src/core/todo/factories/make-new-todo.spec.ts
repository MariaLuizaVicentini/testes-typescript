import { makeNewTodo } from './make-new-todo';

describe('makeNewTodo (Teste de unidade)', () => {
  test('deve retornar um novo TODO válido', () => {
    // AAA = Arrange, Act, Assert
    const expectedTodo = {
      id: expect.any(String),
      description: 'Meu Novo Todo',
      createdAt: expect.any(String),
    };

    const newTodo = makeNewTodo('Meu Novo Todo');

    // checando valores primitivos (igualdade estrita )
    expect(newTodo.description).toBe(expectedTodo.description);

    // checando o objeto inteiro (estrutura exata e tipos)
    expect(newTodo).toStrictEqual(expectedTodo);
  });
});
