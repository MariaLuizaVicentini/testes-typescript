import { makeValidatedTodo } from './make-validated-todo';
import * as validateTodoDescriptionMod from '../schemas/validate-todo-description';
import * as sanitizeStrMod from '../../utils/sanitize-str';

describe('makeValidatedTodo (unit)', () => {
  test('deve chamar a funcao sanitizeStr com description', () => {
    const { description, sanitizeStrSpy } = makeMocks();
    makeValidatedTodo(description);
    expect(sanitizeStrSpy).toHaveBeenCalledExactlyOnceWith(description);
  });

  test('deve chamar validateTodoDescription com o retorno de sanitizeStr', () => {});
  const { description, sanitizeStrSpy, validaTodoDescriptionSpy } = makeMocks();

  const sanitizeStrReturn = 'Retorno da sanitizeStr';
  sanitizeStrSpy.mockReturnValue(sanitizeStrReturn);

  makeValidatedTodo(description);

  expect(validaTodoDescriptionSpy).toHaveBeenCalledExactlyOnceWith(
    sanitizeStrReturn,
  );
});

// helpers pra esse teste unitario, somente !!!
const makeMocks = (description = 'abcd') => {
  const sanitizeStrSpy = vi
    .spyOn(sanitizeStrMod, 'sanitizeStr')
    .mockReturnValue(description);

  const validaTodoDescriptionSpy = vi
    .spyOn(validateTodoDescriptionMod, 'validateTodoDescription')
    .mockReturnValue({
      errors: [],
      success: true,
    });

  return {
    description,
    sanitizeStrSpy,
    validaTodoDescriptionSpy,
  };
};
