import {Chip, Section} from '@/_components';
import {experience} from '@/_data/resume';
import styles from '/styles/experience.module.scss';

const Experience = () => (
	<Section id="experience">
		<h2>Experience</h2>
        {experience.map(({company, position, summary, technologies}, i) => {
        	const {duration, content} = summary;
			return (
				<div className={styles.container} key={`experience-${i}`}>
					<h3>{company.name}</h3>
					<span className={styles.duration}>{duration}</span>
					{position.map(({title}, j) => (
						<span className={styles.position} key={`experience-${i}_position-${j}`}>{title}</span>
					))}
					<p>{content}</p>
					<Chip items={technologies} name={`experience-${i}_tech`} />
				</div>
			);
		})}
	</Section>
);

export default Experience;