import {About, Experience, Section, Works} from '@/_components';

const Main = () => {

    const sections = {
        about: <About />,
        experience: <Experience />,
        works: <Works />
    };

    return (
        <main>
            {Object.keys(sections).map((id) => (
                <Section key={id} id={id}>
                    {sections[id]}
                </Section>
            ))}
        </main>
    )
};

export default Main;