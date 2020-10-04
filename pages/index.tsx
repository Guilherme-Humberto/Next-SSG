import { GetStaticProps } from 'next'
import '../styles/Home.module.css'

export default function Home({ user }) {
  return (
    <>
      <style jsx>{`
        div.container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin: 5% 0;
        }
        img {
          border-radius: 50%;
          height: 200px
        }
        button#btnperfil {
          width: 150px;
          padding: 10px 5px;
          border: transparent;
          background: #e1e1e1;
          color: #121212;
          font-weight: bold;
        }
      `}
      </style>

      <div className="container">
        <img src={user.avatar_url} alt="" />
        <h1 id="nameuser">{user.login}</h1>
        <a href={user.html_url}><button id="btnperfil">Ver Perfil</button></a>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch("https://api.github.com/users/guilherme-humberto")
  const data = await response.json()

  return {
    props: {
      user: data
    },
    revalidate: 10
  }
}