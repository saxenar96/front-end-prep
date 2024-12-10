import React from 'react';
import * as Babel from '@babel/standalone';

export function renderComponentFromString(componentString: string) {
    try {
        // Transpile the JSX into plain JavaScript
        const transpiledCode = Babel.transform(componentString, {
            presets: ['react'],
        }).code;

        // Dynamically create the component
        const Component = new Function('React', `return ${transpiledCode}`)(React);
    
        // Ensure it's a valid React component
        if (typeof Component !== 'function') {
            console.error('Invalid component string');
            return
        }

        return (<Component />);
    } catch (e) {
        console.error('Invalid component string', e);
    }
    
}