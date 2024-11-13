'use client'
import { ChevronDown, Home, Plus, Search, Settings, SquareSigma } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible"
import { usePathname } from "next/navigation"
import '../styles/app-sidebar.css'
import { getProblemsByDifficulty } from "@/const/problems"
import { DIFFICULTY_TITLES, difficultyList } from "@/types/problem"

// const menuItems = [
//   {
//     title: "Home",
//     url: "/home",
//     icon: Home,
//   },
//   {
//     title: "Counter",
//     url: "/easy/counter",
//     icon: Plus,
//   },
//   {
//     title: "Summation",
//     url: "/easy/summation",
//     icon: SquareSigma,
//   },
//   {
//     title: "Search",
//     url: "#",
//     icon: Search,
//   },
//   {
//     title: "Settings",
//     url: "#",
//     icon: Settings,
//   },
// ]

export function AppSidebar() {
  const currPath = usePathname()
  return (
    <Sidebar>
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
      
        {/* <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                  Easy
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
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
        </Collapsible> */}
      </SidebarContent>
    </Sidebar>
  )
}
