import {About, Experience, Section, Works} from '@/_components';

const Main = ({getActiveElement}) => {

    const sections = {
        about: <About />,
        experience: <Experience />,
        works: <Works />
    };

    return (
        <main>
            {Object.keys(sections).map((id) => (
                <Section key={id} id={id} getActiveElement={getActiveElement}>
                    {sections[id]}
                </Section>
            ))}
        </main>
    )
};

export default Main;