import {forwardRef} from 'react';
import styles from '/styles/section.module.scss';

const section = forwardRef(({id, flex = true,children}, ref) => (
	<section id={id} ref={ref} className={['page-sections', flex ? 'flex' : null, styles.container].join(' ')}>
		<div>
			{children}
		</div>
	</section>
));

export default section;