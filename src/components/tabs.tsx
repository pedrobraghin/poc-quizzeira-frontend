import { Tabs as TabsSCN, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export interface TabsProps {
  tabs: Array<{
    name: string;
    uniqueLabel: string;
    component: React.ReactNode;
  }>
}

export function Tabs({ tabs }: TabsProps) {
  return (
    <TabsSCN defaultValue='google' className='w-max'>
      <TabsList className='w-full'>
        {tabs.map((tab) => {
          return (
            <TabsTrigger
              value={tab.uniqueLabel}
              key={tab.uniqueLabel}
            >
              {tab.name}
            </TabsTrigger>
          );
        })}
      </TabsList>
      {tabs.map(({ component, uniqueLabel }) => {
        return (
          <TabsContent value={uniqueLabel} key={uniqueLabel}>
            {component}
          </TabsContent>
        );
      })}
    </TabsSCN>
  )
}