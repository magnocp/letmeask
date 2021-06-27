import { Link, useHistory, useParams } from 'react-router-dom';

import { Button } from '../../components/Button';
import { RoomCode } from '../../components/RoomCode';


import logoImg from '../../assets/images/logo.svg';

import './styles.scss';
import { database } from '../../services/firebase';

type RoomParams = {
    id: string;
}

export function Header() {
    const history = useHistory();
    const params = useParams<RoomParams>();
    const roomId = params.id;

    async function handleEndRoom() {
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date(),
        })

        history.push('/');
    }

    return (
        <header>
            <div className="content">
                <Link to="/"><img src={logoImg} alt="Letmeask" /></Link>
                <div>
                    <RoomCode code={roomId} />
                    <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
                </div>
            </div>
        </header>
    );
}