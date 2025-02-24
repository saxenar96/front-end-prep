export async function getServerSideProps(context) {
    const { componentString } = context.query; 

    try {
        // Transpile the JSX with module support
        const transpiledCode = transform(componentString, {
            presets: ['@babel/preset-react', '@babel/preset-typescript'],
            plugins: ['@babel/plugin-transform-modules-commonjs'], 
        })?.code;
    
        // Dynamically create the component
        const Component = new Function('React', 'require', `return ${transpiledCode}`)(React, require);
    
        // Ensure it's a valid React component
        if (typeof Component !== 'function') {
            throw new Error('Invalid Component');
        }
    
        return {
            props: {
                MyDynamicComponent: Component,
            },
        };
    } catch (e) {
        console.error('Invalid component string', e);
        return {
            props: {
                MyDynamicComponent: (<div>Error: {e.toString()}</div>),
            },
        }
    }
}
export function OutputView(props) {
    const {MyDynamicComponent} = props
    return (
        <div>
            <MyDynamicComponent /> 
        </div>
    )
}