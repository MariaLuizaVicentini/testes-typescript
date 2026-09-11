# Objeto `vi.` do Vitest

É um objeto utilitário que disponibiliza diversos métodos para simular funções, módulos/imports, variáveis globais e variáveis de ambiente, entre outras coisas.

---

## `vi.mock()` - Substitui

- Simula módulos/imports.
- Usado quando não queremos executar a implementação real de uma dependência.
- Permite testar a sua função, e não o comportamento daquela dependência.

CASO DE USO:
- API
- Serviço
- Banco de dados
- Módulo de autenticação

SINTAXE:

```ts
vi.mock(modulo)
vi.mock(modulo, fabrica)
vi.mock(modulo, fabrica, opcoes)
```

---

## `vi.spyOn()` - Observa

- Observa de perto a funcao pra gravar tudo o que acontece quando ela é chamada
- Também pode substituir temporariamente o comportamento da função.

Quando aplicamos o spyOn, o vitest passa a registrar automaticamente:
- Quantas vezes o método que está sendo observado foi chamado
- Com quais argumentos/parms foi chamado
- Se lançou algum erro durante a execuçao

CASO DE USO:
- Verificar chamadas de métodos.
- Observar funções de serviços.
- Observar APIs ou funções nativas.
- Controlar temporariamente o retorno de uma função.

SINTAXE:

```ts
vi.spyOn(objeto, metodo)
vi.spyOn(objeto, metodo).mockReturnValue(valor)
vi.spyOn(objeto, metodo).mockResolvedValue(valor)
vi.spyOn(objeto, metodo).mockRejectedValue(erro)
```
#### `mockReturnValue`
- Usado para simular o retorno de uma função comum (síncrona / não async)
#### `mockResolvedValue`
- Usado para simular o retorno de sucesso de uma função async (devolve uma Promise resolvida)
#### `mockRejectedValue`
- Usado para simular um erro em uma função async (devolve uma Promise rejeitada)



---

## `vi.stubGlobal()` - Substitui Global

- Substitui temporariamente uma variável global durante o teste.
- Permite controlar uma API ou variável disponível globalmente no ambiente de execução.
- É útil quando o código testado depende de um recurso global.

CASO DE USO:
- `window`
- `document`
- `fetch`
- `navigator`

SINTAXE:

```ts
vi.stubGlobal(nome, valor)
vi.unstubAllGlobals()
```

---

## `vi.stubEnv()` - Substitui Env

- Substitui temporariamente uma variável de ambiente.
- Permite controlar configurações do ambiente durante o teste.
- É útil para testar comportamentos que dependem de diferentes valores de configuração.

CASO DE USO:
- URL de API
- Modo de execução
- Feature flags
- Configurações de ambiente

SINTAXE:

```ts
vi.stubEnv(nome, valor)
vi.unstubAllEnvs()
```

---

## `vi.mocked()` - Tipa os mocks

- Faz o TypeScript reconhecer um item como mock.
- Não cria o mock por si só.
- É principalmente uma ferramenta de tipagem para trabalhar com mocks criados pelo Vitest.

CASO DE USO:
- Quando um módulo já foi mockado com `vi.mock()`.
- Quando o TypeScript não reconhece automaticamente uma função como mock.

SINTAXE:

```ts
vi.mocked(item)
vi.mocked(item, opcoes)
```

---

## Resumo para decorar

| Método | Ideia | Controla |
|---|---|---|
| `vi.mock()` | Substitui | Módulo |
| `vi.spyOn()` | Observa | Função/método |
| `vi.stubGlobal()` | Substitui Global | Variável global |
| `vi.stubEnv()` | Substitui Env | Variável de ambiente |
| `vi.mocked()` | Tipa | Mock no TypeScript |
