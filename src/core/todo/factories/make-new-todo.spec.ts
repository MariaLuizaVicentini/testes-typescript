import { makeNewTodo } from "./make-new-todo";

test('deve retornar um novo todo valido', () => {
    const expectedTodo = {
        id: 'any-idfasdfsadfsa53654568687',
        description: 'meu novo todo',
        createdAt: new Date().toISOString(),
    }

    const newTodo = makeNewTodo('meu novo todo')

    expect(newTodo.description).toBe(expectedTodo.description);
});

