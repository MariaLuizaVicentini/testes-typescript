import { validateTodoDescription } from './validate-todo-description';

describe('ValidateTodoDescription (unit)', () => {
  test('deve retornar erro quando a description tem menos que 4 caracteres', () => {
    const description = 'abc';
    const expected = {
      errors: ['Descricao precisa ter mais de 3 caracteres'],
      success: false,
    };

    const result = validateTodoDescription(description);

    expect(result).toStrictEqual(expected);
  });

  test('deve retornar sucesso quando a description tem mais que 3 caracteres', () => {
    const description = 'ir no mercado';
    const expected = {
      errors: [],
      success: true,
    };

    const result = validateTodoDescription(description);

    expect(result).toStrictEqual(expected);
  });
});
