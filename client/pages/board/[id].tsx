import type { NextPage, NextPageContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useBoardState } from '../../whiteboard/state/useBoardState';
import Whiteboard from '../../whiteboard';
import { useSocket } from '../../whiteboard/socket/useSocket';
import { BoardNav } from '../../components/navigation/board-nav';
import { Messenger } from '../../components/chat/messenger';
import Pallette from 'components/pallette';
import { useBoardStateLoader } from 'api/board/loadBoardState';
import { securePageLoad } from 'api/auth/securePageLoad';
import { useEffect } from 'react';

type Props = {
    id: string
}

const WhiteboardPage: NextPage<Props> = ({ id }) => {
    const [state, dispatch] = useBoardState();
    const updater = useSocket(id, dispatch);
    const { data, isLoading } = useBoardStateLoader(id);

    useEffect(() => {
        dispatch({
            type: "setup-state",
            payload: {
                widgets: data.widgets,
                chat: data.chat,
                lines: data.lines,
                users: data.users,
            }
        })
    }, [data])

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
            <Messenger users={state.users} messages={state.chat} send={updater} />
            <Whiteboard state={state} dispatch={updater} />
        </>
    )
}

export async function getServerSideProps(ctx: NextPageContext) {
    const { id } = ctx.query as { id: string }
    await securePageLoad(ctx);
    return {
        props: {
            id
        }
    }
}

export default WhiteboardPage
