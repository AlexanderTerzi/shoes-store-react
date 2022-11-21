import React from 'react';
import ContentLoader from "react-content-loader";

import css from '../Card/Card.module.scss';

const Skeletons: React.FC = () => {
    return (
        <div className={css.cardWrap}>
            <div className={css.card}>
                <ContentLoader
                    speed={2}
                    width={155}
                    height={250}
                    viewBox="0 0 150 265"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                >
                    <rect x="0" y="0" rx="10" ry="10" width="150" height="112" />
                    <rect x="0" y="187" rx="10" ry="10" width="100" height="15" />
                    <rect x="0" y="167" rx="10" ry="10" width="155" height="15" />
                    <rect x="0" y="234" rx="10" ry="10" width="80" height="25" />
                    <rect x="117" y="230" rx="10" ry="10" width="32" height="32" />
                </ContentLoader>
            </div>
        </div>
    );
};

export default Skeletons;