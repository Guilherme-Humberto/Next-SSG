This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Sobre SSG

SSG (Static Site Generation) e suas propriedades, que vêm presentes nas últimas versões do Next.js, torna muito melhor a experiência do usuário, já que a página não precisa ser toda carregada sempre que o lado cliente faz uma requisição.

````
Mesmo com esse nome, as páginas estáticas se apresentam bem dinâmicas e essa é a “mágica” que o Next.js nos proporciona. Usando as funções “getStaticProps” e “getStaticPaths” e as propriedades “fallback” e “revalidate”, a geração de páginas estáticas é feita de forma dinamizada, facilita o lado dos desenvolvedores e otimiza o acesso dos clientes.

````

- getStaticProps

É a “primeira parte” da implementação, a função que busca os dados que se transformarão nas páginas estáticas. Para ilustrar, vou usar a geração de páginas para repositórios do GitHub como exemplo: a getStaticProps é onde a busca pelos repositórios é feita (via API) e retornada para a função getStaticPaths para, assim, transformar cada repositório em uma página diferente. busca pelas propriedades é feita em tempo de construção, ou seja, ao fazer o build do site;

- revalidate

E se um novo repositório for criado, deve-se fazer outro build? Não, para isso existe o parâmetro revalidate, que é passado como parte do retorno da getStaticProps. O revalidate define de quanto em quanto tempo a consulta à API será feita “por trás dos panos” para manter as páginas estáticas com informações atualizadas sem que precise ser feito um carregamento do lado do cliente a cada requisição. Para ilustrar: em um blog, por exemplo, a revalidação dos dados pode ser feita de 5 em 5 minutos, já que não tem um grande fluxo de dados; mas, por outro lado, em um site de e-commerce, a revalidação pode ser feita de 20 em 20 segundos, já que os preços podem ser mudados a qualquer momento;

- getStaticPaths

Depois de entender e implementar a getStaticProps para receber os dados, é hora de transformar em páginas: na função getStaticPaths, um dos parâmetros do retorno é a variável “path”, contém os nomes das páginas que serão geradas. Ao fazer o build do site, o servidor renderiza as páginas para cada “path” recebido do getStaticProps e as deixa construídas para que, ao serem requisitadas pelo usuário, sejam entregues de prontidão;

- fallback

E se o site for um e-commerce com milhares de produtos, o servidor vai renderizar uma página para cada produto e as deixar armazenadas? Nãaaao, é aí que o fallback entra. Geralmente, as buscas da API são feitas com paginação, para que ocorram de maneira rápida e buscando apenas os dados mais relevantes para determinado contexto (produtos mais baratos, produtos mais vendidos etc). Sem a implementação do fallback, quando um elemento que não foi buscado é chamado, o site apresenta uma página de erro. Para que seja evitado, o fallback deve ser passado com o valor “true” no retorno da getStaticPaths. Com isso, caso o dado solicitado não existe, o servidor faz uma busca por ele na API e, se encontrar, gera a página relativa a ele e a exibe para o cliente. No “componente principal”, o “isFallback” deve ser tratado para que, enquanto o servidor faz a busca, o cliente veja uma “página de preenchimento” e tenha uma melhor experiência.