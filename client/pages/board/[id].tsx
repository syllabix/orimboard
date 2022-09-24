import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useBoardState } from '../../components/board/useBoardState';

const Whiteboard: NextPage = () => {
    let router = useRouter();
    const { id } = router.query;
    const [state, dispatch] = useBoardState(id as string);

    return (
        <div className="flex items-center justify-center h-screen">
            <Head>
                <title>orim | collaborate. simply.</title>
                <meta name="description" content="a lean mean collaboration app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="card w-96 bg-base-100 shadow-xl text-left p-4 border">
                <h1>o r i m</h1>
                <h3>collaborate. simply.</h3>
                <p>opening board {id}....</p>
                <div>
                    {state.chat.map(chat => <p key={chat.text}>{chat.text}</p>)}
                </div>
            </div>

            <footer>

            </footer>
        </div>
    )
}

export default Whiteboard
