'use client'
import { ChevronsUpDown, ChevronDown, Code, Atom, Globe} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible"
import { usePathname } from "next/navigation"
import '../styles/app-sidebar.css'
import { getProblemsByDifficulty } from "@/const/problems"
import { DIFFICULTY_TITLES, difficultyList, PROBLEM_TYPES } from "@/types/problem"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { useEffect, useState } from "react"

export interface SidebarHeaderSelectionProps {
  text: string;
  value: any; // tslint:disable-next-line
  iconName: string;
}
export interface SidebarHeaderProps {
  selectionSet: {
    options: SidebarHeaderSelectionProps[],
    default: number
  }
}

export function AppSidebar(props: { headerProps: SidebarHeaderProps }) {
  const { options, default: defaultSelection } = props.headerProps.selectionSet
  const currPath = usePathname()
  const [currentHeaderSelectionIndex, setCurrentHeaderSelectionIndex] = useState(defaultSelection)
  const [currentSelection, setCurrentSelection] = useState(options[currentHeaderSelectionIndex])
  const [currentIcon, setCurrentIcon] = useState<any>(<Globe size={16} />) // tslint:disable-next-line

  useEffect(() => {
    setCurrentSelection(options[currentHeaderSelectionIndex])
  }, [currentHeaderSelectionIndex])

  useEffect(() => {
    if (currentSelection.iconName === 'Globe') {
      setCurrentIcon(<Globe size={16} />)
    } else if (currentSelection.iconName === 'Code') {
      setCurrentIcon(<Code size={16} />)
    } else if (currentSelection.iconName === 'Atom') {
      setCurrentIcon(<Atom size={16} />)
    }
  }, [currentSelection])

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <div className="flex justify-between gap-4 items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton variant={'outline'} className="h-fit">
                <div className="flex aspect-square size-7 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  {currentIcon}
                </div>
                { currentSelection.text }
                <ChevronsUpDown className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[--radix-popper-anchor-width]" side="right" align="start">
              {
                options.map((item, index) => (
                  <DropdownMenuItem key={`header-select-${index}`} onSelect={() => setCurrentHeaderSelectionIndex(index)}>
                    <span>{item.text}</span>
                  </DropdownMenuItem>
                ))
              }
            </DropdownMenuContent>
          </DropdownMenu>
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      <SidebarContent>
          
      {
        difficultyList.map((diff) => {
          return (
            <Collapsible key={`group-${diff}`} defaultOpen className="group/collapsible">
              <SidebarGroup>
                <SidebarGroupLabel asChild>
                  <CollapsibleTrigger>
                      {DIFFICULTY_TITLES[diff]}
                      <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  </CollapsibleTrigger>
                </SidebarGroupLabel>
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {
                        getProblemsByDifficulty(diff)
                        .filter((p) => {
                          if (currentSelection.value === PROBLEM_TYPES.All) {
                            return true
                          } else {
                            return p.problemType === currentSelection.value
                          }
                        })
                        .map((item) => (
                          <SidebarMenuItem
                            key={item.title}
                          >
                            <SidebarMenuButton
                              className={item.url === currPath ? 'curr-path' : ''}
                              asChild
                            >
                              <a href={item.url}>
                                <item.icon />
                                <span>{item.title}</span>
                              </a>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))
                      }
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>
          )
        }
        )
      }
      </SidebarContent>
    </Sidebar>
  )
}
