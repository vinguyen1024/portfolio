import React from 'react';
import { Chip, ExternalLink } from '@/_components';
import { experience } from '@/_data/resume';
import styles from '@/_styles/experience.module.scss';

interface ExperienceItem {
    company: {
        name: string;
    };
    position: {
        title: string;
    }[];
    summary: {
        duration: string;
        content: string;
    };
    technologies: string[];
};

const Experience: React.FC = () => (
    <>
        <h2>Experience</h2>
        <div className={styles.container}>
            {experience.map((item: ExperienceItem, i: number) => {
                const { company, position, summary, technologies } = item;
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
    </>
);

export default Experience;