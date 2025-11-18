// components/JsPlayground.tsx
import React, { useState, useEffect, useRef } from 'react';

interface ExecutionResult {
    type: 'log' | 'error' | 'warning' | 'info';
    message: string;
    timestamp: Date;
}

const JsPlayground: React.FC = () => {
    const [code, setCode] = useState<string>(`// JavaScript Playground
// Try these examples or write your own code!

// Array manipulation examples
const numbers = [1, 2, 3, 4, 5];
console.log('Original array:', numbers);

// Map - transform each element
const doubled = numbers.map(n => n * 2);
console.log('Doubled:', doubled);

// Filter - get even numbers
const evens = numbers.filter(n => n % 2 === 0);
console.log('Even numbers:', evens);

// Reduce - sum all numbers
const sum = numbers.reduce((acc, curr) => acc + curr, 0);
console.log('Sum:', sum);

// Object examples
const user = {
  name: 'John',
  age: 30,
  hobbies: ['reading', 'coding']
};
console.log('User object:', user);

// String manipulation
const message = 'Hello JavaScript!';
console.log('Uppercase:', message.toUpperCase());
console.log('Reversed:', message.split('').reverse().join(''));

// Your code here...`);

    const [output, setOutput] = useState<ExecutionResult[]>([]);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [executionTime, setExecutionTime] = useState<number>(0);
    const [darkMode, setDarkMode] = useState<boolean>(true);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Predefined code examples
    const examples = {
        arrayMethods: `// Array Methods Demo
const fruits = ['apple', 'banana', 'orange', 'grape'];

// forEach - iterate over elements
console.log('All fruits:');
fruits.forEach(fruit => console.log(' - ' + fruit));

// find - find first matching element
const found = fruits.find(fruit => fruit.includes('a'));
console.log('First fruit with "a":', found);

// some - check if any element matches
const hasBanana = fruits.some(fruit => fruit === 'banana');
console.log('Has banana?', hasBanana);

// every - check if all elements match
const allHaveA = fruits.every(fruit => fruit.includes('a'));
console.log('All have letter "a"?', allHaveA);

// slice vs splice
const sliced = fruits.slice(1, 3);
console.log('Slice(1,3):', sliced, '(original unchanged)');

const fruitsCopy = [...fruits];
const spliced = fruitsCopy.splice(1, 2, 'pear', 'kiwi');
console.log('Splice(1,2): removed', spliced, 'new array:', fruitsCopy);`,

        objectManipulation: `// Object Manipulation
const person = {
  firstName: 'Alice',
  lastName: 'Johnson',
  age: 28,
  address: {
    city: 'New York',
    zipCode: '10001'
  }
};

// Object.keys, Object.values, Object.entries
console.log('Keys:', Object.keys(person));
console.log('Values:', Object.values(person));
console.log('Entries:', Object.entries(person));

// Destructuring
const { firstName, age, address: { city } } = person;
console.log('Destructured:', { firstName, age, city });

// Spread operator
const updatedPerson = { ...person, age: 29, occupation: 'Developer' };
console.log('Updated person:', updatedPerson);

// Optional chaining
console.log('Country:', person.address?.country?.code || 'Not specified');`,

        asyncFunctions: `// Async/Await and Promises
// Simulate API calls
const fetchData = (data, delay) => {
  return new Promise(resolve => {
    setTimeout(() => resolve(data), delay);
  });
};

// Async function example
async function processData() {
  console.log('Starting data processing...');
  
  try {
    const user = await fetchData({ id: 1, name: 'John' }, 1000);
    console.log('User fetched:', user);
    
    const posts = await fetchData(['Post 1', 'Post 2'], 500);
    console.log('Posts fetched:', posts);
    
    const results = await Promise.all([
      fetchData('Result A', 300),
      fetchData('Result B', 400),
      fetchData('Result C', 200)
    ]);
    console.log('All results:', results);
    
    console.log('Processing complete!');
  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the async function
processData();`,

        stringMethods: `// String Methods
const text = ' Hello, JavaScript World! ';

console.log('Original:', text);
console.log('Trimmed:', text.trim());
console.log('UpperCase:', text.toUpperCase());
console.log('LowerCase:', text.toLowerCase());
console.log('Length:', text.length);
console.log('Includes "Java":', text.includes('Java'));
console.log('Index of "World":', text.indexOf('World'));
console.log('Replace:', text.replace('JavaScript', 'TypeScript'));
console.log('Split:', text.trim().split(' '));
console.log('Substring(7, 17):', text.substring(7, 17));
console.log('Starts with "Hello":', text.trim().startsWith('Hello'));

// Template literals
const name = 'Sarah';
const score = 95;
console.log(\`\\nTemplate Literal: \\n\${name} scored \\% on the test!\\n\`);`
    };

    // Clear console output
    const clearOutput = () => {
        setOutput([]);
    };

    // Execute the JavaScript code
    const executeCode = async () => {
        if (isRunning) return;

        setIsRunning(true);
        clearOutput();
        const startTime = performance.now();

        try {
            // Capture console.log, console.error, etc.
            const originalConsole = {
                log: console.log,
                error: console.error,
                warn: console.warn,
                info: console.info
            };

            const capturedLogs: ExecutionResult[] = [];

            // Override console methods to capture output
            console.log = (...args) => {
                const message = args.map(arg =>
                    typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
                ).join(' ');
                capturedLogs.push({ type: 'log', message, timestamp: new Date() });
                originalConsole.log(...args);
            };

            console.error = (...args) => {
                const message = args.map(arg =>
                    typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
                ).join(' ');
                capturedLogs.push({ type: 'error', message, timestamp: new Date() });
                originalConsole.error(...args);
            };

            console.warn = (...args) => {
                const message = args.map(arg =>
                    typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
                ).join(' ');
                capturedLogs.push({ type: 'warning', message, timestamp: new Date() });
                originalConsole.warn(...args);
            };

            console.info = (...args) => {
                const message = args.map(arg =>
                    typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
                ).join(' ');
                capturedLogs.push({ type: 'info', message, timestamp: new Date() });
                originalConsole.info(...args);
            };

            // Execute the code
            await new Promise<void>((resolve) => {
                setTimeout(() => {
                    try {
                        // Use Function constructor for safer execution
                        const func = new Function(code);
                        func();
                        resolve();
                    } catch (error) {
                        capturedLogs.push({
                            type: 'error',
                            message: `Execution Error: ${error}`,
                            timestamp: new Date()
                        });
                        resolve();
                    }
                }, 0);
            });

            // Restore original console methods
            console.log = originalConsole.log;
            console.error = originalConsole.error;
            console.warn = originalConsole.warn;
            console.info = originalConsole.info;

            setOutput(capturedLogs);

        } catch (error) {
            setOutput([{
                type: 'error',
                message: `Unexpected Error: ${error}`,
                timestamp: new Date()
            }]);
        } finally {
            const endTime = performance.now();
            setExecutionTime(endTime - startTime);
            setIsRunning(false);
        }
    };

    // Load example code
    const loadExample = (exampleKey: keyof typeof examples) => {
        setCode(examples[exampleKey]);
        if (textareaRef.current) {
            textareaRef.current.focus();
        }
    };

    // Format the output message
    const formatOutput = (result: ExecutionResult, index: number) => {
        const time = result.timestamp.toLocaleTimeString();
        const bgColor = {
            log: 'bg-gray-100',
            error: 'bg-red-100',
            warning: 'bg-yellow-100',
            info: 'bg-blue-100'
        }[result.type];

        const textColor = {
            log: 'text-gray-800',
            error: 'text-red-800',
            warning: 'text-yellow-800',
            info: 'text-blue-800'
        }[result.type];

        const borderColor = {
            log: 'border-gray-300',
            error: 'border-red-300',
            warning: 'border-yellow-300',
            info: 'border-blue-300'
        }[result.type];

        return (
            <div
                key={index}
                className={`p-3 border-l-4 ${borderColor} ${bgColor} ${textColor} text-sm font-mono whitespace-pre-wrap break-words`}
            >
                <div className="flex justify-between items-center mb-1">
                    <span className="text-xs opacity-70 capitalize">{result.type}</span>
                    <span className="text-xs opacity-70">{time}</span>
                </div>
                {result.message}
            </div>
        );
    };

    return (
        <div className={`min-h-screen transition-colors duration-200 
            }`}>
            <div className={`container mx-auto p-4 max-w-7xl ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} rounded-lg p-8`}>
                {/* Header */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                           Lizard Interactive Online
                        </h1>
                        <p className="text-gray-400 mt-1">Build and design by rondevsolutions</p>
                    </div>
                    <div className="flex gap-3 flex-wrap">
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className={`px-4 py-2 rounded-lg border transition-colors ${darkMode
                                    ? 'bg-gray-800 border-gray-700 hover:bg-gray-700'
                                    : 'bg-white border-gray-300 hover:bg-gray-100'
                                }`}
                        >
                            {darkMode ? '☀️ Light' : '🌙 Dark'}
                        </button>
                        <button
                            onClick={clearOutput}
                            className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors"
                        >
                            🧹 Clear Output
                        </button>
                        <button
                            onClick={executeCode}
                            disabled={isRunning}
                            className="px-6 py-2 bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
                        >
                            {isRunning ? '⏳ Running...' : '🚀 Run Code'}
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
                    {/* Sidebar - Examples */}
                    <div className="xl:col-span-1 space-y-4">
                        <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white border border-gray-200'
                            }`}>
                            <h2 className="text-lg font-semibold mb-4">💡 Code Examples</h2>
                            <div className="space-y-3">
                                <button
                                    onClick={() => loadExample('arrayMethods')}
                                    className="w-full text-left p-3 rounded-lg bg-blue-500 bg-opacity-10 hover:bg-opacity-20 border border-blue-500 border-opacity-30 transition-all"
                                >
                                    <div className="font-medium">Array Methods</div>
                                    <div className="text-sm opacity-70 mt-1">map, filter, reduce, etc.</div>
                                </button>

                                <button
                                    onClick={() => loadExample('objectManipulation')}
                                    className="w-full text-left p-3 rounded-lg bg-green-500 bg-opacity-10 hover:bg-opacity-20 border border-green-500 border-opacity-30 transition-all"
                                >
                                    <div className="font-medium">Object Manipulation</div>
                                    <div className="text-sm opacity-70 mt-1">destructuring, spread, etc.</div>
                                </button>

                                <button
                                    onClick={() => loadExample('asyncFunctions')}
                                    className="w-full text-left p-3 rounded-lg bg-purple-500 bg-opacity-10 hover:bg-opacity-20 border border-purple-500 border-opacity-30 transition-all"
                                >
                                    <div className="font-medium">Async Functions</div>
                                    <div className="text-sm opacity-70 mt-1">Promises, async/await</div>
                                </button>

                                <button
                                    onClick={() => loadExample('stringMethods')}
                                    className="w-full text-left p-3 rounded-lg bg-orange-500 bg-opacity-10 hover:bg-opacity-20 border border-orange-500 border-opacity-30 transition-all"
                                >
                                    <div className="font-medium">String Methods</div>
                                    <div className="text-sm opacity-70 mt-1">manipulation & templates</div>
                                </button>
                            </div>
                        </div>

                        {/* Quick Tips */}
                        <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white border border-gray-200'
                            }`}>
                            <h2 className="text-lg font-semibold mb-3">💡 Quick Tips</h2>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-start gap-2">
                                    <span className="text-green-400 mt-1">✓</span>
                                    <span>Use <code className="bg-gray-700 px-1 rounded">console.log()</code> to see output</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-400 mt-1">✓</span>
                                    <span>Try array methods like map, filter, reduce</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-400 mt-1">✓</span>
                                    <span>Experiment with async/await and Promises</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-400 mt-1">✓</span>
                                    <span>Test string manipulation methods</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="xl:col-span-3 space-y-6">
                        {/* Code Editor */}
                        <div className={`rounded-xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white border border-gray-200'
                            }`}>
                            <div className={`px-4 py-3 border-b ${darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50'
                                }`}>
                                <h3 className="font-semibold">📝 Code Editor</h3>
                            </div>
                            <textarea
                                ref={textareaRef}
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                className={`w-full h-96 p-4 font-mono text-sm focus:outline-none resize-none ${darkMode
                                        ? 'bg-gray-900 text-gray-100'
                                        : 'bg-white text-gray-800'
                                    }`}
                                spellCheck="false"
                                placeholder="Write your JavaScript code here..."
                            />
                        </div>

                        {/* Output Console */}
                        <div className={`rounded-xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white border border-gray-200'
                            }`}>
                            <div className={`px-4 py-3 border-b flex justify-between items-center ${darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50'
                                }`}>
                                <h3 className="font-semibold">📊 Output Console</h3>
                                {executionTime > 0 && (
                                    <span className="text-sm opacity-70">
                                        Executed in {executionTime.toFixed(2)}ms
                                    </span>
                                )}
                            </div>
                            <div className={`max-h-96 overflow-y-auto p-4 space-y-2 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'
                                }`}>
                                {output.length === 0 ? (
                                    <div className={`text-center py-8 ${darkMode ? 'text-gray-500' : 'text-gray-400'
                                        }`}>
                                        <div className="text-4xl mb-2">👋</div>
                                        <p>Run your code to see the output here!</p>
                                        <p className="text-sm mt-1">Use console.log() to print values</p>
                                    </div>
                                ) : (
                                    output.map(formatOutput)
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JsPlayground;