import { ProblemProps } from "./config";
import './index.css';

export default function Problem(props: ProblemProps) {
    const { title, description } = props
    return(
        <div className='problem'>
            <div className='problem-desc'>
                <h1>{ title }</h1>
                {
                    description.map((block, index) => {
                        const {header, content} = block
                        return (
                            <>
                                {header && (<h2>{header}</h2>)}
                                {content?.map(text => (<h3 key={`desc_${index}`}>{ text }</h3>))}
                            </>
                        )
                    })
                }
            </div>
            <div className='problem-space'>
                {props.children}
            </div>
        </div>
    )
}