Build an Accordion component that displays a list of vertically stacked sections that each contain a title and content snippet. Some HTML is provided for you as example contents along with a chevron icon.

# Requirements
- By default, all sections are collapsed and are hidden from view.
- Clicking on a section title toggles the contents.
    - If the section is collapsed, the section will be expanded and the contents will be displayed.
    - If the section is expanded, the section will be collapsed and the contents will be hidden.
- The sections are independent of each other.
- When collapsed, display a `+` next to the title (indicating that the element can be expanded).
- When expanded, display a `-`.

You must copy the following data in your solution, and render the accordion accordingly.

```
const data = [
    {
        title: 'Iron Man',
        description: `Iron Man is a genius inventor in high-tech armor, using his suit's advanced weaponry and flight capabilities to fight crime and protect the world as a superhero.`
    },
    {
        title: 'Captain America',
        description: `Captain America is a super-soldier with enhanced strength, agility, and an indestructible shield, embodying courage, leadership, and justice as a symbol of hope and freedom.`
    },
    {
        title: 'Thor',
        description: `Thor is the Norse God of Thunder, wielding the mighty hammer Mjolnir to protect Asgard and Earth with his immense strength, lightning powers, and heroic valor.`
    },
]
```