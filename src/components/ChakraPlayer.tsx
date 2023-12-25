import React, { useEffect, useRef, useState } from 'react';
import { ChakraInterface } from './Chakra';
import './ChakraPlayer.css'
import { Animation } from '@ionic/react';
import { SingingBowl, SoundBowlGestureEnum } from 'instruments/SingingBowl';
import pulsating from 'animations/pulsating';
import rotation from 'animations/rotation';
import ChakraShape from './chakraShape/ChakraShape';
import ChakraCenter from './chakraCenter/ChakraCenter';
import { useDispatch } from 'react-redux';
import { sheetMusicSlice } from 'store/sheetMusicSlice';

const ChakraPlayer: React.FC<{ chakra: ChakraInterface }> = ({ chakra }) => {
    const dispatch = useDispatch();

    const singingBowl = new SingingBowl();

    const [soundIsPlaying, setSoundIsPlaying] = useState(false);

    const chakraShapeRef = useRef<HTMLDivElement>(null);
    const chakraCircleRef = useRef<HTMLDivElement | null>(null);
    const rotationAnimation = useRef<Animation | null>(null);
    const pulsatingAnimation = useRef<Animation | null>(null);

    useEffect(rotation(rotationAnimation, chakraShapeRef), [chakraShapeRef]);
    useEffect(pulsating(pulsatingAnimation, chakraCircleRef), [chakraCircleRef]);

    //TODO : handle a sound ending via redux
    // const [play, { sound, pause }] = useSound(singingBowl.getSoundPath(chakra.note, SoundBowlGestureEnum.Glide), { volume: 0.2 });

    // sound?.on('end', () => {
    //     setSoundIsPlaying(false);
    //     rotationAnimation.current?.pause();
    //     pulsatingAnimation.current?.pause();
    // })

    const toggle = () => {
        let payload = { instrument: singingBowl.name };
        let soundKey = singingBowl.getSoundKey(SoundBowlGestureEnum.Glide, chakra.note);

        if (soundIsPlaying) {
            rotationAnimation.current?.pause();
            pulsatingAnimation.current?.pause();
            dispatch(sheetMusicSlice.actions.stop(payload, { sound: { stop: soundKey} }));
            setSoundIsPlaying(false);
        } else {
            rotationAnimation.current?.play();
            pulsatingAnimation.current?.play();
            dispatch(sheetMusicSlice.actions.play(payload, { sound: { play: soundKey } }));
            setSoundIsPlaying(true);
        }
    };

    return (
        <ChakraShape reference={chakraShapeRef} chakra={chakra}>
            <div ref={chakraCircleRef} className={`chakra-player ${chakra.nameAsString}-player ${soundIsPlaying ? 'is-playing' : ''}`} onClick={toggle
            }>
                <ChakraCenter chakra={chakra} />
            </div>
        </ChakraShape>
    );
}

export default ChakraPlayer;