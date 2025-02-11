import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useLoginInfoStore } from '@/stores/loginInfo.store';

import { AllowCard } from '@components/Participation/components/AllowCard';

import { Member } from '@type/models';

import { PATH_NAME } from '@consts/pathName';

import { AllowCardGroup, Main } from './Participation.style';

type ParticipationProps = {
  id: Member['id'];
  waitingMembers: Member[];
  handleGuestAction: (memberId: number, action: '확정' | '거절') => void;
};

export const Participation = ({
  id,
  waitingMembers,
  handleGuestAction,
}: ParticipationProps) => {
  const navigate = useNavigate();
  const loginInfo = useLoginInfoStore((state) => state.loginInfo);

  useEffect(() => {
    if (!loginInfo?.id) {
      navigate(PATH_NAME.LOGIN);
      return;
    }
    const { id: myId } = loginInfo;

    if (id !== Number(myId)) {
      navigate(PATH_NAME.LOGIN);
      return;
    }
  }, [id, navigate]);

  const moveToProfile = (memberId: number) => {
    navigate(PATH_NAME.GET_PROFILE_PATH(String(memberId)));
  };

  return (
    <Main>
      <AllowCardGroup>
        {waitingMembers.map(({ ...props }: Member) => (
          <AllowCard
            key={props.id}
            member={props}
            onClickProfile={() => moveToProfile(props.id)}
            onClickAllowButton={() => handleGuestAction(props.id, '확정')}
            onClickDisallowButton={() => handleGuestAction(props.id, '거절')}
          />
        ))}
      </AllowCardGroup>{' '}
    </Main>
  );
};
