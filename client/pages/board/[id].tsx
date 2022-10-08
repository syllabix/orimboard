import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useBoardState } from '../../whiteboard/state/useBoardState';
import Whiteboard from '../../whiteboard';
import { useSocket } from '../../whiteboard/socket/useSocket';
import { BoardNav } from '../../components/navigation/board-nav';
import { Messenger } from '../../components/chat/messenger';
import Pallette from 'components/pallette';
import { loadWidgets } from 'api/board/useWidgets';

const WhiteboardPage: NextPage = () => {
    const { id } = useRouter().query as { id: string }
    const [state, dispatch] = useBoardState();
    const updater = useSocket(id, dispatch)
    loadWidgets(id, dispatch);

    return (
        <>
            <Head>
                <title>orim | simple collaboration</title>
                <meta name="description" content="a lean mean collaboration app" />
                <link rel="icon" href="/favicon.ico" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, shrink-to-fit=no"
                />
            </Head>
            <BoardNav boardname="My Awesome Board" />
            <Pallette onUpdate={updater} />
            <Messenger messages={state.chat} send={updater} />
            <Whiteboard state={state} dispatch={updater} />
        </>
    )
}

export default WhiteboardPage
