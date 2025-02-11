'use client'
import { ChevronsUpDown, ChevronDown, Code, Atom} from "lucide-react"
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
  useSidebar,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible"
import { usePathname } from "next/navigation"
import '../styles/app-sidebar.css'
import { getProblemsByDifficulty } from "@/const/problems"
import { DIFFICULTY_TITLES, difficultyList } from "@/types/problem"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { useState } from "react"

export interface SidebarHeaderProps {
  selectionSet: {
    options: {value: string, icon: string}[],
    default: number
  }
}

const icons = {
  'code': Code,
  'js': (<div>JS</div>),
  'react': Atom
}

export function AppSidebar(props: { headerProps: SidebarHeaderProps }) {
  const { options, default: defaultSelection } = props.headerProps.selectionSet
  const currPath = usePathname()
  const [currentHeaderSelection, setCurrentHeaderSelection] = useState(defaultSelection)
  const [currentSelectionIcon, setCurrentSelectionIcon] = useState<JSX.Element>(icons['code'])

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <div className="flex justify-between gap-4 items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton variant={'outline'} className="h-fit">
                <div className="flex aspect-square size-7 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                </div>
                { options[currentHeaderSelection].value }
                <ChevronsUpDown className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[--radix-popper-anchor-width]" side="right" align="start">
              {
                options.map((item, index) => (
                  <DropdownMenuItem key={`header-select-${index}`} onSelect={() => setCurrentHeaderSelection(index)}>
                    <span>{item}</span>
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
                      {getProblemsByDifficulty(diff).map((item) => (
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
                      ))}
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
