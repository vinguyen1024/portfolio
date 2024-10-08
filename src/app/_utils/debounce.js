// Originally inspired by  David Walsh (https://davidwalsh.name/javascript-debounce-function)

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// `wait` milliseconds.
const debounce = (func, wait = 300) => {
      let timeout;
      
      // This is the function that is returned and will be executed many times
      // We spread (...args) to capture any number of parameters we want to pass
      return function (...args) {
            const context = this;
            // The callback function to be executed after 
            // the debounce time has elapsed
            const later = () => {
                // null timeout to indicate the debounce ended
                timeout = null;
                  
                // Execute the callback
                func.apply(context, args);
            };
            // This will reset the waiting every function execution.
            // This is the step that prevents the function from
            // being executed because it will never reach the 
            // inside of the previous setTimeout  
            if (timeout) {
                clearTimeout(timeout);
            }
            
            // Restart the debounce waiting period.
            // setTimeout returns a truthy value (it differs in web vs Node)
            timeout = setTimeout(later, wait);
      };
};

export default debounce;