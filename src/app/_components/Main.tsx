import {About, Experience, Works} from '@/_components';

const Main = () => (
    <main>
        { /*sections.map(({id, content}, i) => (
            <Section key={id} id={id} ref={el => sectionRef[id] = el}>
                <div dangerouslySetInnerHTML={{__html: content}} />
            </Section>
        ))*/ }
        <About />
        <Experience />
        <Works />
    </main>
);

export default Main;