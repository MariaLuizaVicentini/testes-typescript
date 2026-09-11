import { makeValidatedTodo } from './make-validated-todo';
import { validateTodoDescription } from '../../todo/schemas/validate-todo-description';
import * as sanitizeStrMod from '../../utils/sanitize-str';
import * as validateTodoDescriptionMod from '../../todo/schemas/validate-todo-description';

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
    const description = 'abcd';

    const validateTodoSpy = vi.spyOn(
      validateTodoDescriptionMod,
      'validateTodoDescription',
    );

    validateTodoDescription(description);

    expect(validateTodoSpy).toHaveBeenCalledTimes(1);
    expect(validateTodoSpy).toHaveBeenCalledWith(description);
  });

  test('deve chamar makeNewTodo se validateDescription retornou success', () => {});

  test('deve retornar erro se validateDescription falhar', () => {});
});
