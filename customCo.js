import  fetch  from "node-fetch";

/**
 * This code demonstrates the use of the run function to execute a generator function that makes an asynchronous HTTP request
 * and parses the response as JSON. The result of the generator function is then logged to the console.
 */
run(function*(){
    /**
     * This is the generator function that will be executed by the run function.
     * It makes an asynchronous HTTP request to the specified URI and returns the response.
     * It then parses the response as JSON and returns the title of the post.
     */
    const uri = 'https://jsonplaceholder.typicode.com/posts/1';

    /**
     * This line of code makes an asynchronous HTTP request to the specified URI and returns a promise that resolves to the response.
     * The yield keyword is used to return the promise to the run function, which will then wait for the promise to resolve before continuing.
     */
    const response = yield fetch(uri);
    /**
     * This line of code parses the response as JSON and returns a promise that resolves to the parsed JSON.
     * The yield keyword is used to return the promise to the run function, which will then wait for the promise to resolve before continuing.
     */
    const posts = yield response.json();
    /**
     * This line of code extracts the title of the post from the parsed JSON.
     */
    const title = posts.title;
    return title;
}).catch(error => console.log(error.stack))
.then(x => console.log('run resulted in',x));

/**
 * This function takes a generator function as an argument and returns a promise.
 * The function first creates an iterator from the generator function using generator().
 * Then, it defines a recursive function iterate that takes an iteration object as an argument.
 * If the iteration is done, it returns the value of the iteration. Otherwise, it retrieves the value of the iteration, which is a promise, and then uses promise.then to chain a new iteration with the result of the promise.
 * Finally, the function calls iterate with the first iteration of the iterator and returns the result.
 * In simpler terms, this function allows you to run a generator function asynchronously by yielding promises and iterating over them.
 * @param {GeneratorFunction} generator - The generator function to be executed.
 * @returns {Promise} - A promise that resolves to the result of the generator function.
 */
function run(generator){
    const iterator = generator();
    /**
     * This function is a recursive function that takes an iteration object as an argument and returns the result of the iteration.
     * If the iteration is done, it returns the value of the iteration. Otherwise, it retrieves the value of the iteration, which is a promise, and then uses promise.then to chain a new iteration with the result of the promise.
     * @param {IteratorResult} iteration - The iteration object to be processed.
     * @returns {Promise} - A promise that resolves to the result of the iteration.
     */
    function iterate(iteration){
        if(iteration.done){
            return iteration.value;
        }
        const promise = iteration.value;
        return promise.then(result => iterate(iterator.next(result)));
    }
    return iterate(iterator.next());
}
