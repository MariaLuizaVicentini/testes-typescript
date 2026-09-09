import { sanitizeStr } from './sanitize-str';

describe('sanitize str (unit)', () => {
  test('deve retornar uma string vazia quando recebe um valor falsy', () => {
    const s = '';
    const resul = sanitizeStr(s);
    expect(resul).toBe('');
  });

  test('retorna uma string vazia quando recebe um valor que NAO é uma string', () => {
    const s = 123;
    const resul = sanitizeStr(s);
    expect(resul).toBe('');
  });

  test('deve garantir que os espacamentos da ponta sejam removidos', () => {
    const s = '   a     ';
    const resul = sanitizeStr(s);
    expect(resul).toBe('a');
  });

  test('deve garantir que a string é normalizada com NFC', () => {
    const original = 'e\u0301';
    const expected = 'é';
    const resul = sanitizeStr(original);
    expect(resul).toBe(expected);
  });
});
