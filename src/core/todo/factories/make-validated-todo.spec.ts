import {
  InvalidTodo,
  makeValidatedTodo,
  ValidTodo,
} from './make-validated-todo';
import * as validateTodoDescriptionMod from '../schemas/validate-todo-description';
import * as sanitizeStrMod from '../../utils/sanitize-str';
import * as makeNewTodoMod from '../factories/make-new-todo';

describe('makeValidatedTodo (unit)', () => {
  test('deve chamar a funcao sanitizeStr com description', () => {
    const { description, sanitizeStrSpy } = makeMocks();
    makeValidatedTodo(description);
    expect(sanitizeStrSpy).toHaveBeenCalledExactlyOnceWith(description);
  });

  test('deve chamar validateTodoDescription com o retorno de sanitizeStr', () => {
    const { description, sanitizeStrSpy, validaTodoDescriptionSpy } =
      makeMocks();
    const sanitizeStrReturn = 'Retorno da sanitizeStr';
    sanitizeStrSpy.mockReturnValue(sanitizeStrReturn);
    const result = makeValidatedTodo(description) as ValidTodo;
    expect(validaTodoDescriptionSpy).toHaveBeenCalledExactlyOnceWith(
      sanitizeStrReturn,
    );
    expect(result.success).toBe(true);
    expect(result.data).toStrictEqual({
      id: 'any-id',
      description: 'abcd',
      createdAt: expect.any(String),
    });
  });

  test('deve chamar makeNewTodo se validatedDescription retornou sucesso', () => {
    const { description, validaTodoDescriptionSpy, makeNewTodoSpy, todo } =
      makeMocks();
    const validaTodoDescriptionReturn = {
      errors: [],
      success: true,
      data: description,
    };
    validaTodoDescriptionSpy.mockReturnValue(
      validaTodoDescriptionReturn as any,
    );
    const result = makeValidatedTodo(description) as ValidTodo;
    expect(result).toStrictEqual({
      success: true,
      data: todo,
    });
    expect(makeNewTodoSpy).toHaveBeenCalledExactlyOnceWith(description);
  });

  test('deve retornar validatedDescription.error se a validacao falhou', () => {
    const { description, validaTodoDescriptionSpy } = makeMocks();
    const errors = ['any', 'error'];
    validaTodoDescriptionSpy.mockReturnValue({
      errors,
      success: false,
    });
    const result = makeValidatedTodo(description) as InvalidTodo;
    expect(result).toStrictEqual({
      errors: ['any', 'error'],
      success: false,
    });
  });
});

const makeMocks = (description = 'abcd') => {
  const todo = {
    id: 'any-id',
    description,
    createdAt: new Date().toISOString(),
  };

  // Mock Function: sanitizeStr - simula a funcao com retorno 'abcd'
  const sanitizeStrSpy = vi
    .spyOn(sanitizeStrMod, 'sanitizeStr')
    .mockReturnValue(description);

  // Mock Function: validateTodoDescription - simula a funcao com retorno success
  const validaTodoDescriptionSpy = vi.spyOn(
    validateTodoDescriptionMod,
    'validateTodoDescription',
  );

  // Mock Function: makeNewTodo - simula a funcao com retorno do Todo criado
  const makeNewTodoSpy = vi
    .spyOn(makeNewTodoMod, 'makeNewTodo')
    .mockReturnValue(todo);

  return {
    todo,
    description,
    sanitizeStrSpy,
    validaTodoDescriptionSpy,
    makeNewTodoSpy,
  };
};
