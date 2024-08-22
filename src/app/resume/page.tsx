import React from 'react';
import {header, experience, contact, skills} from '@/_data/resume';
import styles from '@/_styles/resume.module.scss';

export const metadata = {
	title: 'Resume'
};

interface ExperienceItem {
    company: {
        name: string;
        location: string;
    };
    position: {
        title: string;
        duration: string;
    }[];
    description: {
    	title: string;
    	details: string[];
    }[];
};

interface Contact {
	[icon: string]: {
	    text: string;
	    href?: string;
	}
}

interface SkillItem {
	title: string; 
	contents: string;
}

const Resume = () => {
	return (
		<div className={styles.container}>
			<a href={`/resume.pdf`} target="_blank" className={styles.download}>Download PDF</a> 
			<header className="flex">
				<h1>{header.title}</h1>
				<h2>{header.position}</h2>
				<p>{header.statement}</p>
			</header>
			<main className={`clearfix ${styles.resume}`}>
				<section className={styles.experience}>
					<h2>Experience</h2>
					{experience.map(({company, position, description}: ExperienceItem, i: number) => {
						return (
							<div key={`experience-${i}`}>
								<h3>{company.name} • {company.location}</h3>
								{position.map(({title, duration}, j) => (
									<p key={`experience-${i}_position-${j}`} className="flex">
										<span>{title}</span>
										<span>{duration}</span>
									</p>
								))}
								{description.map(({title, details}, k) => (
									<div key={`experience-${i}_description-${k}`}>
										{title ? <h4>{title}</h4> : null}
										<ul className={styles.description}>
											{details.map((detail, l) => <li key={`experience-${i}_description-${k}_details-${l}`}>{detail}</li>)}
										</ul>
									</div>
								))}
							</div>
						);
					})}
				</section>
				<section className={styles.contacts}>
					<h2>Contact</h2>
					<ul className={styles.contact}>
						{Object.entries(contact as Contact).map(([icon, value]) => {
							const {text, href} = value;
							return (
								<li className={styles[icon]} key={`contact-${icon}`}>
									{href ? <a href={href} target="_blank" rel="noopener noreferrer">{text}</a> : text}
								</li>
							);
						})}
					</ul>
				</section>
				<section className={styles.skills}>
					<h2>Skills</h2>
					{skills.map(({title, contents}: SkillItem, i: number) => (
						<div key={`skills-${i}`}>
							<h3>{title}</h3>
							<p>{contents}</p>
						</div>
					))}
				</section>
				{/*<section className={styles.education}>
					<h2>Education</h2>
					<div>
						<h3>{education.type}</h3>
						<p>{education.school}, <br/>{education.text}</p>
					</div>
				</section>*/}
			</main>
		</div>
	)
};

export default Resume;