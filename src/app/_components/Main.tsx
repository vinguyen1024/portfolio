import React from 'react';
import { About, Experience, Section, Works } from '@/_components';

interface Props {
    updateActiveElement: (activeId: string) => void;
};

type SectionKey = 'about' | 'experience' | 'works';

const Main: React.FC<Props> = ({ updateActiveElement }) => {
    const sections: Record<SectionKey, React.ReactElement> = {
        about: <About />,
        experience: <Experience />,
        works: <Works />
    };

    return (
        <main>
            {Object.keys(sections).map((key) => {
                const id = key as SectionKey;
                return (
                    <Section key={id} id={id} updateActiveElement={updateActiveElement}>
                        {sections[id as SectionKey]}
                    </Section>
                )
            })}
        </main>
    );
};

export default Main;
