import { makeValidatedTodo } from './make-validated-todo';
import * as sanitizeStrMod from '../../utils/sanitize-str';

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

  test('deve chamar a funcao validateTodoDescription com description sanitizada', () => {});

  test('deve chamar makeNewTodo se validateDescription retornou success', () => {});

  test('deve retornar erro se validateDescription falhar', () => {});
});
