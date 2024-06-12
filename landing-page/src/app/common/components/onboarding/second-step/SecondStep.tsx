'use client';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SecondStepFormValues } from './secondStep';
import { Button } from '../../button/Button';
import CheckboxCommunityChip from '../checkbox-community-chip/CheckboxCommunityChip';
import { redirect, useRouter } from 'next/navigation';
import { isFirstTime } from '@/cookies/cookies';
import ChannelService from '@/services/channelService';
import { useAuth } from '@/app/hooks/useAuth';
import { getUserInfo } from '@/utils/getUserInfo';
import axios from 'axios';
import { API_URL } from '@/services/dataService';
import { url } from 'inspector';

// const COMMUNITIES_URL = 'https://communities.eze.wiki/';
const COMMUNITIES_URL: any = process.env.NEXT_PUBLIC_COMMUNITIES_URL;
const config = {
  headers: {
    'content-type': 'application/json',
  },
};

// Getting new info from user

// Joining request
const joinChannel = async ({ channelId, userId, url }: any) => {
  console.log('channelId', channelId);
  console.log('userId', userId);

  const response = await axios.post(
    `${url}/channels/join/${channelId}`,
    { userId },
    config
  );
  return response;
};
const updateChannel = async (
  data: {
    _id: string;
    name: string;

    authRequired: boolean;

    description: string;

    members: number;
  },
  url: string
) => {
  // console.log('channelId', channelId);
  // console.log('userId', userId);

  const response = await axios.put(
    `${url}/channels/update-member`,
    data,
    config
  );
  return response;
};
// const COMMUNITIES_URL = 'https://communities.eze.ink/';
// const COMMUNITIES_URL = 'http://localhost:3001';
// const communities = [
//   {
//     id: 1,
//     name: 'community',
//     title: 'Health Sciences',
//     value: 'Health Sciences',
//     description:
//       'Quantitative researchers on microbiology research. With discussion on advanced technique',
//   },
//   {
//     id: 2,
//     name: 'community',
//     title: 'Mines',
//     value: 'Mines',
//     description:
//       'Mines researchers on microbiology research. With discussion on advanced technique',
//   },
//   {
//     id: 3,
//     name: 'community',
//     title: 'ICT',
//     value: 'ICT',
//     description:
//       'ICT researchers on microbiology research. With discussion on advanced technique',
//   },
//   {
//     id: 4,
//     name: 'community',
//     title: 'Agro-food Sciences',
//     value: 'Agro-food Sciences',
//     description:
//       'Agro-food researchers on microbiology research. With discussion on advanced technique',
//   },
//   {
//     id: 5,
//     name: 'community',
//     title: 'Energy',
//     value: 'Energy',
//     description:
//       'Energy researchers on microbiology research. With discussion on advanced technique',
//   },
//   {
//     id: 6,
//     name: 'community',
//     title: 'Social Sciences',
//     value: 'Social Sciences',
//     description:
//       'Social researchers on microbiology research. With discussion on advanced technique',
//   },
//   ,
//   {
//     id: 7,
//     name: 'community',
//     title: 'Data Analytics',
//     value: 'Data Analytics',
//     description:
//       'Data Anal researchers on microbiology research. With discussion on advanced technique',
//   },
// ];

const SecondStep = () => {
  const [topic, setTopic] = useState<
    {
      authRequired: string;
      createdAt: string;
      description: string;
      name: string;
      order: 0;
      updatedAt: string;
      __v: 0;
      _id: string;
      members?: number;
    }[]
  >();
  const [number, setnumber] = useState<any>();
  const {
    register,
    handleSubmit,
    watch,
    formState: { isValid, errors },
  } = useForm<SecondStepFormValues>();
  const { token, user } = useAuth();
  const [communities, setCommunities] = useState<
    {
      authRequired: string;
      createdAt: string;
      description: string;
      name: string;
      order: 0;
      updatedAt: string;
      __v: 0;
      _id: string;
      members?: number;
    }[]
  >([]);
  // let communities = watch('communities');
  const { push } = useRouter();
  const onSubmit: SubmitHandler<SecondStepFormValues> = (data) => {
    // console.log('clicked');
    // isFirstTime('true');
    // push(COMMUNITIES_URL);
  };

  const handleSend = async () => {
    // isFirstTime('true');
    // push(COMMUNITIES_URL);
    console.log(communities);
  };
  useEffect(() => {
    const response = new ChannelService()
      .channel()
      .then((result) => {
        console.log('result======', result.data);
        setTopic(result.data);
      })
      .catch((error) => {
        console.log('error==============', error);
      });
    console.log('user11111111', number);
    console.log('val11111111111', communities.length);
  }, []);

  useEffect(() => {
    if (typeof number == 'number' && number == communities.length) {
      push(COMMUNITIES_URL);
    }
    console.log('user11111111', number);
  }, [number, communities]);

  const getTopic = (value: {
    authRequired: string;
    createdAt: string;
    description: string;
    name: string;
    order: 0;
    updatedAt: string;
    __v: 0;
    _id: string;
    members: number;
  }) => {
    const tab: any[] = communities.filter((item) => item._id == value._id);
    if (tab.length == 0) {
      const val = communities;
      val.push(value);
      setCommunities(val);
    } else {
      const delTable = communities.filter((item) => item._id != value._id);
      setCommunities(delTable);
    }
  };

  const handleJoin = async () => {
      // push(COMMUNITIES_URL);
    window.location.href = COMMUNITIES_URL;
    // if (communities && communities.length > 0) {
    //   let row = 0;
    //   communities.map(async (item) => {
    //     const joiningDetails = {
    //       userId: JSON.parse(user)?._id,
    //       channelId: item._id,
    //       url: API_URL,
    //     };
    //     try {
    //       const response = await joinChannel(joiningDetails);
    //       if (response.status == 200) {
    //         const res = await updateChannel(
    //           {
    //             _id: item._id,
    //             name: item.name,
    //             authRequired: true,
    //             description: item.description,
    //             members: item.members ? item.members + 1 : 1,
    //           },
    //           API_URL
    //         );
    //         row = row + 1;

    //         // const row = number ? number + 1 : 1;
    //         setnumber(row);
    //       }
    //     } catch (error) {
    //       console.log('error', error);
    //         row = row + 1;

    //       // const row = number ? number + 1 : 1;
    //       // console.log(row);

    //        setnumber(row);
    //     }
    //   });
    //   // row == communities.length && push(COMMUNITIES_URL);
    //   // setnumber(row);
    // } else {
    //   setnumber(0);
    // }
  };
  return (
    <form className="w-11/12" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h1 className="font-bold text-3xl">Choose at least one community</h1>
        <div className="flex mt-6 flex-wrap gap-2">
          {topic &&
            topic.length > 0 &&
            topic?.map((community) => (
              <CheckboxCommunityChip
                description={`${community?.description}`}
                key={community?._id}
                id={`${community?._id}`}
                name={community?.name}
                label={community?.name}
                register={register('communities', { required: true })}
                value={community?._id}
                gettopic={getTopic}
                item={community}
                // getTopic={getTopic}
              />
            ))}
        </div>
      </div>

      <div className="mt-8 w-fit">
        <Button onClick={handleJoin} type="submit" className="w-fit">
          Continue
        </Button>
      </div>
    </form>
  );
};

export default SecondStep;
