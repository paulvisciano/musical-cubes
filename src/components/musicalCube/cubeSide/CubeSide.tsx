import { IonGrid, IonRow, IonCol, IonSpinner } from '@ionic/react';
import React, {
    useState
} from "react";
import CubeSideToolbar from '../toolbar/Toolbar';
import "./CubeSide.css";
import { Size } from '../interfaces/Size';
import WaveSurferInstance from '../waveSurferInstance/WaveSurferInstance';
import { useSelector, useStore } from 'react-redux';
import { AppState } from 'store/store';

interface SideOptions {
    id: string;
    index: number;
    size: Size;
    sound: string,
    enableLoop?: boolean;
    enableSync?: boolean;
    startGlobalTimeTracker: any;
    getSharedTrackTime: any;
};

export const CubeSide: React.FC<SideOptions> = ({ index, size, enableLoop = true, ...props }) => {
    let [loop, setLoop] = useState(enableLoop);
    let [loading, setLoading] = useState(true);
    let [showToolbar, setShowToolbar] = useState(false);
    let activeIndex = 0;
    let isActive = true;

    return (
        <div className={`cube-side ${index === activeIndex ? 'active' : ''}`}>
            <IonGrid>
                <IonRow>
                    <IonCol>
                        <div style={{ height: size.height, width: size.width }}>
                            {loading && isActive && <IonSpinner className='loading-spinner' name={"lines-sharp-small"} duration={1800} />}

                            <WaveSurferInstance className={`${loading ? 'hide' : ''}`} showInstrument={isActive} size={size} loop={loop} setLoading={setLoading} setShowToolbar={setShowToolbar} {...props} />

                        </div>
                    </IonCol>
                </IonRow>
            </IonGrid>

            {showToolbar && <CubeSideToolbar loop={loop} setLoop={setLoop} enableLoop={enableLoop} />}
        </div>
    );
};
