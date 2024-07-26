/**
 * scrollIntoViewCallback
 * 
 * scrollIntoView currently doesn't have a callback functionality,
 * so we're creating an IntersectionObserver to detect if the element
 * is fully visible
 * 
 * @param {*} element 
 * @param {*} callback
 */
const scrollIntoViewCallback = (element, callback) => {
	const observe = (entries, observer) => {
		entries.forEach(entry => {
			if (entry.target === element && entry.intersectionRatio >= 0.90) {
	
				// The element is now fully visible
				callback(this);
	
				// Stop listening for intersection changes
				observer.disconnect();
	
			}
		});
	}
	
	let observer = new IntersectionObserver(observe, {
		root: null,
		rootMargin: '0px',
		threshold: 0.90,
	});
	
	observer.observe(element);
}

export default scrollIntoViewCallback;