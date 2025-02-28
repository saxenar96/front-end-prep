import { TabProps } from "../config";
import { ProblemCard } from "../problemCard";

export function ProblemTab(props: TabProps) {
    const {title, description, component: Soln} = props
    return (
        <div className="flex flex-col gap-[16px] h-full">
            {title && (<h1>{ title }</h1>)}
            {description && (<div>{ description }</div>)}
            { Soln && (
                    <ProblemCard
                        component={Soln}
                    />
                )
            }
        </div>
    )
}