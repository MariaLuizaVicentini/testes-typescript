import { makeValidatedTodo } from './make-validated-todo';
import { validateTodoDescription } from '../../todo/schemas/validate-todo-description';
import { makeNewTodo } from './make-new-todo';
import * as sanitizeStrMod from '../../utils/sanitize-str';
import * as validateTodoDescriptionMod from '../../todo/schemas/validate-todo-description';
import * as makeNewTodoMod from '../../todo/factories/make-new-todo';

describe('makeValidatedTodo (unit)', () => {
  test('deve chamar a funcao sanitizeStr com description', () => {
    const description = 'abcd';
    const sanitizeStrSpy = vi
      .spyOn(sanitizeStrMod, 'sanitizeStr')
      .mockReturnValue(description);

    makeValidatedTodo(description);

    expect(sanitizeStrSpy).toHaveBeenCalledExactlyOnceWith(description);
    expect(sanitizeStrSpy).toHaveBeenCalledTimes(1);
    expect(sanitizeStrSpy).toHaveBeenCalledWith(description);
  });

  test('deve chamar a funcao validateTodoDescription com description sanitizada', () => {
    const description = '    abcd   ';
    const mockCleanDescription = 'abcd';

    vi.spyOn(sanitizeStrMod, 'sanitizeStr').mockReturnValue(
      mockCleanDescription,
    );

    const validateTodoSpy = vi.spyOn(
      validateTodoDescriptionMod,
      'validateTodoDescription',
    );

    makeValidatedTodo(description);

    expect(validateTodoSpy).toHaveBeenCalledTimes(1);
    expect(validateTodoSpy).toHaveBeenCalledWith(mockCleanDescription);
  });

  test('deve chamar makeNewTodo se validateDescription retornou success', () => {
    const description = 'abcd';
    const mockTodo = {
      id: '1',
      description: description,
      createdAt: '2026-09-11T00:55:37.138Z',
    };

    vi.spyOn(
      validateTodoDescriptionMod,
      'validateTodoDescription',
    ).mockReturnValue({
      success: true,
      errors: [],
    });

    const makeNewTodoSpy = vi
      .spyOn(makeNewTodoMod, 'makeNewTodo')
      .mockReturnValue(mockTodo);

    makeValidatedTodo(description);

    expect(makeNewTodoSpy).toHaveBeenCalledTimes(1);
    expect(makeNewTodoSpy).toHaveBeenCalledWith(description);
  });

  test('deve retornar erro se validateDescription falhar', () => {});
  const description = 'abc';
  const mockTodoError = ['Description inválida'];

  vi.spyOn(
    validateTodoDescriptionMod,
    'validateTodoDescription',
  ).mockReturnValue({
    success: false,
    errors: mockTodoError,
  });

  const makeNewTodoSpy = vi.spyOn(makeNewTodoMod, 'makeNewTodo');

  makeValidatedTodo(description);

  expect(makeNewTodoSpy).not.toHaveBeenCalled();
});
