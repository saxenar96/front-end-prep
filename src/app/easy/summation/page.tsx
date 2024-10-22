import Problem from "@/components/problem";
import Dev from "./dev/dev";
import Soln from "./soln/soln";
import { ProblemDescriptionBlock } from "@/components/problem/config";

export default function Summation() {
    const description: ProblemDescriptionBlock[] = [
        {
            header: 'Description',
            content: [
                'In this problem, you will displaying the sum of a list of elements.',
                'The user will have an option to enter a number in a text field. When they click ENTER, you must display the item in the list under the input. When a new item is added to the list, the sum value should be updated to reflect that value',
                'Each item in the list also has a button to delete it. After deleting an item, that value should be subtracted from the total sum.'
            ]
        },
        {
            header: 'Style requirements',
            content: [
                'Each item in the list should have a border around it with a padding of 4px. And delete button (indicated by an X), to the right side',
                'The items should be rendered in vertical columns. Each column may consist of 5 items. After 5, render the next item in a new columns.',
                'The value text should be centered, have a font size of 24px, and be bolded'
            ]
        }
    ]
    return (
        <Problem
            title="Summation"
            description={description}
        >
            <Dev />
            <Soln />
        </Problem>
    )
}