import React from 'react';
import { DoodleArrowDown, DoodleMoon, DoodleSparkle } from '@/_components/doodles';
import styles from '@/_styles/about.module.scss';

const About = () => (
    <div className={styles['about-container']}>
        <DoodleArrowDown/>
        <span>
            <DoodleSparkle/>
        </span>
        <span>
            <DoodleMoon/>
        </span>
        <h2>About</h2>
        <div>
            <p>My love for web development began in the late '90s from a friend who showed me her GeoCities page. The cute colors and fun JS effects got me hooked, and I pretty much was set out to make my own page, learning what at the time was perhaps the best method: copying and pasting from the source code. I continued my hobby by customizing profiles on Xanga, LiveJournal, MySpace, and creating WordPress templates all through middle school and up to my 20s.</p>
            <p>I eventually landed a data entry job, but my interest in web development helped shift my role. My manager, who became my mentor, taught me semantic HTML, SEO, CSS, JavaScript, jQuery, some PHP and Photoshop. That really ignited my love for front-end development. A few years later, I joined my mentor when he started his own company, which expanded my front and back-end knowledge with React.js, PHP, Python, Next.js, and Sass. Working there really shaped me into the developer I am today.</p>
            <p>When I'm not on the computer coding, I like to spend my time with creative hobbies like crafting, being a bedroom DJ, learning piano and music production, and cooking. I also love electronic music and going to festivals, playing video games like Final Fantasy or Kingdom Hearts, and hanging out with my dog.</p>
        </div>
    </div>
);

export default About;