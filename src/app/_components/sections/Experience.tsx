import React from 'react';
import { Chip, ExternalLink } from '@/_components';
import { DoodleRainbow, DoodleSun, DoodleSwirlLeft } from '@/_components/doodles';
import { experience } from '@/_data/resume';
import styles from '@/_styles/experience.module.scss';

interface ExperienceItem {
    company: {
        name: string;
        location?: string;
    };
    position: {
        title: string;
        duration?: string;
    }[];
    summary: {
        duration: string;
        content: string;
    };
    technologies: string[];
};

const Experience: React.FC = () => (
    <div className={styles['experience-container']}>
        <DoodleSwirlLeft/>
        <span>
            <DoodleRainbow/>
        </span>
        <span>
            <DoodleSun/>
        </span>
        <h2>Experience</h2>
        <div className={styles.experiences}>
            {experience.map((item, i) => {
                const { company, position, summary, technologies } = item as ExperienceItem;
                const { duration, content } = summary;
                return (
                    <div key={`experience-${i}`}>
                        <h3>{company.name}</h3>
                        <span className={styles.duration}>{duration}</span>
                        {position.map(({ title }, j) => (
                            <span className={styles.position} key={`experience-${i}_position-${j}`}>{title}</span>
                        ))}
                        <p>{content}</p>
                        <Chip items={technologies} name={`experience-${i}_tech`} />
                    </div>
                );
            })}
            <p className={styles.resume}><ExternalLink url="/resume" text="View full resume"/></p>
        </div>
    </div>
);

export default Experience;