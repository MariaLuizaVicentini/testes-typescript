# Testes Unitarios

Devem testar a menor parte isolada do código.

Caracteristicas:
- **ISOLAMENTO**: Uso de mock pra simular dependencias
- **RÁPIDO**: execucao em ms
- **FOCO UNICO**: um teste deve validar UM comportamento


# Objeto `vi.` do Vitest

É um objeto utilitário que disponibiliza diversos métodos para simular funções, módulos/imports, variáveis globais e variáveis de ambiente, entre outras coisas.

---

## `vi.mock()` - Substitui

- Simula módulos/imports.
- Usado quando não queremos executar a implementação real de uma dependência.
 -Permite testar a sua função sem depender do comportamento real daquela dependência.


CASO DE USO:
Especialmente quando queremos testar uma função que depende de funções de outros módulos.
Para isso, usamos mocks, que simulam o módulo e seus retornos, apenas para permitir que a função seja executada durante o teste.
Exemplos de dependências que podem ser mockadas:

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
#### `modulo`
- importacao real do modulo que vai ser mocado 
Ex:
```ts
vi.mock('../service/api')
```
- É usado quando o teste não precisa se preocupar com a lógica interna do módulo.

Quando usado dessa forma:
- As funções exportadas pelo módulo são substituídas por vi.fn.
- As funções não possuem uma lógica definida.
- Por isso, retornam undefined.


#### `fabrica`
```ts
vi.mock('../service/api', () => {
    return {
        sanitizeStr: v.fn((description) => description.trim()),
        validateTodoDescription: vi.fn().mockReturnValue(true),
        makeNewTodo: vi.fn(),
    }
});
```
- A fabrica recebe uma função (factory) que retorna um objeto simulado.
- É usada quando precisamos controlar a lógica ou o retorno de uma função do módulo mockado

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
import * as nameMod from '../dir/nameDoMod' 

vi.spyOn(objeto, metodo)
vi.spyOn(objeto, metodo).mockReturnValue(valor)
vi.spyOn(objeto, metodo).mockResolvedValue(valor)
vi.spyOn(objeto, metodo).mockRejectedValue(erro)
```
#### `import * as nameMod`
- empacota todas as exportações do Mod em um único objeto, permitindo que o Vitest monitore as chamadas
- É uma forma de respeitar a sintaxe do vi.spyOn, que espera um objeto como primeiro argumento

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
