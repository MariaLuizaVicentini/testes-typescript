import {
  InvalidTodo,
  makeValidatedTodo,
  ValidTodo,
} from './make-validated-todo';
import * as validateTodoDescriptionMod from '../schemas/validate-todo-description';
import * as sanitizeStrMod from '../../utils/sanitize-str';
import * as makeNewTodoMod from '../factories/make-new-todo';

describe('makeValidatedTodo (unit)', () => {
  test('deve chamar a funcao sanitizeStr com o valor correto', () => {
    const { description, sanitizeStrSpy } = makeMocks();
    makeValidatedTodo(description);
    expect(sanitizeStrSpy).toHaveBeenCalledExactlyOnceWith(description);
  });

  test('deve chamar validateTodoDescription com o retorno de sanitizeStr', () => {
    const { description, sanitizeStrSpy, validaTodoDescriptionSpy } =
      makeMocks();
    const sanitizeStrReturn = 'retorn da sanitizeStr';
    sanitizeStrSpy.mockReturnValue(sanitizeStrReturn);

    makeValidatedTodo(description);

    expect(validaTodoDescriptionSpy).toHaveBeenCalledExactlyOnceWith(
      sanitizeStrReturn,
    );
  });

  test('deve chamar makeNewTodo se validatedDescription retornou sucesso', () => {
    const { description } = makeMocks();

    const result = makeValidatedTodo(description) as ValidTodo;

    expect(result.success).toBe(true);
  });

  test('deve retornar validatedDescription.error se a validacao falhou', () => {
    const { description, validaTodoDescriptionSpy, errors } = makeMocks();

    validaTodoDescriptionSpy.mockReturnValue({ errors, success: false });
    const result = makeValidatedTodo(description) as InvalidTodo;

    expect(result).toStrictEqual({ errors, success: false });
  });
});

const makeMocks = (description = 'abcd') => {
  const errors = ['any', 'error'];

  const todo = {
    id: 'any-id',
    description,
    createdAt: new Date().toISOString(),
  };

  const sanitizeStrSpy = vi
    .spyOn(sanitizeStrMod, 'sanitizeStr')
    .mockReturnValue(description);

  const validaTodoDescriptionSpy = vi
    .spyOn(validateTodoDescriptionMod, 'validateTodoDescription')
    .mockReturnValue({ errors: [], success: true });

  const makeNewTodoSpy = vi
    .spyOn(makeNewTodoMod, 'makeNewTodo')
    .mockReturnValue(todo);

  return {
    description,
    sanitizeStrSpy,
    validaTodoDescriptionSpy,
    makeNewTodoSpy,
    errors,
  };
};
