import { TabProps } from "../config";
import { ProblemCard } from "../problemCard";

export default function ProblemTab(props: TabProps) {
    const {title, description, component: Soln} = props
    return (
        <>
            <h1>{ title }</h1>
            <div>
                { description }
            </div>
            { Soln && (
                    <ProblemCard
                        component={Soln}
                    />
                )
            }
        </>
    )
}