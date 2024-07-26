import Link from 'next/link';
import {useRouter} from 'next/navigation';

// component definition
const ScrollLink = ({ getActiveElement, children, ...props }) => {
const router = useRouter();

  const handleScroll = e => {
	e.preventDefault()
	const {targetId, href} = e.currentTarget.dataset;
	const elem = document.getElementById(targetId);

	// window.scrollTo({
	// 	top: elem?.getBoundingClientRect().top,
	// 	behavior: "smooth"
	// });
	elem.scrollIntoView({behavior: "smooth"});

	scrollIntoViewCallback(elem, () => {
		// callback to replace router and set active navigation
		// once element is scrolled into view
		router.replace(href);

		if (getActiveElement){
			getActiveElement(targetId == 'header' ? false : href);
		}
	});
  };
  return (
	<Link {...props} scroll={false} replace={true} onClick={handleScroll}>
		{children}
	</Link>
  );
};
export default ScrollLink;